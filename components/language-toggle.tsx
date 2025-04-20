"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Globe } from "lucide-react"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-8 h-8" />
  }

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="flex items-center text-sm font-medium hover:text-primary transition-colors"
      aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
    >
      <Globe className="h-4 w-4 mr-1" />
      {language === "en" ? "हिंदी" : "English"}
    </button>
  )
}
