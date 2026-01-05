import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { IngredientsSection } from '@/components/sections/IngredientsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Aura Cosmetics | Premium Organic Skincare for Young India</title>
        <meta 
          name="description" 
          content="Discover Aura Cosmetics - handcrafted, 100% organic facewash collection. Vitamin C, Coffee, Rice & Milk, Beetroot & Niacinamide formulas for radiant, healthy skin. Paraben-free, made in India." 
        />
        <meta name="keywords" content="organic skincare, natural facewash, vitamin c facewash, niacinamide, coffee facewash, handcrafted cosmetics, paraben free, india skincare" />
        <meta property="og:title" content="Aura Cosmetics | Premium Organic Skincare" />
        <meta property="og:description" content="Handcrafted, 100% organic skincare for the conscious generation. Discover our range of natural facewash products." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://auracosmetics.in" />
      </Helmet>

      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TrustSection />
        <IngredientsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
      </main>
    </>
  );
};

export default Index;
