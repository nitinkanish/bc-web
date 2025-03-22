"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

type LanguageProviderProps = {
  children: React.ReactNode
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    home: "Home",
    politics: "Politics",
    sports: "Sports",
    tourism: "Tourism",
    crime: "Crime",
    weather: "Weather",
    trending: "Trending",
    search: "Search",
    subscribe: "Subscribe",
    newsletter: "Newsletter",
    related: "Related News",
    comments: "Comments",
    share: "Share",
    read_more: "Read More",
    breaking_news: "Breaking News",
    latest_news: "Latest News",
    published_on: "Published on",
    by_author: "By",
    districts: "Districts",
    dark_mode: "Dark Mode",
    light_mode: "Light Mode",
    submit_news: "Submit News",
    live_stream: "Live Stream",
    contact_us: "Contact Us",
    about_us: "About Us",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    copyright: "Copyright",
    all_rights_reserved: "All Rights Reserved",
    email_placeholder: "Your email address",
    subscribe_button: "Subscribe",
    search_placeholder: "Search for news...",
    comment_placeholder: "Write a comment...",
    submit_comment: "Submit",
    name_placeholder: "Your name",
    email_required: "Email is required",
    name_required: "Name is required",
    comment_required: "Comment is required",
    comment_success: "Comment submitted successfully",
    comment_error: "Error submitting comment",
    share_on: "Share on",
    read_later: "Read Later",
    saved: "Saved",
    remove: "Remove",
    clear_all: "Clear All",
    saved_articles: "Saved Articles",
    no_saved_articles: "You haven't saved any articles yet.",
    browse_articles: "Browse Articles",
    listen: "Listen",
    playing: "Playing",
    paused: "Paused",
    min_read: "min read",
    print: "Print",
  },
  hi: {
    home: "होम",
    politics: "राजनीति",
    sports: "खेल",
    tourism: "पर्यटन",
    crime: "अपराध",
    weather: "मौसम",
    trending: "ट्रेंडिंग",
    search: "खोज",
    subscribe: "सदस्यता लें",
    newsletter: "न्यूज़लेटर",
    related: "संबंधित समाचार",
    comments: "टिप्पणियां",
    share: "शेयर",
    read_more: "और पढ़ें",
    breaking_news: "ब्रेकिंग न्यूज़",
    latest_news: "ताज़ा खबर",
    published_on: "प्रकाशित",
    by_author: "द्वारा",
    districts: "जिले",
    dark_mode: "डार्क मोड",
    light_mode: "लाइट मोड",
    submit_news: "समाचार भेजें",
    live_stream: "लाइव स्ट्रीम",
    contact_us: "संपर्क करें",
    about_us: "हमारे बारे में",
    privacy_policy: "गोपनीयता नीति",
    terms_of_service: "सेवा की शर्तें",
    copyright: "कॉपीराइट",
    all_rights_reserved: "सर्वाधिकार सुरक्षित",
    email_placeholder: "आपका ईमेल पता",
    subscribe_button: "सदस्यता लें",
    search_placeholder: "समाचार खोजें...",
    comment_placeholder: "टिप्पणी लिखें...",
    submit_comment: "सबमिट करें",
    name_placeholder: "आपका नाम",
    email_required: "ईमेल आवश्यक है",
    name_required: "नाम आवश्यक है",
    comment_required: "टिप्पणी आवश्यक है",
    comment_success: "टिप्पणी सफलतापूर्वक सबमिट की गई",
    comment_error: "टिप्पणी सबमिट करने में त्रुटि",
    share_on: "शेयर करें",
    read_later: "बाद में पढ़ें",
    saved: "सहेजा गया",
    remove: "हटाएं",
    clear_all: "सभी हटाएं",
    saved_articles: "सहेजे गए लेख",
    no_saved_articles: "आपने अभी तक कोई लेख नहीं सहेजा है।",
    browse_articles: "लेख ब्राउज़ करें",
    listen: "सुनें",
    playing: "चल रहा है",
    paused: "रुका हुआ",
    min_read: "मिनट का पठन",
    print: "प्रिंट करें",
  },
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: (key: string) => key,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({ children, ...props }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage === "en" || savedLanguage === "hi") {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem("language", language)
      setLanguage(language)
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}

