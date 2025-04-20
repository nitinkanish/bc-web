import AdUnit from "@/components/ad-unit"
import AdFreeSlot from "@/components/ad-free-slot"

interface ArticleContentProps {
  content: string
  pullQuote?: string | null
}

export default function ArticleContent({ content, pullQuote }: ArticleContentProps) {
  // Split content into three parts for ad insertion
  const paragraphs = content.split("</p>")
  const firstThird = Math.ceil(paragraphs.length / 3)
  const secondThird = Math.ceil((2 * paragraphs.length) / 3)

  const firstPart = paragraphs.slice(0, firstThird).join("</p>") + (paragraphs.length > 3 ? "</p>" : "")
  const middlePart = paragraphs.slice(firstThird, secondThird).join("</p>") + (paragraphs.length > 6 ? "</p>" : "")
  const lastPart = paragraphs.slice(secondThird).join("</p>")

  return (
    <div className="relative mb-8">
      {/* Reading progress indicator
      <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="reading-progress-indicator w-full bg-blue-500 dark:bg-blue-600" style={{ height: "0%" }}></div>
      </div> */}

      {/* Content with left border and padding */}
      <div className="article-content prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-blue-800 dark:prose-headings:text-blue-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-blue-700 dark:prose-strong:text-blue-300">
        {/* First part of content */}
        <div
          className="news-content mb-8"
          dangerouslySetInnerHTML={{
            __html: firstPart,
          }}
        />

        {/* First ad unit */}
        <div className="my-8 no-print">
          <AdUnit slot="1234567890" format="rectangle" layout="in-article" />
        </div>

        {/* First ad-free slot */}
        <AdFreeSlot title="प्रीमियम सामग्री / Premium Content">
          <p className="font-medium">
            हमारे प्रीमियम सदस्यों के लिए विशेष विश्लेषण और अतिरिक्त जानकारी। अधिक जानकारी के लिए हमारी सदस्यता योजनाओं पर जाएं।
          </p>
          <p className="text-sm italic">
            Special analysis and additional information for our premium members. Visit our subscription plans for more
            information.
          </p>
        </AdFreeSlot>

        {/* Middle part of content */}
        <div
          className="news-content mb-8"
          dangerouslySetInnerHTML={{
            __html: middlePart,
          }}
        />

        {/* Pull quote */}
        {pullQuote && (
          <blockquote className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg relative not-prose">
            <div className="text-blue-600 dark:text-blue-400 text-6xl absolute top-2 left-2 opacity-20">"</div>
            <p className="text-lg italic text-gray-800 dark:text-gray-200 relative z-10">{pullQuote}</p>
            <div className="text-blue-600 dark:text-blue-400 text-6xl absolute bottom-2 right-2 opacity-20">"</div>
          </blockquote>
        )}

        {/* Second ad unit */}
        <div className="my-8 no-print">
          <AdUnit slot="0987654321" format="rectangle" layout="in-article" />
        </div>

        {/* Second ad-free slot */}
        <AdFreeSlot title="विशेष रिपोर्ट / Special Report">
          <p className="font-medium">इस मुद्दे पर हमारी विशेष रिपोर्ट। विज्ञापन मुक्त अनुभव के लिए प्रीमियम सदस्य बनें।</p>
          <p className="text-sm italic">
            Our special report on this issue. Become a premium member for an ad-free experience.
          </p>
        </AdFreeSlot>

        {/* Last part of content */}
        <div
          className="news-content"
          dangerouslySetInnerHTML={{
            __html: lastPart,
          }}
        />
      </div>
    </div>
  )
}
