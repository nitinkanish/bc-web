"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import NewsCard from "@/components/news-card"
import { Trash2 } from "lucide-react"
import type { Post } from "@/lib/api"

export default function ReadLaterPage() {
  const { t } = useLanguage()
  const [savedArticles, setSavedArticles] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const articles = JSON.parse(localStorage.getItem("readLaterArticles") || "[]")
    setSavedArticles(articles)
    setIsLoading(false)
  }, [])

  const clearAllArticles = () => {
    localStorage.removeItem("readLaterArticles")
    setSavedArticles([])
  }

  const removeArticle = (id: number) => {
    const updatedArticles = savedArticles.filter((article) => article.id !== id)
    localStorage.setItem("readLaterArticles", JSON.stringify(updatedArticles))
    setSavedArticles(updatedArticles)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Saved Articles</h1>
        {savedArticles.length > 0 && (
          <button
            onClick={clearAllArticles}
            className="flex items-center text-sm font-medium text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : savedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <div key={article.id} className="relative group">
              {/* Wrap NewsCard in Suspense */}
              <Suspense fallback={<p>Loading article...</p>}>
                <NewsCard post={article} />
              </Suspense>
              <button
                onClick={() => removeArticle(article.id)}
                className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove from saved"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">You haven't saved any articles yet.</p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90"
          >
            Browse Articles
          </Link>
        </div>
      )}
    </div>
  )
}
