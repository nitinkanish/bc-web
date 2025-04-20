import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/lib/api"

interface InlineRelatedPostsProps {
  posts: Post[]
  title?: string
  variant?: "compact" | "with-image"
}

export default function InlineRelatedPosts({
  posts,
  title = "Read More",
  variant = "compact",
}: InlineRelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  if (variant === "with-image" && posts.length >= 1) {
    const post = posts[0]
    const featuredImage =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=200&width=300"

    return (
      <div className="my-6 p-4 bg-muted rounded-lg">
        <h4 className="text-lg font-bold mb-3">{title}</h4>
        <Link href={`/news/${post.slug}`} className="group block">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="sm:w-1/3 relative aspect-video rounded-md overflow-hidden">
              <Image
                src={featuredImage || "/placeholder.svg"}
                alt={post.title.rendered.replace(/<[^>]*>/g, "")}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 200px"
              />
            </div>
            <div className="sm:w-2/3">
              <h5
                className="font-bold group-hover:text-primary transition-colors"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p
                className="text-sm text-muted-foreground mt-1 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Default compact variant
  return (
    <div className="my-6 p-4 bg-muted rounded-lg">
      <h4 className="text-lg font-bold mb-3">{title}</h4>
      <div className="flex flex-col space-y-3">
        {posts.slice(0, 3).map((post) => (
          <Link key={post.id} href={`/news/${post.slug}`} className="text-primary hover:underline font-medium">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        ))}
      </div>
    </div>
  )
}
