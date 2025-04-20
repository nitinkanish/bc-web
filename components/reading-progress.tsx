"use client"

import { useEffect, useState } from "react"

interface ReadingProgressProps {
  color?: string
}

export default function ReadingProgress({ color = "#FF5722" }: ReadingProgressProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight) {
        setWidth(Number((currentProgress / scrollHeight).toFixed(2)) * 100)
      }
    }

    window.addEventListener("scroll", updateScrollCompletion)

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 transition-all duration-100 ease-out"
      style={{
        width: `${width}%`,
        backgroundColor: color,
        boxShadow: `0 0 5px ${color}`,
      }}
    />
  )
}
