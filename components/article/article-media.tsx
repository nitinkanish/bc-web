import Image from "next/image"

interface ArticleMediaProps {
  src: string
  alt: string
  caption?: string
  priority?: boolean
}

export default function ArticleMedia({ src, alt, caption, priority = true }: ArticleMediaProps) {
  return (
    <figure className="mb-8" itemScope itemType="https://schema.org/ImageObject">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <Image
          src={src || "/placeholder.svg?height=600&width=1200"}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 800px"
          itemProp="contentUrl"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic text-center" itemProp="caption">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
