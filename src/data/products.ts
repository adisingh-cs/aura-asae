import vitaminCPrimary from "@/assets/vitamin-c-primary.webp";
import vitaminCThumb from "@/assets/vitamin-c-thumb.webp";
import coffeePrimary from "@/assets/coffee-primary.webp";
import coffeeThumb from "@/assets/coffee-thumb.webp";
import riceMilkPrimary from "@/assets/rice-milk-primary.webp";
import riceMilkThumb from "@/assets/rice-milk-thumb.webp";
import beetrootPrimary from "@/assets/beetroot-primary.webp";
import beetrootThumb from "@/assets/beetroot-thumb.webp";
import niacinamidePrimary from "@/assets/niacinamide-primary.webp";
import niacinamideThumb from "@/assets/niacinamide-thumb.webp";

// Review images
import reviewBeetroot from "@/assets/reviews/beetroot.webp";
import reviewCoffeeVitaminC from "@/assets/reviews/coffee-vitaminc.webp";
import reviewCoffee from "@/assets/reviews/coffee.webp";
import reviewNiacinamide from "@/assets/reviews/niacinamide.webp";
import reviewNiacinamideBeetroot from "@/assets/reviews/niacinamide-beetroot.webp";
import reviewRiceMilk from "@/assets/reviews/ricemilk.webp";
import reviewRiceMilk2 from "@/assets/reviews/ricemilk-2.webp";
import reviewVitaminC from "@/assets/reviews/vitaminc.webp";
import reviewVitaminC2 from "@/assets/reviews/vitaminc-2.webp";

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
  primaryImage: string;
  thumbnailImage: string;
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
    primaryImage: vitaminCPrimary,
    thumbnailImage: vitaminCThumb,
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
    primaryImage: coffeePrimary,
    thumbnailImage: coffeeThumb,
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
    primaryImage: riceMilkPrimary,
    thumbnailImage: riceMilkThumb,
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
    primaryImage: beetrootPrimary,
    thumbnailImage: beetrootThumb,
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
    primaryImage: niacinamidePrimary,
    thumbnailImage: niacinamideThumb,
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

export interface Testimonial {
  id: number;
  name: string;
  age: number;
  product: string;
  text: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kavya R.",
    age: 23,
    product: "Vitamin C Facewash",
    text: "Honestly didn't expect much but wow! My skin looks so much brighter now. Using it every morning and the citrusy smell is just 💛 Been getting so many compliments lately!",
    rating: 5,
    image: reviewVitaminC
  },
  {
    id: 2,
    name: "Sneha M.",
    age: 21,
    product: "Vitamin C Facewash",
    text: "Third bottle and still obsessed! My dark spots from last summer have faded so much. It's gentle but you can really feel it working. Total skincare staple for me now.",
    rating: 5,
    image: reviewVitaminC2
  },
  {
    id: 3,
    name: "Priya T.",
    age: 20,
    product: "Rice & Milk Facewash",
    text: "Finally something that doesn't irritate my super sensitive skin! Leaves my face feeling baby soft without that tight feeling. The packaging is so pretty too 🤍",
    rating: 5,
    image: reviewRiceMilk
  },
  {
    id: 4,
    name: "Ananya S.",
    age: 22,
    product: "Rice & Milk Facewash",
    text: "My dry skin has never been happier! Was tired of facewashes that made me feel like I need moisturizer immediately. This one actually hydrates while cleansing. Love it!",
    rating: 5,
    image: reviewRiceMilk2
  },
  {
    id: 5,
    name: "Ritika J.",
    age: 19,
    product: "Niacinamide Facewash",
    text: "Okay so I've struggled with acne for years and this has genuinely helped! My pores look smaller and breakouts have reduced so much. Wish I found this sooner tbh.",
    rating: 5,
    image: reviewNiacinamide
  },
  {
    id: 6,
    name: "Diya P.",
    age: 24,
    product: "Niacinamide & Beetroot Combo",
    text: "Got both for my oily-but-dehydrated skin situation and it's the perfect combo! Niacinamide in the morning, Beetroot at night. Skin has never been more balanced 💜",
    rating: 5,
    image: reviewNiacinamideBeetroot
  },
  {
    id: 7,
    name: "Meera K.",
    age: 20,
    product: "Coffee Facewash",
    text: "The morning pick-me-up my face needed! Smells amazing and really wakes up my skin. My boyfriend secretly uses it too now lol. Worth every rupee!",
    rating: 5,
    image: reviewCoffee
  },
  {
    id: 8,
    name: "Aisha L.",
    age: 22,
    product: "Coffee & Vitamin C Combo",
    text: "Bought both to try and honestly can't pick a favorite! Coffee for those puffy morning days, Vitamin C when I need extra glow. Best skincare investment I've made 🧡",
    rating: 5,
    image: reviewCoffeeVitaminC
  },
  {
    id: 9,
    name: "Tanvi D.",
    age: 21,
    product: "Beetroot Facewash",
    text: "Such a unique product! The pink color is so cute and it actually works. My skin feels super hydrated and healthy. Perfect for winters when my skin gets all dry.",
    rating: 5,
    image: reviewBeetroot
  }
];

export const contactInfo = {
  phone: "+91 9173400522",
  email: "eternals.hub@gmail.com",
  instagram: "@aura.asae",
  whatsappLink: "https://wa.me/919173400522",
  instagramLink: "https://instagram.com/aura.asae"
};
