import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { env } from "@/lib/env";
import { organizationJsonLd } from "@/lib/jsonld";

const defaultDescription =
  "Automatiskt SMS-svar när du missar samtal, fler Google-recensioner utan tjat, och en snabb hemsida. 2 995 kr/mån, allt ingår.";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Hantverkarsystemet — missa aldrig ett samtal igen",
    template: "%s | Hantverkarsystemet",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Hantverkarsystemet",
    title: "Hantverkarsystemet — missa aldrig ett samtal igen",
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hantverkarsystemet — missa aldrig ett samtal igen",
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = organizationJsonLd();

  return (
    <html lang="sv" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Hoppa till innehåll
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
