import { Suspense } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts } from "@/lib/api"
import SocialShare from "@/components/social-share"
import CommentsSection from "@/components/comments-section"
import NewsCard from "@/components/news-card"
import ReadingProgress from "@/components/reading-progress"
import ReadLaterButton from "@/components/read-later-button"
import TextToSpeech from "@/components/text-to-speech"
import ReadingTime from "@/components/reading-time"
import PrintButton from "@/components/print-button"

export const revalidate = 600 // Revalidate every 10 minutes

interface NewsPageProps {
  params: {
    slug: string
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

  const title = post.title.rendered
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160)
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""
  const author = post._embedded?.author?.[0]?.name || ""
  const publishedTime = post.date

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      authors: author ? [author] : undefined,
      images: featuredImage ? [{ url: featuredImage, width: 1200, height: 630, alt: title }] : undefined,
      locale: "en_US",
      siteName: "Himachal News",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage ? [featuredImage] : undefined,
      creator: "@himachalnews",
    },
    alternates: {
      canonical: `https://himachal-news.vercel.app/news/${params.slug}`,
    },
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, post.categories)

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=600&width=1200"
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || ""
  const author = post._embedded?.author?.[0]?.name || ""
  const formattedDate = post.date

  const articleUrl =
    typeof window !== "undefined" ? window.location.href : `https://himachal-news.vercel.app/news/${params.slug}`

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title.rendered,
    image: [featuredImage],
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: author,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Himachal News",
      logo: {
        "@type": "ImageObject",
        url: "https://himachal-news.vercel.app/logo.svg",
      },
    },
    description: post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="flex flex-wrap items-center text-muted-foreground mb-6 gap-3">
            <span>{formattedDate}</span>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>By {author}</span>
              </>
            )}
            <span className="mx-2">•</span>
            <ReadingTime content={post.content.rendered} />
            <div className="ml-auto flex items-center space-x-3 no-print">
              <ReadLaterButton post={post} />
              <TextToSpeech content={post.content.rendered} title={post.title.rendered} />
              <PrintButton />
            </div>
          </div>

          <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
            <Image src={featuredImage || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-16 order-2 md:order-1 no-print">
              <div className="md:sticky md:top-24">
                <SocialShare url={articleUrl} title={post.title.rendered} />
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2">
              <div className="news-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

              <div className="mt-8 pt-8 border-t no-print">
                <h2 className="text-2xl font-bold mb-6">Related News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <NewsCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>

              <Suspense fallback={<div className="h-[200px] animate-pulse bg-muted rounded-lg mt-8 no-print"></div>}>
                <div className="no-print">
                  <CommentsSection postId={post.id} />
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

