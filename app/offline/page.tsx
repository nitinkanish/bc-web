import Link from "next/link"
import { WifiOff } from "lucide-react"

export const metadata = {
  title: "You're Offline | Himachal News",
  description: "You are currently offline. Please check your internet connection.",
}

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <WifiOff className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-4">You're Offline</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        It looks like you're currently offline. Please check your internet connection and try again.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Try Again
      </Link>
    </div>
  )
}
