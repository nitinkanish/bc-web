"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  LinkIcon,
  Share2,
  PhoneIcon as WhatsApp,
  MessageCircle,
  Check,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface EnhancedSocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
  compact?: boolean
  showLabel?: boolean
}

export default function EnhancedSocialShare({
  url,
  title,
  description = "",
  className,
  compact = false,
  showLabel = true,
}: EnhancedSocialShareProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] text-white hover:bg-[#0E65E5]",
      mobileOnly: false,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "bg-[#1DA1F2] text-white hover:bg-[#0C85D0]",
      mobileOnly: false,
    },
    {
      name: "WhatsApp",
      icon: <WhatsApp className="h-5 w-5" />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-[#25D366] text-white hover:bg-[#20BD5C]",
      mobileOnly: false, // Changed to false to show on all devices
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: "bg-[#0A66C2] text-white hover:bg-[#0959AB]",
      mobileOnly: false,
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: "bg-gray-500 text-white hover:bg-gray-600",
      mobileOnly: false,
    },
    {
      name: "SMS",
      icon: <MessageCircle className="h-5 w-5" />,
      url: `sms:?body=${encodedTitle}%20${encodedUrl}`,
      color: "bg-green-600 text-white hover:bg-green-700",
      mobileOnly: true,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000,
      })
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast({
        title: "Copy failed",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  // Only render client-side
  if (!mounted) return null

  // Detect if we're on mobile
  const isMobile =
    typeof navigator !== "undefined"
      ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      : false

  // Filter share options based on device
  const filteredShareLinks = shareLinks.filter((link) => !link.mobileOnly || (link.mobileOnly && isMobile))

  // Native share API for mobile devices
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {mounted && navigator.share ? (
          <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={handleNativeShare}>
            <Share2 className="h-4 w-4" />
            {showLabel && <span>{t("share")}</span>}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                {showLabel && <span>{t("share")}</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {filteredShareLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={copyToClipboard} className="flex items-center space-x-2 cursor-pointer">
                {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                <span>{copied ? t("copied") : t("copy_link")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    )
  }

  return (
    <div className={cn("", className)}>
      <h4 className="text-sm font-medium mb-3">{t("share")}:</h4>

      {/* Main share buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {mounted && navigator.share && (
          <Button variant="outline" size="sm" className="flex items-center space-x-2" onClick={handleNativeShare}>
            <Share2 className="h-4 w-4" />
            <span>{t("native_share")}</span>
          </Button>
        )}

        {filteredShareLinks.slice(0, 4).map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              link.color,
            )}
            aria-label={`${t("share_on")} ${link.name}`}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.name}</span>
          </a>
        ))}

        <Button
          variant="outline"
          size="sm"
          className={cn("flex items-center space-x-2", copied ? "bg-green-100 text-green-800 border-green-300" : "")}
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
          <span>{copied ? t("copied") : t("copy_link")}</span>
        </Button>
      </div>
    </div>
  )
}
