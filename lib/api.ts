import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://bolchaal.in/wp-json/wp/v2"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

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

// API functions
export async function getPosts(params = {}) {
  try {
    const response = await api.get("/posts", {
      params: {
        _embed: "wp:featuredmedia,author",
        per_page: 10,
        ...params,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const response = await api.get("/posts", {
      params: {
        slug,
        _embed: "wp:featuredmedia,author",
      },
    })
    return response.data[0] || null
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}

export async function getCategories() {
  try {
    const response = await api.get("/categories", {
      params: {
        per_page: 100,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getPostsByCategory(categoryId: number, params = {}) {
  try {
    const response = await api.get("/posts", {
      params: {
        categories: categoryId,
        _embed: "wp:featuredmedia,author",
        per_page: 10,
        ...params,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error)
    return []
  }
}

export async function getCommentsByPostId(postId: number) {
  try {
    const response = await api.get("/comments", {
      params: {
        post: postId,
        per_page: 100,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}

export async function submitComment(postId: number, name: string, email: string, content: string, parent = 0) {
  try {
    const response = await api.post("/comments", {
      post: postId,
      author_name: name,
      author_email: email,
      content,
      parent,
    })
    return response.data
  } catch (error) {
    console.error("Error submitting comment:", error)
    throw error
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const response = await api.get("/posts", {
      params: {
        search: searchTerm,
        _embed: "wp:featuredmedia,author",
        per_page: 20,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error searching posts for "${searchTerm}":`, error)
    return []
  }
}

export async function getBreakingNews() {
  try {
    // Assuming you have a custom field for breaking news
    const response = await api.get("/posts", {
      params: {
        _embed: "wp:featuredmedia,author",
        per_page: 5,
        "filter[meta_key]": "is_breaking_news",
        "filter[meta_value]": true,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return []
  }
}

export async function getPostsByDistrict(district: string) {
  try {
    // Assuming you have a custom field for district
    const response = await api.get("/posts", {
      params: {
        _embed: "wp:featuredmedia,author",
        per_page: 10,
        "filter[meta_key]": "district",
        "filter[meta_value]": district,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching posts for district ${district}:`, error)
    return []
  }
}

export async function getRelatedPosts(postId: number, categoryIds: number[]) {
  try {
    const response = await api.get("/posts", {
      params: {
        _embed: "wp:featuredmedia,author",
        per_page: 4,
        exclude: postId,
        categories: categoryIds.join(","),
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching related posts for post ${postId}:`, error)
    return []
  }
}

export async function getTrendingPosts() {
  try {
    // Assuming you have a way to track trending posts
    // This could be based on view count, comments, or other metrics
    const response = await api.get("/posts", {
      params: {
        _embed: "wp:featuredmedia,author",
        per_page: 5,
        orderby: "comment_count", // Using comment count as a proxy for trending
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    return []
  }
}

export async function getMediaById(mediaId: number) {
  try {
    const response = await api.get(`/media/${mediaId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching media with ID ${mediaId}:`, error)
    return null
  }
}

export async function subscribeToNewsletter(email: string, name: string) {
  // This would typically connect to a newsletter service or custom endpoint
  try {
    const response = await api.post("/newsletter/subscribe", {
      email,
      name,
    })
    return response.data
  } catch (error) {
    console.error("Error subscribing to newsletter:", error)
    throw error
  }
}

export async function submitUserNews(formData: FormData) {
  try {
    const response = await api.post("/user-news", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error submitting user news:", error)
    throw error
  }
}

