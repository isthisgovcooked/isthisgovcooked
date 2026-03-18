import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Is This Gov Cooked? | Australian Government Finances Explained",
  description:
    "25 years of Australian government finances (1999–2024) — explained for everyone. No spin. 7 Prime Ministers scored. Budgets, debt, and accounting tricks in plain English.",
  openGraph: {
    title: "Is This Gov Cooked?",
    description: "25 years of Australian government finances. 7 PMs scored. No spin. Just the numbers.",
    type: "website",
    locale: "en_AU",
  },
  keywords: [
    "Australian budget", "government debt", "federal budget", "ANAO",
    "Howard", "Rudd", "Gillard", "Abbott", "Turnbull", "Morrison", "Albanese",
    "consolidated financial statements", "cost of living", "isthisgovcooked",
    "cooked metre", "political accountability", "fair centre",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=IBM+Plex+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.location.hash) {
                window.scrollTo(0, 0);
                setTimeout(function() {
                  var el = document.querySelector(window.location.hash);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
              }
            `,
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
