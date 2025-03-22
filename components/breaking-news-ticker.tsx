"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { getBreakingNews } from "@/lib/api"
import type { Post } from "@/lib/api"
import { AlertCircle } from "lucide-react"

export default function BreakingNewsTicker() {
  const { t } = useLanguage()
  const [breakingNews, setBreakingNews] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBreakingNews = async () => {
      setIsLoading(true)
      const news = await getBreakingNews()
      setBreakingNews(news)
      setIsLoading(false)
    }

    fetchBreakingNews()

    // Refresh breaking news every 5 minutes
    const interval = setInterval(fetchBreakingNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || breakingNews.length === 0) {
    return null
  }

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center mr-4 shrink-0">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="font-bold text-sm uppercase">{t("breaking_news")}:</span>
        </div>
        <div className="overflow-hidden relative w-full">
          <div className="breaking-news-ticker whitespace-nowrap">
            {breakingNews.map((news, index) => (
              <Link key={news.id} href={`/news/${news.slug}`} className="inline-block mr-8 hover:underline">
                <span dangerouslySetInnerHTML={{ __html: news.title.rendered }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

