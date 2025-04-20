import type { DistrictInfo } from "@/lib/district-data"

export const shimlaDistrict: DistrictInfo = {
  name: "Shimla",
  slug: "shimla",
  description:
    "The capital city and a popular tourist destination known for its colonial architecture and scenic beauty.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "5,131 sq km",
    elevation: "2,276 meters (7,467 ft)",
    terrain: "Mountainous with dense forests of pine, deodar, and oak",
    rivers: ["Sutlej", "Pabbar", "Giri"],
  },
  climate: {
    summer: "15°C to 30°C (April to June)",
    winter: "-2°C to 10°C (October to March)",
    rainfall: "1,500 mm annually, mostly during monsoon (July to September)",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "814,010 (2011 Census)",
    density: "159/sq km",
    literacy: "84.55%",
    languages: ["Hindi", "Pahari", "English"],
  },
  economy: {
    mainSectors: ["Tourism", "Horticulture", "Agriculture", "Government Services"],
    specialties: ["Apple cultivation", "Handicrafts", "Timber"],
    industries: ["Food processing", "Tourism", "Handicrafts"],
  },
  tourism: {
    attractions: [
      {
        name: "The Ridge",
        description: "Large open space in the heart of Shimla with panoramic views of the mountains",
        type: "Cultural",
      },
      {
        name: "Mall Road",
        description: "Main street with shops, restaurants, and colonial buildings",
        type: "Cultural",
      },
      {
        name: "Jakhu Temple",
        description: "Ancient temple dedicated to Lord Hanuman with a 108-feet statue",
        type: "Religious",
      },
      {
        name: "Kufri",
        description: "Popular hill station known for winter sports and scenic beauty",
        type: "Nature",
      },
      {
        name: "Viceregal Lodge",
        description: "Historical building that served as the residence of the British Viceroy",
        type: "Historical",
      },
    ],
    festivals: ["Summer Festival", "Winter Carnival", "Bhoj Fair", "Lavi Fair"],
  },
  transportation: {
    nearestAirport: "Shimla Airport (Jubbarhatti) - 22 km from city center",
    railwayConnectivity: "Shimla Railway Station - UNESCO World Heritage Kalka-Shimla Railway",
    roadConnectivity: "Well-connected by NH-5 to major cities like Chandigarh (115 km)",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Madra", "Dham", "Chha Gosht", "Babru", "Chana Madra"],
    specialties: ["Sidu", "Patande", "Kullu Trout"],
  },
  culture: {
    traditions: ["Pahari culture", "British colonial influence"],
    crafts: ["Shawls", "Wooden artifacts", "Pahari paintings"],
    dances: ["Nati", "Jhanjhar", "Gee Dance"],
  },
  education: {
    universities: ["Himachal Pradesh University"],
    colleges: ["St. Bede's College", "Rajkiya Kanya Mahavidyalaya", "Government College"],
  },
  healthcare: {
    majorHospitals: [
      "Indira Gandhi Medical College & Hospital",
      "Deen Dayal Upadhyay Hospital",
      "Kamla Nehru Hospital",
    ],
  },
  emergencyContacts: {
    police: "100 or 0177-2812344",
    ambulance: "108",
    fireStation: "101 or 0177-2804912",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What is the best time to visit Shimla?",
      answer:
        "The best time to visit Shimla is from March to June for pleasant weather and September to November for clear views. Winter (December to February) is ideal for snow experiences.",
    },
    {
      question: "How to reach Shimla from Delhi?",
      answer:
        "You can reach Shimla from Delhi by road (350 km, 7-8 hours), by train (Kalka-Shimla toy train after reaching Kalka), or by air to Shimla Airport.",
    },
    {
      question: "What are the must-visit places in Shimla?",
      answer:
        "Must-visit places include The Ridge, Mall Road, Jakhu Temple, Kufri, Christ Church, Viceregal Lodge, and nearby destinations like Naldehra and Tattapani.",
    },
    {
      question: "Is Shimla good for snow activities?",
      answer:
        "Yes, Shimla and nearby Kufri offer excellent snow activities like skiing, snowboarding, and snow trekking during winter months (December to February).",
    },
    {
      question: "What are the famous local products to buy in Shimla?",
      answer:
        "Famous local products include Kullu shawls, Himachali caps, wooden crafts, apple products, pine nut oil, and local handicrafts.",
    },
  ],
}
