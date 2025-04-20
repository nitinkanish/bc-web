import { Clock } from "lucide-react"

interface ReadingTimeProps {
  content: string
}

export default function ReadingTime({ content }: ReadingTimeProps) {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Clock className="h-4 w-4 mr-1" />
      <span>5 min read</span>
    </div>
  )
}
