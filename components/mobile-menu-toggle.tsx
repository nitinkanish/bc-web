"use client"

import { useState } from "react"
import { Menu, X, Home, Info, Phone, FileText, Shield, Bookmark } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function MobileMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <button onClick={toggleMenu} className="md:hidden" aria-label="Toggle menu">
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t absolute top-full left-0 right-0 bg-background z-50">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" />
                {t("home")}
              </Link>
              <Link
                href="/districts"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("districts")}
              </Link>
              <Link
                href="/about"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 mr-2" />
                About Us
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
              <Link
                href="/privacy-policy"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Link>
              <Link
                href="/submit-news"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-4 w-4 mr-2" />
                {t("submit_news")}
              </Link>
              <Link
                href="/live-stream"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="pulse">{t("live_stream")}</span>
              </Link>
              <Link
                href="/read-later"
                className="font-medium hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Read Later
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
