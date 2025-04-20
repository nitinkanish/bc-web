"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function MobileOptimization() {
  const pathname = usePathname()

  useEffect(() => {
    // Detect if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
      // Lazy load images that are off-screen
      const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]')

        if ("IntersectionObserver" in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement
                if (image.dataset.src) {
                  image.src = image.dataset.src
                  image.removeAttribute("data-src")
                }
                imageObserver.unobserve(image)
              }
            })
          })

          lazyImages.forEach((image) => {
            imageObserver.observe(image)
          })
        } else {
          // Fallback for browsers that don't support IntersectionObserver
          let lazyLoadThrottleTimeout: NodeJS.Timeout | null = null

          const lazyLoad = () => {
            if (lazyLoadThrottleTimeout) {
              clearTimeout(lazyLoadThrottleTimeout)
            }

            lazyLoadThrottleTimeout = setTimeout(() => {
              const scrollTop = window.scrollY

              lazyImages.forEach((img) => {
                const image = img as HTMLImageElement
                if (image.offsetTop < window.innerHeight + scrollTop) {
                  if (image.dataset.src) {
                    image.src = image.dataset.src
                    image.removeAttribute("data-src")
                  }
                }
              })

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad)
                window.removeEventListener("resize", lazyLoad)
                window.removeEventListener("orientationChange", lazyLoad)
              }
            }, 20)
          }

          document.addEventListener("scroll", lazyLoad)
          window.addEventListener("resize", lazyLoad)
          window.addEventListener("orientationChange", lazyLoad)
        }
      }

      // Optimize font loading
      const optimizeFonts = () => {
        // Add font-display: swap to all font faces
        const style = document.createElement("style")
        style.textContent = `
          @font-face {
            font-display: swap !important;
          }
        `
        document.head.appendChild(style)
      }

      // Defer non-critical CSS
      const deferNonCriticalCSS = () => {
        const links = document.querySelectorAll('link[rel="stylesheet"]')
        links.forEach((link) => {
          if (!link.getAttribute("href")?.includes("critical")) {
            link.setAttribute("media", "print")
            link.setAttribute("onload", "this.media='all'")
          }
        })
      }

      // Apply optimizations
      lazyLoadImages()
      optimizeFonts()
      deferNonCriticalCSS()
    }
  }, [pathname])

  return null
}
