"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import { getCategories, getPostsByCategory } from "@/lib/api"
import NewsCard from "@/components/news-card"
import { useEffect, useState } from "react"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export const revalidate = 600 // Revalidate every 10 minutes

export default function CategoryPageClient({ params, searchParams }: CategoryPageProps) {
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(Number(searchParams.page) || 1)
  const [hasMorePages, setHasMorePages] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true)
      const categories = await getCategories()
      const foundCategory = categories.find((cat: any) => cat.slug === params.slug)

      if (!foundCategory) {
        notFound()
        return
      }

      setCategory(foundCategory)

      const postsPerPage = 12

      const fetchedPosts = await getPostsByCategory(foundCategory.id, {
        per_page: postsPerPage,
        page: currentPage,
      })

      setPosts(fetchedPosts)

      // WordPress API doesn't return total pages in a reliable way,
      // so we'll check if we have a full page of results to determine if there might be more
      setHasMorePages(fetchedPosts.length === postsPerPage)
      setLoading(false)
    }

    fetchCategoryAndPosts()
  }, [params.slug, searchParams.page, currentPage])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>

      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-12">
            <Link
              href={`/category/${params.slug}?page=${currentPage - 1}`}
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
              }`}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : undefined}
              onClick={(e) => {
                if (currentPage === 1) e.preventDefault()
                else setCurrentPage(currentPage - 1)
              }}
            >
              Previous
            </Link>

            <span className="text-muted-foreground">Page {currentPage}</span>

            <Link
              href={`/category/${params.slug}?page=${currentPage + 1}`}
              className={`px-4 py-2 border rounded-md ${
                !hasMorePages ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
              }`}
              aria-disabled={!hasMorePages}
              tabIndex={!hasMorePages ? -1 : undefined}
              onClick={(e) => {
                if (!hasMorePages) e.preventDefault()
                else setCurrentPage(currentPage + 1)
              }}
            >
              Next
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found in this category.</p>
        </div>
      )}
    </div>
  )
}

