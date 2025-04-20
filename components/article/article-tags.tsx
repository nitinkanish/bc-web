import Link from "next/link"
import { Tag } from "lucide-react"

interface ArticleTagsProps {
  categories: any[]
}

export default function ArticleTags({ categories }: ArticleTagsProps) {
  if (!categories || categories.length === 0) return null

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-gray-200 dark:border-gray-800 pt-6">
      <Tag className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
