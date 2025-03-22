import Link from "next/link"
import Image from "next/image"
import { DISTRICTS_DATA } from "@/lib/district-data"
import { MapPin, Users, Thermometer } from "lucide-react"

export const metadata = {
  title: "Districts of Himachal Pradesh",
  description: "Browse news and information by districts of Himachal Pradesh",
}

export default function DistrictsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Districts of Himachal Pradesh</h1>
      <p className="text-muted-foreground mb-8">
        Himachal Pradesh is divided into 12 districts, each with its unique geography, culture, and attractions. Click
        on a district to explore detailed information and latest news.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.values(DISTRICTS_DATA).map((district) => (
          <Link
            key={district.slug}
            href={`/district/${district.slug}`}
            className="group block overflow-hidden rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={district.image || "/placeholder.svg"}
                alt={district.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg group-hover:text-primary">{district.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{district.description}</p>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{district.geography.elevation}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{district.demographics.population}</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span>{district.climate.summer.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

