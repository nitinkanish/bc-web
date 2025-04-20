"use client"

import type { Post } from "@/lib/api"
import ReadLaterButton from "@/components/read-later-button"
import PrintButton from "@/components/print-button"
import TextToSpeech from "@/components/text-to-speech"
import EnhancedSocialShare from "@/components/enhanced-social-share"
import ClientWrapper from "@/components/client-wrapper"

interface ArticleActionsProps {
  post: Post
  url: string
  title: string
  description: string
}

export default function ArticleActions({ post, url, title, description }: ArticleActionsProps) {
  return (
    <div className="flex flex-col mb-8 gap-4">
      {/* Enhanced Listen feature */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-blue-900/30 p-5 rounded-lg border border-blue-200 dark:border-blue-800 shadow-md">
        <div className="flex items-center mb-3">
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
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">इस खबर को सुनें / Listen to this news</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Android, iOS और Web पर उपलब्ध | Available on all devices
            </p>
          </div>
        </div>
        <ClientWrapper>
          <TextToSpeech
            content={post.content.rendered}
            title={post.title.rendered}
            className="border-blue-300 dark:border-blue-700 rounded-md"
          />
        </ClientWrapper>
      </div>

      {/* Primary actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
          <ClientWrapper>
            <ReadLaterButton post={post} size="lg" />
          </ClientWrapper>
          <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">बाद में पढ़ें</span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
          <PrintButton size="lg" />
          <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">प्रिंट करें</span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
          <EnhancedSocialShare url={url} title={title} description={description} compact={true} />
        </div>
      </div>
    </div>
  )
}
