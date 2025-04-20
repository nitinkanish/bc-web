import Link from "next/link"

export default function ArticleAdvertise() {
  return (
    <div className="my-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200 dark:border-blue-800 no-print">
      <h3 className="text-xl font-serif font-bold mb-2 text-blue-800 dark:text-blue-300">
        बोल चाल न्यूज़ के साथ विज्ञापन दें
      </h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        हिमाचल प्रदेश के पाठकों के बढ़ते दर्शकों तक पहुंचें। हमारे किफायती विज्ञापन विकल्पों के साथ अपने व्यवसाय, कार्यक्रम या सेवा का प्रचार
        करें।
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/advertise"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          विज्ञापन दरें देखें
        </Link>
        <Link
          href="/contact"
          className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          संपर्क करें
        </Link>
      </div>
    </div>
  )
}
