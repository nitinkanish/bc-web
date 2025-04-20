import Image from "next/image"
import Link from "next/link"
import { getPosts } from "@/lib/api"
import type { Post } from "@/lib/api"

// Find the IPL category ID (assuming it exists in WordPress)
async function getIPLCategoryId() {
  try {
    const categories = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?search=ipl`, {
      next: { revalidate: 3600 },
    }).then((res) => res.json())

    // Find a category that matches IPL (case insensitive)
    const iplCategory = categories.find((cat: any) => cat.name.toLowerCase().includes("ipl"))

    return iplCategory?.id || null
  } catch (error) {
    console.error("Error finding IPL category:", error)
    return null
  }
}

export default async function IPLNews() {
  let posts: Post[] = []

  try {
    // Try to get the IPL category ID
    const iplCategoryId = await getIPLCategoryId()

    // If we found an IPL category, get posts from that category
    if (iplCategoryId) {
      posts = await getPosts({ categories: iplCategoryId, per_page: 4 })
    } else {
      // Otherwise, try to get posts with IPL in the title or content
      posts = await getPosts({ search: "IPL", per_page: 4 })
    }
  } catch (error) {
    console.error("Error fetching IPL news:", error)
    // Leave posts as empty array
  }

  // If no posts were found, show a message
  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">No IPL news articles found.</p>
        <p className="text-sm mt-2">Check back later for updates on IPL 2025.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.map((post) => {
        const featuredImage =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=200&width=300"

        return (
          <Link href={`/news/${post.slug}`} key={post.id} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative h-48 w-full">
                <Image
                  src={featuredImage || "/placeholder.svg"}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title.rendered}
                </h3>

                <div
                  className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Read more</span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
