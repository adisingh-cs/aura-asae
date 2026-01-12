import type { Translations } from '../types';

export const fr: Translations = {
  nav: {
    about: 'À propos',
    products: 'Produits',
    ingredients: 'Ingrédients',
    reviews: 'Avis',
    contact: 'Contact',
  },
  hero: {
    badge: 'Bio • Artisanal • Premium',
    tagline: 'Découvrez des soins qui se soucient vraiment de vous. Nos formules biologiques et artisanales sont conçues pour les jeunes conscients qui valorisent la pureté et l\'efficacité.',
    cta: 'Découvrir les produits',
    secondary: 'Notre histoire',
  },
  about: {
    label: 'Notre Histoire',
    title: 'Des soins qui',
    titleHighlight: 'vous comprennent',
    paragraphs: [
      'Née en 2025, Aura Cosmetics est issue d\'une conviction simple : votre peau mérite des ingrédients en lesquels vous pouvez avoir confiance. Nous sommes une jeune marque créée pour les jeunes qui refusent de faire des compromis.',
      'Chaque produit Aura est méticuleusement fabriqué à la main avec des ingrédients 100% biologiques, soigneusement sourcés et mélangés pour offrir de vrais résultats sans produits chimiques agressifs.',
      'De l\'éclaircissement à la vitamine C à la clarté du niacinamide, chaque formule est conçue pour répondre aux préoccupations réelles des étudiants et jeunes professionnels.',
    ],
    badges: ['Fondée en 2025', '100% Bio', 'Fait avec amour'],
  },
  products: {
    label: 'Nos Produits',
    title: 'La Collection Aura',
    subtitle: 'Cinq nettoyants visage artisanaux, chacun conçu pour répondre à vos besoins uniques de peau.',
    priceNote: 'Tous les produits : {price} pour 100ml',
    viewDetails: 'Voir les détails →',
  },
  trust: {
    label: 'Pourquoi nous choisir',
    title: 'La Promesse Aura',
    subtitle: 'Nous nous engageons à créer des soins aussi doux pour votre peau que pour la planète.',
    features: [
      { title: '100% Bio', description: 'Ingrédients naturels purs' },
      { title: 'Artisanal', description: 'Fabriqué en petits lots' },
      { title: 'Sans paraben', description: 'Pas de produits chimiques nocifs' },
      { title: 'Cruelty-Free', description: 'Jamais testé sur les animaux' },
    ],
  },
  ingredients: {
    label: 'Ingrédients Purs',
    title: 'Le meilleur de la nature, dans chaque goutte',
    subtitle: 'Nous ne sourçons que les meilleurs ingrédients biologiques pour créer des formules qui nourrissent, protègent et transforment votre peau naturellement.',
    items: [
      { name: 'Vitamine C', benefit: 'Éclaircissant' },
      { name: 'Café', benefit: 'Énergisant' },
      { name: 'Lait de riz', benefit: 'Nourrissant' },
      { name: 'Betterave', benefit: 'Revitalisant' },
      { name: 'Niacinamide', benefit: 'Purifiant' },
      { name: 'Aloe Vera', benefit: 'Apaisant' },
    ],
  },
  testimonials: {
    label: 'Avis clients',
    title: 'Ce que dit notre communauté',
    subtitle: 'De vrais avis de vraies personnes qui ont expérimenté la différence Aura.',
    disclaimer: '*Ces témoignages représentent les expériences des clients. Les résultats individuels peuvent varier.',
  },
  faq: {
    label: 'Questions ?',
    title: 'Questions Fréquentes',
    subtitle: 'Tout ce que vous devez savoir sur les produits Aura, les ingrédients et les politiques. Nous croyons en une transparence totale.',
    questions: [
      {
        question: 'Quels ingrédients sont utilisés dans les produits Aura ?',
        answer: 'Tous les produits Aura sont fabriqués avec des ingrédients naturels soigneusement sélectionnés comme la vitamine C, les extraits de café, les protéines de riz et de lait, la betterave et le niacinamide.',
      },
      {
        question: 'Les produits Aura sont-ils biologiques et faits main ?',
        answer: 'Oui ! Chaque produit Aura est fabriqué à la main en petits lots pour garantir qualité et fraîcheur. Nous utilisons des ingrédients biologiques dans la mesure du possible.',
      },
      {
        question: 'Quel produit Aura convient à mon type de peau ?',
        answer: 'Les nettoyants Vitamine C et Niacinamide sont parfaits pour les peaux grasses et mixtes. Riz et Lait est idéal pour les peaux sèches et sensibles. Café est parfait pour les peaux ternes.',
      },
      {
        question: 'Comment utiliser les nettoyants Aura pour de meilleurs résultats ?',
        answer: 'Pour des résultats optimaux, utilisez votre nettoyant Aura deux fois par jour - matin et soir. Mouillez votre visage avec de l\'eau tiède et massez doucement.',
      },
      {
        question: 'Les produits Aura sont-ils sûrs pour un usage quotidien ?',
        answer: 'Absolument. Tous les produits Aura sont formulés pour être assez doux pour un usage quotidien. Nous sommes sans paraben, sans sulfate.',
      },
      {
        question: 'Quelles sont les options de paiement d\'Aura ?',
        answer: 'Nous acceptons toutes les principales cartes de crédit, PayPal et les virements bancaires pour les commandes internationales.',
      },
      {
        question: 'Quelle est la politique de commande et de retour d\'Aura ?',
        answer: 'Pour maintenir l\'intégrité et l\'hygiène des produits, nous n\'acceptons pas les annulations après confirmation de commande, les retours ou les remboursements. Pour les produits endommagés, contactez-nous dans les 24 heures.',
      },
      {
        question: 'Pourquoi devrais-je faire confiance à Aura Cosmetics ?',
        answer: 'Aura est construite sur la transparence et le soin. Nous sommes une petite équipe passionnée dédiée à créer des soins honnêtes et efficaces.',
      },
    ],
    promiseTitle: 'Notre promesse',
    promiseText: 'Chez Aura, nous nous engageons pour des soins honnêtes. Chaque produit est biologique, fait à la main avec amour, et conçu pour les jeunes peaux. D\'autres questions ? Nous sommes à un message WhatsApp.',
  },
  contact: {
    label: 'Contact',
    title: 'Prêt à rayonner ?',
    subtitle: 'Des questions sur nos produits ou vous voulez passer commande ? Nous ne sommes qu\'à un message !',
    whatsappCta: 'Discutez avec nous sur WhatsApp',
    phone: 'Téléphone',
    email: 'Email',
    instagram: 'Instagram',
  },
  footer: {
    tagline: 'Soins biologiques et artisanaux pour la génération consciente. Laissez votre éclat naturel briller - avec Aura.',
    productsTitle: 'Nos Produits',
    linksTitle: 'Liens Rapides',
    contactTitle: 'Contact',
    copyright: '© {year} Aura Cosmetics. Tous droits réservés.',
    madeIn: 'Fait avec ❤️ en Inde',
  },
  productDetails: {
    benefits: 'Bénéfices',
    suitableFor: 'Convient pour',
    ingredients: 'Ingrédients complets',
    orderNow: 'Commander sur WhatsApp',
    shippingInfo: 'Livraison : {price}',
  },
  promo: {
    freeDelivery: '🚚 LIVRAISON GRATUITE pour les commandes supérieures à ₹500',
    limitedOffer: '🔥 OFFRE LIMITÉE : 2 nettoyants pour seulement ₹500 !',
  },
  international: {
    shippingAvailable: '🌍 Livraison internationale disponible',
    shippingCost: 'Livraison : {price}',
  },
};
