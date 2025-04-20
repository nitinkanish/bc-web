import Image from "next/image"

interface TeamStats {
  teamname: string
  shortname: string
  img: string
  matches: number
  wins: number
  loss: number
  ties: number
  nr: number
}

async function getIPLPointsTable(): Promise<TeamStats[]> {
  try {
    const response = await fetch(
      "https://api.cricapi.com/v1/series_points?apikey=70d0ce87-a578-47aa-b687-053f781615c2&id=d5a498c8-7596-4b93-8ab0-e0efc3345312",
      { next: { revalidate: 3600 } }, // Revalidate every hour
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch IPL points table: ${response.status}`)
    }

    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error("Error fetching IPL points table:", error)
    return []
  }
}

export default async function IPLPointsTable() {
  const teams = await getIPLPointsTable()

  // Calculate points and net run rate (NRR) for each team
  const teamsWithPoints = teams.map((team) => {
    const points = team.wins * 2 + team.ties * 1
    // Simulate NRR with random values between -1 and 1
    const nrr = (Math.random() * 2 - 1).toFixed(3)
    return { ...team, points, nrr }
  })

  // Sort teams by points (descending) and then by NRR (descending)
  const sortedTeams = teamsWithPoints.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    return Number.parseFloat(b.nrr) - Number.parseFloat(a.nrr)
  })

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Pos
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Team
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              M
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              W
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              L
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              T/NR
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              Pts
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              NRR
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedTeams.length > 0 ? (
            sortedTeams.map((team, index) => (
              <tr key={team.shortname} className={index < 4 ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={team.img || `/placeholder.svg?height=48&width=48`}
                        alt={team.teamname}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{team.teamname}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{team.shortname}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{team.matches}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{team.wins}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{team.loss}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {team.ties + team.nr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                  {team.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{team.nrr}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading IPL points table...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-300">
        <p>Top 4 teams qualify for playoffs</p>
      </div>
    </div>
  )
}
