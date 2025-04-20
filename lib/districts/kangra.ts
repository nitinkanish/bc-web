import type { DistrictInfo } from "@/lib/district-data"

export const kangraDistrict: DistrictInfo = {
  name: "Kangra",
  slug: "kangra",
  description:
    "Home to Dharamshala and the Dalai Lama, known for its Tibetan influence, tea gardens, and natural beauty.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "5,739 sq km",
    elevation: "700-2,000 meters",
    terrain: "Valleys, mountains, and foothills of Dhauladhar range",
    rivers: ["Beas", "Banganga", "Neugal", "Binwa"],
  },
  climate: {
    summer: "22°C to 38°C (April to June)",
    winter: "5°C to 20°C (October to March)",
    rainfall: "1,500-2,500 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "1,510,075 (2011 Census)",
    density: "263/sq km",
    literacy: "85.67%",
    languages: ["Hindi", "Kangri", "Tibetan", "English"],
  },
  economy: {
    mainSectors: ["Tourism", "Agriculture", "Handicrafts", "Tea production"],
    specialties: ["Kangra tea", "Tibetan handicrafts", "Miniature paintings"],
    industries: ["Tourism", "Tea processing", "Handicrafts"],
  },
  tourism: {
    attractions: [
      {
        name: "Dharamshala",
        description: "Home to the Dalai Lama and Tibetan government-in-exile",
        type: "Cultural",
      },
      {
        name: "McLeod Ganj",
        description: "Little Lhasa of India with Tibetan culture and monasteries",
        type: "Cultural",
      },
      {
        name: "Kangra Fort",
        description: "One of the oldest and largest forts in India",
        type: "Historical",
      },
      {
        name: "Masroor Rock Cut Temple",
        description: "8th-century monolithic temples carved out of rock",
        type: "Historical",
      },
      {
        name: "Dharamshala Cricket Stadium",
        description: "One of the highest cricket stadiums in the world",
        type: "Cultural",
      },
      {
        name: "Kangra Valley",
        description: "Scenic valley with tea gardens and Dhauladhar mountains",
        type: "Nature",
      },
    ],
    festivals: ["International Himalayan Festival", "Kangra Fair", "Minjar Fair"],
  },
  transportation: {
    nearestAirport: "Gaggal Airport (Kangra Airport) - 15 km from Dharamshala",
    railwayConnectivity: "Kangra Railway Station and Pathankot Railway Station (94 km)",
    roadConnectivity: "Well-connected by NH-154 and NH-503",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Dham", "Madra", "Chana Madra", "Babru", "Mittha"],
    specialties: ["Kangra Tea", "Tibetan momos", "Thukpa"],
  },
  culture: {
    traditions: ["Pahari culture", "Tibetan influence", "Gaddi tribal culture"],
    crafts: ["Kangra paintings", "Tibetan carpets", "Woodwork"],
    dances: ["Chamba Rumaal", "Nati", "Tibetan folk dances"],
  },
  education: {
    universities: ["Central University of Himachal Pradesh"],
    colleges: ["Government College Dharamshala", "CUHP Dharamshala Campus"],
  },
  healthcare: {
    majorHospitals: ["Dr. Rajendra Prasad Government Medical College", "Tanda Hospital", "Delek Hospital"],
  },
  emergencyContacts: {
    police: "100 or 01892-222330",
    ambulance: "108",
    fireStation: "101 or 01892-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What is the best time to visit Dharamshala?",
      answer:
        "The best time to visit Dharamshala is from March to June for pleasant weather and September to November for clear mountain views. Monsoon (July-August) brings heavy rainfall, while winter (December-February) offers snow views but can be very cold.",
    },
    {
      question: "What are the must-visit places in Kangra district?",
      answer:
        "Must-visit places include McLeod Ganj, Dharamshala, Kangra Fort, Masroor Rock Cut Temple, Norbulingka Institute, Bhagsunag Waterfall, Triund Trek, Kangra Art Museum, and Dharamshala Cricket Stadium.",
    },
    {
      question: "What is special about Kangra tea?",
      answer:
        "Kangra tea is known for its unique flavor, color, and aroma due to the specific climate and soil conditions of the region. It has a delicate taste and is rich in antioxidants. The tea gardens around Palampur offer beautiful views and tours.",
    },
    {
      question: "What are the popular treks in Kangra district?",
      answer:
        "Popular treks include Triund Trek, Kareri Lake Trek, Indrahar Pass Trek, Minkiani Pass Trek, and Dhauladhar Trek. Triund is the most accessible, offering stunning views of the Dhauladhar range.",
    },
    {
      question: "How can I experience Tibetan culture in Kangra?",
      answer:
        "You can experience Tibetan culture by visiting the Tsuglagkhang Complex (Dalai Lama's temple), Norbulingka Institute, Tibet Museum, attending meditation classes, trying Tibetan cuisine, and shopping for Tibetan handicrafts in McLeod Ganj.",
    },
  ],
}
