import { getCategories } from "@/lib/api"
import type { Metadata } from "next"
import CategoryPageClient from "./CategoryPageClient"

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 600 // Revalidate every 10 minutes

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find((cat: any) => cat.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  const categoryName = category.name
  const categoryDescription = `Latest news and updates from the ${categoryName} category. Stay informed with Bol Chaal News.`

  return {
    title: `${categoryName} News & Updates | Bol Chaal News`,
    description: categoryDescription,
    keywords: [`${categoryName} news`, `${categoryName} updates`, `${categoryName} Himachal Pradesh`, "Bol Chaal News"],
    openGraph: {
      title: `${categoryName} News & Updates | Bol Chaal News`,
      description: categoryDescription,
      url: `https://bolchaal.in/category/${params.slug}`,
      siteName: "Bol Chaal News",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} News & Updates | Bol Chaal News`,
      description: categoryDescription,
      creator: "@bolchaalnews",
    },
    alternates: {
      canonical: `https://bolchaal.in/category/${params.slug}`,
    },
  }
}

export default function CategoryPage({ params, searchParams }: Props) {
  // Extract the page parameter from searchParams
  const pageParam = searchParams.page
  const page = typeof pageParam === "string" ? pageParam : undefined

  // Pass only the specific values needed to the client component
  return <CategoryPageClient slug={params.slug} page={page} />
}
