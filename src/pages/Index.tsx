import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { IngredientsSection } from '@/components/sections/IngredientsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Helmet } from 'react-helmet-async';
import { products, testimonials, contactInfo } from '@/data/products';

// Generate JSON-LD structured data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aura Cosmetics",
  "alternateName": "Aura",
  "url": "https://auracosmetics.in",
  "logo": "https://auracosmetics.in/logo.webp",
  "description": "100% organic, handcrafted facewash collection made in India. Paraben-free skincare for the conscious generation.",
  "foundingDate": "2025",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": contactInfo.phone,
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"],
    "areaServed": "IN"
  },
  "sameAs": [
    contactInfo.instagramLink,
    contactInfo.whatsappLink
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aura Cosmetics",
  "url": "https://auracosmetics.in",
  "description": "Shop Aura's 100% organic, handcrafted facewash collection. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide formulas.",
  "publisher": {
    "@type": "Organization",
    "name": "Aura Cosmetics"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://auracosmetics.in/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Individual review schemas for rich snippets
const reviewSchemas = testimonials.map((testimonial) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": testimonial.product,
    "brand": {
      "@type": "Brand",
      "name": "Aura Cosmetics"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": testimonial.rating,
    "bestRating": 5,
    "worstRating": 1
  },
  "author": {
    "@type": "Person",
    "name": testimonial.name
  },
  "reviewBody": testimonial.text,
  "datePublished": "2025-01-01",
  "publisher": {
    "@type": "Organization",
    "name": "Aura Cosmetics"
  }
}));

// Aggregate review schema
const aggregateReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Aura Cosmetics Facewash Collection",
  "brand": {
    "@type": "Brand",
    "name": "Aura Cosmetics"
  },
  "description": "100% organic, handcrafted facewash collection made in India",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": testimonials.length,
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": testimonials.map((testimonial) => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.rating,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": testimonial.name
    },
    "reviewBody": testimonial.text
  }))
};

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Aura Facewash Collection",
  "description": "Complete collection of organic, handcrafted facewash products by Aura Cosmetics",
  "numberOfItems": products.length,
  "itemListElement": products.map((product, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": "Aura Cosmetics"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31",
        "url": `https://auracosmetics.in/#products`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": testimonials.filter(t => t.product.toLowerCase().includes(product.shortName.toLowerCase())).length || 2,
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  }))
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What ingredients are used in Aura products?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All Aura products are crafted with carefully selected natural ingredients like Vitamin C, Coffee extracts, Rice & Milk proteins, Beetroot, and Niacinamide. We prioritize organic, plant-based ingredients that are gentle yet effective."
      }
    },
    {
      "@type": "Question",
      "name": "Are Aura products organic and handmade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Every Aura product is handcrafted in small batches to ensure quality and freshness. We use organic ingredients wherever possible and avoid harsh chemicals, parabens, and synthetic fragrances."
      }
    },
    {
      "@type": "Question",
      "name": "Which Aura product is right for my skin type?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vitamin C & Niacinamide facewashes work beautifully for oily and combination skin. Rice & Milk is perfect for dry and sensitive skin. Coffee is ideal for dull, tired skin needing a boost. Beetroot suits normal to oily skin looking for gentle brightening."
      }
    },
    {
      "@type": "Question",
      "name": "Are Aura products safe for daily use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. All Aura products are formulated to be gentle enough for everyday use. We're paraben-free, sulfate-free, and avoid harsh chemicals that can irritate skin."
      }
    },
    {
      "@type": "Question",
      "name": "What is the price of Aura facewash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All Aura facewash products are priced at ₹349 for 100ml. We offer free delivery on orders above ₹500."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aura Cosmetics",
  "@id": "https://auracosmetics.in",
  "url": "https://auracosmetics.in",
  "telephone": contactInfo.phone,
  "email": contactInfo.email,
  "priceRange": "₹₹",
  "image": "https://auracosmetics.in/logo.webp",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "20.5937",
    "longitude": "78.9629"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "21:00"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://auracosmetics.in/"
    }
  ]
};

const Index = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Aura | Glow with the flow ✨</title>
        <meta 
          name="description" 
          content="Shop Aura's 100% organic, handcrafted facewash collection. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide formulas. Paraben-free skincare made in India. ₹349 for 100ml." 
        />
        <meta name="keywords" content="organic facewash, natural skincare India, vitamin c facewash, niacinamide facewash, coffee facewash, rice milk facewash, beetroot facewash, handcrafted cosmetics, paraben free skincare, organic skincare India, Aura Cosmetics, best facewash India, affordable organic skincare" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aura | Glow with the flow ✨" />
        <meta property="og:description" content="Shop Aura's 100% organic, handcrafted facewash collection. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide formulas. Paraben-free skincare made in India." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auracosmetics.in/" />
        <meta property="og:site_name" content="Aura Cosmetics" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Aura | Glow with the flow ✨" />
        <meta name="twitter:description" content="100% organic, handcrafted facewash collection. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide. Made in India." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://auracosmetics.in/" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productListSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Aggregate Review Schema for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify(aggregateReviewSchema)}
        </script>
        {/* Individual Review Schemas */}
        {reviewSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TrustSection />
        <IngredientsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
