import productCream from "@/assets/product-cream.jpg";
import productSerum from "@/assets/product-serum.jpg";
import productOil from "@/assets/product-oil.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productToner from "@/assets/product-toner.jpg";
import productEyecream from "@/assets/product-eyecream.jpg";

export type Category = "Serums" | "Moisturizers" | "Cleansers" | "Eye Care" | "Oils" | "Toners";

export const categories: { name: Category; description: string }[] = [
  { name: "Serums", description: "Concentrated formulas for targeted results" },
  { name: "Moisturizers", description: "Deep hydration for every skin type" },
  { name: "Oils", description: "Nourishing botanical blends" },
  { name: "Cleansers", description: "Gentle yet effective purification" },
  { name: "Toners", description: "Balance, prep, and refine" },
  { name: "Eye Care", description: "Targeted treatments for delicate skin" },
];

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  size: string;
  category: Category;
}

export const products: Product[] = [
  {
    id: "radiance-serum",
    name: "Radiance Serum",
    tagline: "Luminous glow, naturally",
    price: 128,
    image: productSerum,
    description: "A potent blend of vitamin C and botanical extracts that delivers deep luminosity. Lightweight, fast-absorbing formula that reveals your skin's natural radiance overnight.",
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Rosehip Extract", "Jojoba Oil"],
    size: "30ml",
    category: "Serums",
  },
  {
    id: "nourish-cream",
    name: "Nourish Cream",
    tagline: "Deep hydration, pure comfort",
    price: 96,
    image: productCream,
    description: "Rich yet weightless moisturizer infused with shea butter and ceramides. Restores the skin's natural barrier while providing 72-hour hydration.",
    ingredients: ["Shea Butter", "Ceramide Complex", "Squalane", "Chamomile"],
    size: "50ml",
    category: "Moisturizers",
  },
  {
    id: "botanical-oil",
    name: "Botanical Face Oil",
    tagline: "Nature's elixir for renewal",
    price: 112,
    image: productOil,
    description: "A luxurious blend of 12 cold-pressed botanical oils. Nourishes, repairs, and protects while you sleep. Wake up to visibly softer, more supple skin.",
    ingredients: ["Argan Oil", "Marula Oil", "Evening Primrose", "Vitamin E"],
    size: "30ml",
    category: "Oils",
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    tagline: "Purify without compromise",
    price: 64,
    image: productCleanser,
    description: "A cream-to-foam cleanser that removes impurities while maintaining your skin's delicate pH balance. Leaves skin feeling fresh, never tight.",
    ingredients: ["Green Tea", "Aloe Vera", "Glycerin", "Cucumber Extract"],
    size: "150ml",
    category: "Cleansers",
  },
  {
    id: "hydra-toner",
    name: "Hydra Toner Mist",
    tagline: "Refresh, balance, prepare",
    price: 52,
    image: productToner,
    description: "A fine mist toner that balances and preps skin for optimal serum absorption. Infused with rose water and niacinamide for a dewy, refined complexion.",
    ingredients: ["Rose Water", "Niacinamide", "Witch Hazel", "Lavender"],
    size: "120ml",
    category: "Toners",
  },
  {
    id: "revive-eye-cream",
    name: "Revive Eye Cream",
    tagline: "Brighten, firm, restore",
    price: 88,
    image: productEyecream,
    description: "A targeted treatment for the delicate eye area. Reduces puffiness, dark circles, and fine lines with peptides and caffeine-rich botanicals.",
    ingredients: ["Peptide Complex", "Caffeine", "Retinol", "Avocado Oil"],
    size: "15ml",
    category: "Eye Care",
  },
];
