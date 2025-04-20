import { getRecentIPLMatches } from "@/lib/cricket-api"
import Image from "next/image"

// Team logo mapping
const TEAM_LOGOS: Record<string, string> = {
  "Chennai Super Kings": "https://g.cricapi.com/iapi/135-637852956181378533.png?w=48",
  "Mumbai Indians": "https://g.cricapi.com/iapi/167-637877432060440029.webp?w=48",
  "Royal Challengers Bangalore": "https://g.cricapi.com/iapi/212-637877432060440029.webp?w=48",
  "Kolkata Knight Riders": "https://g.cricapi.com/iapi/163-637852956181378533.webp?w=48",
  "Delhi Capitals": "https://g.cricapi.com/iapi/148-637874596301457910.png?w=48",
  "Rajasthan Royals": "https://g.cricapi.com/iapi/175-637852956181378533.webp?w=48",
  "Punjab Kings": "https://g.cricapi.com/iapi/178-637852956181378533.webp?w=48",
  "Sunrisers Hyderabad": "https://g.cricapi.com/iapi/255-637877432060440029.webp?w=48",
  "Gujarat Titans": "https://g.cricapi.com/iapi/1488-637877432060440029.webp?w=48",
  "Lucknow Super Giants": "https://g.cricapi.com/iapi/1489-637877432060440029.webp?w=48",
}

export default async function TopMatches() {
  const matches = await getRecentIPLMatches(3)

  if (matches.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
        <p className="text-gray-600 dark:text-gray-300">No recent matches found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h3 className="font-bold">Recent Results</h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {matches.map((match) => (
          <div key={match.id} className="p-3">
            <div className="flex justify-between items-center mb-2">
              {match.teams.map((team) => (
                <div key={team} className="flex items-center">
                  <div className="relative h-8 w-8 mr-2">
                    <Image
                      src={TEAM_LOGOS[team] || `/placeholder.svg?height=32&width=32`}
                      alt={team}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium">{team.split(" ").pop()}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-green-600 dark:text-green-400 font-medium">{match.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
