"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface SearchBarProps {
  onClose?: () => void
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
      if (onClose) onClose()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full bg-muted/50 border border-border rounded-md py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 md:hidden"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  )
}

