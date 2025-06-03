"use client"

import Head from "next/head"
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
import ArticleTags from "@/components/article/article-tags"
import ArticleShare from "@/components/article/article-share"
import ArticleTrending from "@/components/article/article-trending"
import ArticleAdvertise from "@/components/article/article-advertise"
import ArticleBreakingNews from "@/components/article/article-breaking-news"
import AmpAnalytics from "@/components/amp/amp-analytics"

interface NewsPageClientProps {
  post: any
  relatedPosts: any[]
  isAmp: boolean
  slug: string
}

// Helper function to extract images from content
function extractImagesFromContent(content: string): string[] {
  if (!content) return []

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
  if (!content) return null

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

// Helper function to convert content for AMP
function convertContentForAmp(content: string): string {
  if (!content) return ""

  // Replace img tags with amp-img
  let ampContent = content.replace(
    /<img([^>]*?)src="([^"]*?)"([^>]*?)>/gi,
    '<amp-img$1src="$2"$3 layout="responsive" width="800" height="600"></amp-img>',
  )

  // Remove any script tags
  ampContent = ampContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // Remove any style attributes that might conflict with AMP
  ampContent = ampContent.replace(/style="[^"]*"/gi, "")

  return ampContent
}

export default function NewsPageClient({ post, relatedPosts, isAmp, slug }: NewsPageClientProps) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.svg?height=600&width=1200"
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered.replace(/<[^>]*>/g, "")
  const author = post._embedded?.author?.[0]?.name || "Arvind Mourya"
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Extract categories
  const categories = post._embedded?.["wp:term"]?.[0] || []
  const mainCategory = categories.length > 0 ? categories[0] : null

  const articleUrl = `https://bolchaal.in/news/${slug}`
  const ampUrl = `${articleUrl}?amp=1`
  const postTitle = post.title.rendered.replace(/<[^>]*>/g, "")
  const postDescription = post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 160)

  // Extract images from content for schema - with proper error handling
  const contentImages = extractImagesFromContent(post.content?.rendered || "")

  // Extract a quote for the pull quote
  const pullQuote = extractQuote(post.content?.rendered || "")

  // Convert content for AMP if needed
  const processedContent = isAmp ? convertContentForAmp(post.content?.rendered || "") : post.content?.rendered || ""

  // Prepare breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://bolchaal.in" },
    ...(mainCategory ? [{ name: mainCategory.name, url: `https://bolchaal.in/category/${mainCategory.slug}` }] : []),
    { name: postTitle, url: articleUrl },
  ]

  // AMP-specific structured data
  const ampStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: postTitle,
    image: [featuredImage, ...contentImages.slice(0, 3)],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.modified || post.date).toISOString(),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Bol chaal",
      logo: {
        "@type": "ImageObject",
        url: "https://bolchaal.in/logo.svg",
        width: 600,
        height: 60,
      },
    },
    description: postDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  }

  if (isAmp) {
    return (
      <>
        <Head>
          {/* Canonical and AMP links */}
          <link rel="canonical" href={articleUrl} />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

          {/* AMP boilerplate */}
          <style amp-boilerplate="">{`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}</style>
          <noscript>
            <style amp-boilerplate="">{`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}</style>
          </noscript>

          {/* Enhanced AMP Custom CSS */}
          <style amp-custom="">{`
/* Base Styles */
.amp-article-container { 
  max-width: 800px; 
  margin: 0 auto; 
  padding: 20px; 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
  background: #ffffff;
  line-height: 1.6;
  color: #2d3748;
}

/* Article Header */
.amp-article-header { 
  margin-bottom: 30px; 
  text-align: center;
}

.amp-article-title { 
  font-size: 2.2rem; 
  font-weight: 700; 
  line-height: 1.2; 
  margin-bottom: 15px; 
  color: #1a202c; 
  text-align: left;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.amp-article-meta { 
  color: #718096; 
  font-size: 0.9rem; 
  margin-bottom: 20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.amp-author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  padding: 12px 16px;
  border-radius: 25px;
  margin: 20px 0;
  border: 1px solid #e2e8f0;
}

/* Content Typography */
.amp-article-content { 
  line-height: 1.8; 
  color: #2d3748; 
  font-size: 1.1rem;
}

/* Paragraphs */
.amp-article-content p { 
  margin-bottom: 24px; 
  text-align: justify;
  text-indent: 0;
}

.amp-article-content p:first-of-type {
  font-size: 1.2rem;
  font-weight: 500;
  color: #1a202c;
  position: relative;
}

.amp-article-content p:first-of-type::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 3rem;
  padding-right: 8px;
  margin-top: 4px;
  font-weight: bold;
  color: #3182ce;
  font-family: Georgia, serif;
}

/* Headings */
.amp-article-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 40px 0 20px 0;
  color: #1a202c;
  border-left: 6px solid #3182ce;
  padding-left: 20px;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  padding: 15px 20px;
  border-radius: 8px;
  position: relative;
}

.amp-article-content h2 {
  font-size: 2rem;
  font-weight: 600;
  margin: 35px 0 20px 0;
  color: #1a202c;
  border-left: 5px solid #3182ce;
  padding-left: 15px;
  background: linear-gradient(135deg, #ebf8ff, #bee3f8);
  padding: 12px 15px;
  border-radius: 6px;
  position: relative;
}

.amp-article-content h2::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 15px;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3182ce, #2c5aa0);
  border-radius: 2px;
}

.amp-article-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 30px 0 15px 0;
  color: #2d3748;
  border-left: 4px solid #4299e1;
  padding-left: 12px;
  position: relative;
}

.amp-article-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 25px 0 12px 0;
  color: #2d3748;
  border-left: 3px solid #63b3ed;
  padding-left: 10px;
}

.amp-article-content h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 20px 0 10px 0;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.amp-article-content h6 {
  font-size: 1rem;
  font-weight: 600;
  margin: 15px 0 8px 0;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Links */
.amp-article-content a {
  color: #3182ce;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.amp-article-content a:hover {
  color: #2c5aa0;
  background: linear-gradient(135deg, #ebf8ff, #bee3f8);
  padding: 2px 4px;
  border-radius: 4px;
  border-bottom: 2px solid #3182ce;
}

.amp-article-content a::before {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: linear-gradient(90deg, #3182ce, #2c5aa0);
  transition: width 0.3s ease;
}

.amp-article-content a:hover::before {
  width: 100%;
}

/* Lists */
.amp-article-content ul {
  margin: 20px 0;
  padding-left: 0;
  list-style: none;
}

.amp-article-content ul li {
  margin-bottom: 12px;
  padding-left: 25px;
  position: relative;
}

.amp-article-content ul li::before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #3182ce;
  font-weight: bold;
  font-size: 0.8rem;
}

.amp-article-content ol {
  margin: 20px 0;
  padding-left: 0;
  list-style: none;
  counter-reset: list-counter;
}

.amp-article-content ol li {
  margin-bottom: 12px;
  padding-left: 35px;
  position: relative;
  counter-increment: list-counter;
}

.amp-article-content ol li::before {
  content: counter(list-counter);
  position: absolute;
  left: 0;
  top: 0;
  background: linear-gradient(135deg, #3182ce, #2c5aa0);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

/* Blockquotes */
.amp-article-content blockquote {
  margin: 30px 0;
  padding: 20px 25px;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  border-left: 5px solid #3182ce;
  border-radius: 8px;
  font-style: italic;
  font-size: 1.1rem;
  color: #4a5568;
  position: relative;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.amp-article-content blockquote::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 15px;
  font-size: 4rem;
  color: #3182ce;
  font-family: Georgia, serif;
  line-height: 1;
}

.amp-article-content blockquote p {
  margin: 0;
  text-indent: 20px;
}

/* Code */
.amp-article-content code {
  background: #f7fafc;
  color: #e53e3e;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  border: 1px solid #e2e8f0;
}

.amp-article-content pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 25px 0;
  border: 1px solid #4a5568;
}

.amp-article-content pre code {
  background: none;
  color: inherit;
  padding: 0;
  border: none;
  font-size: 0.9rem;
}

/* Tables */
.amp-article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.amp-article-content th {
  background: linear-gradient(135deg, #3182ce, #2c5aa0);
  color: white;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
}

.amp-article-content td {
  padding: 12px 15px;
  border-bottom: 1px solid #e2e8f0;
}

.amp-article-content tr:hover {
  background: #f7fafc;
}

/* Images */
.amp-featured-image { 
  margin: 25px 0; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  position: relative;
}

.amp-featured-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(49,130,206,0.1), rgba(44,90,160,0.1));
  z-index: 1;
  pointer-events: none;
}

.amp-featured-image amp-img {
  border-radius: 12px;
}

.amp-image-caption {
  text-align: center;
  font-size: 0.9rem;
  color: #718096;
  margin-top: 12px;
  font-style: italic;
  padding: 8px 16px;
  background: #f7fafc;
  border-radius: 6px;
  border-left: 3px solid #3182ce;
}

.amp-article-content amp-img {
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Social Share */
.amp-social-share { 
  display: flex; 
  gap: 12px; 
  margin: 35px 0; 
  justify-content: center;
  padding: 25px;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  border-radius: 15px;
  border: 1px solid #e2e8f0;
}

.amp-social-share amp-social-share {
  border-radius: 50%;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.amp-social-share amp-social-share:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Related Posts */
.amp-related-posts { 
  margin-top: 50px; 
  padding-top: 35px; 
  border-top: 3px solid #e2e8f0; 
  position: relative;
}

.amp-related-posts::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #3182ce, #2c5aa0);
}

.amp-related-title { 
  font-size: 1.8rem; 
  font-weight: 700; 
  margin-bottom: 25px; 
  color: #1a202c;
  text-align: center;
  position: relative;
}

.amp-related-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3182ce, #2c5aa0);
  border-radius: 2px;
}

.amp-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.amp-related-item { 
  background: #ffffff;
  border: 1px solid #e2e8f0; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.amp-related-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border-color: #3182ce;
}

.amp-related-image {
  width: 100%;
  height: 160px;
  position: relative;
  overflow: hidden;
}

.amp-related-content {
  padding: 18px;
}

.amp-related-item h3 { 
  font-size: 1rem; 
  margin: 0 0 10px 0; 
  line-height: 1.4;
  border: none;
  padding: 0;
  font-weight: 600;
}

.amp-related-item a { 
  text-decoration: none; 
  color: #2d3748;
  font-weight: 600;
  transition: color 0.3s ease;
}

.amp-related-item a:hover { 
  color: #3182ce;
}

.amp-related-excerpt {
  font-size: 0.85rem;
  color: #718096;
  line-height: 1.5;
  margin-bottom: 10px;
}

.amp-related-date {
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 500;
}

/* Category Badge */
.amp-category-badge { 
  display: inline-block; 
  background: linear-gradient(135deg, #3182ce, #2c5aa0);
  color: white; 
  padding: 8px 18px; 
  border-radius: 25px; 
  font-size: 0.8rem; 
  margin-bottom: 20px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(49,130,206,0.3);
}

/* Dividers */
.amp-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 35px 0;
  position: relative;
}

.amp-divider::before {
  content: '◆';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: #3182ce;
  padding: 0 10px;
  font-size: 0.8rem;
}

/* Reading Time */
.amp-reading-time {
  background: linear-gradient(135deg, #edf2f7, #e2e8f0);
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #cbd5e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .amp-article-container { 
    padding: 15px; 
  }
  
  .amp-article-title { 
    font-size: 1.6rem; 
  }
  
  .amp-article-meta {
    flex-direction: column;
    gap: 4px;
  }
  
  .amp-social-share {
    gap: 8px;
    padding: 15px;
  }
  
  .amp-related-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .amp-related-title {
    font-size: 1.5rem;
  }
  
  .amp-article-content h1 {
    font-size: 1.8rem;
  }
  
  .amp-article-content h2 {
    font-size: 1.5rem;
  }
  
  .amp-article-content h3 {
    font-size: 1.3rem;
  }
  
  .amp-article-content p:first-of-type::first-letter {
    font-size: 3rem;
    line-height: 2.5rem;
  }
}

@media (max-width: 480px) {
  .amp-article-title {
    font-size: 1.4rem;
  }
  
  .amp-article-content {
    font-size: 1rem;
  }
  
  .amp-article-content h1 {
    font-size: 1.5rem;
  }
  
  .amp-article-content h2 {
    font-size: 1.3rem;
  }
  
  .amp-article-content h3 {
    font-size: 1.1rem;
  }
}
          `}</style>

          {/* Required AMP scripts */}
          <script async src="https://cdn.ampproject.org/v0.js"></script>
          <script
            async
            custom-element="amp-social-share"
            src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
          ></script>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          ></script>

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(ampStructuredData),
            }}
          />
        </Head>

        {/* AMP Analytics */}
        <AmpAnalytics />

        <article className="amp-article-container" itemScope itemType="https://schema.org/NewsArticle">
          {/* Hidden metadata for search engines */}
          <meta itemProp="headline" content={postTitle} />
          <meta itemProp="description" content={postDescription} />
          <meta itemProp="image" content={featuredImage} />
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="dateModified" content={post.modified || post.date} />
          <meta itemProp="author" content={author} />
          <meta itemProp="publisher" content="Bol chaal" />

          {/* Article header */}
          <header className="amp-article-header">
            {mainCategory && <span className="amp-category-badge">{mainCategory.name}</span>}

            <h1 className="amp-article-title" itemProp="headline">
              {postTitle}
            </h1>

            <div className="amp-author-info">
              <span>
                By <strong>{author}</strong>
              </span>
              <span>•</span>
              <span className="amp-reading-time">5 min read</span>
            </div>

            <div className="amp-article-meta">
              <time dateTime={post.date} itemProp="datePublished">
                📅 {formattedDate}
              </time>
              {post.modified && post.modified !== post.date && (
                <>
                  <span>•</span>
                  <span>
                    🔄 Updated:{" "}
                    {new Date(post.modified).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <div className="amp-featured-image">
            <amp-img src={featuredImage} alt={imageAlt} width="800" height="500" layout="responsive" />
            <div className="amp-image-caption">{imageAlt}</div>
          </div>

          <div className="amp-divider"></div>

          {/* Social Share */}
          <div className="amp-social-share">
            <amp-social-share
              type="facebook"
              width="44"
              height="44"
              data-param-url={articleUrl}
              data-param-quote={postTitle}
            />
            <amp-social-share
              type="twitter"
              width="44"
              height="44"
              data-param-url={articleUrl}
              data-param-text={postTitle}
            />
            <amp-social-share
              type="whatsapp"
              width="44"
              height="44"
              data-param-url={articleUrl}
              data-param-text={postTitle}
            />
            <amp-social-share
              type="linkedin"
              width="44"
              height="44"
              data-param-url={articleUrl}
              data-param-title={postTitle}
              data-param-description={postDescription}
            />
          </div>

          {/* Article content */}
          <div
            className="amp-article-content"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          <div className="amp-divider"></div>

          {/* Related Articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="amp-related-posts">
              <h2 className="amp-related-title">संबंधित खबरें</h2>
              <div className="amp-related-grid">
                {relatedPosts.slice(0, 6).map((relatedPost: any) => (
                  <article key={relatedPost.id} className="amp-related-item">
                    {relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <div className="amp-related-image">
                        <amp-img
                          src={relatedPost._embedded["wp:featuredmedia"][0].source_url}
                          alt={relatedPost.title.rendered.replace(/<[^>]*>/g, "")}
                          width="300"
                          height="160"
                          layout="responsive"
                        />
                      </div>
                    )}
                    <div className="amp-related-content">
                      <h3>
                        <a href={`/news/${relatedPost.slug}?amp=1`}>
                          {relatedPost.title.rendered.replace(/<[^>]*>/g, "")}
                        </a>
                      </h3>
                      <p className="amp-related-excerpt">
                        {relatedPost.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 100)}...
                      </p>
                      <div className="amp-related-date">
                        {new Date(relatedPost.date).toLocaleDateString("hi-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </>
    )
  }

  // Standard (non-AMP) version
  return (
    <>
      <Head>
        <link rel="canonical" href={articleUrl} />
        <link rel="amphtml" href={ampUrl} />
      </Head>

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

            {/* Social Share */}
            <ArticleShare url={articleUrl} title={postTitle} description={postDescription} />

            {/* Tags */}
            <ArticleTags categories={categories} />

            {/* Trending section */}
            <ArticleTrending posts={relatedPosts} />

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
            line1.setAttribute("y1", "23");
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
