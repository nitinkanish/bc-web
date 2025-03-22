// Weather API integration using OpenWeatherMap (free tier)

export interface WeatherData {
  current: {
    temp: number
    feels_like: number
    humidity: number
    wind_speed: number
    weather: {
      main: string
      description: string
      icon: string
    }[]
  }
  daily: Array<{
    dt: number
    temp: {
      min: number
      max: number
    }
    weather: {
      main: string
      description: string
      icon: string
    }[]
  }>
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

export async function getWeatherForDistrict(districtSlug: string): Promise<WeatherData | null> {
  try {
    const coordinates = DISTRICT_COORDINATES[districtSlug as keyof typeof DISTRICT_COORDINATES]

    if (!coordinates) {
      console.error(`No coordinates found for district: ${districtSlug}`)
      return null
    }

    const apiKey = process.env.OPENWEATHER_API_KEY || "YOUR_OPENWEATHER_API_KEY"
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`

    const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Transform the data to match our interface
    const weatherData: WeatherData = {
      current: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        weather: data.current.weather,
      },
      daily: data.daily.slice(0, 7).map((day: any) => ({
        dt: day.dt * 1000, // Convert to milliseconds
        temp: {
          min: day.temp.min,
          max: day.temp.max,
        },
        weather: day.weather,
      })),
    }

    return weatherData
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return null
  }
}

// Fallback function to use when API fails or for development
export function getMockWeatherForDistrict(districtSlug: string): WeatherData {
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

  return {
    current: {
      temp: currentTemp,
      feels_like: currentTemp - Math.floor(Math.random() * 3),
      humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
      wind_speed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      weather: [
        {
          main: weatherCondition,
          description: `${weatherCondition.toLowerCase()} sky`,
          icon: iconCode,
        },
      ],
    },
    daily: Array.from({ length: 7 }, (_, i) => {
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
        dt: Date.now() + (i + 1) * 86400000, // Current date + (i+1) days in milliseconds
        temp: dayTemp,
        weather: [
          {
            main: dayCondition,
            description: `${dayCondition.toLowerCase()} sky`,
            icon: dayIconCode,
          },
        ],
      }
    }),
  }
}

