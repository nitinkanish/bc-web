export interface DistrictInfo {
  name: string
  slug: string
  description: string
  image: string
  geography: {
    area: string
    elevation: string
    terrain: string
    rivers: string[]
  }
  climate: {
    summer: string
    winter: string
    rainfall: string
    bestTimeToVisit: string
  }
  demographics: {
    population: string
    density: string
    literacy: string
    languages: string[]
  }
  economy: {
    mainSectors: string[]
    specialties: string[]
    industries: string[]
  }
  tourism: {
    attractions: Array<{
      name: string
      description: string
      type: "Nature" | "Religious" | "Historical" | "Adventure" | "Cultural"
    }>
    festivals: string[]
  }
  transportation: {
    nearestAirport: string
    railwayConnectivity: string
    roadConnectivity: string
    localTransport: string[]
  }
  cuisine: {
    famousDishes: string[]
    specialties: string[]
  }
  culture: {
    traditions: string[]
    crafts: string[]
    dances: string[]
  }
  education: {
    universities: string[]
    colleges: string[]
  }
  healthcare: {
    majorHospitals: string[]
  }
  emergencyContacts: {
    police: string
    ambulance: string
    fireStation: string
    touristHelpline: string
  }
  faqs: Array<{
    question: string
    answer: string
  }>
}

export const DISTRICTS_DATA: Record<string, DistrictInfo> = {
  shimla: {
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
  },
  mandi: {
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
  },
  kangra: {
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
  },
  solan: {
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
        answer:
          "Popular tourist places near Solan include Kasauli, Dagshai, Barog, Chail, Kandaghat, and Solan Brewery.",
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
  },
  kullu: {
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
  },
  hamirpur: {
    name: "Hamirpur",
    slug: "hamirpur",
    description: "Known for education and literacy, with the highest literacy rate in Himachal Pradesh.",
    image: "/placeholder.svg?height=300&width=400",
    geography: {
      area: "1,118 sq km",
      elevation: "785 meters (2,575 ft)",
      terrain: "Hilly with low mountains and valleys",
      rivers: ["Beas", "Kunah", "Seer"],
    },
    climate: {
      summer: "22°C to 38°C (April to June)",
      winter: "5°C to 20°C (October to March)",
      rainfall: "1,100 mm annually",
      bestTimeToVisit: "March to June and September to November",
    },
    demographics: {
      population: "454,768 (2011 Census)",
      density: "407/sq km",
      literacy: "89.01% (highest in Himachal Pradesh)",
      languages: ["Hindi", "Pahari"],
    },
    economy: {
      mainSectors: ["Agriculture", "Education", "Services", "Small-scale industries"],
      specialties: ["Wheat and maize cultivation", "Educational institutions"],
      industries: ["Food processing", "Small-scale manufacturing"],
    },
    tourism: {
      attractions: [
        {
          name: "Nadaun",
          description: "Historical town on the banks of Beas River",
          type: "Historical",
        },
        {
          name: "Gasota Mahadev Temple",
          description: "Ancient temple dedicated to Lord Shiva",
          type: "Religious",
        },
        {
          name: "Awah Devi Temple",
          description: "Temple with panoramic views of Dhauladhar range",
          type: "Religious",
        },
        {
          name: "Sujanpur Tira Fort",
          description: "Historical fort built by Raja Sansar Chand",
          type: "Historical",
        },
        {
          name: "Tauni Devi Temple",
          description: "Important religious site with beautiful architecture",
          type: "Religious",
        },
      ],
      festivals: ["Holi", "Diwali", "Lohri", "Janmashtami"],
    },
    transportation: {
      nearestAirport: "Gaggal Airport (Kangra) - 80 km",
      railwayConnectivity: "No direct railway connection. Nearest station is Una (80 km)",
      roadConnectivity: "Well-connected by NH-3 and state highways",
      localTransport: ["HRTC buses", "Taxis", "Auto-rickshaws"],
    },
    cuisine: {
      famousDishes: ["Dham", "Madra", "Chana Madra", "Babru"],
      specialties: ["Bhaturu", "Khatta", "Malpua"],
    },
    culture: {
      traditions: ["Pahari culture", "Folk traditions"],
      crafts: ["Embroidery", "Basketry"],
      dances: ["Nati", "Jhanjhar", "Giddha"],
    },
    education: {
      universities: ["National Institute of Technology (NIT) Hamirpur"],
      colleges: ["Government College Hamirpur", "NSCBM Government College Hamirpur"],
    },
    healthcare: {
      majorHospitals: ["Regional Hospital Hamirpur", "Ayurvedic Hospital Hamirpur"],
    },
    emergencyContacts: {
      police: "100 or 01972-222202",
      ambulance: "108",
      fireStation: "101 or 01972-222540",
      touristHelpline: "1800-180-8080",
    },
    faqs: [
      {
        question: "Why is Hamirpur known as the 'Education Hub' of Himachal Pradesh?",
        answer:
          "Hamirpur is known as the 'Education Hub' because it has the highest literacy rate in Himachal Pradesh (89.01%) and is home to prestigious institutions like NIT Hamirpur. The district has produced many civil servants, engineers, and army officers.",
      },
      {
        question: "What is the historical significance of Nadaun?",
        answer:
          "Nadaun, located on the banks of the Beas River, has historical significance as it was the site of the Battle of Nadaun in 1691 between the Mughal forces and the hill chiefs led by Raja Bhim Chand of Bilaspur. The battle is mentioned in the autobiographical poem 'Bichitra Natak' by Guru Gobind Singh.",
      },
      {
        question: "What are the popular tourist attractions in Hamirpur?",
        answer:
          "Popular tourist attractions include Nadaun, Sujanpur Tira Fort, Gasota Mahadev Temple, Awah Devi Temple, Tauni Devi Temple, Deotsidh Temple, and the scenic banks of the Beas River.",
      },
      {
        question: "What is special about Sujanpur Tira Fort?",
        answer:
          "Sujanpur Tira Fort was built by Raja Sansar Chand of Kangra in the 18th century. It's known for its Kangra paintings, beautiful architecture, and the annual Chaitrali or Holi fair. The fort complex includes temples, gardens, and offers panoramic views of the surrounding areas.",
      },
      {
        question: "What outdoor activities can be enjoyed in Hamirpur?",
        answer:
          "Outdoor activities in Hamirpur include hiking in the low hills, fishing in the Beas River, picnicking at Nadaun, exploring historical sites, and attending local fairs and festivals.",
      },
    ],
  },
  bilaspur: {
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
  },
  una: {
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
  },
  chamba: {
    name: "Chamba",
    slug: "chamba",
    description: "Known for its ancient temples and Minjar fair, with rich cultural heritage and scenic beauty.",
    image: "/placeholder.svg?height=300&width=400",
    geography: {
      area: "6,528 sq km",
      elevation: "996 meters (3,268 ft)",
      terrain: "Mountainous with valleys, rivers, and forests",
      rivers: ["Ravi", "Chenab", "Siul"],
    },
    climate: {
      summer: "15°C to 30°C (April to June)",
      winter: "0°C to 15°C (October to March)",
      rainfall: "1,500 mm annually",
      bestTimeToVisit: "March to June and September to November",
    },
    demographics: {
      population: "518,844 (2011 Census)",
      density: "80/sq km",
      literacy: "73.19%",
      languages: ["Hindi", "Chambiali", "Pahari", "Gaddi"],
    },
    economy: {
      mainSectors: ["Agriculture", "Tourism", "Handicrafts", "Hydropower"],
      specialties: ["Chamba Rumal", "Chamba Chappal", "Apple cultivation"],
      industries: ["Handicrafts", "Hydroelectric power", "Tourism"],
    },
    tourism: {
      attractions: [
        {
          name: "Chamba Town",
          description: "Ancient town with historic Chowgan and temples",
          type: "Cultural",
        },
        {
          name: "Khajjiar",
          description: "Mini Switzerland of India with meadows and forests",
          type: "Nature",
        },
        {
          name: "Dalhousie",
          description: "Colonial hill station with scenic beauty",
          type: "Nature",
        },
        {
          name: "Manimahesh Lake",
          description: "Sacred high-altitude lake with pilgrimage significance",
          type: "Religious",
        },
        {
          name: "Bhuri Singh Museum",
          description: "Museum with Pahari paintings and artifacts",
          type: "Cultural",
        },
      ],
      festivals: ["Minjar Fair", "Manimahesh Yatra", "Sui Mata Festival"],
    },
    transportation: {
      nearestAirport: "Gaggal Airport (Kangra) - 120 km",
      railwayConnectivity: "No direct railway connection. Nearest station is Pathankot (120 km)",
      roadConnectivity: "Connected by NH-154 and NH-503",
      localTransport: ["HRTC buses", "Taxis"],
    },
    cuisine: {
      famousDishes: ["Madra", "Chha Gosht", "Babru", "Aktori"],
      specialties: ["Chamba Chukh", "Bhaturu with Jhol"],
    },
    culture: {
      traditions: ["Pahari culture", "Gaddi tribal culture"],
      crafts: ["Chamba Rumal", "Chamba Chappal", "Wood carving"],
      dances: ["Dangi", "Gaddis", "Chamba's folk dance"],
    },
    education: {
      universities: [],
      colleges: ["Government College Chamba", "NSCBM Government College"],
    },
    healthcare: {
      majorHospitals: ["Regional Hospital Chamba", "Civil Hospital Dalhousie"],
    },
    emergencyContacts: {
      police: "100 or 01899-222202",
      ambulance: "108",
      fireStation: "101 or 01899-222540",
      touristHelpline: "1800-180-8080",
    },
    faqs: [
      {
        question: "What is the Minjar Fair and when is it celebrated?",
        answer:
          "Minjar Fair is Chamba's most famous festival, celebrated annually in July/August. It marks the beginning of the corn harvest season. The week-long fair features cultural performances, processions, sports competitions, and concludes with the immersion of Minjar (silk tassels representing corn blossoms) in the Ravi River.",
      },
      {
        question: "Why is Khajjiar called the 'Mini Switzerland of India'?",
        answer:
          "Khajjiar is called the 'Mini Switzerland of India' because of its resemblance to Swiss landscapes with its lush green meadows, dense forests, and a lake surrounded by cedar trees. In 1992, the Swiss Ambassador to India placed a Swiss signpost in Khajjiar, marking its resemblance to Switzerland.",
      },
      {
        question: "What is the Manimahesh Yatra?",
        answer:
          "Manimahesh Yatra is an important pilgrimage to the sacred Manimahesh Lake (4,080 meters) held during August/September. Thousands of devotees trek to the lake, which is believed to be the abode of Lord Shiva. The pilgrimage coincides with Janmashtami and continues for 15 days.",
      },
      {
        question: "What is special about Chamba Rumal?",
        answer:
          "Chamba Rumal is a traditional embroidered handkerchief known for its double-satin stitch work depicting scenes from Krishna Leela and other mythological stories. This centuries-old craft is unique to Chamba and is recognized as a Geographical Indication (GI) product.",
      },
      {
        question: "What are the must-visit places in Chamba district?",
        answer:
          "Must-visit places include Chamba town with its ancient temples and Chowgan, Khajjiar, Dalhousie, Manimahesh Lake, Kalatop Wildlife Sanctuary, Bhuri Singh Museum, Chamunda Devi Temple, and Pangi Valley for adventure enthusiasts.",
      },
    ],
  },
  sirmaur: {
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
  },
  kinnaur: {
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
  },
  "lahaul-spiti": {
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
  },
}

