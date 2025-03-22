import { getCategories } from "@/lib/api"
import type { Metadata } from "next"
import CategoryPageClient from "./CategoryPageClient"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export const revalidate = 600 // Revalidate every 10 minutes

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories()
  const category = categories.find((cat: any) => cat.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: category.name,
    description: `Latest news from the ${category.name} category`,
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  return <CategoryPageClient params={params} searchParams={searchParams} />
}

