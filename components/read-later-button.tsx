"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { Post } from "@/lib/api"

interface ReadLaterButtonProps {
  post: Post
}

export default function ReadLaterButton({ post }: ReadLaterButtonProps) {
  const { t } = useLanguage()
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Check if this article is already saved
    const savedArticles = JSON.parse(localStorage.getItem("readLaterArticles") || "[]")
    const isAlreadySaved = savedArticles.some((article: Post) => article.id === post.id)
    setIsSaved(isAlreadySaved)
  }, [post.id])

  const toggleReadLater = () => {
    const savedArticles = JSON.parse(localStorage.getItem("readLaterArticles") || "[]")

    if (isSaved) {
      // Remove from saved articles
      const updatedArticles = savedArticles.filter((article: Post) => article.id !== post.id)
      localStorage.setItem("readLaterArticles", JSON.stringify(updatedArticles))
      setIsSaved(false)
    } else {
      // Add to saved articles
      const articleToSave = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        date: post.date,
        excerpt: post.excerpt,
        featured_media: post.featured_media,
        _embedded: post._embedded,
      }

      savedArticles.push(articleToSave)
      localStorage.setItem("readLaterArticles", JSON.stringify(savedArticles))
      setIsSaved(true)
    }
  }

  return (
    <button
      onClick={toggleReadLater}
      className="flex items-center text-sm font-medium hover:text-primary"
      aria-label={isSaved ? "Remove from read later" : "Save for later"}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-1" />
          <span>Saved</span>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-1" />
          <span>Read Later</span>
        </>
      )}
    </button>
  )
}

