import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page title",
  description: "Page description",
  alternates: { canonical: "/path" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Next.js Page
      </h1>
    </div>
  );
}
