import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { Helmet } from 'react-helmet-async';
import { products, testimonials, contactInfo } from '@/data/products';

// Lazy load below-the-fold components for better performance
const AboutSection = lazy(() => import('@/components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ProductsSection = lazy(() => import('@/components/sections/ProductsSection').then(m => ({ default: m.ProductsSection })));
const TrustSection = lazy(() => import('@/components/sections/TrustSection').then(m => ({ default: m.TrustSection })));
const IngredientsSection = lazy(() => import('@/components/sections/IngredientsSection').then(m => ({ default: m.IngredientsSection })));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import('@/components/sections/Footer').then(m => ({ default: m.Footer })));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton').then(m => ({ default: m.WhatsAppButton })));
const ValentineButterfly = lazy(() => import('@/components/ValentineButterfly').then(m => ({ default: m.ValentineButterfly })));

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
      "name": "What is the shipping time for Aura products?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For orders within India, delivery takes 5-7 business days. For international orders, shipping may take a minimum of 15 days depending on your location. All orders include tracking information."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods does Aura accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept UPI-based payments only, including Google Pay (GPay), PhonePe, and QR code payments. Simply scan our QR code or use your preferred UPI app to complete your order securely."
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

// Special Offer Schema for Valentine's Day Sale
const saleEventSchema = {
  "@context": "https://schema.org",
  "@type": "SaleEvent",
  "name": "Early Valentine's Day Sale",
  "description": "Get 20% off on all Aura Cosmetics organic facewash products with code LOVE20",
  "startDate": "2025-01-17",
  "endDate": "2025-02-14",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
  "location": {
    "@type": "VirtualLocation",
    "url": "https://auracosmetics.in"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Aura Cosmetics",
    "url": "https://auracosmetics.in"
  },
  "offers": {
    "@type": "Offer",
    "name": "20% Off Valentine's Day Discount",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "discount": "20%"
    },
    "validFrom": "2025-01-17",
    "validThrough": "2025-02-14"
  }
};

// Brand Schema for global recognition
const brandSchema = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "Aura Cosmetics",
  "description": "100% organic, handcrafted skincare brand from India specializing in natural facewash products",
  "logo": "https://auracosmetics.in/logo.webp",
  "url": "https://auracosmetics.in",
  "slogan": "Glow with the flow",
  "foundingDate": "2025",
  "foundingLocation": {
    "@type": "Place",
    "name": "India"
  }
};

const Index = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags - Optimized for CTR */}
        <title>Aura Cosmetics | 100% Organic Facewash ₹349 | Free Delivery India</title>
        <meta 
          name="description" 
          content="★★★★★ 5-Star Rated Organic Facewash. Vitamin C, Coffee, Rice Milk, Beetroot & Niacinamide formulas. Paraben-free, handcrafted in India. ₹349/100ml. Free delivery on ₹500+. Shop now!" 
        />
        <meta name="keywords" content="organic facewash india, natural facewash, vitamin c facewash, niacinamide facewash, coffee facewash, rice milk facewash, beetroot facewash, handcrafted cosmetics india, paraben free facewash, sulphate free facewash, best facewash india 2025, affordable organic skincare, aura cosmetics, face wash for oily skin, face wash for dry skin, face wash for acne, face wash for glowing skin, brightening facewash, anti acne facewash" />
        
        {/* Open Graph - Enhanced for engagement */}
        <meta property="og:title" content="Aura Cosmetics | 100% Organic Facewash ₹349 | Free Delivery" />
        <meta property="og:description" content="★★★★★ 5-Star Rated! Shop India's favorite organic facewash collection. Vitamin C, Coffee, Rice Milk & more. Handcrafted, paraben-free. Free delivery on ₹500+!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auracosmetics.in/" />
        <meta property="og:site_name" content="Aura Cosmetics" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter - Enhanced for clicks */}
        <meta name="twitter:title" content="Aura Cosmetics | 100% Organic Facewash ₹349" />
        <meta name="twitter:description" content="★★★★★ 5-Star Rated! India's favorite organic facewash. Vitamin C, Coffee, Rice Milk & more. Handcrafted, paraben-free. Shop now!" />
        
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
        {/* Sale Event Schema for Promotions */}
        <script type="application/ld+json">
          {JSON.stringify(saleEventSchema)}
        </script>
        {/* Brand Schema for Global Recognition */}
        <script type="application/ld+json">
          {JSON.stringify(brandSchema)}
        </script>
        {/* Individual Review Schemas */}
        {reviewSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <Suspense fallback={null}>
        <ValentineButterfly />
      </Suspense>
      <main id="main-content" className="min-h-screen" role="main" itemScope itemType="https://schema.org/WebPage">
        <Navbar />
        <article itemScope itemType="https://schema.org/Product">
          <HeroSection />
        </article>
        <Suspense fallback={<div className="min-h-[200px]" aria-label="Loading about section" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px]" aria-label="Loading products" />}>
          <ProductsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" aria-label="Loading trust badges" />}>
          <TrustSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[300px]" aria-label="Loading ingredients" />}>
          <IngredientsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px]" aria-label="Loading testimonials" />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[300px]" aria-label="Loading FAQ" />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" aria-label="Loading contact" />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[100px]" aria-label="Loading footer" />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
