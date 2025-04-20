export default function LatestNewsSEO() {
  const currentDate = new Date().toISOString().split("T")[0]

  return (
    <>
      {/* NewsArticleList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "NewsArticle",
                  headline: "Himachal News: The Voice of Dev Bhoomi",
                  description:
                    "Stay connected with the pulse of Himachal Pradesh with news curated by Arvind Mourya, Co-founder and Chief Editor of Bol Chaal.",
                  image: "https://bolchaal.in/og-image.jpg",
                  datePublished: currentDate,
                  dateModified: currentDate,
                  author: {
                    "@type": "Person",
                    name: "Arvind Mourya",
                    jobTitle: "Co-founder and Chief Editor",
                    url: "https://bolchaal.in/about",
                  },
                  publisher: {
                    "@type": "Organization",
                    name: "Bol Chaal",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://bolchaal.in/logo.svg",
                    },
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": "https://bolchaal.in/himachal-news",
                  },
                },
              },
            ],
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://bolchaal.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Himachal News",
                item: "https://bolchaal.in/himachal-news",
              },
            ],
          }),
        }}
      />

      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Himachal News | Latest Updates from Across the State",
            description:
              "Stay connected with the pulse of Himachal Pradesh. Get the latest news, exclusive stories, and in-depth coverage from all 12 districts.",
            url: "https://bolchaal.in/himachal-news",
            lastReviewed: currentDate,
            mainContentOfPage: {
              "@type": "WebPageElement",
              cssSelector: ".container",
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", ".prose p"],
            },
            author: {
              "@type": "Person",
              name: "Arvind Mourya",
              jobTitle: "Co-founder and Chief Editor",
              url: "https://bolchaal.in/about",
            },
          }),
        }}
      />

      {/* Person Schema for Arvind Mourya */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Arvind Mourya",
            jobTitle: "Co-founder and Chief Editor",
            worksFor: {
              "@type": "Organization",
              name: "Bol Chaal",
              url: "https://bolchaal.in",
            },
            description: "Co-founder and Chief Editor of Bol Chaal, a leading news platform covering Himachal Pradesh",
            sameAs: [
              "https://bolchaal.in/about",
              // Add social media profiles if available
            ],
          }),
        }}
      />
    </>
  )
}
