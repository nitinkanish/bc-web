import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Bol Chaal News",
  description:
    "Learn about Bol Chaal News, Himachal Pradesh's premier news channel founded in 2016, covering local news, events, and stories from across the region.",
  openGraph: {
    title: "About Bol Chaal News",
    description: "Learn about Bol Chaal News, Himachal Pradesh's premier news channel founded in 2016.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Bol Chaal News Logo",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Bol Chaal News</h1>

        <div className="flex justify-center mb-10">
          <div className="relative w-64 h-64">
            <Image src="/logo.svg" alt="Bol Chaal News Logo" fill className="object-contain" priority />
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p>
            Founded in 2016, Bol Chaal News has established itself as Himachal Pradesh's premier news channel, dedicated
            to bringing accurate, timely, and relevant news to the people of the region. What began as a small
            initiative to cover local stories has grown into a comprehensive news platform covering politics, tourism,
            culture, weather, and developments across all 12 districts of Himachal Pradesh.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p>
            At Bol Chaal News, our mission is to empower the people of Himachal Pradesh with information that matters.
            We believe in journalism that serves the public interest, highlights local voices, and contributes to the
            development of our beautiful state. We strive to:
          </p>
          <ul>
            <li>Deliver accurate and unbiased news coverage</li>
            <li>Highlight stories from remote and underrepresented areas</li>
            <li>Promote Himachal Pradesh's rich cultural heritage</li>
            <li>Provide a platform for local voices and concerns</li>
            <li>Support sustainable tourism and environmental conservation</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p>
            Our dedicated team consists of experienced journalists, local correspondents, technical experts, and content
            creators who work tirelessly to bring you the latest news and stories from across Himachal Pradesh. With
            reporters stationed in all major districts, we ensure comprehensive coverage of events and developments
            throughout the state.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Coverage</h2>
          <p>Bol Chaal News covers a wide range of topics including:</p>
          <ul>
            <li>Local and state politics</li>
            <li>Tourism and travel updates</li>
            <li>Weather forecasts and alerts</li>
            <li>Cultural events and festivals</li>
            <li>Development projects and infrastructure</li>
            <li>Education and healthcare initiatives</li>
            <li>Environmental issues and conservation efforts</li>
            <li>Sports and entertainment</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Connect With Us</h2>
          <p>
            We value your feedback and engagement. Connect with us on social media, subscribe to our newsletter, or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>{" "}
            directly with your stories, suggestions, or concerns.
          </p>

          <div className="mt-12 border-t pt-8">
            <p className="italic">
              "Bringing Himachal's stories to the world, and the world's stories to Himachal since 2016."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
