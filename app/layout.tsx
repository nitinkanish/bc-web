import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import NextTopLoader from "nextjs-toploader"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import "./mobile.css"
import "./news-progress.css"
import { seoConfig } from "@/lib/seo-strategy"
import type { Metadata } from "next"
import { Suspense } from "react"
import ClientProviders from "@/components/client-providers"
import TopLoader from "@/components/nextjs-toploader"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.global.siteUrl),
  title: {
    default: seoConfig.global.defaultTitle,
    template: seoConfig.global.titleTemplate,
  },
  description: seoConfig.global.defaultDescription,
  keywords: ["Himachal Pradesh", "News", "Local News", "HP News", "Tourism", "Weather", "Politics", "Sports"],
  authors: [{ name: "Himachal News Team" }],
  creator: "Himachal News",
  publisher: "Himachal News",
  openGraph: {
    type: "website",
    locale: seoConfig.global.locale,
    url: seoConfig.global.siteUrl,
    title: seoConfig.global.defaultTitle,
    description: seoConfig.global.defaultDescription,
    siteName: seoConfig.global.siteName,
    images: [
      {
        url: `${seoConfig.global.siteUrl}/api/og?title=${encodeURIComponent(seoConfig.global.defaultTitle)}&description=${encodeURIComponent(seoConfig.global.defaultDescription)}`,
        width: 1200,
        height: 630,
        alt: seoConfig.global.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.global.defaultTitle,
    description: seoConfig.global.defaultDescription,
    creator: seoConfig.global.twitterHandle,
    images: [
      `${seoConfig.global.siteUrl}/api/og?title=${encodeURIComponent(seoConfig.global.defaultTitle)}&description=${encodeURIComponent(seoConfig.global.defaultDescription)}`,
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: seoConfig.global.siteUrl,
    languages: {
      "en-US": `${seoConfig.global.siteUrl}/en`,
      "hi-IN": `${seoConfig.global.siteUrl}/hi`,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  other: {
    "msapplication-TileColor": "#0f172a",
    "theme-color": "#0f172a",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structuredData.organization),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YV4YLT40K4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YV4YLT40K4', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased ${fontSans.variable}`}>
        <TopLoader />
        {/* Add NextTopLoader for route changes */}
        <NextTopLoader
          color="#2563eb"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />

        <ClientProviders>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 bg-background border-b"></div>}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
