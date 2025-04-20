"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export default function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout

    const startLoading = () => {
      setLoading(true)
      setProgress(0)

      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval)
            return prevProgress
          }
          return prevProgress + (90 - prevProgress) * 0.1
        })
      }, 100)
    }

    const completeLoading = () => {
      setProgress(100)

      timeout = setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 500)
    }

    startLoading()

    // Simulate completion after content is likely loaded
    timeout = setTimeout(completeLoading, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname, searchParams])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-primary z-[100] transition-all duration-300 ease-out",
        loading ? "opacity-100" : "opacity-0",
      )}
      style={{ width: `${progress}%`, transitionProperty: "width, opacity" }}
    />
  )
}
