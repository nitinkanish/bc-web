import { DISTRICTS_DATA } from "@/lib/district-data"
import type { Metadata } from "next"

export function generateDistrictMetadata(slug: string): Metadata {
  const district = DISTRICTS_DATA[slug as keyof typeof DISTRICTS_DATA]

  if (!district) {
    return {
      title: "District Not Found",
      description: "The requested district could not be found.",
    }
  }

  // Create a rich description with key information
  const description = `Explore ${district.name}, Himachal Pradesh - ${district.description} Elevation: ${district.geography.elevation}. Population: ${district.demographics.population}. Best time to visit: ${district.climate.bestTimeToVisit}. Find tourist attractions, weather, transportation, and local information.`

  return {
    title: `${district.name} - Complete Travel Guide | Himachal Pradesh Tourism`,
    description: description,
    keywords: [
      district.name,
      "Himachal Pradesh",
      "Tourism",
      "Travel Guide",
      ...district.tourism.attractions.map((a) => a.name),
      ...district.economy.specialties,
      ...district.tourism.festivals,
    ],
    openGraph: {
      title: `${district.name} - Complete Travel Guide | Himachal Pradesh Tourism`,
      description: description,
      images: [{ url: district.image, width: 1200, height: 630, alt: district.name }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${district.name} - Complete Travel Guide | Himachal Pradesh Tourism`,
      description: description,
      images: [district.image],
    },
    alternates: {
      canonical: `https://himachal-news.vercel.app/district/${slug}`,
    },
  }
}

