import type { Post } from "@/lib/api"

interface NewsArticleSchemaProps {
  post: Post
  url: string
  featuredImage: string
  images: string[]
}

export default function NewsArticleSchema({ post, url, featuredImage, images }: NewsArticleSchemaProps) {
  // Extract clean text without HTML tags
  const title = post.title.rendered.replace(/<[^>]*>/g, "")
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160)
  const content = post.content.rendered.replace(/<[^>]*>/g, "")
  const author = post._embedded?.author?.[0]?.name || "Himachal News"
  const authorSlug = author ? author.toLowerCase().replace(/\s+/g, "-") : "himachal-news"
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const mainCategory = categories.length > 0 ? categories[0].name : "News"
  const keywords = categories.map((cat: any) => cat.name).join(", ")
  const wordCount = content.split(/\s+/).length

  // Calculate reading time
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Format dates in ISO format
  const datePublished = new Date(post.date).toISOString()
  const dateModified = post.modified ? new Date(post.modified).toISOString() : datePublished

  // Comprehensive structured data for SEO based on BBC/ABC News format
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    name: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: [featuredImage, ...images.slice(0, 10)],
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: author,
      url: `https://bolchaal.com/author/${authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Himachal News",
      logo: {
        "@type": "ImageObject",
        url: "https://bolchaal.com/logo.svg",
        width: 600,
        height: 60,
      },
    },
    articleBody: content.slice(0, 500) + "...",
    articleSection: mainCategory,
    keywords: keywords,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-content", ".article-headline"],
    },
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "WebSite",
      name: "Himachal News",
      url: "https://bolchaal.com",
    },
    about: categories.map((cat: any) => ({
      "@type": "Thing",
      name: cat.name,
    })),
    thumbnailUrl: featuredImage,
    inLanguage: "hi-IN",
    copyrightYear: new Date(post.date).getFullYear(),
    copyrightHolder: {
      "@type": "Organization",
      name: "Himachal News",
    },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />
  )
}
