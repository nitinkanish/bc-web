import Link from "next/link"
import { Mail, Phone, FileText } from "lucide-react"

export const metadata = {
  title: "Advertise with Bol Chaal News",
  description:
    "Promote your business, event, or service with Bol Chaal News. Reach our growing audience across Himachal Pradesh with our affordable advertising options.",
}

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Advertise with Bol Chaal News</h1>

        <p className="text-lg mb-8">
          Reach our growing audience across Himachal Pradesh with targeted advertising solutions designed to help your
          business succeed.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Why Advertise With Us?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">✓</span>
                <span>
                  Reach <strong>50,000+</strong> monthly readers across Himachal Pradesh
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">✓</span>
                <span>Target specific districts and categories relevant to your business</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">✓</span>
                <span>
                  Flexible ad formats including display ads, sponsored content, native ads, and video placements
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">✓</span>
                <span>Detailed analytics and reporting to measure your campaign performance</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Ad Placement Options</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">1</span>
                <span>
                  <strong>Homepage Banner</strong> - Premium visibility on our most visited page
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">2</span>
                <span>
                  <strong>Category Sponsorship</strong> - Target readers interested in specific topics
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">3</span>
                <span>
                  <strong>In-Article Ads</strong> - Appear within our most engaging content
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">4</span>
                <span>
                  <strong>Sidebar Promotions</strong> - Visible across multiple pages
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 text-primary p-1 rounded mr-3 mt-0.5">5</span>
                <span>
                  <strong>Sponsored Content</strong> - Native articles about your business
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary/10 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">Advertising Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Placement</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Homepage Banner</td>
                  <td className="py-3 px-4">1 Week</td>
                  <td className="py-3 px-4">₹5,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Category Sponsorship</td>
                  <td className="py-3 px-4">1 Month</td>
                  <td className="py-3 px-4">₹8,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">In-Article Ad</td>
                  <td className="py-3 px-4">1 Month</td>
                  <td className="py-3 px-4">₹3,500</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Sidebar Promotion</td>
                  <td className="py-3 px-4">2 Weeks</td>
                  <td className="py-3 px-4">₹2,500</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Sponsored Article</td>
                  <td className="py-3 px-4">Permanent</td>
                  <td className="py-3 px-4">₹10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mt-4">* Custom packages and discounts available for long-term commitments</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border mb-12">
          <h2 className="text-2xl font-bold mb-6">Contact Our Advertising Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <a href="mailto:ads@bolchaal.com" className="text-primary hover:underline">
                ads@bolchaal.com
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <a href="tel:+919876543210" className="text-primary hover:underline">
                +91 98765 43210
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Media Kit</h3>
              <a href="/media-kit.pdf" className="text-primary hover:underline">
                Download Media Kit
              </a>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Fill out our quick form and our advertising team will contact you within 24 hours.</p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors inline-block"
          >
            Request Advertising Information
          </Link>
        </div>
      </div>
    </div>
  )
}
