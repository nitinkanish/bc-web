import { Suspense } from "react"
import Link from "next/link"
import { getPosts, getCategories, getPostsByCategory } from "@/lib/api"
import type { Category } from "@/lib/api"
import BreakingNewsTicker from "@/components/breaking-news-ticker"
import NewsCard from "@/components/news-card"
import WeatherWidget from "@/components/weather-widget"

export const revalidate = 600 // Revalidate every 10 minutes

async function getHomePageData() {
  const [latestPosts, categories] = await Promise.all([getPosts({ per_page: 10 }), getCategories()])

  // Filter main categories
  const mainCategories = categories.filter((cat: Category) =>
    ["politics", "sports", "tourism", "crime", "weather"].includes(cat.slug),
  )

  // Get posts for each category
  const categoryPosts = await Promise.all(
    mainCategories.map(async (category: Category) => {
      const posts = await getPostsByCategory(category.id, { per_page: 4 })
      return {
        category,
        posts,
      }
    }),
  )

  return {
    latestPosts,
    categoryPosts,
  }
}

export default async function HomePage() {
  const { latestPosts, categoryPosts } = await getHomePageData()

  // Featured posts (first 5 latest posts)
  const featuredPosts = latestPosts.slice(0, 5)

  // Latest news (excluding featured posts)
  const latestNews = latestPosts.slice(5)

  return (
    <>
      <Suspense fallback={<div className="h-8"></div>}>
        <BreakingNewsTicker />
      </Suspense>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured post */}
          <div className="lg:col-span-2 h-[400px]">
            {featuredPosts[0] && <NewsCard post={featuredPosts[0]} variant="featured" />}
          </div>

          {/* Secondary featured posts */}
          <div className="grid grid-cols-1 gap-6 h-[400px]">
            <div className="h-[195px]">
              {featuredPosts[1] && <NewsCard post={featuredPosts[1]} variant="featured" />}
            </div>
            <div className="h-[195px]">
              {featuredPosts[2] && <NewsCard post={featuredPosts[2]} variant="featured" />}
            </div>
          </div>
        </div>

        {/* Additional featured posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="h-[250px]">{featuredPosts[3] && <NewsCard post={featuredPosts[3]} variant="featured" />}</div>
          <div className="h-[250px]">{featuredPosts[4] && <NewsCard post={featuredPosts[4]} variant="featured" />}</div>
        </div>
      </section>

      {/* Latest News and Weather */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Latest News</h2>
              <Link href="/latest" className="text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-8">
              {latestNews.map((post) => (
                <NewsCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="h-[300px] bg-muted animate-pulse rounded-lg"></div>}>
              <WeatherWidget />
            </Suspense>

            <div className="mt-8">
              <h3 className="font-bold mb-4">Trending</h3>
              <div className="space-y-4">
                {featuredPosts.slice(0, 4).map((post) => (
                  <NewsCard key={post.id} post={post} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {categoryPosts.map(({ category, posts }) => (
        <section key={category.id} className="container mx-auto px-4 py-8 border-t">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <Link href={`/category/${category.slug}`} className="text-primary hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

