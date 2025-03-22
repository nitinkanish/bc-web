"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { Search, Menu, X, Sun, Moon, Globe, Bookmark } from "lucide-react"
import { getCategories } from "@/lib/api"
import type { Category } from "@/lib/api"
import SearchBar from "@/components/search-bar"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      // Filter main categories (Politics, Sports, Tourism, Crime, Weather)
      const mainCategories = data.filter((cat: Category) =>
        ["politics", "sports", "tourism", "crime", "weather"].includes(cat.slug),
      )
      setCategories(mainCategories)
    }

    fetchCategories()

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")
  const toggleLanguage = () => setLanguage(language === "en" ? "hi" : "en")

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top bar with language, theme toggle, and search */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium"
              aria-label={language === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language === "en" ? "हिंदी" : "English"}
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center text-sm font-medium"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
              {theme === "dark" ? t("light_mode") : t("dark_mode")}
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="flex items-center text-sm font-medium" aria-label="Search">
              <Search className="h-4 w-4 mr-1" />
              {t("search")}
            </button>
            <Link href="/submit-news" className="text-sm font-medium hidden sm:block">
              {t("submit_news")}
            </Link>
            <Link href="/live-stream" className="text-sm font-medium hidden sm:block">
              {t("live_stream")}
            </Link>
          </div>
        </div>

        {/* Main header with logo and navigation */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            Bol Chaal
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-medium hover:text-primary">
              {t("home")}
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="font-medium hover:text-primary">
                {t(category.slug)}
              </Link>
            ))}
            <Link href="/districts" className="font-medium hover:text-primary">
              {t("districts")}
            </Link>
            <Link href="/read-later" className="font-medium hover:text-primary">
              <Bookmark className="h-4 w-4 inline mr-1" />
              Read Later
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden" aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {t("home")}
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(category.slug)}
                </Link>
              ))}
              <Link href="/districts" className="font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {t("districts")}
              </Link>
              <Link href="/submit-news" className="font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {t("submit_news")}
              </Link>
              <Link href="/live-stream" className="font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                {t("live_stream")}
              </Link>
              <Link href="/read-later" className="font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                <Bookmark className="h-4 w-4 inline mr-1" />
                Read Later
              </Link>
            </nav>
          </div>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-t border-b shadow-lg p-4">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}

