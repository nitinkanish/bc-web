import type { DistrictInfo } from "@/lib/district-data"

export const chambaDistrict: DistrictInfo = {
  name: "Chamba",
  slug: "chamba",
  description: "Known for its ancient temples and Minjar fair, with rich cultural heritage and scenic beauty.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "6,528 sq km",
    elevation: "996 meters (3,268 ft)",
    terrain: "Mountainous with valleys, rivers, and forests",
    rivers: ["Ravi", "Chenab", "Siul"],
  },
  climate: {
    summer: "15°C to 30°C (April to June)",
    winter: "0°C to 15°C (October to March)",
    rainfall: "1,500 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "518,844 (2011 Census)",
    density: "80/sq km",
    literacy: "73.19%",
    languages: ["Hindi", "Chambiali", "Pahari", "Gaddi"],
  },
  economy: {
    mainSectors: ["Agriculture", "Tourism", "Handicrafts", "Hydropower"],
    specialties: ["Chamba Rumal", "Chamba Chappal", "Apple cultivation"],
    industries: ["Handicrafts", "Hydroelectric power", "Tourism"],
  },
  tourism: {
    attractions: [
      {
        name: "Chamba Town",
        description: "Ancient town with historic Chowgan and temples",
        type: "Cultural",
      },
      {
        name: "Khajjiar",
        description: "Mini Switzerland of India with meadows and forests",
        type: "Nature",
      },
      {
        name: "Dalhousie",
        description: "Colonial hill station with scenic beauty",
        type: "Nature",
      },
      {
        name: "Manimahesh Lake",
        description: "Sacred high-altitude lake with pilgrimage significance",
        type: "Religious",
      },
      {
        name: "Bhuri Singh Museum",
        description: "Museum with Pahari paintings and artifacts",
        type: "Cultural",
      },
    ],
    festivals: ["Minjar Fair", "Manimahesh Yatra", "Sui Mata Festival"],
  },
  transportation: {
    nearestAirport: "Gaggal Airport (Kangra) - 120 km",
    railwayConnectivity: "No direct railway connection. Nearest station is Pathankot (120 km)",
    roadConnectivity: "Connected by NH-154 and NH-503",
    localTransport: ["HRTC buses", "Taxis"],
  },
  cuisine: {
    famousDishes: ["Madra", "Chha Gosht", "Babru", "Aktori"],
    specialties: ["Chamba Chukh", "Bhaturu with Jhol"],
  },
  culture: {
    traditions: ["Pahari culture", "Gaddi tribal culture"],
    crafts: ["Chamba Rumal", "Chamba Chappal", "Wood carving"],
    dances: ["Dangi", "Gaddis", "Chamba's folk dance"],
  },
  education: {
    universities: [],
    colleges: ["Government College Chamba", "NSCBM Government College"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Chamba", "Civil Hospital Dalhousie"],
  },
  emergencyContacts: {
    police: "100 or 01899-222202",
    ambulance: "108",
    fireStation: "101 or 01899-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What is the Minjar Fair and when is it celebrated?",
      answer:
        "Minjar Fair is Chamba's most famous festival, celebrated annually in July/August. It marks the beginning of the corn harvest season. The week-long fair features cultural performances, processions, sports competitions, and concludes with the immersion of Minjar (silk tassels representing corn blossoms) in the Ravi River.",
    },
    {
      question: "Why is Khajjiar called the 'Mini Switzerland of India'?",
      answer:
        "Khajjiar is called the 'Mini Switzerland of India' because of its resemblance to Swiss landscapes with its lush green meadows, dense forests, and a lake surrounded by cedar trees. In 1992, the Swiss Ambassador to India placed a Swiss signpost in Khajjiar, marking its resemblance to Switzerland.",
    },
    {
      question: "What is the Manimahesh Yatra?",
      answer:
        "Manimahesh Yatra is an important pilgrimage to the sacred Manimahesh Lake (4,080 meters) held during August/September. Thousands of devotees trek to the lake, which is believed to be the abode of Lord Shiva. The pilgrimage coincides with Janmashtami and continues for 15 days.",
    },
    {
      question: "What is special about Chamba Rumal?",
      answer:
        "Chamba Rumal is a traditional embroidered handkerchief known for its double-satin stitch work depicting scenes from Krishna Leela and other mythological stories. This centuries-old craft is unique to Chamba and is recognized as a Geographical Indication (GI) product.",
    },
    {
      question: "What are the must-visit places in Chamba district?",
      answer:
        "Must-visit places include Chamba town with its ancient temples and Chowgan, Khajjiar, Dalhousie, Manimahesh Lake, Kalatop Wildlife Sanctuary, Bhuri Singh Museum, Chamunda Devi Temple, and Pangi Valley for adventure enthusiasts.",
    },
  ],
}
