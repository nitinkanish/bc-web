import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts } from "@/lib/api"
import NewsPageClient from "./NewsPageClient"

export const revalidate = 600 // Revalidate every 10 minutes

interface NewsPageProps {
  params: {
    slug: string
  }
  searchParams: {
    amp?: string
  }
}

export async function generateMetadata({ params }: NewsPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  const title = post.title.rendered.replace(/<[^>]*>/g, "")
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160)
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""
  const author = post._embedded?.author?.[0]?.name || ""
  const publishedTime = post.date
  const modifiedTime = post.modified || post.date

  // Extract categories for keywords
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const keywords = categories.map((cat: any) => cat.name).join(", ")

  return {
    title,
    description,
    keywords: keywords.split(", "),
    authors: [{ name: author }],
    publisher: "Bol chaal",
    icons: {
      icon: "/mic-favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section: categories.length > 0 ? categories[0].name : "News",
      tags: categories.map((cat: any) => cat.name),
      images: featuredImage ? [{ url: featuredImage, width: 1200, height: 630, alt: title }] : undefined,
      locale: "en_US",
      siteName: "Bol chaal",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage ? [featuredImage] : undefined,
      creator: "@himachalnews",
    },
    alternates: {
      canonical: `https://bolchaal.in/news/${params.slug}`,
    },
  }
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Check if AMP mode is requested
  const isAmp = searchParams.amp === "1"

  // Get related posts (limit for AMP performance)
  const relatedPosts = await getRelatedPosts(post.id, post.categories, isAmp ? 6 : 15)

  return <NewsPageClient post={post} relatedPosts={relatedPosts} isAmp={isAmp} slug={params.slug} />
}
