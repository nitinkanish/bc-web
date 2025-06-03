interface AmpImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  layout?: "responsive" | "fixed" | "fill" | "intrinsic"
  isAmp?: boolean
}

export default function AmpImage({
  src,
  alt,
  width,
  height,
  className = "",
  layout = "responsive",
  isAmp = false,
}: AmpImageProps) {
  if (isAmp) {
    return <amp-img src={src} alt={alt} width={width} height={height} layout={layout} className={className} />
  }

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  )
}
