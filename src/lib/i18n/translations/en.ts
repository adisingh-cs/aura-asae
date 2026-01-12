import type { Translations } from '../types';

export const en: Translations = {
  nav: {
    about: 'About',
    products: 'Products',
    ingredients: 'Ingredients',
    reviews: 'Reviews',
    contact: 'Contact',
  },
  hero: {
    badge: 'Organic • Handcrafted • Premium',
    tagline: "Discover skincare that truly cares. Our organic, handcrafted formulas are designed for young, conscious individuals who value purity and effectiveness.",
    cta: 'Explore Products',
    secondary: 'Our Story',
  },
  about: {
    label: 'Our Story',
    title: 'Skincare That',
    titleHighlight: 'Understands',
    paragraphs: [
      "Born in 2025, Aura Cosmetics emerged from a simple belief: your skin deserves ingredients you can trust. We're a young brand created for young people who refuse to compromise on what they put on their skin.",
      "Every Aura product is meticulously handcrafted using 100% organic ingredients, carefully sourced and blended to deliver real results without harsh chemicals. We believe in gentle yet effective skincare that works with your skin's natural rhythm.",
      "From vitamin C brightening to niacinamide clarity, each formula is designed to address real concerns faced by college students and young professionals — because glowing skin shouldn't require a complicated routine or a hefty budget.",
    ],
    badges: ['Est. 2025', '100% Organic', 'Made with Love'],
  },
  products: {
    label: 'Our Products',
    title: 'The Aura Lineup',
    subtitle: 'Five handcrafted facewashes, each designed to address your unique skin needs. Find your perfect match.',
    priceNote: 'All products: {price} for 100ml',
    viewDetails: 'View Details →',
  },
  trust: {
    label: 'Why Choose Us',
    title: 'The Aura Promise',
    subtitle: "We're committed to creating skincare that's as kind to your skin as it is to the planet.",
    features: [
      { title: '100% Organic', description: 'Pure natural ingredients' },
      { title: 'Handcrafted', description: 'Made in small batches' },
      { title: 'Paraben-Free', description: 'No harmful chemicals' },
      { title: 'Cruelty-Free', description: 'Never tested on animals' },
    ],
  },
  ingredients: {
    label: 'Pure Ingredients',
    title: "Nature's Best, In Every Drop",
    subtitle: 'We source only the finest organic ingredients to create formulas that nourish, protect, and transform your skin naturally.',
    items: [
      { name: 'Vitamin C', benefit: 'Brightening' },
      { name: 'Coffee', benefit: 'Energizing' },
      { name: 'Rice Milk', benefit: 'Nourishing' },
      { name: 'Beetroot', benefit: 'Revitalizing' },
      { name: 'Niacinamide', benefit: 'Clarifying' },
      { name: 'Aloe Vera', benefit: 'Soothing' },
    ],
  },
  testimonials: {
    label: 'Customer Love',
    title: 'What Our Community Says',
    subtitle: "Real reviews from real people who've experienced the Aura difference.",
    disclaimer: '*These testimonials represent customer experiences. Individual results may vary.',
  },
  faq: {
    label: 'Got Questions?',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Aura products, ingredients, and policies. We believe in complete transparency with our community.',
    questions: [
      {
        question: 'What ingredients are used in Aura products?',
        answer: 'All Aura products are crafted with carefully selected natural ingredients like Vitamin C, Coffee extracts, Rice & Milk proteins, Beetroot, and Niacinamide. We prioritize organic, plant-based ingredients that are gentle yet effective.',
      },
      {
        question: 'Are Aura products organic and handmade?',
        answer: "Yes! Every Aura product is handcrafted in small batches to ensure quality and freshness. We use organic ingredients wherever possible and avoid harsh chemicals, parabens, and synthetic fragrances.",
      },
      {
        question: 'Which Aura product is right for my skin type?',
        answer: "Vitamin C & Niacinamide facewashes work beautifully for oily and combination skin. Rice & Milk is perfect for dry and sensitive skin. Coffee is ideal for dull, tired skin needing a boost. Beetroot suits normal to oily skin looking for gentle brightening.",
      },
      {
        question: 'How should I use Aura facewashes for best results?',
        answer: "For optimal results, use your Aura facewash twice daily—morning and evening. Wet your face with lukewarm water, apply a small amount of product, gently massage in circular motions for 30-60 seconds, then rinse thoroughly.",
      },
      {
        question: 'Are Aura products safe for daily use?',
        answer: "Absolutely. All Aura products are formulated to be gentle enough for everyday use. We're paraben-free, sulfate-free, and avoid harsh chemicals that can irritate skin.",
      },
      {
        question: "What are Aura's payment options?",
        answer: "All Aura orders are prepaid only. We accept UPI, debit cards, credit cards, and net banking. We do not offer Cash on Delivery (COD) at this time.",
      },
      {
        question: "What is Aura's order and return policy?",
        answer: "To maintain product integrity and hygiene, we do not accept cancellations after order confirmation, returns, or refunds. However, if you receive a damaged product, please contact us within 24 hours with photos.",
      },
      {
        question: 'Why should I trust Aura Cosmetics?',
        answer: "Aura is built on transparency and care. We're a small, passionate team dedicated to creating honest, effective skincare. Every ingredient is listed clearly, every product is handmade with love.",
      },
    ],
    promiseTitle: 'Our Promise to You',
    promiseText: "At Aura, we're committed to honest skincare. Every product is organic, handmade with care, and crafted for young skin that deserves the best. Have more questions? We're just a WhatsApp message away.",
  },
  contact: {
    label: 'Get In Touch',
    title: 'Ready to Glow?',
    subtitle: "Have questions about our products or want to place an order? We're just a message away!",
    whatsappCta: 'Chat With Us on WhatsApp',
    phone: 'Phone',
    email: 'Email',
    instagram: 'Instagram',
  },
  footer: {
    tagline: 'Organic, handcrafted skincare for the conscious generation. Let your natural glow shine through — with Aura.',
    productsTitle: 'Our Products',
    linksTitle: 'Quick Links',
    contactTitle: 'Get in Touch',
    copyright: '© {year} Aura Cosmetics. All rights reserved.',
    madeIn: 'Made with ❤️ in India',
  },
  productDetails: {
    benefits: 'Benefits',
    suitableFor: 'Suitable For',
    ingredients: 'Full Ingredients',
    orderNow: 'Order on WhatsApp',
    shippingInfo: 'Shipping: {price}',
  },
  promo: {
    freeDelivery: '🚚 FREE DELIVERY on orders above ₹500',
    limitedOffer: '🔥 LIMITED TIME: Get 2 Facewash for just ₹500!',
  },
  international: {
    shippingAvailable: '🌍 International shipping available',
    shippingCost: 'Shipping: {price}',
  },
};
