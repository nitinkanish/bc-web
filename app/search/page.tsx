import { Suspense } from "react"
import { searchPosts } from "@/lib/api"
import NewsCard from "@/components/news-card"
import SearchBar from "@/components/search-bar"

export const revalidate = 0 // Don't cache search results

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: query ? `Search results for "${query}" on Himachal News` : "Search for news on Himachal News",
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  )
}

async function SearchPageContent({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const posts = query ? await searchPosts(query) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <div className="max-w-2xl mb-8">
        <SearchBar />
      </div>

      {query ? (
        <>
          <h2 className="text-xl font-medium mb-6">
            {posts.length > 0 ? `Search results for "${query}" (${posts.length})` : `No results found for "${query}"`}
          </h2>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Try different keywords or check your spelling.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term to find news articles.</p>
        </div>
      )}
    </div>
  )
}
