"use client";
import { useEffect, useState } from "react";

type Raw = {
  seq: number;
  ts: number;
  kbs?: number;
  kb?: number;
  esp?: { kbs?: number; kb_frame?: number };
};
type Pt = { seq: number; ts: number; kbs: number; kb: number };

const W = 640,
  H = 300,
  L = 52,
  R = 12,
  T = 16,
  B = 30;
const WINDOW_S = 600; // окно графика: 10 минут
const GAP_S = 3; // пауза длиннее этого разрывает линию

const norm = (r: Raw): Pt => ({
  seq: r.seq,
  ts: r.ts,
  kbs: r.kbs ?? r.esp?.kbs ?? 0,
  kb: r.kb ?? r.esp?.kb_frame ?? 0,
});

function niceStep(max: number, ticks: number) {
  const raw = max / ticks;
  const p = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}

export default function StreamChart() {
  const [pts, setPts] = useState<Pt[]>([]);
  const [now, setNow] = useState(0);
  const [offline, setOffline] = useState(true);

  useEffect(() => {
    let since = 0,
      boot = 0,
      lastTs = 0,
      stop = false;
    async function tick() {
      try {
        const d = await (
          await fetch(`/api/stats?since=${since}`, { cache: "no-store" })
        ).json();
        if (d.boot && d.boot !== boot) {
          boot = d.boot;
          since = 0;
          setPts([]);
        }
        if (d.samples?.length) {
          const add: Pt[] = d.samples.map(norm);
          since = add[add.length - 1].seq;
          lastTs = add[add.length - 1].ts;
          setPts((p) => [...p, ...add].slice(-WINDOW_S));
        }
        if (d.now) setNow(d.now);
        setOffline(!!d.offline || !lastTs || (d.now ?? 0) - lastTs > 5);
      } catch {
        setOffline(true);
      }
      if (!stop) setTimeout(tick, 1000);
    }
    tick();
    return () => {
      stop = true;
    };
  }, []);

  if (!now || !pts.length) {
    return (
      <section className="mx-auto mt-4 w-full max-w-160 rounded-xl border p-4 text-sm text-muted-foreground">
        Waiting for data from the board…
      </section>
    );
  }

  const t0 = now - WINDOW_S;
  const vis = pts.filter((p) => p.ts >= t0);
  const last = pts[pts.length - 1];

  const yMax = Math.max(100, ...vis.map((p) => p.kbs));
  const step = niceStep(yMax, 4);
  const yTop = Math.ceil(yMax / step) * step;
  const X = (ts: number) => L + ((ts - t0) / WINDOW_S) * (W - L - R);
  const Y = (v: number) => T + (1 - v / yTop) * (H - T - B);
  const yTicks = Array.from(
    { length: Math.round(yTop / step) + 1 },
    (_, i) => i * step,
  );
  const xTicks = Array.from({ length: WINDOW_S / 60 + 1 }, (_, m) => m); // m минут назад

  const segs: Pt[][] = [];
  for (const p of vis) {
    const cur = segs[segs.length - 1];
    if (cur && p.ts - cur[cur.length - 1].ts <= GAP_S) cur.push(p);
    else segs.push([p]);
  }

  return (
    <section
      className={`mx-auto mt-4 w-full max-w-160 rounded-xl border p-4 ${offline ? "opacity-60" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-sm font-medium">Stream throughput</h2>
          <p className="text-xs text-muted-foreground">
            ESP32-S3 to laptop, JPEG frames over Wi-Fi
            {offline && " · board offline"}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold tabular-nums">
            {offline ? "—" : last.kbs}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              KB/s
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {offline ? "—" : last.kb} KB per frame
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 w-full text-muted-foreground"
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={L}
              x2={W - R}
              y1={Y(v)}
              y2={Y(v)}
              stroke="currentColor"
              strokeOpacity={0.2}
            />
            <text
              x={L - 8}
              y={Y(v) + 4}
              textAnchor="end"
              fontSize={12}
              fill="currentColor"
            >
              {v}
            </text>
          </g>
        ))}
        {xTicks.map((m) => {
          const x = X(now - m * 60);
          return (
            <g key={m}>
              <line
                x1={x}
                x2={x}
                y1={H - B}
                y2={H - B + 5}
                stroke="currentColor"
              />
              <text
                x={x}
                y={H - B + 18}
                textAnchor="middle"
                fontSize={12}
                fill="currentColor"
              >
                {m === 0 ? "now" : `−${m}`}
              </text>
            </g>
          );
        })}
        <text x={L} y={T - 4} fontSize={12} fill="currentColor">
          KB/s
        </text>
        <text
          x={W - R}
          y={H - 2}
          textAnchor="end"
          fontSize={12}
          fill="currentColor"
        >
          minutes ago
        </text>

        {segs.map((g, i) => {
          const line = g.map((p) => `${X(p.ts)},${Y(p.kbs)}`).join(" ");
          return (
            <g key={i} className="text-emerald-500">
              <polygon
                points={`${X(g[0].ts)},${Y(0)} ${line} ${X(g[g.length - 1].ts)},${Y(0)}`}
                fill="currentColor"
                fillOpacity={0.12}
              />
              <polyline
                points={line}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              />
            </g>
          );
        })}
      </svg>
    </section>
  );
}
