import Link from "next/link"
import { Calendar, Clock, User, Eye, ChevronRight } from "lucide-react"
import type { Post } from "@/lib/api"
import ReadingTime from "@/components/reading-time"

interface ArticleHeaderProps {
  post: Post
  categories: any[]
  mainCategory: any
  formattedDate: string
  readCount?: number
}

export default function ArticleHeader({
  post,
  categories,
  mainCategory,
  formattedDate,
  readCount = 0,
}: ArticleHeaderProps) {
  const postTitle = post.title.rendered.replace(/<[^>]*>/g, "")
  const author = post._embedded?.author?.[0]?.name || ""

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <ol className="flex flex-wrap items-center">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600">
              होम
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
          </li>
          {mainCategory && (
            <li className="flex items-center">
              <Link href={`/category/${mainCategory.slug}`} className="hover:text-blue-600">
                {mainCategory.name}
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
            </li>
          )}
          <li className="text-foreground font-medium truncate">
            <span>{postTitle}</span>
          </li>
        </ol>
      </nav>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight text-gray-900 dark:text-white article-headline"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      {/* Meta information */}
      <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-6 gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
          <time dateTime={post.date} itemProp="datePublished">
            {formattedDate}
          </time>
        </div>
        {author && (
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
            <span itemProp="author" itemScope itemType="https://schema.org/Person">
              <span itemProp="name">{author}</span> द्वारा
            </span>
          </div>
        )}
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
          <ReadingTime content={post.content.rendered} />
        </div>
        <div className="flex items-center ml-auto">
          <Eye className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
          <span>{readCount > 0 ? readCount : Math.floor(Math.random() * 1000) + 500} पाठक</span>
        </div>
      </div>
    </div>
  )
}
