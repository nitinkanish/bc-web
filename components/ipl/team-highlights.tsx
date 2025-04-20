import Image from "next/image"

interface TeamHighlight {
  team: string
  shortname: string
  img: string
  highlight: string
}

async function getTeamHighlights(): Promise<TeamHighlight[]> {
  // This is a simulated response
  // In a real scenario, you would fetch from an actual API

  // Sample team highlights (simulated)
  const sampleHighlights: TeamHighlight[] = [
    {
      team: "Chennai Super Kings",
      shortname: "CSK",
      img: "https://g.cricapi.com/iapi/135-637852956181378533.png?w=48",
      highlight: "MS Dhoni's batting strike rate of 196.30 is the highest in the tournament so far",
    },
    {
      team: "Mumbai Indians",
      shortname: "MI",
      img: "https://g.cricapi.com/iapi/211-637877431649591285.webp?w=48",
      highlight: "Jasprit Bumrah has taken the most wickets (12) in the death overs this season",
    },
    {
      team: "Royal Challengers Bangalore",
      shortname: "RCB",
      img: "https://g.cricapi.com/iapi/212-637877432060440029.webp?w=48",
      highlight: "Virat Kohli has scored the most runs (342) in the powerplay this season",
    },
    {
      team: "Kolkata Knight Riders",
      shortname: "KKR",
      img: "https://g.cricapi.com/iapi/163-637852956181378533.webp?w=48",
      highlight: "Andre Russell has hit the most sixes (24) in the tournament so far",
    },
  ]

  return sampleHighlights
}

export default async function TeamHighlights() {
  const highlights = await getTeamHighlights()

  return (
    <div className="space-y-3">
      {highlights.map((item) => (
        <div key={item.shortname} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 flex items-center">
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image
              src={item.img || `/placeholder.svg?height=48&width=48`}
              alt={item.team}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>

          <div className="ml-3">
            <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400">{item.shortname}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{item.highlight}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
