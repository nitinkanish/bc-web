"use client"

import { Facebook, Twitter, MessageCircle } from "lucide-react"

interface AmpSocialShareProps {
  url: string
  title: string
  description: string
  isAmp?: boolean
}

export default function AmpSocialShare({ url, title, description, isAmp = false }: AmpSocialShareProps) {
  if (isAmp) {
    return (
      <div className="amp-social-share">
        <amp-social-share type="facebook" width="40" height="40" data-param-url={url} data-param-quote={title} />
        <amp-social-share type="twitter" width="40" height="40" data-param-url={url} data-param-text={title} />
        <amp-social-share type="whatsapp" width="40" height="40" data-param-url={url} data-param-text={title} />
        <amp-social-share
          type="linkedin"
          width="40"
          height="40"
          data-param-url={url}
          data-param-title={title}
          data-param-description={description}
        />
      </div>
    )
  }

  // Standard version for non-AMP
  return (
    <div className="flex gap-2">
      <button
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")}
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
      </button>
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            "_blank",
          )
        }
        className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </button>
      <button
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank")}
        className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={16} />
      </button>
    </div>
  )
}
