import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://bolchaal.in/wp-json/wp/v2"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

// Default categories fallback data
const DEFAULT_CATEGORIES = [
  { id: 1, name: "Politics", slug: "politics", count: 10 },
  { id: 2, name: "Sports", slug: "sports", count: 15 },
  { id: 3, name: "Tourism", slug: "tourism", count: 8 },
  { id: 4, name: "Crime", slug: "crime", count: 12 },
  { id: 5, name: "Weather", slug: "weather", count: 5 },
]

// Types
export interface Post {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  featured_media: number
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
      alt_text: string
    }>
    author?: Array<{
      name: string
      slug: string
    }>
  }
  categories: number[]
  tags: number[]
  acf?: {
    is_breaking_news?: boolean
    district?: string
  }
}

export interface Category {
  id: number
  name: string
  slug: string
  count: number
}

export interface Comment {
  id: number
  post: number
  parent: number
  author_name: string
  date: string
  content: {
    rendered: string
  }
}

export interface Media {
  id: number
  source_url: string
  alt_text: string
}

// Helper function to get or set cache
async function cachedRequest(key: string, requestFn: () => Promise<any>) {
  // Check if we have a valid cache entry
  const cacheEntry = cache[key]
  const now = Date.now()

  if (cacheEntry && now - cacheEntry.timestamp < CACHE_DURATION) {
    return cacheEntry.data
  }

  try {
    // Make the actual request
    const data = await requestFn()

    // Cache the result
    cache[key] = { data, timestamp: now }

    return data
  } catch (error) {
    // If we have a stale cache entry, return it rather than failing
    if (cacheEntry) {
      console.warn(`Using stale cache for ${key} due to request error`)
      return cacheEntry.data
    }
    throw error
  }
}

// API functions with retry logic
async function makeRequestWithRetry(requestFn: () => Promise<any>, retries = 3, delay = 1000) {
  try {
    return await requestFn()
  } catch (error: any) {
    if (retries <= 0) throw error

    // If rate limited (429), wait longer
    const waitTime = error.response?.status === 429 ? delay * 2 : delay

    console.warn(`Request failed, retrying in ${waitTime}ms... (${retries} retries left)`)
    await new Promise((resolve) => setTimeout(resolve, waitTime))

    return makeRequestWithRetry(requestFn, retries - 1, waitTime * 2)
  }
}

// API functions
export async function getPosts(params = {}) {
  const cacheKey = `posts-${JSON.stringify(params)}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            _embed: "wp:featuredmedia,author",
            per_page: 10,
            ...params,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  const cacheKey = `post-${slug}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            slug,
            _embed: "wp:featuredmedia,author",
          },
        }),
      )
      return response.data[0] || null
    })
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

export async function getCategories() {
  const cacheKey = "categories"

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/categories", {
          params: {
            per_page: 100,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    // Return default categories as fallback
    return DEFAULT_CATEGORIES
  }
}

export async function getPostsByCategory(categoryId: number, params = {}) {
  const cacheKey = `posts-category-${categoryId}-${JSON.stringify(params)}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            categories: categoryId,
            _embed: "wp:featuredmedia,author",
            per_page: 10,
            ...params,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error)
    return []
  }
}

export async function getCommentsByPostId(postId: number) {
  const cacheKey = `comments-${postId}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/comments", {
          params: {
            post: postId,
            per_page: 100,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}

export async function submitComment(postId: number, name: string, email: string, content: string, parent = 0) {
  try {
    const response = await makeRequestWithRetry(() =>
      api.post("/comments", {
        post: postId,
        author_name: name,
        author_email: email,
        content,
        parent,
      }),
    )
    return response.data
  } catch (error) {
    console.error("Error submitting comment:", error)
    throw error
  }
}

export async function searchPosts(searchTerm: string) {
  const cacheKey = `search-${searchTerm}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            search: searchTerm,
            _embed: "wp:featuredmedia,author",
            per_page: 20,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error(`Error searching posts for "${searchTerm}":`, error)
    return []
  }
}

export async function getBreakingNews() {
  const cacheKey = "breaking-news"

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            _embed: "wp:featuredmedia,author",
            per_page: 5,
            "filter[meta_key]": "is_breaking_news",
            "filter[meta_value]": true,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

export async function getPostsByDistrict(district: string) {
  const cacheKey = `district-${district}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            _embed: "wp:featuredmedia,author",
            per_page: 10,
            "filter[meta_key]": "district",
            "filter[meta_value]": district,
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching posts for district ${district}:`, error)
    return []
  }
}

export async function getRelatedPosts(postId: number, categoryIds: number[]) {
  const cacheKey = `related-${postId}-${categoryIds.join(",")}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() =>
        api.get("/posts", {
          params: {
            _embed: "wp:featuredmedia,author",
            per_page: 4,
            exclude: postId,
            categories: categoryIds.join(","),
          },
        }),
      )
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching related posts for post ${postId}:`, error)
    return []
  }
}

export async function getTrendingPosts(): Promise<Post[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed&per_page=5&orderby=date`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch trending posts: ${response.status}`)
    }

    const posts = await response.json()
    return Array.isArray(posts) ? posts : []
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    return [] // Return empty array on error
  }
}

export async function getMediaById(mediaId: number) {
  const cacheKey = `media-${mediaId}`

  try {
    return await cachedRequest(cacheKey, async () => {
      const response = await makeRequestWithRetry(() => api.get(`/media/${mediaId}`))
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching media with ID ${mediaId}:`, error)
    return null
  }
}

export async function subscribeToNewsletter(email: string, name: string) {
  // This would typically connect to a newsletter service or custom endpoint
  try {
    const response = await makeRequestWithRetry(() =>
      api.post("/newsletter/subscribe", {
        email,
        name,
      }),
    )
    return response.data
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    throw error
  }
}

export async function submitUserNews(formData: FormData) {
  try {
    const response = await makeRequestWithRetry(() =>
      api.post("/user-news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    )
    return response.data
  } catch (error) {
    console.error("Error submitting user news:", error)
    throw error
  }
}
