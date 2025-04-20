"use client"

import { useLanguage } from "@/components/language-provider"
import NewsCard from "./news-card"
import type { Post } from "@/lib/api"

interface NewsCardClientProps {
  post: Post
  variant?: "default" | "horizontal" | "featured" | "compact" | "related"
  priority?: boolean
}

export default function NewsCardClient({ post, variant, priority }: NewsCardClientProps) {
  const { language } = useLanguage()

  return <NewsCard post={post} variant={variant} priority={priority} language={language} />
}
