export default function IPLSEO() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: "Indian Premier League 2025",
            startDate: "2025-03-22",
            endDate: "2025-05-24",
            location: {
              "@type": "Country",
              name: "India",
            },
            organizer: {
              "@type": "Organization",
              name: "Board of Control for Cricket in India",
              url: "https://www.bcci.tv/",
            },
            competitor: [
              {
                "@type": "SportsTeam",
                name: "Chennai Super Kings",
              },
              {
                "@type": "SportsTeam",
                name: "Delhi Capitals",
              },
              {
                "@type": "SportsTeam",
                name: "Kolkata Knight Riders",
              },
              {
                "@type": "SportsTeam",
                name: "Mumbai Indians",
              },
              {
                "@type": "SportsTeam",
                name: "Punjab Kings",
              },
              {
                "@type": "SportsTeam",
                name: "Rajasthan Royals",
              },
              {
                "@type": "SportsTeam",
                name: "Royal Challengers Bangalore",
              },
              {
                "@type": "SportsTeam",
                name: "Sunrisers Hyderabad",
              },
              {
                "@type": "SportsTeam",
                name: "Gujarat Titans",
              },
              {
                "@type": "SportsTeam",
                name: "Lucknow Super Giants",
              },
            ],
            description:
              "The Indian Premier League (IPL) 2025 is the 18th season of the professional Twenty20 cricket league in India.",
            url: "https://bolchaal.in/ipl-2025",
          }),
        }}
      />
    </>
  )
}
