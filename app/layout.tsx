import "@/app/globals.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { Header } from "@/app/components/Header";
import Template from "./ui/template";

const siteUrl = "https://www.freimann.lv";
const siteName = "Uri Freimann";
const siteDescription =
  "Embedded bare-metal Rust engineer. ESP32-S3 + OV5640 streaming FullHD video over WebRTC, with a Next.js benchmark.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // default: `${siteName} — Embedded Rust Engineer`,
    default: "Embedded no_std Rust",
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
  alternateName: ["FreimannUri", "Uris Freimanis", "Iurii Korotkov"],
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
    "https://github.com/FreimannUri",
    "https://www.linkedin.com/in/uri-freimann-aa661b359/",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>

      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className="w-screen">
            <Template>{children}</Template>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
