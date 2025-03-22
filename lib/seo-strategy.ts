// SEO Strategy for Bol Chaal News Website

export const seoConfig = {
  // Global SEO settings
  global: {
    siteName: "Bol Chaal",
    titleTemplate: "%s | Bol Chaal",
    defaultTitle: "Bol Chaal - Latest Updates from Himachal Pradesh",
    defaultDescription:
      "Get the latest news, information, and updates from across Himachal Pradesh. Covering politics, tourism, weather, and local events.",
    siteUrl: "https://www.bolchaal.in",
    twitterHandle: "@bolchaalofficial",
    locale: "en_IN",
  },

  // Structured data templates
  structuredData: {
    organization: {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: "Bol Chaal",
      url: "https://www.bolchaal.in",
      logo: "https://www.bolchaal.in/logo.svg",
      sameAs: [
        "https://facebook.com/bolchaalofficial",
        "https://twitter.com/bolchaalofficial",
        "https://instagram.com/bolchaalofficial",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-1234567890",
        contactType: "Customer Service",
        availableLanguage: ["English", "Hindi"],
      },
    },

    breadcrumb: (items) => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }),

    localBusiness: (district) => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Bol Chaal ${district} Office`,
      address: {
        "@type": "PostalAddress",
        addressLocality: district,
        addressRegion: "Himachal Pradesh",
        addressCountry: "IN",
      },
    }),
  },

  // SEO best practices
  bestPractices: {
    titleLength: 60,
    descriptionLength: 160,
    keywordsCount: 10,
    h1PerPage: 1,
    contentMinLength: 300,
    imageAltRequired: true,
    canonicalRequired: true,
  },

  // Content optimization guidelines
  contentOptimization: {
    keywordDensity: { min: 0.5, max: 2.5 },
    headingStructure: {
      h1: "Main topic - include primary keyword",
      h2: "Major sections - include secondary keywords",
      h3: "Subsections - can include tertiary keywords",
    },
    contentStructure: {
      introduction: "Engage readers and introduce the topic with primary keyword",
      body: "Detailed information with proper heading hierarchy and keyword usage",
      conclusion: "Summarize key points and include a call to action",
    },
  },

  // Technical SEO guidelines
  technicalSEO: {
    mobileResponsive: true,
    pagespeedTarget: 90,
    secureWithHttps: true,
    robotsTxtRules: [
      "User-agent: *",
      "Allow: /",
      "Disallow: /admin/",
      "Sitemap: https://www.bolchaal.in/sitemap.xml",
    ],
    xmlSitemapRequired: true,
    hreflangImplementation: { en: "en_IN", hi: "hi_IN" },
  },
}

// Helper functions for SEO
export const seoHelpers = {
  truncateText: (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  },

  generateSlug: (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  },

  formatDateForSEO: (date) => date.toISOString(),

  generateSocialTags: (title, description, imageUrl, url) => ({
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      url,
      type: "article",
      locale: seoConfig.global.locale,
      site_name: seoConfig.global.siteName,
    },
    twitter: {
      card: "summary_large_image",
      site: seoConfig.global.twitterHandle,
      title,
      description,
      image: imageUrl,
    },
  }),

  generateArticleStructuredData: (article) => ({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: article.imageUrl,
    datePublished: article.publishDate.toISOString(),
    dateModified: (article.modifiedDate || article.publishDate).toISOString(),
    author: {
      "@type": "Person",
      name: article.authorName,
      url: article.authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: seoConfig.global.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${seoConfig.global.siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    ...(article.categoryName && {
      articleSection: article.categoryName,
    }),
  }),
}

