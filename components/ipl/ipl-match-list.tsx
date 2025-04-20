import { getIPLSeriesInfo, type MatchInfo } from "@/lib/cricket-api"
import { format, parseISO } from "date-fns"

export default async function IPLMatchList() {
  const seriesInfo = await getIPLSeriesInfo()
  const matches = seriesInfo.matchList || []

  // Group matches by month for better organization
  const matchesByMonth: Record<string, MatchInfo[]> = {}

  matches.forEach((match) => {
    try {
      const date = parseISO(match.dateTimeGMT)
      const monthYear = format(date, "MMMM yyyy")

      if (!matchesByMonth[monthYear]) {
        matchesByMonth[monthYear] = []
      }

      matchesByMonth[monthYear].push(match)
    } catch (error) {
      console.error(`Error parsing date for match: ${match.id}`, error)
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-b">
        <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">IPL 2025 Match Schedule</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {seriesInfo.info?.startdate} to {seriesInfo.info?.enddate} • {seriesInfo.info?.matches} Matches
        </p>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(matchesByMonth).map(([month, monthMatches]) => (
          <div key={month} className="p-4">
            <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{month}</h4>

            <div className="space-y-4">
              {monthMatches.map((match) => {
                // Determine match status color
                let statusColor = "text-gray-600 dark:text-gray-400"
                if (match.matchStarted && !match.matchEnded) {
                  statusColor = "text-red-600 dark:text-red-400 font-medium"
                } else if (match.matchEnded) {
                  statusColor = "text-green-600 dark:text-green-400"
                }

                return (
                  <div key={match.id} className="border-l-4 border-blue-500 pl-3 py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{match.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{match.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{format(parseISO(match.dateTimeGMT), "dd MMM, h:mm a")}</p>
                        <p className={`text-sm mt-1 ${statusColor}`}>{match.status}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
