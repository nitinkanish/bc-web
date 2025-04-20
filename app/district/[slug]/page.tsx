import { notFound } from "next/navigation"
import { getPostsByDistrict } from "@/lib/api"
import NewsCard from "@/components/news-card"
import DistrictInformation from "@/components/district-info"
import DistrictWeather from "@/components/district-weather"
import { DISTRICTS_DATA } from "@/lib/district-data"
import DistrictStructuredData from "@/components/district-structured-data"
import { generateDistrictMetadata } from "@/components/seo/district-seo"
import type { Metadata } from "next"

export const revalidate = 600 // Revalidate every 10 minutes

interface DistrictPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: DistrictPageProps): Promise<Metadata> {
  return generateDistrictMetadata(params.slug)
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const districtData = DISTRICTS_DATA[params.slug as keyof typeof DISTRICTS_DATA]

  if (!districtData) {
    notFound()
  }

  const posts = await getPostsByDistrict(districtData.name)
  const districtUrl = `https://himachal-news.vercel.app/district/${params.slug}`

  return (
    <div className="container mx-auto px-4 py-8">
      <DistrictStructuredData district={districtData} url={districtUrl} />
      <h1 className="text-3xl font-bold mb-4">{districtData.name}</h1>
      <p className="text-muted-foreground mb-8">{districtData.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DistrictInformation district={districtData} />
        </div>

        <div>
          <DistrictWeather districtSlug={params.slug} districtName={districtData.name} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Latest News from {districtData.name}</h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news articles found for this district.</p>
          </div>
        )}
      </div>
    </div>
  )
}
