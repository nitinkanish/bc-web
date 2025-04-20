import type { DistrictInfo } from "@/lib/district-data"

export const kulluDistrict: DistrictInfo = {
  name: "Kullu",
  slug: "kullu",
  description:
    "Famous for Kullu Dussehra and Manali, known for its scenic beauty, adventure sports, and apple orchards.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "5,503 sq km",
    elevation: "1,200 meters (3,937 ft)",
    terrain: "Mountainous with valleys, rivers, and forests",
    rivers: ["Beas", "Parvati", "Sainj", "Tirthan"],
  },
  climate: {
    summer: "15°C to 30°C (April to June)",
    winter: "-1°C to 12°C (October to March)",
    rainfall: "1,000 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "437,903 (2011 Census)",
    density: "80/sq km",
    literacy: "80.14%",
    languages: ["Hindi", "Kullvi", "Pahari"],
  },
  economy: {
    mainSectors: ["Tourism", "Horticulture", "Agriculture", "Handicrafts"],
    specialties: ["Apple cultivation", "Handloom products", "Adventure tourism"],
    industries: ["Food processing", "Tourism", "Handicrafts"],
  },
  tourism: {
    attractions: [
      {
        name: "Manali",
        description: "Popular hill station with adventure activities and scenic beauty",
        type: "Nature",
      },
      {
        name: "Rohtang Pass",
        description: "High mountain pass with snow-covered landscapes",
        type: "Nature",
      },
      {
        name: "Solang Valley",
        description: "Adventure sports hub with skiing and paragliding",
        type: "Adventure",
      },
      {
        name: "Hadimba Temple",
        description: "Ancient wooden temple dedicated to Goddess Hadimba",
        type: "Religious",
      },
      {
        name: "Great Himalayan National Park",
        description: "UNESCO World Heritage Site with rich biodiversity",
        type: "Nature",
      },
    ],
    festivals: ["Kullu Dussehra", "Pipal Jatra", "Fagli Festival"],
  },
  transportation: {
    nearestAirport: "Bhuntar Airport (Kullu-Manali Airport) - 10 km from Kullu",
    railwayConnectivity: "No direct railway connection. Nearest station is Joginder Nagar (100 km)",
    roadConnectivity: "Connected by NH-3 (Chandigarh-Manali Highway)",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Siddu", "Babru", "Aktori", "Chha Gosht", "Dham"],
    specialties: ["Trout fish", "Apple products", "Local honey"],
  },
  culture: {
    traditions: ["Pahari culture", "Devta worship"],
    crafts: ["Kullu shawls", "Caps", "Pattoo"],
    dances: ["Nati", "Harul", "Rakhi"],
  },
  education: {
    universities: [],
    colleges: ["Government College Kullu", "Government College Manali"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Kullu", "Lady Willingdon Hospital Manali"],
  },
  emergencyContacts: {
    police: "100 or 01902-222330",
    ambulance: "108",
    fireStation: "101 or 01902-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What is special about Kullu Dussehra?",
      answer:
        "Kullu Dussehra is a unique week-long international festival that begins when Dussehra ends in the rest of India. It features processions of local deities, cultural performances, and a large fair. It's celebrated to commemorate Lord Rama's victory over Ravana.",
    },
    {
      question: "What are the best adventure activities in Kullu-Manali?",
      answer:
        "Popular adventure activities include paragliding in Solang Valley, river rafting in Beas, trekking to Hampta Pass and Beas Kund, skiing in winter, mountain biking, and zorbing.",
    },
    {
      question: "When is Rohtang Pass open for tourists?",
      answer:
        "Rohtang Pass is typically open from May/June to October/November, depending on weather conditions. It remains closed during winter due to heavy snowfall. Visitors need to obtain permits to visit Rohtang Pass.",
    },
    {
      question: "What are the famous souvenirs to buy from Kullu?",
      answer:
        "Famous souvenirs include Kullu shawls, Himachali caps, handwoven pattoos, apple products (jams, cider, wine), pine nut oil, local handicrafts, and Kullu honey.",
    },
    {
      question: "How to reach Manali from Delhi?",
      answer:
        "You can reach Manali from Delhi by road (550 km, 12-14 hours by bus or car), by air to Bhuntar Airport (Kullu) followed by a 1-hour drive, or by train to Chandigarh/Ambala followed by a road journey.",
    },
  ],
}
