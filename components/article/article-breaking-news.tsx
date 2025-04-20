import Link from "next/link"
import type { Post } from "@/lib/api"

interface ArticleBreakingNewsProps {
  posts: Post[]
}

export default function ArticleBreakingNews({ posts }: ArticleBreakingNewsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="bg-red-600 text-white py-2 px-4">
      <div className="container mx-auto">
        <div className="flex items-center overflow-hidden">
          <span className="font-bold mr-3 whitespace-nowrap">ताज़ा खबर:</span>
          <div className="overflow-hidden">
            <div className="breaking-news-ticker whitespace-nowrap">
              {posts.slice(0, 3).map((post, index) => (
                <span key={post.id} className="inline-block mr-8">
                  <Link href={`/news/${post.slug}`} className="hover:underline">
                    {post.title.rendered.replace(/<[^>]*>/g, "")}
                  </Link>
                  {index < 2 && <span className="mx-3 text-red-300">|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
