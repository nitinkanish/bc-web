"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialShareMinimalProps {
  url: string
  title: string
}

export default function SocialShareMinimal({ url, title }: SocialShareMinimalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center space-x-2">
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      <span>{copied ? "Copied!" : "Share"}</span>
    </Button>
  )
}
