import { AlertTriangle } from "lucide-react"

interface NoticeBoxProps {
  title: string
  content: string
  translatedContent?: string
  type?: "warning" | "info" | "success"
}

export default function NoticeBox({ title, content, translatedContent, type = "warning" }: NoticeBoxProps) {
  const colors = {
    warning: {
      bg: "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
      border: "border-yellow-300 dark:border-yellow-700",
      title: "text-yellow-800 dark:text-yellow-300",
      iconBg: "bg-yellow-500",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      border: "border-blue-300 dark:border-blue-700",
      title: "text-blue-800 dark:text-blue-300",
      iconBg: "bg-blue-500",
    },
    success: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      border: "border-green-300 dark:border-green-700",
      title: "text-green-800 dark:text-green-300",
      iconBg: "bg-green-500",
    },
  }

  return (
    <div className={`my-8 p-5 ${colors[type].bg} rounded-lg border ${colors[type].border} shadow-sm`}>
      <div className="flex items-start">
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-full ${colors[type].iconBg} flex items-center justify-center mr-3`}
        >
          <AlertTriangle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h4 className={`text-lg font-bold mb-2 ${colors[type].title}`}>{title}</h4>
          <p className="text-gray-700 dark:text-gray-300">{content}</p>
          {translatedContent && (
            <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-1">{translatedContent}</p>
          )}
        </div>
      </div>
    </div>
  )
}
