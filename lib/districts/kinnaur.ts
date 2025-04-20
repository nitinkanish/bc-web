import type { DistrictInfo } from "@/lib/district-data"

export const kinnaurDistrict: DistrictInfo = {
  name: "Kinnaur",
  slug: "kinnaur",
  description: "Known for apples and the Indo-Tibetan border, with stunning landscapes and tribal culture.",
  image: "/placeholder.svg?height=300&amp;width=400",
  geography: {
    area: "6,401 sq km",
    elevation: "2,320-6,816 meters",
    terrain: "Mountainous with deep valleys, high peaks, and glaciers",
    rivers: ["Sutlej", "Baspa", "Spiti"],
  },
  climate: {
    summer: "15°C to 25°C (April to June)",
    winter: "-10°C to 10°C (October to March)",
    rainfall: "Varies greatly by region, generally low",
    bestTimeToVisit: "May to October",
  },
  demographics: {
    population: "84,121 (2011 Census)",
    density: "13/sq km",
    literacy: "80.77%",
    languages: ["Hindi", "Kinnauri", "Tibetan"],
  },
  economy: {
    mainSectors: ["Horticulture", "Agriculture", "Tourism", "Handicrafts"],
    specialties: ["Apple cultivation", "Dry fruits", "Chilgoza pine nuts"],
    industries: ["Fruit processing", "Handicrafts", "Tourism"],
  },
  tourism: {
    attractions: [
      {
        name: "Kalpa",
        description: "Ancient village with views of Kinner Kailash range",
        type: "Cultural",
      },
      {
        name: "Sangla Valley",
        description: "Beautiful valley with traditional villages and orchards",
        type: "Nature",
      },
      {
        name: "Chitkul",
        description: "Last inhabited village near Indo-Tibet border",
        type: "Cultural",
      },
      {
        name: "Kinner Kailash",
        description: "Sacred peak believed to be Lord Shiva's winter abode",
        type: "Religious",
      },
      {
        name: "Nako Lake",
        description: "High-altitude lake with Buddhist monastery",
        type: "Nature",
      },
    ],
    festivals: ["Fulaich Festival", "Losar", "Beesh Festival", "Ukhyang"],
  },
  transportation: {
    nearestAirport: "Shimla Airport - 235 km from Reckong Peo",
    railwayConnectivity: "No direct railway connection. Nearest station is Shimla (235 km)",
    roadConnectivity: "Connected by NH-5 (Hindustan-Tibet Road)",
    localTransport: ["HRTC buses", "Shared taxis"],
  },
  cuisine: {
    famousDishes: ["Thukpa", "Momos", "Chhang (local beer)", "Aktori"],
    specialties: ["Chilta (pancake)", "Phaanu", "Kinnauri Rajma"],
  },
  culture: {
    traditions: ["Kinnauri culture", "Buddhist influence", "Polyandry traditions"],
    crafts: ["Kinnauri shawls", "Wooden crafts", "Silver jewelry"],
    dances: ["Losar Shona Chuksam", "Bakayang", "Kinnauri Nati"],
  },
  education: {
    universities: [],
    colleges: ["Government College Reckong Peo", "Government College Nichar"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Reckong Peo", "Civil Hospital Sangla"],
  },
  emergencyContacts: {
    police: "100 or 01786-222202",
    ambulance: "108",
    fireStation: "101 or 01786-222540",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "Why is Kinnaur famous for apples?",
      answer:
        "Kinnaur is famous for its apples due to the region's high altitude, cold climate, and abundant sunshine, which create perfect growing conditions. Kinnauri apples are known for their distinctive sweetness, crispness, and natural blush. The district produces premium varieties like Royal Delicious and Golden Delicious.",
    },
    {
      question: "What is special about Chitkul village?",
      answer:
        "Chitkul is the last inhabited village on the Indo-Tibet border in Himachal Pradesh. Located at 3,450 meters in the Sangla Valley, it's known for its pristine beauty, traditional wooden houses with slate roofs, the ancient Mathi Temple, and the unique culture of its inhabitants who follow a mix of Hinduism and Buddhism.",
    },
    {
      question: "What is the significance of Kinner Kailash?",
      answer:
        "Kinner Kailash (6,050 meters) is considered the winter abode of Lord Shiva. The mountain has a 79-foot rock formation that resembles a Shiva Lingam, which changes colors throughout the day. An annual pilgrimage to its base takes place in August, attracting devotees from across India.",
    },
    {
      question: "What permits are required to visit Kinnaur?",
      answer:
        "Indian nationals don't need permits for most parts of Kinnaur. However, for areas close to the Indo-Tibet border (like Hangrang Valley), an Inner Line Permit is required, obtainable from the District Magistrate's office in Reckong Peo. Foreign nationals need to register at the checkpost in Jangi/Akpa.",
    },
    {
      question: "What are the traditional handicrafts of Kinnaur?",
      answer:
        "Traditional handicrafts include Kinnauri shawls and caps made from yak and sheep wool, often with colorful geometric patterns; wooden items carved from deodar wood; bamboo crafts; and distinctive silver jewelry. The Kinnauri 'topi' (cap) with its green velvet band and colorful border is particularly famous.",
    },
  ],
}
