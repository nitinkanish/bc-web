"use client"

import { useLanguage } from "@/components/language-provider"
import { Facebook, Twitter, Linkedin, Mail, LinkIcon } from "lucide-react"

interface SocialShareProps {
  url: string
  title: string
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const { t } = useLanguage()

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div>
      <h4 className="text-sm font-medium mb-3">{t("share")}:</h4>
      <div className="flex space-x-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={`${t("share_on")} ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Copy link"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

