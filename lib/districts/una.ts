import type { DistrictInfo } from "@/lib/district-data"

export const unaDistrict: DistrictInfo = {
  name: "Una",
  slug: "una",
  description: "The gateway to Himachal Pradesh, known for its plains, religious sites, and industrial development.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "1,540 sq km",
    elevation: "369 meters (1,211 ft)",
    terrain: "Plains and low hills",
    rivers: ["Swan", "Sutlej", "Soan"],
  },
  climate: {
    summer: "25°C to 42°C (April to June)",
    winter: "5°C to 25°C (October to March)",
    rainfall: "1,200 mm annually",
    bestTimeToVisit: "October to March",
  },
  demographics: {
    population: "521,173 (2011 Census)",
    density: "338/sq km",
    literacy: "87.23%",
    languages: ["Hindi", "Punjabi", "Pahari"],
  },
  economy: {
    mainSectors: ["Agriculture", "Industry", "Services"],
    specialties: ["Wheat and maize cultivation", "Industrial manufacturing"],
    industries: ["Pharmaceuticals", "Food processing", "Light engineering"],
  },
  tourism: {
    attractions: [
      {
        name: "Chintpurni Temple",
        description: "Important Shakti Peeth and pilgrimage site",
        type: "Religious",
      },
      {
        name: "Dera Baba Rudru",
        description: "Religious site with historical significance",
        type: "Religious",
      },
      {
        name: "Kutlehar Fort",
        description: "Ancient fort with historical importance",
        type: "Historical",
      },
      {
        name: "Jwalaji Temple",
        description: "Temple with natural eternal flame",
        type: "Religious",
      },
      {
        name: "Amb Temples",
        description: "Group of ancient temples with intricate carvings",
        type: "Religious",
      },
    ],
    festivals: ["Chintpurni Fair", "Hola Mohalla", "Baisakhi", "Diwali"],
  },
  transportation: {
    nearestAirport: "Chandigarh Airport - 120 km",
    railwayConnectivity: "Una Railway Station with connections to major cities",
    roadConnectivity: "Well-connected by NH-503 and NH-3",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Dham", "Madra", "Punjabi cuisine"],
    specialties: ["Lassi", "Sarson da Saag", "Makki di Roti"],
  },
  culture: {
    traditions: ["Mix of Punjabi and Pahari culture"],
    crafts: ["Embroidery", "Pottery"],
    dances: ["Bhangra", "Giddha", "Nati"],
  },
  education: {
    universities: [],
    colleges: ["Government College Una", "SVIET College"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Una", "Civil Hospital Amb"],
  },
  emergencyContacts: {
    police: "100 or 01975-226001",
    ambulance: "108",
    fireStation: "101 or 01975-226002",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "Why is Una called the 'Gateway to Himachal Pradesh'?",
      answer:
        "Una is called the 'Gateway to Himachal Pradesh' because it's the first district encountered when entering Himachal Pradesh from Punjab. Its plains gradually give way to the hills that characterize the rest of the state.",
    },
    {
      question: "What is the significance of Chintpurni Temple?",
      answer:
        "Chintpurni Temple is one of the most important Shakti Peeths in India, dedicated to Goddess Chinnamastika. It's believed that the goddess fulfills the wishes of devotees, hence the name 'Chintpurni' (remover of worries). Thousands of pilgrims visit the temple, especially during Navratri.",
    },
    {
      question: "What are the industrial areas in Una district?",
      answer:
        "Una has several industrial areas including Tahliwal Industrial Area, Amb Industrial Area, and Mehatpur Industrial Area. These zones host pharmaceuticals, food processing units, and light engineering industries.",
    },
    {
      question: "What is special about the Swan River Channelization Project?",
      answer:
        "The Swan River Channelization Project is a major flood control and land reclamation initiative. It has transformed the seasonal Swan River, which used to cause extensive flooding, into a channelized river, reclaiming thousands of hectares of land for agriculture and preventing floods.",
    },
    {
      question: "What are the popular day trips from Una?",
      answer:
        "Popular day trips from Una include visits to Chintpurni Temple, Naina Devi Temple, Anandpur Sahib (Punjab), Kangra Fort, and Dharamshala. Una's location makes it a good base for exploring both the plains and the nearby hill stations.",
    },
  ],
}
