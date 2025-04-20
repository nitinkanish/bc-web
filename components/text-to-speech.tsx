"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, VolumeX, Volume2, ChevronDown, ChevronUp, SkipBack, SkipForward } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface TextToSpeechProps {
  content: string
  title: string
  className?: string
}

export default function TextToSpeech({ content, title, className }: TextToSpeechProps) {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [expanded, setExpanded] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const contentRef = useRef<string>("")
  const paragraphsRef = useRef<string[]>([])
  const currentParagraphRef = useRef<number>(0)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile devices
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase(),
    )
    setIsMobile(isMobileDevice)
  }, [])

  // Clean text from HTML tags and split into paragraphs
  const cleanAndPrepareText = (html: string) => {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html")
      const text = doc.body.textContent || ""
      contentRef.current = text

      // Split by paragraphs (sentences ending with period followed by space or newline)
      const paragraphs = text
        .split(/\.(?=\s|$)/)
        .filter((p) => p.trim().length > 0)
        .map((p) => p.trim() + ".")

      paragraphsRef.current = paragraphs
      setTotalLength(paragraphs.length)
      return text
    } catch (error) {
      console.error("Error cleaning text:", error)
      setErrorMessage("Error preparing text for speech")
      return ""
    }
  }

  // Initialize speech synthesis
  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === "undefined") return

    const initializeSpeechSynthesis = () => {
      try {
        if ("speechSynthesis" in window) {
          speechSynthesisRef.current = window.speechSynthesis
          cleanAndPrepareText(content)
          setIsSupported(true)
          setIsInitialized(true)

          // Platform-specific initializations
          const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""
          const isIOS = /iphone|ipad|ipod/i.test(userAgent.toLowerCase())
          const isAndroid = /android/i.test(userAgent.toLowerCase())

          if (isIOS) {
            // iOS requires user interaction to start speech synthesis
            document.addEventListener(
              "touchstart",
              () => {
                speechSynthesisRef.current?.speak(new SpeechSynthesisUtterance(""))
                speechSynthesisRef.current?.cancel()
              },
              { once: true },
            )
          } else if (isAndroid) {
            // Android Chrome sometimes needs a small delay before initialization
            setTimeout(() => {
              speechSynthesisRef.current?.getVoices()
            }, 200)
          }
        } else {
          setIsSupported(false)
          setErrorMessage("Your browser doesn't support text-to-speech")
        }
      } catch (error) {
        console.error("Error initializing speech synthesis:", error)
        setIsSupported(false)
        setErrorMessage("Error initializing text-to-speech")
      }
    }

    initializeSpeechSynthesis()

    // Cleanup function
    return () => {
      try {
        if (speechSynthesisRef.current) {
          speechSynthesisRef.current.cancel()
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      } catch (error) {
        console.error("Error in cleanup:", error)
      }
    }
  }, [content, isMobile])

  // Load available voices
  useEffect(() => {
    if (!isInitialized || !speechSynthesisRef.current) return

    const loadVoices = () => {
      try {
        const voices = speechSynthesisRef.current?.getVoices() || []
        setAvailableVoices(voices)

        const langCode = language === "hi" ? "hi" : "en"
        let matchingVoice = voices.find((voice) => voice.lang.includes(langCode))

        // Fallback to any voice if no matching language is found
        if (!matchingVoice && voices.length > 0) {
          matchingVoice = voices[0]
        }

        setVoice(matchingVoice || null)
      } catch (error) {
        console.error("Error loading voices:", error)
        setErrorMessage("Error loading voices")
      }
    }

    // Initial load
    loadVoices()

    // Setup event listener for voices changed
    if (speechSynthesisRef.current.onvoiceschanged !== undefined) {
      speechSynthesisRef.current.onvoiceschanged = loadVoices
    } else {
      // Fallback for browsers that don't support onvoiceschanged
      setTimeout(loadVoices, 1000)
    }
  }, [isInitialized, language])

  // Create utterance when voice changes
  useEffect(() => {
    if (!voice || !isInitialized) return

    // Create utterance for current paragraph
    const createUtteranceForParagraph = (paragraphIndex: number) => {
      if (paragraphIndex >= paragraphsRef.current.length) return null

      try {
        const text = paragraphsRef.current[paragraphIndex]
        const newUtterance = new SpeechSynthesisUtterance(text)
        newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
        newUtterance.rate = rate
        newUtterance.volume = volume
        newUtterance.voice = voice

        newUtterance.onend = () => {
          // Move to next paragraph
          currentParagraphRef.current++
          setCurrentPosition(currentParagraphRef.current)

          if (currentParagraphRef.current < paragraphsRef.current.length) {
            const nextUtterance = createUtteranceForParagraph(currentParagraphRef.current)
            if (nextUtterance && speechSynthesisRef.current) {
              setUtterance(nextUtterance)
              speechSynthesisRef.current.speak(nextUtterance)
            }
          } else {
            // End of content
            setIsPlaying(false)
            setIsPaused(false)
            currentParagraphRef.current = 0
            setCurrentPosition(0)
          }
        }

        newUtterance.onerror = (event) => {
          console.error("Speech synthesis error:", event)
          setErrorMessage("Error during speech playback")
          setIsPlaying(false)
          setIsPaused(false)
        }

        return newUtterance
      } catch (error) {
        console.error("Error creating utterance:", error)
        setErrorMessage("Error creating speech")
        return null
      }
    }

    const initialUtterance = createUtteranceForParagraph(currentParagraphRef.current)
    if (initialUtterance) {
      setUtterance(initialUtterance)
    }
  }, [voice, language, rate, volume, isInitialized])

  // Handle play/pause with platform-specific fixes
  const togglePlay = () => {
    if (!utterance || !speechSynthesisRef.current) return

    try {
      if (isPlaying && !isPaused) {
        // Pause speech
        speechSynthesisRef.current.pause()
        setIsPaused(true)

        // Fix for Android/Chrome which doesn't reliably pause
        if (isMobile) {
          // Store current position and cancel
          const currentIndex = currentParagraphRef.current
          speechSynthesisRef.current.cancel()
          currentParagraphRef.current = currentIndex
        }
      } else if (isPlaying && isPaused) {
        // Resume speech
        if (isMobile) {
          // For mobile devices, create a new utterance at the current position
          const currentIndex = currentParagraphRef.current
          const currentText = paragraphsRef.current[currentIndex]

          if (currentText) {
            const newUtterance = new SpeechSynthesisUtterance(currentText)
            newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
            newUtterance.rate = rate
            newUtterance.volume = volume
            newUtterance.voice = voice

            newUtterance.onend = utterance.onend
            newUtterance.onerror = utterance.onerror

            setUtterance(newUtterance)
            speechSynthesisRef.current.speak(newUtterance)
            setIsPaused(false)
          }
        } else {
          // Desktop browsers can use the standard resume
          speechSynthesisRef.current.resume()
          setIsPaused(false)
        }
      } else {
        // Start speech
        if (utterance.voice) {
          // Fix for Safari which sometimes doesn't start speaking
          speechSynthesisRef.current.cancel()

          // Small delay to ensure cancel completes
          setTimeout(() => {
            if (speechSynthesisRef.current) {
              speechSynthesisRef.current.speak(utterance)
              setIsPlaying(true)
              setIsPaused(false)

              // Workaround for iOS Safari which may stop after a while
              if (isMobile) {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current)
                }

                // Ping the speech synthesis every 10 seconds to keep it alive
                intervalRef.current = setInterval(() => {
                  if (speechSynthesisRef.current && !speechSynthesisRef.current.speaking) {
                    // If it stopped unexpectedly, try to resume from current position
                    const currentIndex = currentParagraphRef.current
                    if (currentIndex < paragraphsRef.current.length) {
                      const newUtterance = new SpeechSynthesisUtterance(paragraphsRef.current[currentIndex])
                      newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
                      newUtterance.rate = rate
                      newUtterance.volume = volume
                      newUtterance.voice = voice
                      newUtterance.onend = utterance.onend

                      setUtterance(newUtterance)
                      speechSynthesisRef.current.speak(newUtterance)
                    }
                  }
                }, 10000)
              }
            }
          }, 100)
        }
      }
    } catch (error) {
      console.error("Error toggling play state:", error)
      setErrorMessage("Error playing audio")

      // Try to recover
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
      setIsPlaying(false)
      setIsPaused(false)
    }
  }

  // Stop speech
  const stopSpeech = () => {
    try {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setIsPlaying(false)
      setIsPaused(false)
      currentParagraphRef.current = 0
      setCurrentPosition(0)
      setErrorMessage(null)
    } catch (error) {
      console.error("Error stopping speech:", error)
    }
  }

  // Skip forward
  const skipForward = () => {
    try {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }

      // Move forward one paragraph
      currentParagraphRef.current = Math.min(currentParagraphRef.current + 1, paragraphsRef.current.length - 1)
      setCurrentPosition(currentParagraphRef.current)

      // Create and speak new utterance
      if (voice && speechSynthesisRef.current) {
        const newUtterance = new SpeechSynthesisUtterance(paragraphsRef.current[currentParagraphRef.current])
        newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
        newUtterance.rate = rate
        newUtterance.volume = volume
        newUtterance.voice = voice

        newUtterance.onend = utterance?.onend
        setUtterance(newUtterance)

        if (isPlaying && !isPaused) {
          speechSynthesisRef.current.speak(newUtterance)
        }
      }
    } catch (error) {
      console.error("Error skipping forward:", error)
      setErrorMessage("Error skipping forward")
    }
  }

  // Skip backward
  const skipBackward = () => {
    try {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel()
      }

      // Move back one paragraph
      currentParagraphRef.current = Math.max(currentParagraphRef.current - 1, 0)
      setCurrentPosition(currentParagraphRef.current)

      // Create and speak new utterance
      if (voice && speechSynthesisRef.current) {
        const newUtterance = new SpeechSynthesisUtterance(paragraphsRef.current[currentParagraphRef.current])
        newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
        newUtterance.rate = rate
        newUtterance.volume = volume
        newUtterance.voice = voice

        newUtterance.onend = utterance?.onend
        setUtterance(newUtterance)

        if (isPlaying && !isPaused) {
          speechSynthesisRef.current.speak(newUtterance)
        }
      }
    } catch (error) {
      console.error("Error skipping backward:", error)
      setErrorMessage("Error skipping backward")
    }
  }

  // Update rate
  const handleRateChange = (value: number[]) => {
    try {
      const newRate = value[0]
      setRate(newRate)

      if (utterance && speechSynthesisRef.current) {
        // If we're currently speaking, we need to restart with the new rate
        if (isPlaying) {
          const wasPaused = isPaused
          speechSynthesisRef.current.cancel()

          // Create new utterance with updated rate
          const newUtterance = new SpeechSynthesisUtterance(paragraphsRef.current[currentParagraphRef.current])
          newUtterance.lang = language === "hi" ? "hi-IN" : "en-US"
          newUtterance.rate = newRate
          newUtterance.volume = volume
          newUtterance.voice = voice

          newUtterance.onend = utterance.onend
          setUtterance(newUtterance)

          if (!wasPaused) {
            speechSynthesisRef.current.speak(newUtterance)
          }
        }
      }
    } catch (error) {
      console.error("Error changing rate:", error)
      setErrorMessage("Error changing speech rate")
    }
  }

  // Update volume
  const handleVolumeChange = (value: number[]) => {
    try {
      const newVolume = value[0]
      setVolume(newVolume)

      if (utterance) {
        utterance.volume = newVolume
      }
    } catch (error) {
      console.error("Error changing volume:", error)
    }
  }

  // Format progress
  const formatProgress = () => {
    return `${currentPosition + 1}/${totalLength}`
  }

  if (!isSupported) {
    return (
      <div className="rounded-lg border bg-orange-50 dark:bg-orange-900/20 p-3 text-sm text-orange-800 dark:text-orange-300">
        <p>आपका ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता है। कृपया Chrome, Safari, या Firefox का उपयोग करें।</p>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          (Your browser doesn't support text-to-speech. Please use Chrome, Safari, or Firefox.)
        </p>
      </div>
    )
  }

  // Mobile-optimized UI with bilingual labels
  return (
    <div
      className={cn("rounded-lg border bg-orange-50 dark:bg-orange-900/20 text-card-foreground shadow-sm", className)}
    >
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              aria-label={isPlaying && !isPaused ? "Pause" : "Play"}
              className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800/30"
              data-tts-button
            >
              {isPlaying && !isPaused ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            {isPlaying && (
              <Button
                variant="ghost"
                size="icon"
                onClick={stopSpeech}
                aria-label="Stop"
                className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800/30"
              >
                <VolumeX className="h-5 w-5" />
              </Button>
            )}

            <span className="text-sm font-medium">
              {isPlaying ? (
                isPaused ? (
                  <span>रुका हुआ / Paused</span>
                ) : (
                  <span>सुन रहे हैं / Playing</span>
                )
              ) : (
                <span>सुनें / Play</span>
              )}
            </span>
          </div>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800/30"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        {errorMessage && <div className="px-3 pb-2 text-xs text-red-600 dark:text-red-400">{errorMessage}</div>}

        <CollapsibleContent>
          <div className="p-3 pt-0 space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={skipBackward}
                disabled={currentPosition === 0}
                className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800/30 disabled:opacity-50"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <div className="text-xs text-gray-600 dark:text-gray-400">{formatProgress()}</div>

              <Button
                variant="ghost"
                size="icon"
                onClick={skipForward}
                disabled={currentPosition === totalLength - 1}
                className="text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800/30 disabled:opacity-50"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Language selection */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 dark:text-gray-300">भाषा / Language</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => (language === "en" ? null : document.dispatchEvent(new Event("toggleLanguage")))}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    language === "en"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => (language === "hi" ? null : document.dispatchEvent(new Event("toggleLanguage")))}
                  className={`text-xs px-3 py-1.5 rounded-md ${
                    language === "hi"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Speed control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 dark:text-gray-300">गति / Speed</span>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{rate}x</span>
              </div>
              <Slider
                value={[rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handleRateChange}
                className="[&>.slider-thumb]:bg-orange-600 [&>.slider-track]:bg-orange-200 dark:[&>.slider-track]:bg-orange-800/50 [&>.slider-range]:bg-orange-500"
              />
            </div>

            {/* Volume control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 dark:text-gray-300">आवाज़ / Volume</span>
                <Volume2 className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              </div>
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="[&>.slider-thumb]:bg-orange-600 [&>.slider-track]:bg-orange-200 dark:[&>.slider-track]:bg-orange-800/50 [&>.slider-range]:bg-orange-500"
              />
            </div>

            {/* Voice selection if multiple voices available */}
            {availableVoices.length > 1 && (
              <div className="space-y-1">
                <label htmlFor="voice-select" className="text-xs text-gray-700 dark:text-gray-300">
                  आवाज़ चुनें / Voice
                </label>
                <select
                  id="voice-select"
                  className="w-full rounded-md border border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-800 px-3 py-1 text-sm"
                  value={voice?.name || ""}
                  onChange={(e) => {
                    const selectedVoice = availableVoices.find((v) => v.name === e.target.value)
                    if (selectedVoice) setVoice(selectedVoice)
                  }}
                >
                  {availableVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Device compatibility info */}
            <div className="mt-2 pt-2 border-t border-orange-200 dark:border-orange-800">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <span className="font-medium">Device compatibility:</span> Android, iOS, Desktop
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Tip:</span> For best results on mobile, keep the screen on while
                listening.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
