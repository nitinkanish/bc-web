"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { getCommentsByPostId, submitComment } from "@/lib/api"
import type { Comment } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"
import { enUS, hi } from "date-fns/locale"

interface CommentsProps {
  postId: number
}

export default function CommentsSection({ postId }: CommentsProps) {
  const { t, language } = useLanguage()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const locale = language === "en" ? enUS : hi

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      const data = await getCommentsByPostId(postId)
      setComments(data)
      setIsLoading(false)
    }

    fetchComments()
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setMessage({ type: "error", text: t("name_required") })
      return
    }

    if (!email.trim()) {
      setMessage({ type: "error", text: t("email_required") })
      return
    }

    if (!content.trim()) {
      setMessage({ type: "error", text: t("comment_required") })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const newComment = await submitComment(postId, name, email, content)
      setComments([newComment, ...comments])
      setMessage({ type: "success", text: t("comment_success") })
      setContent("")
    } catch (error) {
      setMessage({ type: "error", text: t("comment_error") })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">
        {t("comments")} ({comments.length})
      </h2>

      {/* Comment form */}
      <div className="bg-muted p-4 rounded-lg mb-8">
        <h3 className="font-medium mb-4">Leave a comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Comment *
            </label>
            <textarea
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? "..." : t("submit_comment")}
          </button>
          {message && (
            <p className={`text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-border pb-6">
              <div className="flex justify-between items-start">
                <div className="font-medium">{comment.author_name}</div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.date), {
                    addSuffix: true,
                    locale,
                  })}
                </div>
              </div>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
      )}
    </div>
  )
}

