import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, Clock } from "lucide-react"

interface Attraction {
  name: string
  description: string
  image: string
  location: string
  type: string
  bestTimeToVisit: string
}

interface TouristAttractionsProps {
  districtName: string
  attractions: Attraction[]
}

export default function TouristAttractions({ districtName, attractions }: TouristAttractionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Tourist Attractions in {districtName}</CardTitle>
        <CardDescription>Must-visit places for travelers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {attractions.map((attraction, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0 last:pb-0">
              <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src={attraction.image || "/placeholder.svg?height=300&width=400"}
                  alt={attraction.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-lg font-medium">{attraction.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
                  <span className="inline-flex items-center mr-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    {attraction.location}
                  </span>
                  <span className="inline-flex items-center mr-3">
                    <Camera className="h-3 w-3 mr-1" />
                    {attraction.type}
                  </span>
                  <span className="inline-flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {attraction.bestTimeToVisit}
                  </span>
                </div>
                <p className="text-sm">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
