import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rust",
  description: "Page description",
  alternates: { canonical: "/path" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Rust Page
      </h1>

      <p className="mt-6">
        <a
          href="https://github.com/uri-freimann/video-rust-esp"
          className="text-[#ab47bc] underline underline-offset-2 transition-colors hover:text-[#8e24aa] dark:text-[#ce93d8] dark:hover:text-[#ab47bc]"
          rel="noopener"
        >
          github.com/uri-freimann/video-rust-esp
        </a>
      </p>
    </div>
  );
}
