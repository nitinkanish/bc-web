import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { getPosts, getCategories, getPostsByCategory } from "@/lib/api"
import type { Category, Post } from "@/lib/api"
import BreakingNewsTicker from "@/components/breaking-news-ticker"
import NewsCard from "@/components/news-card"
import { ChevronRight, Clock, Calendar } from "lucide-react"
import WeatherWidget from "@/components/weather-widget"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bol Chaal News - Latest News from Himachal Pradesh",
  description:
    "Get the latest news, updates, and stories from Himachal Pradesh. Breaking news, politics, tourism, weather, and more from all 12 districts.",
  keywords: [
    "Himachal Pradesh news",
    "HP news",
    "Shimla news",
    "Himachal latest",
    "Himachal Pradesh updates",
    "local news Himachal",
  ],
  alternates: {
    canonical: "https://bolchaal.com",
  },
  openGraph: {
    title: "Bol Chaal News - Latest News from Himachal Pradesh",
    description:
      "Get the latest news, updates, and stories from Himachal Pradesh. Breaking news, politics, tourism, weather, and more from all 12 districts.",
    url: "https://bolchaal.com",
    siteName: "Bol Chaal News",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bolchaal.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bol Chaal News - Latest News from Himachal Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bol Chaal News - Latest News from Himachal Pradesh",
    description:
      "Get the latest news, updates, and stories from Himachal Pradesh. Breaking news, politics, tourism, weather, and more from all 12 districts.",
    images: ["https://bolchaal.com/og-image.jpg"],
    creator: "@bolchaalnews",
  },
}

export const revalidate = 600 // Revalidate every 10 minutes

// Define the top categories
const TOP_CATEGORIES = [
  "hamirpur-hp",
  "crime",
  "barsar",
  "politics",
  "featured",
  "accident",
  "education",
  "entertainment",
]

// Function to get structured data for SEO
function getStructuredData(posts: Post[]) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.slice(0, 10).map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://bolchaal.com/news/${post.slug}`,
      name: post.title.rendered.replace(/<[^>]*>/g, ""),
    })),
  }

  // Add WebSite schema
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bol Chaal News",
    url: "https://bolchaal.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bolchaal.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return [JSON.stringify(itemList), JSON.stringify(website)]
}

async function getHomePageData() {
  // Get categories first
  const categories = await getCategories()

  // Filter to get only our top categories
  const topCategories = categories.filter((cat: Category) => TOP_CATEGORIES.includes(cat.slug))

  // If we couldn't find all categories, use what we have
  const categoriesToUse = topCategories.length > 0 ? topCategories : categories.slice(0, 8)

  // Get latest posts for the hero section
  const latestPosts = await getPosts({ per_page: 15 })

  // Get posts for each category
  const categoryPosts = await Promise.all(
    categoriesToUse.map(async (category: Category) => {
      const posts = await getPostsByCategory(category.id, { per_page: 6 })
      return {
        category,
        posts,
      }
    }),
  )

  // Get trending posts (using latest for now, but could be modified to use most commented or viewed)
  const trendingPosts = await getPosts({ per_page: 5 })

  return {
    latestPosts,
    categoryPosts,
    trendingPosts,
    categories: categoriesToUse,
  }
}

export default async function HomePage() {
  const { latestPosts, categoryPosts, trendingPosts, categories } = await getHomePageData()

  // Featured posts (first 5 latest posts)
  const featuredPosts = latestPosts.slice(0, 5)

  // Latest news (excluding featured posts)
  const latestNews = latestPosts.slice(5)

  // Get the first featured post for the hero
  const heroPost = featuredPosts[0]

  // Get the next 4 featured posts for the secondary features
  const secondaryFeatured = featuredPosts.slice(1, 5)

  // Get structured data
  const structuredDataArray = getStructuredData(latestPosts)

  return (
    <>
      <Suspense fallback={<div className="h-8"></div>}>
        <BreakingNewsTicker />
      </Suspense>

      {/* SEO Structured Data */}
      {structuredDataArray.map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />
      ))}

      {/* Hero Section - ABC News Style */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero */}
          <div className="lg:col-span-8">
            {heroPost && (
              <div className="relative overflow-hidden rounded-lg group h-[400px] md:h-[500px]">
                <Link href={`/news/${heroPost.slug}`}>
                  <Image
                    src={
                      heroPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/placeholder.svg?height=600&width=1200" ||
                      "/placeholder.svg"
                    }
                    alt={heroPost.title.rendered.replace(/<[^>]*>/g, "")}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    {heroPost._embedded?.["wp:term"]?.[0]?.[0] && (
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-primary text-white rounded-sm">
                        {heroPost._embedded["wp:term"][0][0].name}
                      </span>
                    )}
                    <h1
                      className="text-2xl md:text-4xl font-bold text-white mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: heroPost.title.rendered }}
                    />
                    <div className="flex items-center text-white/80 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{heroPost.date}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Secondary Features */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            {secondaryFeatured.map((post, index) => (
              <div key={post.id} className="relative overflow-hidden rounded-lg group h-[120px]">
                <Link href={`/news/${post.slug}`}>
                  <Image
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=300&width=500"
                    }
                    alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <h2
                      className="text-sm md:text-base font-bold text-white line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Latest News Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">Latest News</h2>
                <Link href="/latest" className="text-primary hover:underline flex items-center text-sm font-medium">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {latestNews.slice(0, 4).map((post, index) => (
                  <NewsCard key={post.id} post={post} variant="horizontal" priority={index < 2} language="en" />
                ))}
              </div>
            </div>

            {/* Category Sections */}
            {categoryPosts.slice(0, 4).map(({ category, posts }) => (
              <div key={category.id} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold border-l-4 border-primary pl-3">{category.name}</h2>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-primary hover:underline flex items-center text-sm font-medium"
                  >
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(0, 6).map((post, index) => (
                    <NewsCard key={post.id} post={post} variant={index < 2 ? "horizontal" : "compact"} language="en" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Weather Widget */}
            <div className="mb-8">
              <Suspense fallback={<div className="h-[300px] bg-muted animate-pulse rounded-lg"></div>}>
                <WeatherWidget />
              </Suspense>
            </div>

            {/* Trending Now */}
            <div className="mb-8 bg-muted/30 rounded-lg p-5">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Trending Now</h3>
              <div className="space-y-4">
                {trendingPosts.slice(0, 5).map((post, index) => (
                  <div key={post.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-primary text-white font-bold rounded-full w-7 h-7 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <Link href={`/news/${post.slug}`} className="group">
                      <h4
                        className="font-medium text-sm group-hover:text-primary line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8 bg-muted/30 rounded-lg p-5">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-3 py-2 bg-muted hover:bg-primary hover:text-white transition-colors rounded text-sm font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* More from categories */}
            {categoryPosts.slice(4).map(({ category, posts }) => (
              <div key={category.id} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <Link href={`/category/${category.slug}`} className="text-primary hover:underline text-xs">
                    More
                  </Link>
                </div>
                <div className="space-y-4">
                  {posts.slice(0, 3).map((post) => (
                    <NewsCard key={post.id} post={post} variant="compact" language="en" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Categories Grid */}
      <section className="container mx-auto px-4 py-8 border-t">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-muted/50 hover:bg-primary hover:text-white transition-colors rounded-lg p-4 text-center"
            >
              <h3 className="font-bold">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.count} articles</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
