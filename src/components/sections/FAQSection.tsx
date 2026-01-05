import { HelpCircle, Leaf, Sparkles, ShieldCheck, Package, CreditCard } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "ingredients",
    icon: Leaf,
    question: "What ingredients are used in Aura products?",
    answer: "All Aura products are crafted with carefully selected natural ingredients like Vitamin C, Coffee extracts, Rice & Milk proteins, Beetroot, and Niacinamide. We prioritize organic, plant-based ingredients that are gentle yet effective. Every ingredient is chosen for its proven skincare benefits and safety profile."
  },
  {
    category: "ingredients",
    icon: Sparkles,
    question: "Are Aura products organic and handmade?",
    answer: "Yes! Every Aura product is handcrafted in small batches to ensure quality and freshness. We use organic ingredients wherever possible and avoid harsh chemicals, parabens, and synthetic fragrances. Our commitment to handmade production means each product receives individual attention and care."
  },
  {
    category: "skintype",
    icon: HelpCircle,
    question: "Which Aura product is right for my skin type?",
    answer: "We have options for every skin type: Vitamin C & Niacinamide facewashes work beautifully for oily and combination skin. Rice & Milk is perfect for dry and sensitive skin. Coffee is ideal for dull, tired skin needing a boost. Beetroot suits normal to oily skin looking for gentle brightening. If you're unsure, feel free to reach out via WhatsApp for personalized recommendations!"
  },
  {
    category: "usage",
    icon: Sparkles,
    question: "How should I use Aura facewashes for best results?",
    answer: "For optimal results, use your Aura facewash twice daily—morning and evening. Wet your face with lukewarm water, apply a small amount of product, gently massage in circular motions for 30-60 seconds, then rinse thoroughly. Pat dry with a clean towel. Consistent daily use will help you see the best results within 2-3 weeks."
  },
  {
    category: "safety",
    icon: ShieldCheck,
    question: "Are Aura products safe for daily use?",
    answer: "Absolutely. All Aura products are formulated to be gentle enough for everyday use. We're paraben-free, sulfate-free, and avoid harsh chemicals that can irritate skin. Our formulas are dermatologically mindful and suitable for young, sensitive skin. However, we always recommend doing a patch test if you have known allergies."
  },
  {
    category: "policy",
    icon: CreditCard,
    question: "What are Aura's payment options?",
    answer: "All Aura orders are prepaid only. We accept UPI, debit cards, credit cards, and net banking. This helps us maintain quality control and ensures smooth order processing. We do not offer Cash on Delivery (COD) at this time to keep our operations streamlined and prices affordable for you."
  },
  {
    category: "policy",
    icon: Package,
    question: "What is Aura's order and return policy?",
    answer: "To maintain product integrity and hygiene, we do not accept cancellations after order confirmation, returns, or refunds. However, rest assured that every product is thoroughly quality-checked and securely packed before dispatch. We take great care to ensure your order arrives in perfect condition. If you receive a damaged product, please contact us within 24 hours with photos."
  },
  {
    category: "trust",
    icon: ShieldCheck,
    question: "Why should I trust Aura Cosmetics?",
    answer: "Aura is built on transparency and care. We're a small, passionate team dedicated to creating honest, effective skincare. Every ingredient is listed clearly, every product is handmade with love, and we're always available to answer your questions. Our growing community of happy customers is our biggest testament—we're here to earn your trust, one product at a time."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Aura products, ingredients, and policies. 
            We believe in complete transparency with our community.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <faq.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-base md:text-lg font-medium text-foreground pr-4">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-14 pr-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Our Promise to You</h3>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              At Aura, we're committed to honest skincare. Every product is organic, handmade with care, 
              and crafted for young skin that deserves the best. Have more questions? 
              We're just a WhatsApp message away.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
