import EnhancedSocialShare from "@/components/enhanced-social-share"

interface ArticleShareProps {
  url: string
  title: string
  description: string
}

export default function ArticleShare({ url, title, description }: ArticleShareProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm no-print">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </div>
        <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">इस खबर को शेयर करें / Share this news</h4>
      </div>
      <EnhancedSocialShare url={url} title={title} description={description} />
    </div>
  )
}
