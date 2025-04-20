import Image from "next/image"

export default function IPLHero() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>

      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">IPL 2025</h1>
          <p className="text-lg mb-6">
            Follow the latest updates, scores, and news from the Indian Premier League 2025. Get comprehensive coverage
            of all matches, team standings, and player statistics.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">March 22 - May 24, 2025</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">10 Teams</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">74 Matches</div>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
          <div className="relative h-40 w-40 md:h-48 md:w-48">
            <Image
              src="/placeholder.svg?height=192&width=192"
              alt="IPL 2025 Trophy"
              width={192}
              height={192}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  )
}
