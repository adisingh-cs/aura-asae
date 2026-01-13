import { HelpCircle, Leaf, Sparkles, ShieldCheck, Package, CreditCard } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from '@/lib/i18n/LocaleContext';

const faqIcons = [Leaf, Sparkles, HelpCircle, Sparkles, ShieldCheck, CreditCard, Package, ShieldCheck];

const FAQSection = () => {
  const { t } = useLocale();

  return (
    <section id="faq" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {t.faq.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">
            {t.faq.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {t.faq.questions.map((faq, index) => {
              const IconComponent = faqIcons[index] || HelpCircle;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border/50 rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
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
              );
            })}
          </Accordion>
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{t.faq.promiseTitle}</h3>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              {t.faq.promiseText}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
