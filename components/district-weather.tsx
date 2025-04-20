"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Eye } from "lucide-react"
import { getWeatherForDistrict, getMockWeatherForDistrict, type CombinedWeatherData } from "@/lib/weather-api"

interface DistrictWeatherProps {
  districtSlug: string
  districtName: string
}

// Memoized weather icon component for better performance
const WeatherIcon = memo(({ iconCode }: { iconCode: string }) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  switch (iconCode.substring(0, 2)) {
    case "01": // Clear
      return <Sun className="h-8 w-8 text-yellow-500" />
    case "02": // Few clouds
    case "03": // Scattered clouds
    case "04": // Broken clouds
      return <Cloud className="h-8 w-8 text-gray-400" />
    case "09": // Shower rain
    case "10": // Rain
      return <CloudRain className="h-8 w-8 text-blue-400" />
    case "11": // Thunderstorm
      return <CloudLightning className="h-8 w-8 text-yellow-400" />
    case "13": // Snow
      return <CloudSnow className="h-8 w-8 text-blue-200" />
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />
  }
})

// Format day function
const formatDay = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: "short" })
}

function DistrictWeather({ districtSlug, districtName }: DistrictWeatherProps) {
  const [weather, setWeather] = useState<CombinedWeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Use useCallback to prevent unnecessary re-renders
  const fetchWeather = useCallback(async () => {
    setIsLoading(true)
    try {
      // Try to get real weather data
      const weatherData = await getWeatherForDistrict(districtSlug)

      // If real data fails, use mock data
      if (!weatherData) {
        const mockData = getMockWeatherForDistrict(districtSlug)
        setWeather(mockData)
      } else {
        setWeather(weatherData)
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      // Fallback to mock data on error
      const mockData = getMockWeatherForDistrict(districtSlug)
      setWeather(mockData)
    } finally {
      setIsLoading(false)
    }
  }, [districtSlug])

  useEffect(() => {
    fetchWeather()

    // Set up a refresh interval (every 30 minutes)
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [fetchWeather])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather in {districtName}</CardTitle>
          <CardDescription>Current conditions and forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weather in {districtName}</CardTitle>
          <CardDescription>Current conditions and forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Weather data unavailable</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather in {districtName}</CardTitle>
        <CardDescription>Current conditions and forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="current">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <WeatherIcon iconCode={weather.current.weather[0].icon} />
                <div className="ml-4">
                  <div className="text-3xl font-bold">{Math.round(weather.current.temp)}°C</div>
                  <div className="text-sm text-muted-foreground">{weather.current.weather[0].main}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm">Feels like: {Math.round(weather.current.feels_like)}°C</div>
                <div className="text-xs text-muted-foreground">
                  {weather.location.name}, {weather.location.country}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Humidity</div>
                  <div className="text-sm text-muted-foreground">{Math.round(weather.current.humidity)}%</div>
                </div>
              </div>
              <div className="flex items-center">
                <Wind className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Wind</div>
                  <div className="text-sm text-muted-foreground">{Math.round(weather.current.wind_speed)} m/s</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">Visibility</div>
                  <div className="text-sm text-muted-foreground">
                    {(weather.current.visibility / 1000).toFixed(1)} km
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium">UV Index</div>
                  <div className="text-sm text-muted-foreground">{Math.round(weather.current.uvi)}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="pt-4">
            <div className="grid grid-cols-5 gap-2">
              {weather.daily.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-sm font-medium">{formatDay(day.dt)}</div>
                  <div className="my-2">
                    <WeatherIcon iconCode={day.weather[0].icon} />
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">{Math.round(day.temp.max)}°</span>
                    <span className="text-muted-foreground ml-1">{Math.round(day.temp.min)}°</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{Math.round(day.pop * 100)}%</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Export memoized component to prevent unnecessary re-renders
export default memo(DistrictWeather)
