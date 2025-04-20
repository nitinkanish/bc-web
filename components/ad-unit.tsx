"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AdUnitProps {
  className?: string
  slot: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  style?: React.CSSProperties
  layout?: "in-article" | "in-feed" | "normal"
}

export default function AdUnit({
  className,
  slot,
  format = "auto",
  responsive = true,
  style,
  layout = "normal",
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const adInitialized = useRef(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Check if AdSense is loaded
    if (adInitialized.current) return

    // Try to initialize the ad
    try {
      const adsbygoogle = (window as any).adsbygoogle || []

      if (layout === "in-article") {
        adsbygoogle.push({})
      } else if (layout === "in-feed") {
        adsbygoogle.push({})
      } else {
        // Standard ad
        adsbygoogle.push({})
      }

      adInitialized.current = true
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [layout])

  // Different ad formats based on layout type
  if (layout === "in-article") {
    return (
      <div className={cn("my-6", className)} style={style}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-4951872187136427" // Replace with your publisher ID
          data-ad-slot={slot}
        ></ins>
      </div>
    )
  }

  if (layout === "in-feed") {
    return (
      <div className={cn("my-6", className)} style={style}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-4951872187136427" // Replace with your publisher ID
          data-ad-slot={slot}
        ></ins>
      </div>
    )
  }

  // Standard responsive ad
  return (
    <div ref={adRef} className={cn("text-center overflow-hidden", className)} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4951872187136427" // Replace with your publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  )
}
