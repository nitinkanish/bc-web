"use client"

import Script from "next/script"
import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [fullPath, setFullPath] = useState("")

  useEffect(() => {
    const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    setFullPath(path)

    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, { page_path: path })
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID])

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: '${fullPath}' });
          `,
        }}
      />
    </>
  )
}
