// SEO optimization utilities

// Generate structured data for different page types
export const generateStructuredData = {
  // Article structured data
  article: (article: any) => {
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      image: article.image ? [article.image] : [],
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: article.author
        ? [
            {
              "@type": "Person",
              name: article.author,
            },
          ]
        : [],
      publisher: {
        "@type": "Organization",
        name: "Himachal News",
        logo: {
          "@type": "ImageObject",
          url: "https://himachal-news.vercel.app/logo.svg",
        },
      },
      description: article.description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": article.url,
      },
    }
  },

  // BreadcrumbList structured data
  breadcrumb: (items: Array<{ name: string; url: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }
  },

  // FAQ structured data
  faq: (questions: Array<{ question: string; answer: string }>) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })),
    }
  },

  // Local business structured data
  localBusiness: (business: any) => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: business.name,
      image: business.image,
      telephone: business.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.locality,
        addressRegion: business.address.region,
        postalCode: business.address.postalCode,
        addressCountry: business.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      url: business.url,
      openingHoursSpecification: business.hours.map((hour: any) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hour.days,
        opens: hour.opens,
        closes: hour.closes,
      })),
    }
  },
}

// Generate meta tags for social media
export const generateSocialTags = (data: {
  title: string
  description: string
  url: string
  image?: string
  type?: string
  twitterHandle?: string
}) => {
  return {
    // Open Graph tags
    openGraph: {
      title: data.title,
      description: data.description,
      type: data.type || "website",
      url: data.url,
      images: data.image
        ? [
            {
              url: data.image,
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ]
        : undefined,
      locale: "en_US",
      siteName: "Himachal News",
    },
    // Twitter tags
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: data.image ? [data.image] : undefined,
      creator: data.twitterHandle || "@himachalnews",
    },
  }
}

// Generate canonical URL
export const generateCanonicalUrl = (path: string, baseUrl = "https://himachal-news.vercel.app") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

// Generate alternate language URLs
export const generateAlternateLanguages = (path: string, baseUrl = "https://himachal-news.vercel.app") => {
  const cleanPath = path.startsWith("/") ? path.substring(1) : path
  return {
    "en-US": `${baseUrl}/en/${cleanPath}`,
    "hi-IN": `${baseUrl}/hi/${cleanPath}`,
  }
}

// Mobile optimization techniques
export const mobileOptimizationTips = [
  "Use responsive images with srcset",
  "Implement lazy loading for images",
  "Minimize CSS and JavaScript",
  "Use font-display: swap for web fonts",
  "Implement critical CSS",
  "Use appropriate touch targets (at least 48x48px)",
  "Optimize for mobile viewports",
  "Implement AMP versions of pages",
  "Use service workers for offline capabilities",
  "Optimize server response times",
  "Minimize HTTP requests",
  "Use browser caching",
  "Compress images and assets",
  "Implement progressive web app features",
]

// Core Web Vitals optimization
export const coreWebVitalsOptimization = {
  LCP: [
    // Largest Contentful Paint
    "Optimize server response times",
    "Eliminate render-blocking resources",
    "Optimize and compress images",
    "Preload important resources",
    "Implement critical CSS",
  ],
  FID: [
    // First Input Delay
    "Minimize JavaScript execution time",
    "Break up long tasks",
    "Optimize event handlers",
    "Use web workers for complex tasks",
    "Reduce JavaScript payload",
  ],
  CLS: [
    // Cumulative Layout Shift
    "Set explicit width and height for images and videos",
    "Reserve space for ads",
    "Avoid inserting content above existing content",
    "Precompute sufficient space for dynamic content",
    "Use transform animations instead of animations that trigger layout changes",
  ],
}
