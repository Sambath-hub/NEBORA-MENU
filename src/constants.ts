export interface Product {
  id: string;
  name: string;
  description: string;
  notesData: string[];
  color: string;
  accentColor: string;
  imageUrl?: string;
  imageSeed?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "amore",
    name: "Amore",
    description: "A soft, romantic embrace of sweet cream and blushing pink heart-shaped wax pieces. Hand-poured for a cozy, intimate atmosphere that feels like a gentle hug.",
    notesData: ["Sweet Cream", "Rose Petals", "Vanilla Bean"],
    color: "#ffc0cb",
    accentColor: "rgba(255, 192, 203, 0.2)",
    imageUrl: "https://i.pinimg.com/736x/05/4f/21/054f215dea5edd0cab81b42c1d798ba8.jpg"
  },
  {
    id: "solstice",
    name: "Romdoul Flower",
    description: "The warmth of Cambodian traditions. Artisanal terracotta pots holding vibrant yellow floral blooms that capture the essence of the golden sun.",
    notesData: ["Turmeric", "Wild Jasmine", "Terracotta"],
    color: "#eab308",
    accentColor: "rgba(234, 179, 8, 0.2)",
    imageUrl: "https://i.pinimg.com/736x/21/6b/09/216b092f6914faecbb7be215c1f02397.jpg"
  },
  {
    id: "lotus",
    name: "Royal Princess",
    description: "Regal and refined. Bright pink lotus blossoms nestled in ornate golden bowls, presented in a clear exhibition of Cambodian luxury and craft.",
    notesData: ["Lotus Flower", "Sandalwood", "Gold Foil"],
    color: "#db2777",
    accentColor: "rgba(212, 175, 55, 0.3)",
    imageUrl: "https://i1-c.pinimg.com/1200x/82/38/c4/8238c4dbec1b1674a83c6862e2fd630a.jpg"
  },
  {
    id: "ruby-vibe",
    name: "Ruby Vibe",
    description: "A vibrant celebration of the senses. Rich ruby-red wax in elegant cocktail coupe glasses, finished with a creamy foam and a sweet heart topping.",
    notesData: ["Pomegranate", "Pink Champagne", "White Musk"],
    color: "#be123c",
    accentColor: "rgba(190, 18, 60, 0.2)",
    imageUrl: "https://i.pinimg.com/736x/bc/0e/53/bc0e53fbbdb73c50c3b810afc070d285.jpg"
  },
  {
    id: "lunar",
    name: "Lunar",
    description: "The serene stillness of moonlight. A cooling floral scent with deep musky undertones for evening reflection.",
    notesData: ["Lavender", "Moonflower", "White Musk"],
    color: "#a5b4fc",
    accentColor: "rgba(165, 180, 252, 0.2)",
    imageSeed: "moon-candle"
  },
  {
    id: "nebula",
    name: "Nebula",
    description: "A cosmic journey through spice and wood. Complex, dark, and endlessly mysterious fragrance from the void.",
    notesData: ["Patchouli", "Cedar", "Star Anise"],
    color: "#c084fc",
    accentColor: "rgba(192, 132, 252, 0.2)",
    imageSeed: "star-candle"
  },
  {
    id: "ethereal",
    name: "Ethereal",
    description: "Light as a dream, persistent as a memory. A delicate balance of vanilla and celestial jasmine.",
    notesData: ["Jasmine", "Vanilla", "Citrus Spark"],
    color: "#fdf2f8",
    accentColor: "rgba(253, 242, 248, 0.2)",
    imageSeed: "cloud-candle"
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "The vibrant dance of northern lights. Crisp eucalyptus mixed with the sweetness of wild forest berries.",
    notesData: ["Eucalyptus", "Wild Berry", "Pine"],
    color: "#4ade80",
    accentColor: "rgba(74, 222, 128, 0.2)",
    imageSeed: "forest-candle"
  },
  {
    id: "zenith",
    name: "Zenith",
    description: "High altitude clarity. A sharp, invigorating blend of ozone and fresh mountain herbs.",
    notesData: ["Ozone", "Wild Thyme", "Sage"],
    color: "#60a5fa",
    accentColor: "rgba(96, 165, 250, 0.2)",
    imageSeed: "mountain-candle"
  },
  {
    id: "eclipse",
    name: "Eclipse",
    description: "The moment light fades into shadow. A deep, smoky fusion of burnt oud and midnight jasmine.",
    notesData: ["Burnt Oud", "Jasmine", "Black Pepper"],
    color: "#4a4a4a",
    accentColor: "rgba(74, 74, 74, 0.2)",
    imageSeed: "eclipse-candle"
  },
  {
    id: "nova",
    name: "Nova",
    description: "A sudden burst of radiant energy. Sparkling blood orange combined with the heat of pink peppercorn.",
    notesData: ["Blood Orange", "Pink Pepper", "Vetiver"],
    color: "#f87171",
    accentColor: "rgba(248, 113, 113, 0.2)",
    imageSeed: "fire-candle"
  },
  {
    id: "cosmos",
    name: "Cosmos",
    description: "The infinite reach of the universe. A balanced scent of star fruit, galaxy orchid, and clean aldehydes.",
    notesData: ["Star Fruit", "Galaxy Orchid", "Aldehydes"],
    color: "#818cf8",
    accentColor: "rgba(129, 140, 248, 0.2)",
    imageSeed: "cosmos-candle"
  },
  {
    id: "terra",
    name: "Terra",
    description: "Rooted in the ancient earth. Warm terracotta mixed with damp moss and aged sandalwood.",
    notesData: ["Terracotta", "Oakmoss", "Sandalwood"],
    color: "#b45309",
    accentColor: "rgba(180, 83, 9, 0.2)",
    imageSeed: "earth-candle"
  },
  {
    id: "halcyon",
    name: "Halcyon",
    description: "Perfectly peaceful waters. A calm aqueous note layered with white ginger and bamboo.",
    notesData: ["Ginger", "Bamboo", "Sea Salt"],
    color: "#2dd4bf",
    accentColor: "rgba(45, 212, 191, 0.2)",
    imageSeed: "water-candle"
  },
  {
    id: "seraphina",
    name: "Gift Beloved Gen X&Y",
    description: "A divine gift of pure pink peony and soft white amber. Elegant, airy, and celestial, designed to create a truly angelic atmosphere.",
    notesData: ["Pink Peony", "White Amber", "Silk"],
    color: "#f472b6",
    accentColor: "rgba(244, 114, 182, 0.2)",
    imageUrl: "https://i.pinimg.com/736x/c2/79/3d/c2793d1c29ddbaf0d66189557c0f0f4c.jpg"
  }
];
