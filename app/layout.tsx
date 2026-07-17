import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { organizationJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Hantverkarsystemet — missa aldrig ett jobb igen",
    template: "%s | Hantverkarsystemet",
  },
  description:
    "Automatiskt SMS-svar när du missar samtal, fler recensioner utan tjat och en snygg hemsida — allt för hantverkare, för 2 995 kr/mån.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main" className="skip-link">
          Hoppa till innehåll
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
