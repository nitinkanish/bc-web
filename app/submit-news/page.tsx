"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { submitUserNews } from "@/lib/api"
import { Upload } from "lucide-react"

export default function SubmitNewsPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    title: "",
    content: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const districts = [
    "Shimla",
    "Mandi",
    "Kangra",
    "Solan",
    "Kullu",
    "Hamirpur",
    "Bilaspur",
    "Una",
    "Chamba",
    "Sirmaur",
    "Kinnaur",
    "Lahaul and Spiti",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages(fileArray)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.title || !formData.content) {
      setMessage({ type: "error", text: "Please fill in all required fields." })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      // Create FormData object for submission
      const submitData = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })

      // Add images
      images.forEach((image, index) => {
        submitData.append(`image_${index}`, image)
      })

      await submitUserNews(submitData)

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        district: "",
        title: "",
        content: "",
      })
      setImages([])

      setMessage({
        type: "success",
        text: "Thank you for your submission! Our team will review your news and publish it soon.",
      })
    } catch (error) {
      setMessage({
        type: "error",
        text: "There was an error submitting your news. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t("submit_news")}</h1>
      <p className="text-muted-foreground mb-8">
        Have a news tip or story? Share it with us, and it might be featured on our website.
      </p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium mb-1">
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              News Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              News Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images (Optional)</label>
            <div className="border border-dashed border-border rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or click to select files</p>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                multiple
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => document.getElementById("images")?.click()}
                className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80"
              >
                Select Files
              </button>
              {images.length > 0 && <div className="mt-4 text-sm">{images.length} file(s) selected</div>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground font-medium py-3 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit News"}
          </button>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

