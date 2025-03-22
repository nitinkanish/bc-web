"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { subscribeToNewsletter } from "@/lib/api"

export default function NewsletterForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setMessage({ type: "error", text: t("email_required") })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      await subscribeToNewsletter(email, name)
      setMessage({ type: "success", text: "Thank you for subscribing!" })
      setEmail("")
      setName("")
    } catch (error) {
      setMessage({ type: "error", text: "Failed to subscribe. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("name_placeholder")}
          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("email_placeholder")}
          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
      >
        {isSubmitting ? "..." : t("subscribe_button")}
      </button>
      {message && (
        <p className={`text-sm ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>{message.text}</p>
      )}
    </form>
  )
}

