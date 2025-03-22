"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
}

const DISTRICTS = [
  "Shimla",
  "Mandi",
  "Kangra",
  "Solan",
  "Kullu",
  "Hamirpur",
  "Bilaspur",
  "Una",
  "Chamba",
  "Sirmaur",
  "Kinnaur",
  "Lahaul and Spiti",
]

export default function WeatherWidget() {
  const { t, language } = useLanguage()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState("Shimla")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from a weather API
        // For this example, we'll use mock data
        const mockWeatherData: WeatherData = {
          location: selectedDistrict,
          temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
          condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][Math.floor(Math.random() * 4)],
          icon: ["sun", "cloud", "cloud-rain", "cloud-snow"][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
        }

        setWeather(mockWeatherData)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeather()
  }, [selectedDistrict])

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloud":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "cloud-rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      case "cloud-snow":
        return <CloudSnow className="h-8 w-8 text-blue-200" />
      case "cloud-lightning":
        return <CloudLightning className="h-8 w-8 text-yellow-400" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="bg-muted rounded-lg p-4 shadow-sm">
      <h3 className="font-bold mb-3">{t("weather")}</h3>

      <div className="mb-3">
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full p-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {DISTRICTS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
      ) : weather ? (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{weather.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weather.condition}</div>
            </div>
            {getWeatherIcon(weather.icon)}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Humidity:</span> {weather.humidity}%
            </div>
            <div className="flex items-center">
              <span className="text-muted-foreground mr-1">Wind:</span>
              <Wind className="h-3 w-3 mr-1" />
              {weather.windSpeed} km/h
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted-foreground">Weather data unavailable</div>
      )}
    </div>
  )
}

