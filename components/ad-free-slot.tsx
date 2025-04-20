import type React from "react"

interface AdFreeSlotProps {
  title: string
  children: React.ReactNode
}

export default function AdFreeSlot({ title, children }: AdFreeSlotProps) {
  return (
    <div className="my-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
      <div className="flex items-start">
        <div className="w-1 h-full min-h-[40px] bg-green-500 rounded-full mr-3 self-stretch"></div>
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-2 text-green-800 dark:text-green-300 flex items-center">
            <span className="mr-2">✨</span> {title}
          </h4>
          <div className="text-gray-700 dark:text-gray-300">{children}</div>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span>विज्ञापन मुक्त सामग्री | Ad-free content</span>
          </div>
        </div>
      </div>
    </div>
  )
}
