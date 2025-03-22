"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import NewsletterForm from "@/components/newsletter-form"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              Bol Chaal
            </Link>
            <p className="text-sm text-muted-foreground">
              Bol Chaal brings you the latest news and updates from across Himachal Pradesh, covering politics,
              sports, tourism, crime, weather, and more.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-primary" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold mb-4">{t("home")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/politics" className="text-sm hover:text-primary">
                  {t("politics")}
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-sm hover:text-primary">
                  {t("sports")}
                </Link>
              </li>
              <li>
                <Link href="/category/tourism" className="text-sm hover:text-primary">
                  {t("tourism")}
                </Link>
              </li>
              <li>
                <Link href="/category/crime" className="text-sm hover:text-primary">
                  {t("crime")}
                </Link>
              </li>
              <li>
                <Link href="/category/weather" className="text-sm hover:text-primary">
                  {t("weather")}
                </Link>
              </li>
              <li>
                <Link href="/districts" className="text-sm hover:text-primary">
                  {t("districts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">{t("about_us")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-primary">
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary">
                  {t("contact_us")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-primary">
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm hover:text-primary">
                  {t("terms_of_service")}
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="text-sm hover:text-primary">
                  {t("submit_news")}
                </Link>
              </li>
              <li>
                <Link href="/live-stream" className="text-sm hover:text-primary">
                  {t("live_stream")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold mb-4">{t("newsletter")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter to get the latest news and updates delivered directly to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Bol Chaal. {t("all_rights_reserved")}.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="mailto:info@himachalnews.com"
              className="text-sm text-muted-foreground hover:text-primary flex items-center"
            >
              <Mail className="h-4 w-4 mr-1" />
              info@bolchaal.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

