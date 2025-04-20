import type { DistrictInfo } from "@/lib/district-data"

export const lahaulSpitiDistrict: DistrictInfo = {
  name: "Lahaul and Spiti",
  slug: "lahaul-spiti",
  description: "A high-altitude desert with Buddhist culture, known for its monasteries and stark landscapes.",
  image: "/placeholder.svg?height=300&amp;width=400",
  geography: {
    area: "13,835 sq km",
    elevation: "3,000-6,000 meters",
    terrain: "High-altitude desert with mountains, glaciers, and valleys",
    rivers: ["Chenab", "Spiti", "Chandra", "Bhaga"],
  },
  climate: {
    summer: "5°C to 20°C (June to September)",
    winter: "-25°C to 0°C (October to May)",
    rainfall: "Very low, semi-arid region",
    bestTimeToVisit: "June to September",
  },
  demographics: {
    population: "31,564 (2011 Census)",
    density: "2/sq km (lowest in India)",
    literacy: "77.24%",
    languages: ["Hindi", "Bhoti", "Tibetan", "Lahauli"],
  },
  economy: {
    mainSectors: ["Agriculture", "Tourism", "Handicrafts"],
    specialties: ["Green peas", "Barley", "Buckwheat", "Medicinal herbs"],
    industries: ["Tourism", "Handicrafts", "Agriculture"],
  },
  tourism: {
    attractions: [
      {
        name: "Key Monastery",
        description: "Largest monastery in Spiti Valley with ancient Buddhist scriptures",
        type: "Religious",
      },
      {
        name: "Chandratal Lake",
        description: "Crescent-shaped high-altitude lake with stunning views",
        type: "Nature",
      },
      {
        name: "Kunzum Pass",
        description: "High mountain pass connecting Lahaul and Spiti valleys",
        type: "Adventure",
      },
      {
        name: "Tabo Monastery",
        description: "1000-year-old monastery known as the 'Ajanta of the Himalayas'",
        type: "Religious",
      },
      {
        name: "Pin Valley National Park",
        description: "Protected area home to rare snow leopards and ibex",
        type: "Nature",
      },
    ],
    festivals: ["Losar", "Ladarcha Fair", "Gochi Festival", "Pauri Festival"],
  },
  transportation: {
    nearestAirport: "Bhuntar Airport (Kullu) - 245 km from Keylong",
    railwayConnectivity: "No direct railway connection. Nearest station is Joginder Nagar (220 km)",
    roadConnectivity: "Connected by NH-3 and NH-505, Atal Tunnel provides year-round access",
    localTransport: ["HRTC buses", "Shared taxis"],
  },
  cuisine: {
    famousDishes: ["Thukpa", "Momos", "Chhang (local beer)", "Skyu"],
    specialties: ["Butter tea", "Barley bread", "Chhurpi (local cheese)"],
  },
  culture: {
    traditions: ["Tibetan Buddhist culture", "Ancient monasteries", "Traditional farming"],
    crafts: ["Thangka paintings", "Prayer wheels", "Woolen textiles"],
    dances: ["Chham (mask dance)", "Buchen dance", "Geki dance"],
  },
  education: {
    universities: [],
    colleges: ["Government College Keylong", "Government College Kaza"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Keylong", "Community Health Center Kaza"],
  },
  emergencyContacts: {
    police: "100 or 01900-222202",
    ambulance: "108",
    fireStation: "101 or 01900-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "How has the Atal Tunnel changed access to Lahaul-Spiti?",
      answer:
        "The Atal Tunnel (9.02 km), inaugurated in 2020, has revolutionized access to Lahaul Valley by providing year-round connectivity. Previously, the region was cut off for 6 months during winter when Rohtang Pass was closed. The tunnel has reduced travel time from Manali to Keylong from 5 hours to just 1.5 hours and boosted tourism and economic development.",
    },
    {
      question: "Why is Spiti Valley called 'Little Tibet'?",
      answer:
        "Spiti Valley is called 'Little Tibet' because of its strong cultural, geographical, and religious similarities to Tibet. The region features Tibetan Buddhist monasteries, similar architecture, language, and customs. The landscape also resembles the Tibetan plateau with its high-altitude desert terrain.",
    },
    {
      question: "What is special about Tabo Monastery?",
      answer:
        "Tabo Monastery, founded in 996 CE, is over 1,000 years old and known as the 'Ajanta of the Himalayas' for its exquisite murals and stucco sculptures. It houses priceless collections of thangka paintings, manuscripts, and statues. The Dalai Lama has expressed that Tabo preserves Tibetan Buddhist culture better than many monasteries in Tibet itself.",
    },
    {
      question: "What are the best trekking routes in Lahaul-Spiti?",
      answer:
        "Popular trekking routes include the Pin-Parvati Pass trek connecting Spiti with Kullu Valley, the Parang La trek linking Spiti with Ladakh, the Hampta Pass trek, the Chandratal Lake trek, and the Pin Valley trek. These treks offer stunning landscapes, high mountain passes, and glimpses of rare wildlife.",
    },
    {
      question: "What is the best time to visit Lahaul-Spiti?",
      answer:
        "The best time to visit is from June to September when the weather is relatively mild and all areas are accessible. July-August can see some rainfall. May and October offer good conditions but can be colder. The region is largely inaccessible from November to April due to heavy snowfall, though the Atal Tunnel now provides year-round access to parts of Lahaul.",
    },
  ],
}
