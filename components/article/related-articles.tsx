import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import type { Post } from "@/lib/api"

interface RelatedArticlesProps {
  posts: Post[]
  title?: string
}

export default function RelatedArticles({ posts, title = "संबंधित खबरें" }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 no-print">
      <div className="flex items-center mb-6">
        <div className="h-1 w-6 bg-blue-600 mr-3"></div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="h-1 flex-grow bg-gray-200 dark:border-gray-800 ml-3"></div>
      </div>

      {/* Featured related news - top 3 in larger cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
                alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Category tag */}
              {post._embedded?.["wp:term"]?.[0]?.[0] && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {post._embedded["wp:term"][0][0].name}
                </span>
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3
                className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p
                className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="mt-auto flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {new Date(post.date).toLocaleDateString("hi-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary related news - next 6 in medium cards */}
      {posts.length > 3 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {posts.slice(3, 9).map((post) => (
            <Link
              key={post.id}
              href={`/news/${post.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
                  alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-3 flex-grow">
                <h3
                  className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>
                    {new Date(post.date).toLocaleDateString("hi-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Compact related news - last 6 in a list format */}
      {posts.length > 9 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">और पढ़ें</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {posts.slice(9, 15).map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg"}
                    alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
                <h4
                  className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
