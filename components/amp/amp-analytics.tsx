interface AmpAnalyticsProps {
  isAmp?: boolean
}

export default function AmpAnalytics({ isAmp = false }: AmpAnalyticsProps) {
  if (!isAmp) return null

  return (
    <>
      <amp-analytics type="gtag" data-credentials="include">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              gtag_id: "G-YV4YLT40K4",
              config: {
                "G-YV4YLT40K4": {
                  groups: "default",
                },
              },
            }),
          }}
        />
      </amp-analytics>
    </>
  )
}
