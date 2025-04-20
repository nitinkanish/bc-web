import type { Metadata } from "next"
import { getPosts } from "@/lib/api"
import { getAllDistricts } from "@/lib/district-data"
import LatestNewsHero from "@/components/latest-news/latest-news-hero"
import LatestNewsList from "@/components/latest-news/latest-news-list"
import DistrictsDirectory from "@/components/latest-news/districts-directory"
import LatestNewsSEO from "@/components/latest-news/latest-news-seo"
import SectionDivider from "@/components/section-divider"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Himachal News | Latest Updates from Across the State",
  description:
    "Stay connected with the pulse of Himachal Pradesh. Get the latest news, exclusive stories, and in-depth coverage from all 12 districts, curated by Arvind Mourya, Co-founder and Chief Editor of Bol Chaal.",
  keywords:
    "Himachal Pradesh news, Bol Chaal, Arvind Mourya, himachal updates, local news, breaking news, HP districts",
  alternates: {
    canonical: "https://bolchaal.in/himachal-news",
  },
  openGraph: {
    title: "Himachal News | Latest Updates from Across the State",
    description:
      "Stay connected with the pulse of Himachal Pradesh. Get the latest news, exclusive stories, and in-depth coverage from all 12 districts.",
    url: "https://bolchaal.in/himachal-news",
    type: "website",
    siteName: "Bol Chaal",
    images: [
      {
        url: "https://bolchaal.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bol Chaal - Himachal News Updates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himachal News | Latest Updates from Across the State",
    description:
      "Stay connected with the pulse of Himachal Pradesh. Get the latest news, exclusive stories, and in-depth coverage from all 12 districts.",
    images: ["https://bolchaal.in/og-image.jpg"],
  },
}

export default async function HimachalNewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get current page from query params or default to 1
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const perPage = 12

  // Fetch latest posts with pagination
  const posts = await getPosts({
    per_page: perPage,
    page: page,
    _embed: "wp:featuredmedia,author",
  })

  // Get all districts
  const districts = getAllDistricts()

  return (
    <main className="container mx-auto px-4 py-8">
      {/* SEO Schema */}
      <LatestNewsSEO />

      {/* Hero Section */}
      <LatestNewsHero />

      {/* Himachal News Introduction */}
      <section className="my-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Himachal News: The Voice of Dev Bhoomi</h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Arvind Mourya"
                width={80}
                height={80}
                className="rounded-full border-2 border-primary"
              />
            </div>
            <div>
              <p className="italic text-sm md:text-base">
                "Welcome to our comprehensive Himachal news section. As someone born and raised in the valleys of this
                beautiful state, I've helped create Bol Chaal to bring authentic, timely, and relevant news to everyone
                who calls Himachal home—whether you're here or anywhere across the globe."
              </p>
              <p className="text-right font-semibold mt-2">- Arvind Mourya, Co-founder & Chief Editor, Bol Chaal</p>
            </div>
          </div>

          <p>
            At Bol Chaal, we believe that local news matters. Our team of dedicated journalists travels across the 12
            districts of Himachal Pradesh to bring you stories that mainstream media often overlooks. From the apple
            orchards of Shimla to the remote villages of Lahaul-Spiti, we cover it all with passion and authenticity.
          </p>
          <p>
            What makes our coverage unique is our deep connection with the local communities. We don't just report
            news—we tell the stories of real people, their challenges, achievements, and aspirations. Whether it's a
            farmer's innovative technique in Kangra or a student's remarkable achievement in Hamirpur, we bring these
            stories to light.
          </p>
        </div>
      </section>

      {/* Latest News List */}
      <section className="my-12">
        <SectionDivider title="Today's Himachal Headlines" />
        <Suspense fallback={<LatestNewsListSkeleton />}>
          <LatestNewsList posts={posts} currentPage={page} />
        </Suspense>
      </section>

      {/* Districts Directory */}
      <section className="my-12 bg-slate-50 dark:bg-slate-900 p-6 rounded-lg">
        <SectionDivider title="Explore Himachal District by District" className="mt-0" />
        <p className="text-muted-foreground mb-6">
          Each district of Himachal has its own unique character, challenges, and stories. Explore district-specific
          news by clicking below.
        </p>
        <DistrictsDirectory districts={districts} />
      </section>

      {/* Newsletter Subscription */}
      <section className="my-12">
        <SectionDivider title="Join Our Community" />
        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Bol Chaal Updates</h3>
          <p className="mb-6">
            I personally curate a weekly newsletter highlighting the most important stories from across Himachal. No
            spam, just authentic news that matters to you and your family.
          </p>
        </div>
      </section>

      {/* Additional SEO Content */}
      <section className="my-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">Our Approach to Himachal News Coverage</h2>
          <p>
            When I joined Bol Chaal as Co-founder in 2020, I had a simple vision: to create a news platform that truly
            represents the voice of Himachal Pradesh. Having worked with national media for over a decade, I noticed how
            regional news, especially from hill states like ours, often gets sidelined.
          </p>
          <p>Our approach is different. We focus on:</p>
          <ul>
            <li>
              <strong>Hyperlocal Coverage:</strong> News that directly impacts your daily life in Himachal
            </li>
            <li>
              <strong>Cultural Preservation:</strong> Stories that celebrate our rich Pahari heritage and traditions
            </li>
            <li>
              <strong>Development Focus:</strong> Critical reporting on infrastructure, education, and healthcare
              initiatives
            </li>
            <li>
              <strong>Environmental Concerns:</strong> Coverage of climate change impacts on our fragile Himalayan
              ecosystem
            </li>
            <li>
              <strong>Tourism Insights:</strong> Beyond the glossy brochures, the real challenges and opportunities in
              our tourism sector
            </li>
          </ul>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-6">
            <h3 className="text-xl font-bold mb-2">Why Bol Chaal Stands Out</h3>
            <p>
              "What makes us different is our commitment to ground reporting. Our journalists don't just sit in
              offices—they travel to remote villages, talk to local communities, and bring forth stories that would
              otherwise remain untold. We're not just reporting news; we're documenting the evolving history of our
              beloved state."
            </p>
            <p className="text-right italic mt-2">- Arvind Mourya</p>
          </div>

          <p>
            As we continue to grow, our commitment remains unwavering: to be the most trusted source of news for
            everyone who cares about Himachal Pradesh. Whether you're a resident, a Himachali living elsewhere, or
            someone with a connection to our beautiful state, Bol Chaal is your window into the heart of Dev Bhoomi.
          </p>

          <p>
            Thank you for being part of our journey. Together, let's stay informed, connected, and proud of our
            Himachali heritage.
          </p>

          <div className="mt-8 text-right">
            <p className="font-bold">Arvind Mourya</p>
            <p>Co-founder & Chief Editor, Bol Chaal</p>
            <p>contact@bolchaal.in</p>
          </div>
        </div>
      </section>
    </main>
  )
}

function LatestNewsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6 mb-3" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
