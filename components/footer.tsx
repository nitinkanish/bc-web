import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Bol Chaal News</h3>
            <p className="text-gray-300 mb-4">
              Bringing you the latest news and updates from Himachal Pradesh since 2016. Trusted source for local news,
              politics, tourism, and more.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="text-gray-300 hover:text-white">
                  Submit News
                </Link>
              </li>
              <li>
                <Link href="/live-stream" className="text-gray-300 hover:text-white">
                  Live Stream
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/politics" className="text-gray-300 hover:text-white">
                  Politics
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-gray-300 hover:text-white">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/category/tourism" className="text-gray-300 hover:text-white">
                  Tourism
                </Link>
              </li>
              <li>
                <Link href="/category/crime" className="text-gray-300 hover:text-white">
                  Crime
                </Link>
              </li>
              <li>
                <Link href="/category/weather" className="text-gray-300 hover:text-white">
                  Weather
                </Link>
              </li>
              <li>
                <Link href="/districts" className="text-gray-300 hover:text-white">
                  Districts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-300 mr-2 mt-0.5" />
                <span className="text-gray-300">123 News Street, Shimla, Himachal Pradesh, India - 171001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-300 mr-2" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-300 mr-2" />
                <a href="mailto:info@bolchaal.com" className="text-gray-300 hover:text-white">
                  info@bolchaal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} Bol Chaal News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
