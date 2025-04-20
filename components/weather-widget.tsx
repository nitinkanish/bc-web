import { getWeatherData } from "@/lib/weather-api"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye } from "lucide-react"
import Link from "next/link"

export const revalidate = 3600 // Revalidate every hour

export default async function WeatherWidget() {
  const weatherData = await getWeatherData("Shimla")

  if (!weatherData) {
    return (
      <div className="bg-muted p-4 rounded-lg text-center">
        <p>Weather data unavailable</p>
      </div>
    )
  }

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return <CloudRain className="h-10 w-10 text-blue-500" />
    } else if (lowerCondition.includes("cloud")) {
      return <Cloud className="h-10 w-10 text-gray-500" />
    } else if (lowerCondition.includes("clear") || lowerCondition.includes("sun")) {
      return <Sun className="h-10 w-10 text-yellow-500" />
    } else {
      return <Cloud className="h-10 w-10 text-gray-500" />
    }
  }

 

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{weatherData.name} Weather</h3>
        <span className="text-sm text-muted-foreground">Today</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon(weatherData.weather[0].main)}
          <div className="ml-3">
            <div className="text-3xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
            <div className="text-sm text-muted-foreground capitalize">{weatherData.weather[0].description}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center">
          <Thermometer className="h-4 w-4 mr-2 text-red-500" />
          <div>
            <div className="text-sm text-muted-foreground">Feels like</div>
            <div className="font-medium">{Math.round(weatherData.main.feels_like)}°C</div>
          </div>
        </div>
        <div className="flex items-center">
          <Droplets className="h-4 w-4 mr-2 text-blue-500" />
          <div>
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="font-medium">{weatherData.main.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center">
          <Wind className="h-4 w-4 mr-2 text-gray-500" />
          <div>
            <div className="text-sm text-muted-foreground">Wind</div>
            <div className="font-medium">{Math.round(weatherData.wind.speed)} m/s</div>
          </div>
        </div>
        <div className="flex items-center">
          <Eye className="h-4 w-4 mr-2 text-gray-500" />
          <div>
            <div className="text-sm text-muted-foreground">Visibility</div>
            <div className="font-medium">{(weatherData.visibility / 1000).toFixed(1)} km</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Link href="/weather" className="text-sm text-primary hover:underline flex justify-center">
          View detailed forecast
        </Link>
      </div>
    </div>
  )
}
