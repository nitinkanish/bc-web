import type { Post } from "@/lib/api"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LatestNewsListProps {
  posts: Post[]
  currentPage: number
}

export default function LatestNewsList({ posts, currentPage }: LatestNewsListProps) {
  // Assuming we know the total number of pages or have a way to determine if there's a next page
  const hasNextPage = posts.length > 0 // This is a simplification; ideally, you'd check against total count
  const hasPrevPage = currentPage > 1

  return (
    <div id="latest-stories">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No news articles found</h3>
          <p className="text-muted-foreground">Please check back later for the latest updates.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} variant="default" />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {hasPrevPage && (
              <Button asChild variant="outline">
                <Link href={`/latest-news?page=${currentPage - 1}`}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Link>
              </Button>
            )}

            <span className="px-4 py-2 text-sm font-medium">Page {currentPage}</span>

            {hasNextPage && (
              <Button asChild variant="outline">
                <Link href={`/latest-news?page=${currentPage + 1}`}>
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
