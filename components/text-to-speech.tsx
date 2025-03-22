"use client"

import { useState, useEffect } from "react"
import { Play, Pause, VolumeX } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface TextToSpeechProps {
  content: string
  title: string
}

export default function TextToSpeech({ content, title }: TextToSpeechProps) {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [rate, setRate] = useState(1)

  // Clean text from HTML tags
  const cleanText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Get voices
      const getVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        const langCode = language === "hi" ? "hi" : "en"
        const matchingVoice = voices.find((voice) => voice.lang.includes(langCode))
        setVoice(matchingVoice || null)
      }

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = getVoices
      }

      setTimeout(getVoices, 100) // Ensure voices are loaded
    } else {
      setIsSupported(false)
    }
  }, [language])

  useEffect(() => {
    if (!voice) return

    const fullText = `${title}. ${cleanText(content)}`
    const newUtterance = new SpeechSynthesisUtterance(fullText)
    newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
    newUtterance.rate = rate
    newUtterance.voice = voice

    newUtterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    setUtterance(newUtterance)
  }, [content, title, language, voice, rate])

  const togglePlay = () => {
    if (!utterance) return

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } else if (isPlaying && isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
      setIsPaused(false)
    }
  }

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  if (!isSupported) return null

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
        aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
      >
        {isPlaying && !isPaused ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      {isPlaying && (
        <button
          onClick={stopSpeech}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Stop"
        >
          <VolumeX className="h-4 w-4" />
        </button>
      )}
      <span className="text-xs text-muted-foreground">
        {isPlaying ? (isPaused ? "Paused" : "Playing") : "Listen"}
      </span>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={(e) => setRate(parseFloat(e.target.value))}
        className="w-24"
      />
      <span className="text-xs text-muted-foreground">Speed: {rate}x</span>
    </div>
  )
}

