"use client"

import Link from "next/link"
import { Home, Info, Phone, FileText, Bookmark } from "lucide-react"
import { getCategories } from "@/lib/api"
import type { Category } from "@/lib/api"
import ThemeToggle from "@/components/theme-toggle"
import LanguageToggle from "@/components/language-toggle"
import MobileMenuToggle from "@/components/mobile-menu-toggle"
import SearchToggle from "@/components/search-toggle"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// Default categories as fallback
const DEFAULT_MAIN_CATEGORIES = [
  { id: 1, name: "Politics", slug: "politics", count: 10 },
  { id: 2, name: "Sports", slug: "sports", count: 15 },
  { id: 3, name: "Tourism", slug: "tourism", count: 8 },
  { id: 4, name: "Crime", slug: "crime", count: 12 },
  { id: 5, name: "Weather", slug: "weather", count: 5 },
]

export default async function Header() {
  const pathname = usePathname()
  // Fetch categories on the server with error handling
  let mainCategories: Category[] = []
  try {
    const categories = await getCategories()

    // Filter main categories
    mainCategories = categories.filter((cat: Category) =>
      ["politics", "sports", "tourism", "crime", "weather"].includes(cat.slug),
    )

    // If no categories were found or filtered, use defaults
    if (mainCategories.length === 0) {
      mainCategories = DEFAULT_MAIN_CATEGORIES
    }
  } catch (error) {
    console.error("Error in Header component:", error)
    // Use default categories if API call fails
    mainCategories = DEFAULT_MAIN_CATEGORIES
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with language, theme toggle, and search */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <div className="flex items-center space-x-4">
            <SearchToggle />
            <Link
              href="/submit-news"
              className="text-sm font-medium hidden sm:flex items-center hover:text-primary transition-colors"
            >
              <FileText className="h-4 w-4 mr-1" />
              Submit News
            </Link>
            <Link
              href="/live-stream"
              className="text-sm font-medium hidden sm:flex items-center hover:text-primary transition-colors"
            >
              <span className="pulse">Live Stream</span>
            </Link>
          </div>
        </div>

        {/* Main header with logo and navigation */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
             Bol Chaal
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-medium hover:text-primary transition-colors flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            {mainCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="font-medium hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/districts" className="font-medium hover:text-primary transition-colors">
              Districts
            </Link>
            <Link href="/about" className="font-medium hover:text-primary transition-colors flex items-center">
              <Info className="h-4 w-4 mr-1" />
              About Us
            </Link>
            <Link href="/contact" className="font-medium hover:text-primary transition-colors flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              Contact Us
            </Link>
            <Link href="/read-later" className="font-medium hover:text-primary transition-colors flex items-center">
              <Bookmark className="h-4 w-4 mr-1" />
              Read Later
            </Link>
          </nav>

          {/* Mobile menu button */}
          <MobileMenuToggle />
        </div>
      </div>
    </header>
  )
}
