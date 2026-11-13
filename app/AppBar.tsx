"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@wrksz/themes/client";
import {
  Home,
  User,
  FolderGit2,
  Cpu,
  Globe,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react";

const NAV_ITEMS = [
  { title: "Home", url: "/", icon: Home },
  { title: "About", url: "/about", icon: User },
  { title: "Projects", url: "/projects", icon: FolderGit2 },
  { title: "Rust", url: "/projects/video-rust-esp", icon: Cpu },
  { title: "Next.js", url: "/projects/video-nextjs", icon: Globe },
  { title: "Expo", url: "/projects/video-expo", icon: Smartphone },
];

const THEME_CYCLE = ["system", "dark", "light"] as const;
const THEME_META = {
  system: { label: "System" },
  dark: { label: "Dark" },
  light: { label: "Light" },
} as const;

type ThemeKey = keyof typeof THEME_META;

const itemStack =
  "flex flex-col items-center justify-center gap-0.5 rounded-md py-1 transition-colors md:gap-1 md:py-2";
const iconCls = "h-[18px] w-[18px] shrink-0 md:h-8 md:w-8";
const labelCls = "text-[10px] font-medium leading-none md:text-sm";
const activeCls = "text-[#ab47bc]";
const idleCls = "text-muted-foreground hover:bg-accent hover:text-foreground";

function ThemeButton() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const current = (theme ?? "system") as ThemeKey;
  const meta = THEME_META[current] ?? THEME_META.system;

  // Show the actual theme that's currently applied:
  // resolvedTheme is "light" or "dark" regardless of whether user picked System.
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  const cycle = () => {
    const i = THEME_CYCLE.indexOf(current);
    setTheme(THEME_CYCLE[(i + 1) % THEME_CYCLE.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      title={`Theme: ${meta.label}`}
      aria-label={`Theme: ${meta.label}. Click to cycle.`}
      className={`${itemStack} ${idleCls}`}
    >
      <Icon className={iconCls} aria-hidden />
      <span className={labelCls}>{meta.label}</span>
    </button>
  );
}

export function AppBar() {
  const pathname = usePathname();
  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-1 border-b border-input bg-secondary px-1 md:hidden">
        <div className="flex w-14 shrink-0 flex-col items-center justify-center">
          <ThemeButton />
        </div>
        <nav className="flex flex-1 items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            return (
              <Link
                key={item.url}
                href={item.url}
                aria-label={item.title}
                aria-current={active ? "page" : undefined}
                className={`flex-1 ${itemStack} ${active ? activeCls : idleCls}`}
              >
                <Icon className={iconCls} aria-hidden />
                <span className={labelCls}>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-30 flex-col items-center gap-2 border-r border-input bg-secondary py-4 md:flex">
        <ThemeButton />
        <nav className="flex w-full flex-col gap-1 px-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            return (
              <Link
                key={item.url}
                href={item.url}
                aria-label={item.title}
                aria-current={active ? "page" : undefined}
                className={`${itemStack} ${active ? activeCls : idleCls}`}
              >
                <Icon className={iconCls} aria-hidden />
                <span className={labelCls}>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
