"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

interface AdvertiseCtaProps {
  variant?: "sidebar" | "inline" | "banner"
  className?: string
}

export default function AdvertiseCta({ variant = "inline", className = "" }: AdvertiseCtaProps) {
  const adRef = useRef(null)

  useEffect(() => {
    // Load script only once
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]')
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4951872187136427"
      script.async = true
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }

    // Try rendering the ad
    const timeout = setTimeout(() => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error("AdSense error:", e)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [])

  if (variant === "sidebar") {
    return (
      <div className={`p-4 bg-primary/5 border border-primary/20 rounded-lg ${className}`}>
        <h3 className="text-lg font-bold mb-2">Advertise Here</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Reach thousands of readers across Himachal Pradesh with your business advertisement.
        </p>
        <Link
          href="https://wa.me/918988089080?text=to%20place%20add%20in%20bol%20chaal%20intrested"
          className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Get Started
        </Link>
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <div className={`p-6 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg ${className}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-1">Promote Your Business</h3>
            <p className="text-muted-foreground">
              Affordable advertising solutions for local businesses in Himachal Pradesh
            </p>
          </div>
          <Link
            href="https://wa.me/918988089080?text=to%20place%20add%20in%20bol%20chaal%20intrested"
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
          >
            View Ad Options
          </Link>
        </div>
      </div>
    )
  }

  // Default "inline" with ad code
  return (
    <div className={`p-5 bg-primary/10 rounded-lg border border-primary/20 ${className}`}>
      <h3 className="text-lg font-bold mb-2">Advertise with Bol Chaal News</h3>
      <p className="mb-3 text-sm">
        Reach our growing audience of readers across Himachal Pradesh. Promote your business, event, or service with our
        affordable advertising options.
      </p>

      {/* Google AdSense Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4951872187136427"
        data-ad-slot="7164714772"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        <Link
          href="https://wa.me/918988089080?text=to%20place%20add%20in%20bol%20chaal%20intrested"
          className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          Check Ad Rates
        </Link>
        <Link
          href="https://wa.me/918988089080?text=to%20place%20add%20in%20bol%20chaal%20intrested"
          className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md hover:bg-secondary/90 transition-colors text-sm"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
