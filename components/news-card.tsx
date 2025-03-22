"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { enUS, hi } from "date-fns/locale"
import { useLanguage } from "@/components/language-provider"
import type { Post } from "@/lib/api"
import { Clock } from "lucide-react"

interface NewsCardProps {
  post: Post
  variant?: "default" | "horizontal" | "featured" | "compact"
}

export default function NewsCard({ post, variant = "default" }: NewsCardProps) {
  const { language, t } = useLanguage()

  const locale = language === "en" ? enUS : hi

  const formattedDate = formatDistanceToNow(new Date(post.date), {
    addSuffix: true,
    locale,
  })

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=400&width=600"
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || ""
  const author = post._embedded?.author?.[0]?.name || ""

  if (variant === "compact") {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={imageAlt}
              width={80}
              height={60}
              className="rounded-md object-cover w-20 h-15"
            />
          </div>
          <div>
            <h3
              className="font-medium group-hover:text-primary line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={imageAlt}
              width={400}
              height={240}
              className="rounded-lg object-cover w-full aspect-video"
            />
          </div>
          <div className="w-full sm:w-2/3">
            <h3
              className="text-xl font-bold group-hover:text-primary line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="mt-2 text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <div className="mt-3 flex items-center text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              {author && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    {t("by_author")} {author}
                  </span>
                </>
              )}
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h3
              className="text-xl sm:text-2xl font-bold text-white group-hover:underline line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="mt-2 flex items-center text-sm text-white/80">
              <span>{formattedDate}</span>
              {author && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    {t("by_author")} {author}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-3">
          <h3
            className="font-bold group-hover:text-primary line-clamp-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <span>{formattedDate}</span>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>
                  {t("by_author")} {author}
                </span>
              </>
            )}
            <span className="mx-2">•</span>
            <Clock className="h-3 w-3 mr-1" />
            <span>
              5
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

