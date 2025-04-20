import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string
  className?: string
  sizes?: string
  fallback?: string
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  fallback = "/placeholder.svg",
  ...props
}: ResponsiveImageProps) {
  // Check if the src is a remote URL
  const isRemoteImage = src.startsWith("http")

  // For local images, we can use the optimized versions
  if (!isRemoteImage && !src.includes(".svg")) {
    const ext = src.substring(src.lastIndexOf("."))
    const basePath = src.substring(0, src.lastIndexOf("."))

    // Create srcSet for WebP
    const webpSrcSet = [640, 750, 828, 1080, 1200, 1920]
      .map((width) => `${basePath}-${width}.webp ${width}w`)
      .join(", ")

    // Create srcSet for original format
    const originalSrcSet = [640, 750, 828, 1080, 1200, 1920]
      .map((width) => `${basePath}-${width}${ext} ${width}w`)
      .join(", ")

    return (
      <picture>
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <source type={`image/${ext.substring(1)}`} srcSet={originalSrcSet} sizes={sizes} />
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("", className)}
          sizes={sizes}
          {...props}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const imgElement = e.currentTarget as HTMLImageElement
            imgElement.src = fallback
          }}
        />
      </picture>
    )
  }

  // For remote or SVG images, use Next.js Image component directly
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      className={cn("", className)}
      sizes={sizes}
      {...props}
      onError={(e) => {
        // Fallback to placeholder if image fails to load
        const imgElement = e.currentTarget as HTMLImageElement
        imgElement.src = fallback
      }}
    />
  )
}
