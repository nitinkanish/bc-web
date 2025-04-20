// Shared cache for cricket API responses
const API_CACHE: Record<string, { data: any; timestamp: number }> = {}
const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours in milliseconds

export interface TeamStats {
  teamname: string
  shortname: string
  img: string
  matches: number
  wins: number
  loss: number
  ties: number
  nr: number
}

export interface MatchInfo {
  id: string
  name: string
  matchType: string
  status: string
  venue: string
  date: string
  dateTimeGMT: string
  teams: string[]
  fantasyEnabled: boolean
  bbbEnabled: boolean
  hasSquad: boolean
  matchStarted: boolean
  matchEnded: boolean
}

export interface SeriesInfo {
  info: {
    id: string
    name: string
    startdate: string
    enddate: string
    odi: number
    t20: number
    test: number
    squads: number
    matches: number
  }
  matchList: MatchInfo[]
}

/**
 * Fetches data from the Cricket API with caching
 */
export async function fetchCricketData<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  // Create a cache key from the endpoint and params
  const queryString = new URLSearchParams(params).toString()
  const cacheKey = `${endpoint}?${queryString}`

  // Check if we have a valid cache entry
  const cacheEntry = API_CACHE[cacheKey]
  const now = Date.now()

  if (cacheEntry && now - cacheEntry.timestamp < CACHE_DURATION) {
    console.log(`Using cached data for ${cacheKey}`)
    return cacheEntry.data as T
  }

  try {
    // Build the full URL
    const baseUrl = "https://api.cricapi.com/v1"
    const apiKey = "70d0ce87-a578-47aa-b687-053f781615c2"
    const url = `${baseUrl}/${endpoint}?apikey=${apiKey}&${queryString}`

    console.log(`Fetching fresh data from ${endpoint}`)
    const response = await fetch(url, {
      next: { revalidate: CACHE_DURATION / 1000 }, // Convert ms to seconds
    })

    if (!response.ok) {
      throw new Error(`Cricket API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Cache the result
    API_CACHE[cacheKey] = { data, timestamp: now }

    return data as T
  } catch (error) {
    console.error(`Error fetching cricket data from ${endpoint}:`, error)

    // If we have a stale cache entry, return it rather than failing
    if (cacheEntry) {
      console.warn(`Using stale cache for ${cacheKey} due to request error`)
      return cacheEntry.data as T
    }

    // Return a sensible default based on the expected return type
    return {} as T
  }
}

/**
 * Gets the IPL points table
 */
export async function getIPLPointsTable(): Promise<TeamStats[]> {
  try {
    const data = await fetchCricketData<{ data: TeamStats[] }>("series_points", {
      id: "d5a498c8-7596-4b93-8ab0-e0efc3345312",
    })
    return data.data || []
  } catch (error) {
    console.error("Error in getIPLPointsTable:", error)
    return []
  }
}

/**
 * Gets the IPL series information including match list
 */
export async function getIPLSeriesInfo(): Promise<SeriesInfo> {
  try {
    const data = await fetchCricketData<{ data: SeriesInfo }>("series_info", {
      id: "d5a498c8-7596-4b93-8ab0-e0efc3345312",
    })
    return data.data || { info: {} as any, matchList: [] }
  } catch (error) {
    console.error("Error in getIPLSeriesInfo:", error)
    return { info: {} as any, matchList: [] }
  }
}

/**
 * Gets upcoming IPL matches
 */
export async function getUpcomingIPLMatches(limit = 5): Promise<MatchInfo[]> {
  try {
    const seriesInfo = await getIPLSeriesInfo()

    // Filter for upcoming matches (not started or not ended)
    const now = new Date()
    const upcomingMatches = seriesInfo.matchList
      .filter((match) => {
        const matchDate = new Date(match.dateTimeGMT)
        return matchDate > now || !match.matchEnded
      })
      .slice(0, limit)

    return upcomingMatches
  } catch (error) {
    console.error("Error in getUpcomingIPLMatches:", error)
    return []
  }
}

/**
 * Gets recent IPL matches
 */
export async function getRecentIPLMatches(limit = 5): Promise<MatchInfo[]> {
  try {
    const seriesInfo = await getIPLSeriesInfo()

    // Filter for completed matches
    const recentMatches = seriesInfo.matchList.filter((match) => match.matchEnded).slice(0, limit)

    return recentMatches
  } catch (error) {
    console.error("Error in getRecentIPLMatches:", error)
    return []
  }
}

/**
 * Gets the current/live IPL match if any
 */
export async function getCurrentIPLMatch(): Promise<MatchInfo | null> {
  try {
    const seriesInfo = await getIPLSeriesInfo()

    // Find a match that has started but not ended
    const liveMatch = seriesInfo.matchList.find((match) => match.matchStarted && !match.matchEnded)

    return liveMatch || null
  } catch (error) {
    console.error("Error in getCurrentIPLMatch:", error)
    return null
  }
}
