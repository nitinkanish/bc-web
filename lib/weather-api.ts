// Weather API integration using OpenWeatherMap (free tier only)

// OpenWeatherMap API key
const apiKey = "e7b41eb850f67c6767883abbc12ca0a1"

// Interface for OpenWeatherMap current weather response
export interface OpenWeatherCurrentResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  rain?: {
    "1h"?: number
    "3h"?: number
  }
  snow?: {
    "1h"?: number
    "3h"?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

// Interface for OpenWeatherMap 5-day forecast response
export interface OpenWeatherForecastResponse {
  cod: string
  message: number
  cnt: number
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
      gust?: number
    }
    visibility: number
    pop: number
    rain?: {
      "3h": number
    }
    snow?: {
      "3h": number
    }
    sys: {
      pod: string
    }
    dt_txt: string
  }>
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

// Combined weather data interface for district weather
export interface CombinedWeatherData {
  current: {
    dt: number
    temp: number
    feels_like: number
    humidity: number
    wind_speed: number
    visibility: number
    uvi: number // Note: This will be mocked as it's not in free API
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
  }
  daily: Array<{
    dt: number
    temp: {
      min: number
      max: number
    }
    humidity: number
    wind_speed: number
    pop: number
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
  }>
  location: {
    name: string
    country: string
  }
}

// District coordinates for weather API
export const DISTRICT_COORDINATES = {
  shimla: { lat: 31.1048, lon: 77.1734 },
  mandi: { lat: 31.5892, lon: 76.9182 },
  kangra: { lat: 32.0998, lon: 76.2691 },
  solan: { lat: 30.9045, lon: 77.0967 },
  kullu: { lat: 31.9592, lon: 77.1089 },
  hamirpur: { lat: 31.6895, lon: 76.5213 },
  bilaspur: { lat: 31.3342, lon: 76.7608 },
  una: { lat: 31.4685, lon: 76.2708 },
  chamba: { lat: 32.5534, lon: 76.1258 },
  sirmaur: { lat: 30.5691, lon: 77.2908 },
  kinnaur: { lat: 31.5652, lon: 78.4752 },
  "lahaul-spiti": { lat: 32.5798, lon: 77.3299 },
}

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

// Function to get data from cache or fetch it
async function getCachedData<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>,
  cacheDuration = CACHE_DURATION,
): Promise<T | null> {
  // Check if we have cached data and it's still valid
  const cachedItem = cache[cacheKey]
  if (cachedItem && Date.now() - cachedItem.timestamp < cacheDuration) {
    return cachedItem.data
  }

  try {
    // Fetch fresh data
    const data = await fetchFn()

    // Cache the result
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
    }

    return data
  } catch (error) {
    console.error(`Error fetching data for ${cacheKey}:`, error)

    // If we have stale cached data, return it as a fallback
    if (cachedItem) {
      console.log(`Using stale cached data for ${cacheKey}`)
      return cachedItem.data
    }

    return null
  }
}

// Function to get current weather data for a location
export async function getWeatherData(city: string): Promise<OpenWeatherCurrentResponse | null> {
  const cacheKey = `weather_current_${city}`

  return getCachedData(cacheKey, async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    return response.json()
  })
}

// Function to get 5-day forecast data for coordinates
async function getForecastData(lat: number, lon: number): Promise<OpenWeatherForecastResponse | null> {
  const cacheKey = `weather_forecast_${lat}_${lon}`

  return getCachedData(cacheKey, async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    return response.json()
  })
}

// Process forecast data to get daily forecasts (one per day)
function processForecastToDaily(forecast: OpenWeatherForecastResponse): Array<any> {
  const dailyForecasts: Record<string, any> = {}

  // Group forecasts by day
  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0]

    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        dt: item.dt,
        temp: {
          min: item.main.temp,
          max: item.main.temp,
        },
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        pop: item.pop,
        weather: item.weather,
        count: 1,
      }
    } else {
      const existing = dailyForecasts[date]

      // Update min/max temperatures
      existing.temp.min = Math.min(existing.temp.min, item.main.temp)
      existing.temp.max = Math.max(existing.temp.max, item.main.temp)

      // Average other values
      existing.humidity = (existing.humidity * existing.count + item.main.humidity) / (existing.count + 1)
      existing.wind_speed = (existing.wind_speed * existing.count + item.wind.speed) / (existing.count + 1)
      existing.pop = Math.max(existing.pop, item.pop) // Use maximum probability of precipitation

      // Use the weather from noon if available (as it's most representative)
      if (item.dt_txt.includes("12:00")) {
        existing.weather = item.weather
      }

      existing.count++
    }
  })

  // Convert to array and sort by date
  return Object.values(dailyForecasts)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5) // Limit to 5 days
}

// Function to get detailed weather data for a district using free APIs
export async function getWeatherForDistrict(districtSlug: string): Promise<CombinedWeatherData | null> {
  try {
    const coordinates = DISTRICT_COORDINATES[districtSlug as keyof typeof DISTRICT_COORDINATES]

    if (!coordinates) {
      console.error(`No coordinates found for district: ${districtSlug}`)
      return null
    }

    // Get current weather and forecast in parallel
    const [currentWeather, forecast] = await Promise.all([
      getWeatherByCoordinates(coordinates.lat, coordinates.lon),
      getForecastData(coordinates.lat, coordinates.lon),
    ])

    if (!currentWeather || !forecast) {
      throw new Error("Failed to fetch weather data")
    }

    // Process forecast data to get daily forecasts
    const dailyForecasts = processForecastToDaily(forecast)

    // Combine the data
    return {
      current: {
        dt: currentWeather.dt,
        temp: currentWeather.main.temp,
        feels_like: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        wind_speed: currentWeather.wind.speed,
        visibility: currentWeather.visibility,
        uvi: 5, // Mock UV index as it's not available in free API
        weather: currentWeather.weather,
      },
      daily: dailyForecasts,
      location: {
        name: currentWeather.name,
        country: currentWeather.sys.country,
      },
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return getMockWeatherForDistrict(districtSlug)
  }
}

// Function to get weather by coordinates
async function getWeatherByCoordinates(lat: number, lon: number): Promise<OpenWeatherCurrentResponse | null> {
  const cacheKey = `weather_current_${lat}_${lon}`

  return getCachedData(cacheKey, async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    return response.json()
  })
}

// Fallback function to use when API fails or for development
export function getMockWeatherForDistrict(districtSlug: string): CombinedWeatherData {
  // Generate realistic weather based on district's typical climate
  const isHighAltitude = ["kinnaur", "lahaul-spiti", "kullu", "chamba"].includes(districtSlug)
  const isLowAltitude = ["una", "bilaspur", "hamirpur"].includes(districtSlug)

  // Base temperature ranges adjusted by altitude
  let baseMinTemp = isHighAltitude ? 5 : isLowAltitude ? 15 : 10
  let baseMaxTemp = isHighAltitude ? 20 : isLowAltitude ? 35 : 25

  // Adjust for current season (simplified)
  const currentMonth = new Date().getMonth() // 0-11
  const isSummer = currentMonth >= 3 && currentMonth <= 8 // April to September

  if (isSummer) {
    baseMinTemp += 5
    baseMaxTemp += 5
  } else {
    baseMinTemp -= 5
    baseMaxTemp -= 5
  }

  // Current temperature
  const currentTemp = Math.floor(Math.random() * (baseMaxTemp - baseMinTemp)) + baseMinTemp

  // Weather conditions based on region and season
  const possibleConditions = isSummer
    ? isHighAltitude
      ? ["Clear", "Clouds", "Rain"]
      : ["Clear", "Clouds", "Rain", "Thunderstorm"]
    : isHighAltitude
      ? ["Clear", "Clouds", "Snow"]
      : ["Clear", "Clouds", "Rain"]

  const weatherCondition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)]

  // Generate icon code based on condition
  let iconCode = "01d" // default clear day
  switch (weatherCondition) {
    case "Clear":
      iconCode = "01d"
      break
    case "Clouds":
      iconCode = ["02d", "03d", "04d"][Math.floor(Math.random() * 3)]
      break
    case "Rain":
      iconCode = ["09d", "10d"][Math.floor(Math.random() * 2)]
      break
    case "Thunderstorm":
      iconCode = "11d"
      break
    case "Snow":
      iconCode = "13d"
      break
  }

  // Format district name
  const districtName = districtSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    current: {
      dt: Math.floor(Date.now() / 1000),
      temp: currentTemp,
      feels_like: currentTemp - Math.floor(Math.random() * 3),
      humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
      wind_speed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      visibility: 10000,
      uvi: Math.floor(Math.random() * 5) + 3, // 3-8
      weather: [
        {
          id: 800,
          main: weatherCondition,
          description: `${weatherCondition.toLowerCase()} sky`,
          icon: iconCode,
        },
      ],
    },
    daily: Array.from({ length: 5 }, (_, i) => {
      const dayTemp = {
        min: baseMinTemp + Math.floor(Math.random() * 5) - 2,
        max: baseMaxTemp + Math.floor(Math.random() * 5) - 2,
      }

      const dayCondition = possibleConditions[Math.floor(Math.random() * possibleConditions.length)]
      let dayIconCode = "01d"
      switch (dayCondition) {
        case "Clear":
          dayIconCode = "01d"
          break
        case "Clouds":
          dayIconCode = ["02d", "03d", "04d"][Math.floor(Math.random() * 3)]
          break
        case "Rain":
          dayIconCode = ["09d", "10d"][Math.floor(Math.random() * 2)]
          break
        case "Thunderstorm":
          dayIconCode = "11d"
          break
        case "Snow":
          dayIconCode = "13d"
          break
      }

      return {
        dt: Math.floor(Date.now() / 1000) + (i + 1) * 86400, // Current date + (i+1) days in seconds
        temp: dayTemp,
        humidity: Math.floor(Math.random() * 30) + 50,
        wind_speed: Math.floor(Math.random() * 20) + 5,
        pop: Math.random(),
        weather: [
          {
            id: 800,
            main: dayCondition,
            description: `${dayCondition.toLowerCase()} sky`,
            icon: dayIconCode,
          },
        ],
      }
    }),
    location: {
      name: districtName,
      country: "IN",
    },
  }
}

// For backward compatibility
export type WeatherData = CombinedWeatherData
