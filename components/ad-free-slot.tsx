"use client"

import { useEffect, useRef } from "react"
import type React from "react"

interface AdFreeSlotProps {
  title: string
  children: React.ReactNode
}

export default function AdFreeSlot({ title, children }: AdFreeSlotProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load AdSense script if not already present
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4951872187136427"
      script.async = true
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }

    // Push ad once AdSense is ready
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

  return (
    <div className="my-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
      <div className="flex items-start">
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-0 text-green-800 dark:text-green-300 flex items-center">
            <a href="https://wa.me/918988089080?text=I%20want%20to%20know%20about%20it" target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h4>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            {children}
          </div>

          {/* Google AdSense ad */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4951872187136427"
            data-ad-slot="7164714772"
            data-ad-format="auto"
            data-full-width-responsive="true"
            ref={adRef}
          />
        </div>
      </div>
    </div>
  )
}
