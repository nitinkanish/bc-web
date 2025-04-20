import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { enUS, hi } from "date-fns/locale"
import type { Post } from "@/lib/api"
import { Clock, Calendar, User } from "lucide-react"

interface NewsCardProps {
  post: Post
  variant?: "default" | "horizontal" | "featured" | "compact" | "related"
  priority?: boolean
  language?: "en" | "hi"
}

export default function NewsCard({ post, variant = "default", priority = false, language = "en" }: NewsCardProps) {
  const locale = language === "en" ? enUS : hi

  const formattedDate = formatDistanceToNow(new Date(post.date), {
    addSuffix: true,
    locale,
  })

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=400&width=600"
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered.replace(/<[^>]*>/g, "")
  const author = post._embedded?.author?.[0]?.name || ""

  // Extract categories
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const mainCategory = categories.length > 0 ? categories[0] : null

  if (variant === "compact") {
    return (
      <Link href={`/news/${post.slug}`} className="group flex items-start gap-3">
        <div className="flex-shrink-0 w-20 h-16 relative rounded-md overflow-hidden">
          <Image src={featuredImage || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" sizes="80px" />
        </div>
        <div>
          <h3
            className="text-sm font-medium group-hover:text-primary line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
        </div>
      </Link>
    )
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={featuredImage || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={priority}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              {mainCategory && (
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  {mainCategory.name}
                </span>
              )}
            </div>
          </div>
          <div className="w-full sm:w-2/3">
            <h3
              className="text-lg sm:text-xl font-bold group-hover:text-primary line-clamp-2 mb-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="text-sm text-muted-foreground line-clamp-2 mb-2"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-3">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formattedDate}</span>
              </div>
              {author && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{author}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link href={`/news/${post.slug}`} className="group block relative h-full">
        <div className="relative h-full overflow-hidden rounded-lg">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

          {mainCategory && (
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              {mainCategory.name}
            </span>
          )}

          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h3
              className="text-xl sm:text-2xl font-bold text-white group-hover:underline line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="mt-2 flex flex-wrap items-center text-sm text-white/80 gap-3">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formattedDate}</span>
              </div>
              {author && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "related") {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            {mainCategory && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                {mainCategory.name}
              </span>
            )}
          </div>
          <div className="mt-3">
            <h3
              className="font-medium group-hover:text-primary line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          {mainCategory && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
              {mainCategory.name}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3
            className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="mt-2 flex flex-wrap items-center text-sm text-muted-foreground gap-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
            {author && (
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>5 min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
