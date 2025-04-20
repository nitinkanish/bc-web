import type { MetadataRoute } from "next"
import { getCategories, getPosts } from "@/lib/api"
import { DISTRICTS_DATA } from "@/lib/district-data"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL
  const baseUrl = "https://www.bolchaal.in"

  // Get all posts
  const posts = await getPosts({ per_page: 100 })

  // Get all categories
  const categories = await getCategories()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/districts`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit-news`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/live-stream`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/read-later`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ]

  // Post routes
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Category routes
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  // District routes
  const districtRoutes = Object.keys(DISTRICTS_DATA).map((slug) => ({
    url: `${baseUrl}/district/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // Combine all routes
  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...districtRoutes]
}
