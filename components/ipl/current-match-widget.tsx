"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format, parseISO } from "date-fns"

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

interface MatchInfo {
  id: string
  name: string
  status: string
  venue: string
  date: string
  dateTimeGMT: string
  teams: string[]
  matchStarted: boolean
  matchEnded: boolean
}

export default function CurrentMatchWidget() {
  const [currentMatch, setCurrentMatch] = useState<MatchInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulated scores for demo purposes
  const [scores, setScores] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchCurrentMatch() {
      try {
        setLoading(true)
        const response = await fetch("/api/ipl/current-match")

        if (!response.ok) {
          throw new Error("Failed to fetch current match")
        }

        const data = await response.json()
        setCurrentMatch(data.match)

        // Generate random scores for demo purposes
        if (data.match && data.match.teams) {
          const demoScores: Record<string, string> = {}
          data.match.teams.forEach((team: string) => {
            const wickets = Math.floor(Math.random() * 10)
            const runs = Math.floor(Math.random() * 200) + 50
            demoScores[team] = `${runs}/${wickets}`
          })
          setScores(demoScores)
        }

        setError(null)
      } catch (err) {
        console.error("Error fetching current match:", err)
        setError("Unable to load current match data")
        setCurrentMatch(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentMatch()

    // Refresh data every 2 minutes
    const intervalId = setInterval(fetchCurrentMatch, 2 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    )
  }

  if (error || !currentMatch) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-300">No live match right now</p>
          <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Check the schedule for upcoming matches</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="bg-blue-600 text-white p-3 text-center">
        <p className="text-sm font-medium">LIVE</p>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-3 text-center">{currentMatch.name.split(",")[0]}</h3>

        <div className="flex justify-between items-center mb-4">
          {currentMatch.teams.map((team) => (
            <div key={team} className="flex flex-col items-center">
              <div className="relative h-16 w-16">
                <Image
                  src={TEAM_LOGOS[team] || `/placeholder.svg?height=64&width=64`}
                  alt={team}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium mt-2">{team}</span>
              <span className="text-lg font-bold mt-1">{scores[team] || "0/0"}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">{currentMatch.status}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{currentMatch.venue}</p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-2 text-center text-xs">
        <p>{format(parseISO(currentMatch.dateTimeGMT), "dd MMM yyyy, h:mm a")}</p>
      </div>
    </div>
  )
}
