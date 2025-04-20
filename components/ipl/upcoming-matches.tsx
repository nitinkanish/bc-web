import Image from "next/image"
import { format, parseISO } from "date-fns"
import { getUpcomingIPLMatches } from "@/lib/cricket-api"

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

// Team shortname mapping
const TEAM_SHORTNAMES: Record<string, string> = {
  "Chennai Super Kings": "CSK",
  "Mumbai Indians": "MI",
  "Royal Challengers Bangalore": "RCB",
  "Kolkata Knight Riders": "KKR",
  "Delhi Capitals": "DC",
  "Rajasthan Royals": "RR",
  "Punjab Kings": "PBKS",
  "Sunrisers Hyderabad": "SRH",
  "Gujarat Titans": "GT",
  "Lucknow Super Giants": "LSG",
}

export default async function UpcomingMatches() {
  const matches = await getUpcomingIPLMatches(3)

  if (matches.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center">
        <p className="text-gray-600 dark:text-gray-300">No upcoming matches found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              {match.teams.map((team) => (
                <div key={team} className="flex flex-col items-center">
                  <div className="relative h-10 w-10">
                    <Image
                      src={TEAM_LOGOS[team] || `/placeholder.svg?height=40&width=40`}
                      alt={team}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium mt-1">{TEAM_SHORTNAMES[team] || team}</span>
                </div>
              ))}

              <div className="text-lg font-bold">VS</div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p className="font-medium">{format(parseISO(match.dateTimeGMT), "dd MMM yyyy, h:mm a")}</p>
              <p className="mt-1">{match.venue}</p>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-2 text-center text-xs">
            <p>{match.name.split(",")[1]?.trim() || match.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
