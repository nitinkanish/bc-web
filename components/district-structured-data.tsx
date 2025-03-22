import type { DistrictInfo } from "@/lib/district-data"

interface DistrictStructuredDataProps {
  district: DistrictInfo
  url: string
}

export default function DistrictStructuredData({ district, url }: DistrictStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: district.name,
    description: district.description,
    url: url,
    geo: {
      "@type": "GeoCoordinates",
      elevation: district.geography.elevation,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Himachal Pradesh",
      containedInPlace: {
        "@type": "Country",
        name: "India",
      },
    },
    touristAttraction: district.tourism.attractions.map((attraction) => ({
      "@type": "TouristAttraction",
      name: attraction.name,
      description: attraction.description,
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

