import type { Metadata } from "next"
import IPLPointsTable from "@/components/ipl/ipl-points-table"
import CurrentMatchWidget from "@/components/ipl/current-match-widget"
import UpcomingMatches from "@/components/ipl/upcoming-matches"
import IPLNews from "@/components/ipl/ipl-news"
import IPLSEO from "@/components/ipl/ipl-seo"
import TeamHighlights from "@/components/ipl/team-highlights"
import IPLHero from "@/components/ipl/ipl-hero"
import IPLMatchList from "@/components/ipl/ipl-match-list"
import TopMatches from "@/components/ipl/top-matches"

export const metadata: Metadata = {
  title: "IPL 2025 - Live Scores, Points Table, Schedule | Bol Chaal",
  description:
    "Get the latest IPL 2025 updates, live scores, points table, team standings, match schedules and more. Follow your favorite IPL teams on Bol Chaal.",
  keywords:
    "IPL 2025, Indian Premier League, cricket, T20, points table, live scores, CSK, MI, RCB, DC, SRH, KKR, PBKS, RR",
}

export default async function IPLPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <IPLSEO />

      <IPLHero />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">IPL 2025 Points Table</h2>
          <IPLPointsTable />

          <h2 className="text-2xl font-bold mb-4 mt-8 text-blue-700 border-b pb-2">IPL 2025 Match Schedule</h2>
          <IPLMatchList />

          <h2 className="text-2xl font-bold mb-4 mt-8 text-blue-700 border-b pb-2">Latest IPL News</h2>
          <IPLNews />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Current Match</h2>
            <CurrentMatchWidget />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Upcoming Matches</h2>
            <UpcomingMatches />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Recent Results</h2>
            <TopMatches />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2">Team Highlights</h2>
            <TeamHighlights />
          </div>
        </div>
      </div>
    </main>
  )
}
