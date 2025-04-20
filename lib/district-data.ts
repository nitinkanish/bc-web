import { shimlaDistrict } from "./districts/shimla"
import { mandiDistrict } from "./districts/mandi"
import { kangraDistrict } from "./districts/kangra"
import { solanDistrict } from "./districts/solan"
import { kulluDistrict } from "./districts/kullu"
import { hamirpurDistrict } from "./districts/hamirpur"
import { bilaspurDistrict } from "./districts/bilaspur"
import { unaDistrict } from "./districts/una"
import { chambaDistrict } from "./districts/chamba"
import { sirmaurDistrict } from "./districts/sirmaur"
import { kinnaurDistrict } from "./districts/kinnaur"
import { lahaulSpitiDistrict } from "./districts/lahaul-spiti"

export interface DistrictInfo {
  name: string
  slug: string
  description: string
  image: string
  geography: {
    area: string
    elevation: string
    terrain: string
    rivers: string[]
  }
  climate: {
    summer: string
    winter: string
    rainfall: string
    bestTimeToVisit: string
  }
  demographics: {
    population: string
    density: string
    literacy: string
    languages: string[]
  }
  economy: {
    mainSectors: string[]
    specialties: string[]
    industries: string[]
  }
  tourism: {
    attractions: Array<{
      name: string
      description: string
      type: "Nature" | "Religious" | "Historical" | "Adventure" | "Cultural"
    }>
    festivals: string[]
  }
  transportation: {
    nearestAirport: string
    railwayConnectivity: string
    roadConnectivity: string
    localTransport: string[]
  }
  cuisine: {
    famousDishes: string[]
    specialties: string[]
  }
  culture: {
    traditions: string[]
    crafts: string[]
    dances: string[]
  }
  education: {
    universities: string[]
    colleges: string[]
  }
  healthcare: {
    majorHospitals: string[]
  }
  emergencyContacts: {
    police: string
    ambulance: string
    fireStation: string
    touristHelpline: string
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const DISTRICTS_DATA: Record<string, DistrictInfo> = {
  shimla: shimlaDistrict,
  mandi: mandiDistrict,
  kangra: kangraDistrict,
  solan: solanDistrict,
  kullu: kulluDistrict,
  hamirpur: hamirpurDistrict,
  bilaspur: bilaspurDistrict,
  una: unaDistrict,
  chamba: chambaDistrict,
  sirmaur: sirmaurDistrict,
  kinnaur: kinnaurDistrict,
  "lahaul-spiti": lahaulSpitiDistrict,
}

// Helper function to get district by slug
export function getDistrictBySlug(slug: string): DistrictInfo | null {
  return DISTRICTS_DATA[slug] || null
}

// Helper function to get all districts
export function getAllDistricts(): DistrictInfo[] {
  return Object.values(DISTRICTS_DATA)
}
