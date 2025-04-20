import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LatestNewsHero() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-12">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Himachal Pradesh landscape"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 px-6 py-12 md:py-20 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Today's Himachal News</h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
          Stay informed with the latest news, breaking stories, and important updates from across all districts of
          Himachal Pradesh.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="secondary" className="font-medium">
            <Link href="#latest-stories">
              Latest Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 font-medium">
            <Link href="#districts">Explore Districts</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-700/50 to-transparent"></div>
    </div>
  )
}
