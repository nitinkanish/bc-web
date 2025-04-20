import Image from "next/image"
import Link from "next/link"
import { TrendingUp } from "lucide-react"
import type { Post } from "@/lib/api"

interface ArticleTrendingProps {
  posts: Post[] | null | undefined
}

export default function ArticleTrending({ posts }: ArticleTrendingProps) {
  // Check if posts exists and is an array
  if (!posts || !Array.isArray(posts) || posts.length === 0) return null

  return (
    <div className="my-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-xl font-serif font-bold text-blue-800 dark:text-blue-300">ट्रेंडिंग खबरें</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.slice(0, 4).map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`} className="group flex items-start gap-3">
            <div className="flex-shrink-0 w-20 h-16 relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <Image
                src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
                alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="80px"
              />
            </div>
            <div>
              <h3
                className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
