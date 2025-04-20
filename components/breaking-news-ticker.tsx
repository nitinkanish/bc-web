import { getBreakingNews } from "@/lib/api"
import Link from "next/link"

export const revalidate = 300 // Revalidate every 5 minutes

export default async function BreakingNewsTicker() {
  const breakingNews = await getBreakingNews()

  if (!breakingNews || breakingNews.length === 0) {
    return null
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 font-bold mr-4 px-2 py-1 bg-white text-red-600 rounded pulse">
            Breaking News
          </div>
          <div className="overflow-hidden relative w-full">
            <div className="breaking-news-ticker whitespace-nowrap">
              {breakingNews.map((news) => (
                <Link key={news.id} href={`/news/${news.slug}`} className="inline-block mr-8 hover:underline">
                  <span dangerouslySetInnerHTML={{ __html: news.title.rendered }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
