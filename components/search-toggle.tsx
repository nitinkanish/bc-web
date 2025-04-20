"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import SearchBar from "@/components/search-bar"

export default function SearchToggle() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center text-sm font-medium hover:text-primary transition-colors"
        aria-label="Search"
      >
        <Search className="h-4 w-4 mr-1" />
        {t("search")}
      </button>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-t border-b shadow-lg p-4 z-50">
          <SearchBar onClose={() => setIsSearchOpen(false)} />
        </div>
      )}
    </>
  )
}
