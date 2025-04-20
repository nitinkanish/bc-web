import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

interface Event {
  name: string
  date: string
  location: string
  description: string
}

interface LocalEventsProps {
  districtName: string
  events: Event[]
}

export default function LocalEvents({ districtName, events }: LocalEventsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events in {districtName}</CardTitle>
        <CardDescription>Local festivals and celebrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium">{event.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1 mb-2">
                <span className="inline-flex items-center mr-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  {event.date}
                </span>
                <span className="inline-flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </span>
              </div>
              <p className="text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
