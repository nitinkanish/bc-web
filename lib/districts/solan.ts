import type { DistrictInfo } from "@/lib/district-data"

export const solanDistrict: DistrictInfo = {
  name: "Solan",
  slug: "solan",
  description: "Known as the 'Mushroom city of India' and famous for its brewery and agricultural university.",
  image: "/placeholder.svg?height=300&width=400",
  geography: {
    area: "1,936 sq km",
    elevation: "1,600 meters",
    terrain: "Hilly with forests and valleys",
    rivers: ["Yamuna", "Giri"],
  },
  climate: {
    summer: "15°C to 32°C",
    winter: "5°C to 15°C",
    rainfall: "1,200 mm annually",
    bestTimeToVisit: "March to June and September to November",
  },
  demographics: {
    population: "580,320 (2011 Census)",
    density: "300/sq km",
    literacy: "83.7%",
    languages: ["Hindi", "Pahari"],
  },
  economy: {
    mainSectors: ["Agriculture", "Pharmaceuticals", "Tourism", "Education"],
    specialties: ["Mushroom cultivation", "Tomatoes", "Brewery"],
    industries: ["Pharmaceuticals", "Brewery", "Food processing"],
  },
  tourism: {
    attractions: [
      {
        name: "Kasauli",
        description: "Charming hill station with colonial architecture",
        type: "Nature",
      },
      {
        name: "Mohan Meakins Brewery",
        description: "One of Asia's oldest breweries",
        type: "Cultural",
      },
      {
        name: "Solan Brewery",
        description: "Historic brewery established in 1855",
        type: "Cultural",
      },
      {
        name: "Shoolini Temple",
        description: "Ancient temple dedicated to Goddess Shoolini",
        type: "Religious",
      },
      {
        name: "Barog",
        description: "Scenic hill station on the Kalka-Shimla railway line",
        type: "Nature",
      },
    ],
    festivals: ["Shoolini Fair", "Solan Festival"],
  },
  transportation: {
    nearestAirport: "Chandigarh Airport - 65 km",
    railwayConnectivity: "Solan Railway Station on Kalka-Shimla railway line",
    roadConnectivity: "Well-connected by NH-5",
    localTransport: ["HRTC buses", "Taxis"],
  },
  cuisine: {
    famousDishes: ["Madra", "Dham", "Chana Madra"],
    specialties: ["Mushroom dishes", "Local brews"],
  },
  culture: {
    traditions: ["Pahari culture"],
    crafts: ["Woodwork", "Bamboo crafts"],
    dances: ["Nati", "Jhanjhar"],
  },
  education: {
    universities: ["Dr. YS Parmar University of Horticulture and Forestry", "Shoolini University"],
    colleges: ["Government College Solan"],
  },
  healthcare: {
    majorHospitals: ["Regional Hospital Solan", "Shoolini Hospital"],
  },
  emergencyContacts: {
    police: "100 or 01792-223400",
    ambulance: "108",
    fireStation: "101 or 01792-223101",
    touristHelpline: "1800-180-8080",
  },
  faqs: [
    {
      question: "Why is Solan called the Mushroom City of India?",
      answer:
        "Solan is called the Mushroom City of India because it has the largest mushroom farming facility in Asia and is a major producer of button mushrooms in the country.",
    },
    {
      question: "What are the popular tourist places near Solan?",
      answer: "Popular tourist places near Solan include Kasauli, Dagshai, Barog, Chail, Kandaghat, and Solan Brewery.",
    },
    {
      question: "What is special about Solan's brewery?",
      answer:
        "Solan's Mohan Meakins Brewery, established in 1855, is one of Asia's oldest breweries and is famous for producing the iconic 'Old Monk' rum and other alcoholic beverages.",
    },
    {
      question: "What are the adventure activities available in Solan?",
      answer:
        "Adventure activities in Solan include trekking, paragliding (at Kasauli and nearby areas), camping, nature walks, and mountain biking.",
    },
    {
      question: "What is the significance of Shoolini Fair?",
      answer:
        "Shoolini Fair is an annual festival held in June to honor Goddess Shoolini, the presiding deity of Solan. It features cultural performances, traditional markets, and religious ceremonies.",
    },
  ],
}
