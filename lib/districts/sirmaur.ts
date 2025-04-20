import type { DistrictInfo } from "@/lib/district-data"

export const sirmaurDistrict: DistrictInfo = {
  name: "Sirmaur",
  slug: "sirmaur",
  description: "Home to Nahan and Renuka Lake, known for its diverse geography and cultural heritage.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "2,825 sq km",
    elevation: "300-3,000 meters",
    terrain: "Diverse with plains, hills, and mountains",
    rivers: ["Yamuna", "Giri", "Tons", "Bata"],
  },
  climate: {
    summer: "20°C to 38°C (April to June)",
    winter: "5°C to 25°C (October to March)",
    rainfall: "1,500 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "529,855 (2011 Census)",
    density: "188/sq km",
    literacy: "79.4%",
    languages: ["Hindi", "Pahari", "Gojri"],
  },
  economy: {
    mainSectors: ["Agriculture", "Horticulture", "Industry", "Tourism"],
    specialties: ["Ginger cultivation", "Tomatoes", "Mushrooms"],
    industries: ["Pharmaceuticals", "Breweries", "Food processing"],
  },
  tourism: {
    attractions: [
      {
        name: "Nahan",
        description: "Picturesque town with colonial architecture",
        type: "Cultural",
      },
      {
        name: "Renuka Lake",
        description: "Largest natural lake in Himachal shaped like a reclining woman",
        type: "Nature",
      },
      {
        name: "Churdhar Peak",
        description: "Highest peak in outer Himalayas with trekking opportunities",
        type: "Adventure",
      },
      {
        name: "Shivalik Fossil Park",
        description: "Park with prehistoric fossils and geological importance",
        type: "Cultural",
      },
      {
        name: "Trilokpur Temple",
        description: "Ancient temple dedicated to Goddess Mahamaya",
        type: "Religious",
      },
    ],
    festivals: ["Renuka Fair", "Bawan Dwadashi", "Haripur Dhar Fair"],
  },
  transportation: {
    nearestAirport: "Chandigarh Airport - 90 km from Nahan",
    railwayConnectivity: "No direct railway connection. Nearest station is Kalka (80 km from Nahan)",
    roadConnectivity: "Connected by NH-7 and state highways",
    localTransport: ["HRTC buses", "Taxis"],
  },
  cuisine: {
    famousDishes: ["Madra", "Dham", "Chana Madra", "Beduan"],
    specialties: ["Sirmauri Dham", "Ginger products"],
  },
  culture: {
    traditions: ["Pahari culture", "Gujjar tribal culture"],
    crafts: ["Bamboo crafts", "Wood carving"],
    dances: ["Nati", "Gee Dance", "Jhamakra"],
  },
  education: {
    universities: ["Dr. YS Parmar University of Horticulture and Forestry (Nauni)"],
    colleges: ["Government College Nahan", "LSBT Girls College"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Nahan", "Civil Hospital Paonta Sahib"],
  },
  emergencyContacts: {
    police: "100 or 01702-222202",
    ambulance: "108",
    fireStation: "101 or 01702-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What is the legend behind Renuka Lake?",
      answer:
        "According to legend, Renuka Lake is named after the mother of Lord Parashurama. The lake is shaped like a reclining woman and is believed to be the embodiment of Renuka Devi. The annual Renuka Fair is held here, attracting thousands of devotees.",
    },
    {
      question: "What is special about Churdhar Peak?",
      answer:
        "Churdhar Peak, at 3,647 meters, is the highest peak in the outer Himalayas. It's known for its trekking trails, panoramic views, and the temple of Srigul (Lord Shiva). The peak is also a wildlife sanctuary home to monal pheasants, musk deer, and bears.",
    },
    {
      question: "Why is Nahan historically important?",
      answer:
        "Nahan was the capital of the former princely state of Sirmaur. Founded in 1621 by Raja Karam Prakash, it's known for its well-planned layout, colonial architecture, and the Jama Masjid built without using a single nail. The town is also home to the Ranital Lake and Jaitak Fort.",
    },
    {
      question: "What is the significance of Shivalik Fossil Park?",
      answer:
        "Shivalik Fossil Park in Suketi is one of the few fossil parks in Asia. It contains fossils of prehistoric animals like stegodonts, hippopotamuses, and giant turtles that lived 2.5 to 1 million years ago. The park includes life-size models of these extinct animals.",
    },
    {
      question: "What are the adventure activities available in Sirmaur?",
      answer:
        "Adventure activities in Sirmaur include trekking to Churdhar Peak, angling in Tons and Giri rivers, camping at Renuka Lake, wildlife spotting in Kalesar National Park, and exploring the Giri Ganga valley. The diverse terrain offers opportunities for both beginners and experienced adventurers.",
    },
  ],
}
