import type { DistrictInfo } from "@/lib/district-data"

export const mandiDistrict: DistrictInfo = {
  name: "Mandi",
  slug: "mandi",
  description:
    "Known as the cultural capital of Himachal Pradesh with numerous ancient temples and historical significance.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "3,950 sq km",
    elevation: "800 meters (2,625 ft)",
    terrain: "Valley region with hills and rivers",
    rivers: ["Beas", "Suketi", "Uhl"],
  },
  climate: {
    summer: "20°C to 36°C (April to June)",
    winter: "4°C to 15°C (October to March)",
    rainfall: "1,300 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "999,777 (2011 Census)",
    density: "253/sq km",
    literacy: "81.5%",
    languages: ["Hindi", "Mandyali", "Kullvi"],
  },
  economy: {
    mainSectors: ["Agriculture", "Horticulture", "Tourism", "Hydropower"],
    specialties: ["Rice cultivation", "Fruit orchards"],
    industries: ["Cement", "Hydroelectric power", "Food processing"],
  },
  tourism: {
    attractions: [
      {
        name: "Rewalsar Lake",
        description: "Sacred lake important to Hindus, Buddhists, and Sikhs",
        type: "Religious",
      },
      {
        name: "Barot Valley",
        description: "Scenic valley with trout fishing and adventure activities",
        type: "Nature",
      },
      {
        name: "Prashar Lake",
        description: "High altitude lake with a pagoda-like temple",
        type: "Nature",
      },
      {
        name: "Panchvaktra Temple",
        description: "Ancient temple dedicated to Lord Shiva with five faces",
        type: "Religious",
      },
      {
        name: "Kamru Nag Lake",
        description: "Sacred lake surrounded by dense forests",
        type: "Nature",
      },
    ],
    festivals: ["Shivratri Fair", "Prashar Fair", "Rewalsar Fair"],
  },
  transportation: {
    nearestAirport: "Bhuntar Airport (Kullu) - 60 km",
    railwayConnectivity: "No direct railway connection. Nearest station is Kiratpur Sahib (Punjab) - 100 km",
    roadConnectivity: "Well-connected by NH-3 and NH-154",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Madra", "Sepubari", "Dham", "Bhey", "Pateer"],
    specialties: ["Mandi Dham", "Sepu Vadi"],
  },
  culture: {
    traditions: ["Pahari culture", "Temple architecture"],
    crafts: ["Stone carving", "Metal crafts"],
    dances: ["Nati", "Jhanjhar", "Luddi"],
  },
  education: {
    universities: ["Indian Institute of Technology (IIT) Mandi"],
    colleges: ["Vallabh Government College", "NSCBM Government College"],
  },
  healthcare: {
    majorHospitals: ["Zonal Hospital Mandi", "ESI Hospital", "Shri Lal Bahadur Shastri Medical College"],
  },
  emergencyContacts: {
    police: "100 or 01905-225002",
    ambulance: "108",
    fireStation: "101 or 01905-235100",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "Why is Mandi called the 'Varanasi of Hills'?",
      answer:
        "Mandi is called the 'Varanasi of Hills' or 'Choti Kashi' because of its numerous ancient temples (over 80) along the banks of river Beas, similar to Varanasi's temples along the Ganges.",
    },
    {
      question: "What is special about Mandi's Shivratri Fair?",
      answer:
        "Mandi's International Shivratri Fair is a unique week-long festival where local deities from surrounding villages are brought in procession to pay homage to Lord Shiva. It features cultural performances, crafts, and traditional markets.",
    },
    {
      question: "How to reach Prashar Lake from Mandi?",
      answer:
        "Prashar Lake is about 49 km from Mandi town. You can take a taxi or bus to Baggi village and then trek 7-8 km to reach the lake. The journey takes approximately 3-4 hours.",
    },
    {
      question: "What are the adventure activities available in Mandi district?",
      answer:
        "Mandi offers various adventure activities including trekking (Prashar Lake, Barot Valley), river rafting in Beas, paragliding at Joginder Nagar, angling/fishing at Barot, and camping in various locations.",
    },
    {
      question: "What is Mandi Dham and what makes it special?",
      answer:
        "Mandi Dham is a traditional feast prepared during ceremonies and festivals. It's special because it includes multiple dishes served in a specific sequence on a leaf plate, featuring local specialties like madra, sepu vadi, and various lentil preparations.",
    },
  ],
}
