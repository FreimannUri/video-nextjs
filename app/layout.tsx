import { Metadata } from "next";
import { ThemeProvider } from "@wrksz/themes/next";

import "./globals.css";
import { AppBar } from "./AppBar";

const siteUrl = "https://www.freimann.lv";
const siteName = "Uri Freimann";
const siteDescription =
  "Embedded bare-metal Rust engineer. ESP32-S3 + OV5640 streaming FullHD video over WebRTC, with a Next.js benchmark.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Embedded Rust Engineer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — Embedded Rust Engineer`,
    description: siteDescription,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Embedded Rust Engineer`,
    description: siteDescription,
    images: ["/og.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Uri Freimann",
  alternateName: ["uri-freimann", "Uris Freimanis", "Iurii Korotkov"],
  url: siteUrl,
  jobTitle: "Embedded Rust Engineer",
  knowsAbout: [
    {
      "@type": "Thing",
      name: "Rust",
      sameAs: "https://www.wikidata.org/wiki/Q575650",
    },
    {
      "@type": "Thing",
      name: "ESP32-S3",
      sameAs: "https://www.wikidata.org/wiki/Q110126851",
    },
    {
      "@type": "Thing",
      name: "WebRTC",
      sameAs: "https://www.wikidata.org/wiki/Q1089715",
    },
    {
      "@type": "Thing",
      name: "Next.js",
      sameAs: "https://www.wikidata.org/wiki/Q56062435",
    },
    {
      "@type": "Thing",
      name: "React Native",
      sameAs: "https://www.wikidata.org/wiki/Q55774523",
    },
    {
      "@type": "Thing",
      name: "Motion JPEG",
      sameAs: "https://www.wikidata.org/wiki/Q850954",
    },
    {
      "@type": "Thing",
      name: "Advanced Video Coding",
      sameAs: "https://www.wikidata.org/wiki/Q212633",
    },
    "OmniVision OV5640",
    "Rust Embedded",
    "bare-metal programming",
    "Expo framework",
  ],
  sameAs: [
    "https://github.com/uri-freimann",
    "https://www.linkedin.com/in/uri-freimann-aa661b359/",
  ],
};

const navItems = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Projects", url: "/projects" },
  { title: "Rust", url: "/projects/video-rust-esp" },
  { title: "Next.js", url: "/projects/video-nextjs" },
  { title: "Expo", url: "/projects/video-expo" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>

      <body className="antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <header className="flex h-16 items-center bg-secondary px-4 justify-between">
            <Nav />
            <ThemeToggle />
          </header>
          <main className="w-screen">{children}</main> */}

          <AppBar />
          <main className="w-screen pt-14 md:pl-30 md:pt-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
