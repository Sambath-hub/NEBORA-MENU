export interface Product {
  id: string;
  name: string;
  description: string;
  notesData: string[];
  color: string;
  accentColor: string;
  imageSeed: string; // Used for picsum seed
}

export const PRODUCTS: Product[] = [
  {
    id: "solstice",
    name: "Solstice",
    description: "Capturing the golden warmth of the longest day. A grounding blend of sun-drenched amber and bright citrus.",
    notesData: ["Amber", "Bergamot", "Sandalwood"],
    color: "#ff8c00",
    accentColor: "rgba(255, 140, 0, 0.2)",
    imageSeed: "sun-candle"
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
  }
];
