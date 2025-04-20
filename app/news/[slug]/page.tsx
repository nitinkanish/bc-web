import { notFound } from "next/navigation"
import { getPostBySlug, getRelatedPosts, getCategories, getTrendingPosts } from "@/lib/api"
import ReadingProgress from "@/components/reading-progress"

// Import schema components
import NewsArticleSchema from "@/components/schema/news-article-schema"
import BreadcrumbSchema from "@/components/schema/breadcrumb-schema"

// Import article components
import ArticleHeader from "@/components/article/article-header"
import ArticleMedia from "@/components/article/article-media"
import ArticleContent from "@/components/article/article-content"
import ArticleActions from "@/components/article/article-actions"
import RelatedArticles from "@/components/article/related-articles"
import NoticeBox from "@/components/article/notice-box"
import ArticleTags from "@/components/article/article-tags"
import ArticleShare from "@/components/article/article-share"
import ArticleTrending from "@/components/article/article-trending"
import ArticleAdvertise from "@/components/article/article-advertise"
import ArticleBreakingNews from "@/components/article/article-breaking-news"

export const revalidate = 600 // Revalidate every 10 minutes

interface NewsPageProps {
  params: {
    slug: string
  }
}

// Helper function to extract images from content
function extractImagesFromContent(content: string): string[] {
  const imgRegex = /<img[^>]+src="([^">]+)"/g
  const images: string[] = []
  let match

  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1] && !match[1].includes("data:image")) {
      images.push(match[1])
    }
  }

  return images
}

// Helper function to extract a quote from content
function extractQuote(content: string): string | null {
  const paragraphs = content.replace(/<[^>]*>/g, "").split(/\n+/)

  // Find a paragraph that's between 100-250 characters and ends with a period
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    if (trimmed.length > 100 && trimmed.length < 250 && trimmed.endsWith(".")) {
      return trimmed
    }
  }

  // If no suitable paragraph found, return the first paragraph that's at least 50 chars
  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim()
    if (trimmed.length > 50) {
      return trimmed
    }
  }

  return null
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

export default async function NewsPage({ params }: NewsPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related and trending posts
  const relatedPosts = await getRelatedPosts(post.id, post.categories, 15)

  // Add try/catch for trending posts and provide a fallback
  let trendingPosts = []
  try {
    trendingPosts = (await getTrendingPosts()) || []
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    // Use related posts as fallback if trending posts fail
    trendingPosts = relatedPosts?.slice(0, 4) || []
  }

  // Get categories for breadcrumbs
  const allCategories = await getCategories()

  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=600&width=1200"
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered.replace(/<[^>]*>/g, "")
  const author = post._embedded?.author?.[0]?.name || ""
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Extract categories
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const mainCategory = categories.length > 0 ? categories[0] : null

  const articleUrl = `https://bolchaal.in/news/${params.slug}`
  const postTitle = post.title.rendered.replace(/<[^>]*>/g, "")
  const postDescription = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160)

  // Extract images from content for schema
  const contentImages = extractImagesFromContent(post.content.rendered)

  // Extract a quote for the pull quote
  const pullQuote = extractQuote(post.content.rendered)

  // Prepare breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://bolchaal.in" },
    ...(mainCategory
      ? [{ name: mainCategory.name, url: `https://bolchaal.in/category/${mainCategory.slug}` }]
      : []),
    { name: postTitle, url: articleUrl },
  ]

  return (
    <>
      <ReadingProgress color="#2563EB" />

      {/* Schema markup */}
      <NewsArticleSchema post={post} url={articleUrl} featuredImage={featuredImage} images={contentImages} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <article className="bg-white dark:bg-gray-900" itemScope itemType="https://schema.org/NewsArticle">
        {/* Hidden metadata for search engines */}
        <meta itemProp="headline" content={postTitle} />
        <meta itemProp="description" content={postDescription} />
        <meta itemProp="image" content={featuredImage} />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="dateModified" content={post.modified || post.date} />
        <meta itemProp="author" content={author} />
        <meta itemProp="publisher" content="Bol chaal" />

        {/* Breaking news banner */}
        <ArticleBreakingNews posts={relatedPosts} />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article header */}
            <ArticleHeader
              post={post}
              categories={categories}
              mainCategory={mainCategory}
              formattedDate={formattedDate}
            />

            {/* Article actions */}
            <ArticleActions post={post} url={articleUrl} title={postTitle} description={postDescription} />

            {/* Featured Image */}
            <ArticleMedia src={featuredImage} alt={imageAlt} caption={imageAlt} />

            {/* Article content */}
            <ArticleContent content={post.content.rendered} pullQuote={pullQuote} />

            {/* Important notice box */}
            <NoticeBox
              title="महत्वपूर्ण सूचना"
              content="इस लेख में दी गई जानकारी सामान्य जानकारी के लिए है। कृपया किसी भी कार्रवाई से पहले विशेषज्ञ की सलाह लें।"
              translatedContent="The information provided in this article is for general information purposes only. Please consult with an expert before taking any action."
            />

            {/* Social Share */}
            <ArticleShare url={articleUrl} title={postTitle} description={postDescription} />

            {/* Tags */}
            <ArticleTags categories={categories} />

            {/* Trending section */}
            <ArticleTrending posts={trendingPosts} />

            {/* Advertise with us section */}
            <ArticleAdvertise />

            {/* Related News */}
            <RelatedArticles posts={relatedPosts} />
          </div>
        </div>
      </article>

      {/* Script for reading progress and favicon toggle */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
    document.addEventListener('DOMContentLoaded', function() {
      // Reading progress indicator
      const content = document.querySelector('.article-content');
      const indicator = document.querySelector('.reading-progress-indicator');
      
      if (content && indicator) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const contentHeight = content.offsetHeight;
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const percentage = Math.min(100, Math.max(0, (scrollPosition / (contentHeight - viewportHeight)) * 100));
            indicator.style.height = percentage + '%';
          });
        }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
        
        observer.observe(content);
        
        window.addEventListener('scroll', function() {
          const contentHeight = content.offsetHeight;
          const scrollPosition = window.scrollY;
          const viewportHeight = window.innerHeight;
          const percentage = Math.min(100, Math.max(0, (scrollPosition / (contentHeight - viewportHeight)) * 100));
          indicator.style.height = percentage + '%';
        });
      }

      // Text-to-speech favicon toggle
      const ttsButton = document.querySelector('[data-tts-button]');
      const favicon = document.querySelector('link[rel="icon"]');
      
      if (ttsButton && favicon) {
        ttsButton.addEventListener('click', function() {
          this.classList.toggle('tts-active');
          
          if (this.classList.contains('tts-active')) {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("width", "32");
            svg.setAttribute("height", "32");
            
            const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path1.setAttribute("d", "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z");
            path1.setAttribute("fill", "#2563EB");
            path1.setAttribute("stroke", "#2563EB");
            path1.setAttribute("stroke-width", "2");
            
            const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path2.setAttribute("d", "M19 10v2a7 7 0 0 1-14 0v-2");
            path2.setAttribute("stroke", "#2563EB");
            path2.setAttribute("stroke-width", "2");
            
            const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line1.setAttribute("x1", "12");
            line1.setAttribute("y1", "19");
            line1.setAttribute("x2", "12");
            line1.setAttribute("y2", "23");
            line1.setAttribute("stroke", "#2563EB");
            line1.setAttribute("stroke-width", "2");
            
            const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("x1", "8");
            line2.setAttribute("y1", "23");
            line2.setAttribute("x2", "16");
            line2.setAttribute("y2", "23");
            line2.setAttribute("stroke", "#2563EB");
            line2.setAttribute("stroke-width", "2");
            
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "opacity");
            animate.setAttribute("values", "1;0.6;1");
            animate.setAttribute("dur", "1s");
            animate.setAttribute("repeatCount", "indefinite");
            
            path1.appendChild(animate);
            svg.appendChild(path1);
            svg.appendChild(path2);
            svg.appendChild(line1);
            svg.appendChild(line2);
            
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], {type: "image/svg+xml"});
            const svgUrl = URL.createObjectURL(svgBlob);
            
            favicon.href = svgUrl;
          } else {
            favicon.href = "/mic-favicon.svg";
          }
        });
      }
    });
  `,
        }}
      />
    </>
  )
}
