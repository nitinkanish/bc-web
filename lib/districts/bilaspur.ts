import type { DistrictInfo } from "@/lib/district-data"

export const bilaspurDistrict: DistrictInfo = {
  name: "Bilaspur",
  slug: "bilaspur",
  description: "Home to the Govind Sagar Lake, known for its water sports and the ancient Vyas Gufa.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "1,167 sq km",
    elevation: "673 meters (2,208 ft)",
    terrain: "Hilly with valleys and the Govind Sagar Lake",
    rivers: ["Sutlej", "Govind Sagar Lake"],
  },
  climate: {
    summer: "25°C to 40°C (April to June)",
    winter: "5°C to 20°C (October to March)",
    rainfall: "1,000 mm annually",
    bestTimeToVisit: "October to March",
  },
  demographics: {
    population: "381,956 (2011 Census)",
    density: "327/sq km",
    literacy: "85.87%",
    languages: ["Hindi", "Bilaspuri", "Pahari"],
  },
  economy: {
    mainSectors: ["Agriculture", "Tourism", "Cement industry", "Hydropower"],
    specialties: ["Wheat and maize cultivation", "Water sports tourism"],
    industries: ["Cement", "Hydroelectric power"],
  },
  tourism: {
    attractions: [
      {
        name: "Govind Sagar Lake",
        description: "Large reservoir offering water sports and scenic beauty",
        type: "Nature",
      },
      {
        name: "Vyas Gufa",
        description: "Ancient cave where Sage Vyas is believed to have written the Mahabharata",
        type: "Historical",
      },
      {
        name: "Bhakra Dam",
        description: "One of the highest gravity dams in the world",
        type: "Cultural",
      },
      {
        name: "Naina Devi Temple",
        description: "Important Shakti Peeth located on a hilltop",
        type: "Religious",
      },
      {
        name: "Kandror Bridge",
        description: "Highest bridge in Asia when it was built",
        type: "Cultural",
      },
    ],
    festivals: ["Nalwari Fair", "Naina Devi Fair", "Lohri", "Diwali"],
  },
  transportation: {
    nearestAirport: "Chandigarh Airport - 110 km",
    railwayConnectivity: "No direct railway connection. Nearest station is Una (90 km)",
    roadConnectivity: "Well-connected by NH-3 and NH-205",
    localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
  },
  cuisine: {
    famousDishes: ["Dham", "Madra", "Babru", "Chana Madra"],
    specialties: ["Fish dishes from Govind Sagar", "Bilaspuri Dham"],
  },
  culture: {
    traditions: ["Pahari culture", "Folk traditions"],
    crafts: ["Embroidery", "Basketry"],
    dances: ["Nati", "Jhanjhar", "Giddha"],
  },
  education: {
    universities: [],
    colleges: ["Government College Bilaspur", "SVSD College"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Bilaspur", "Ayurvedic Hospital Bilaspur"],
  },
  emergencyContacts: {
    police: "100 or 01978-222202",
    ambulance: "108",
    fireStation: "101 or 01978-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "What water sports are available at Govind Sagar Lake?",
      answer:
        "Govind Sagar Lake offers various water sports including boating, water skiing, rowing, sailing, fishing, and kayaking. The Himachal Pradesh Tourism Development Corporation organizes water sports activities at the lake.",
    },
    {
      question: "What is the significance of Bhakra Dam?",
      answer:
        "Bhakra Dam, built on the Sutlej River, is one of the highest gravity dams in the world. It was called the 'Temple of Modern India' by Jawaharlal Nehru. The dam generates electricity and provides irrigation water to Punjab, Haryana, and Rajasthan.",
    },
    {
      question: "What is the historical significance of Vyas Gufa?",
      answer:
        "Vyas Gufa (Vyasa Cave) is believed to be the place where Sage Vyas composed the epic Mahabharata. The cave is located near the Sutlej River and is an important historical and religious site.",
    },
    {
      question: "How to reach Naina Devi Temple from Bilaspur?",
      answer:
        "Naina Devi Temple is about 30 km from Bilaspur town. You can reach there by road or take a cable car from Anandpur Sahib side. Regular buses and taxis are available from Bilaspur to Naina Devi.",
    },
    {
      question: "What happened to Old Bilaspur town?",
      answer:
        "The original Bilaspur town was submerged under the Govind Sagar Lake when the Bhakra Dam was constructed in the 1950s. The current Bilaspur town was rebuilt at a higher elevation. Some remains of the old town can be seen during summer when the water level is low.",
    },
  ],
}
