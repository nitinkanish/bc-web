import Link from "next/link"
import Image from "next/image"
import type { DistrictInfo } from "@/lib/district-data"
import { MapPin } from "lucide-react"

interface DistrictsDirectoryProps {
  districts: DistrictInfo[]
}

export default function DistrictsDirectory({ districts }: DistrictsDirectoryProps) {
  return (
    <div id="districts" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {districts.map((district) => (
        <Link
          key={district.slug}
          href={`/district/${district.slug}`}
          className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
        >
          <div className="relative h-32 overflow-hidden">
            <Image
              src={district.image || "/placeholder.svg?height=200&width=300"}
              alt={district.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <h3 className="font-medium">{district.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
