import vitaminCImage from "@/assets/vitamin-c-facewash.png";
import coffeeImage from "@/assets/coffee-facewash.png";
import riceMilkImage from "@/assets/rice-milk-facewash.png";
import beetrootImage from "@/assets/beetroot-facewash.png";
import niacinamideImage from "@/assets/niacinamide-facewash.png";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  benefits: string[];
  suitableFor: string[];
  keyIngredient: string;
  ingredients: string;
  price: number;
  size: string;
  image: string;
  color: string;
  bgColor: string;
}

export const products: Product[] = [
  {
    id: "vitamin-c",
    name: "Vitamin C Facewash",
    shortName: "Vitamin C",
    tagline: "Radiant Glow Booster",
    description: "Infused with pure lemon extracts and vitamin C, this brightening facewash gently cleanses while reviving your skin's natural radiance. Perfect for starting your day with a fresh, glowing complexion.",
    benefits: [
      "Brightens skin & fades dark spots",
      "Rich in antioxidants from lemon extracts",
      "Boosts collagen for firmer skin",
      "Controls excess oil naturally"
    ],
    suitableFor: ["Dull Skin", "Oily Skin", "Combination Skin"],
    keyIngredient: "Lemon Extract",
    ingredients: "Aqua (Water), Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Xanthan Gum, Ascorbic Acid (Vitamin C), Citric Acid, Preservative, Fragrance",
    price: 349,
    size: "100ml",
    image: vitaminCImage,
    color: "hsl(48 85% 65%)",
    bgColor: "bg-aura-lemon/20"
  },
  {
    id: "coffee",
    name: "Coffee Facewash",
    shortName: "Coffee",
    tagline: "Energizing Deep Cleanse",
    description: "Wake up your skin with the invigorating power of coffee. This antioxidant-rich formula reduces puffiness, evens skin tone, and leaves you feeling refreshed and energized.",
    benefits: [
      "Reduces puffiness and soothes inflammation",
      "Exfoliates for smoother texture",
      "Brightens and evens skin tone",
      "Ideal for all skin types"
    ],
    suitableFor: ["All Skin Types", "Tired Skin", "Dull Complexion"],
    keyIngredient: "Coffee Beans",
    ingredients: "Aqua (Water), Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Xanthan Gum, Coffea Arabica (Coffee) Seed Powder, Kwalinol, Citric Acid, Preservative, Fragrance",
    price: 349,
    size: "100ml",
    image: coffeeImage,
    color: "hsl(25 35% 30%)",
    bgColor: "bg-aura-coffee/10"
  },
  {
    id: "rice-milk",
    name: "Rice Water & Milk Facewash",
    shortName: "Rice & Milk",
    tagline: "Silky Soft Nourishment",
    description: "Inspired by ancient beauty rituals, this gentle cleanser combines rice water and milk proteins to deeply nourish your skin, leaving it silky smooth and beautifully radiant.",
    benefits: [
      "Nourishes skin with rice and milk proteins",
      "Improves skin texture and softness",
      "Helps even out skin tone",
      "Brightens complexion naturally"
    ],
    suitableFor: ["Dry Skin", "Sensitive Skin", "Normal Skin"],
    keyIngredient: "Rice Water & Milk",
    ingredients: "Aqua (Water), Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Xanthan Gum, Hydrolyzed Rice Protein, Hydrolyzed Milk Protein, Kwalinol, Preservative, Fragrance",
    price: 349,
    size: "100ml",
    image: riceMilkImage,
    color: "hsl(45 30% 85%)",
    bgColor: "bg-aura-rice/30"
  },
  {
    id: "beetroot",
    name: "Beetroot Facewash",
    shortName: "Beetroot",
    tagline: "Natural Pink Glow",
    description: "Harness the vibrant power of beetroot for deeply hydrated, healthy-looking skin. This gentle cleanser calms sensitive skin while supporting your skin's natural moisture barrier.",
    benefits: [
      "Gently cleanses without stripping skin",
      "Hydrates and locks in moisture",
      "Soothes and calms sensitive skin",
      "Supports healthy, refreshed complexion"
    ],
    suitableFor: ["Sensitive Skin", "Dry Skin", "Dehydrated Skin"],
    keyIngredient: "Beetroot Extract",
    ingredients: "Aqua (Water), Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Xanthan Gum, Beta Vulgaris (Beet) Root Extract, Kwalinol, Preservative, Fragrance",
    price: 349,
    size: "100ml",
    image: beetrootImage,
    color: "hsl(340 50% 45%)",
    bgColor: "bg-aura-beetroot/10"
  },
  {
    id: "niacinamide",
    name: "Niacinamide Facewash",
    shortName: "Niacinamide",
    tagline: "Clear Skin Formula",
    description: "Powered by Vitamin B3, this science-backed formula helps reduce acne, minimize pores, and even out skin tone. Perfect for those seeking clearer, more refined skin.",
    benefits: [
      "Gently cleanses without drying",
      "Brightens and evens skin tone",
      "Helps reduce acne and blemishes",
      "Hydrates and soothes sensitive skin"
    ],
    suitableFor: ["Acne-Prone Skin", "Oily Skin", "Combination Skin"],
    keyIngredient: "Niacinamide (Vitamin B3)",
    ingredients: "Aqua (Water), Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Xanthan Gum, Niacinamide, Kwalinol, Citric Acid, Phenoxyethanol, Ethylhexylglycerin, Parfum (Fragrance)",
    price: 349,
    size: "100ml",
    image: niacinamideImage,
    color: "hsl(270 35% 55%)",
    bgColor: "bg-aura-lavender/10"
  }
];

export const brandFeatures = [
  {
    icon: "leaf",
    title: "100% Organic",
    description: "Pure, natural ingredients sourced responsibly"
  },
  {
    icon: "hand",
    title: "Handcrafted",
    description: "Made with care in small batches"
  },
  {
    icon: "shield-check",
    title: "Paraben-Free",
    description: "No harsh chemicals, ever"
  },
  {
    icon: "sparkles",
    title: "Safe Daily Use",
    description: "Gentle enough for everyday"
  }
];

export const ingredients = [
  {
    name: "Vitamin C",
    benefit: "Brightens & protects",
    icon: "sun"
  },
  {
    name: "Coffee Extract",
    benefit: "Energizes & tones",
    icon: "coffee"
  },
  {
    name: "Rice Water",
    benefit: "Softens & smooths",
    icon: "droplet"
  },
  {
    name: "Beetroot",
    benefit: "Hydrates & soothes",
    icon: "heart"
  },
  {
    name: "Niacinamide",
    benefit: "Clears & refines",
    icon: "sparkles"
  },
  {
    name: "Milk Proteins",
    benefit: "Nourishes deeply",
    icon: "milk"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    age: 21,
    product: "Vitamin C Facewash",
    text: "My skin has never looked this radiant! The vitamin C facewash has become my morning essential. I've noticed my dark spots fading within weeks.",
    rating: 5
  },
  {
    id: 2,
    name: "Aisha M.",
    age: 19,
    product: "Niacinamide Facewash",
    text: "Finally found something that actually helps with my acne without drying out my skin. The niacinamide formula is a game changer!",
    rating: 5
  },
  {
    id: 3,
    name: "Rohan K.",
    age: 22,
    product: "Coffee Facewash",
    text: "As a guy, I was skeptical about skincare. But this coffee facewash wakes me up and keeps my skin looking fresh all day. Highly recommend!",
    rating: 5
  },
  {
    id: 4,
    name: "Meera D.",
    age: 20,
    product: "Rice & Milk Facewash",
    text: "My sensitive skin loves this! So gentle yet effective. My face feels soft and hydrated every time I use it.",
    rating: 5
  }
];

export const contactInfo = {
  phone: "+91 9173400522",
  email: "eternals.hub@gmail.com",
  instagram: "@aura.asae",
  whatsappLink: "https://wa.me/919173400522",
  instagramLink: "https://instagram.com/aura.asae"
};
