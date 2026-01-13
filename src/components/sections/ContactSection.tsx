import { MessageCircle, Mail, Phone, Instagram } from 'lucide-react';
import { contactInfo } from '@/data/products';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLocale } from '@/lib/i18n/LocaleContext';

export function ContactSection() {
  const { t } = useLocale();
  
  const whatsappMessage = encodeURIComponent(
    "Hi! I'd like to know more about Aura Cosmetics products."
  );

  return (
    <section id="contact" className="section-padding bg-primary/5 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <AnimatedSection animation="fade-in">
            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
              {t.contact.label}
            </span>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={100}>
            <h2 className="heading-section text-foreground mb-4">
              {t.contact.title}
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </AnimatedSection>
        </div>

        {/* CTA Card */}
        <AnimatedSection animation="scale-in" delay={300}>
          <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            {/* WhatsApp CTA */}
            <a
              href={`${contactInfo.whatsappLink}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero w-full mb-8"
            >
              <MessageCircle className="w-6 h-6" />
              {t.contact.whatsappCta}
            </a>

            {/* Contact Details */}
            <div className="grid sm:grid-cols-3 gap-6">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.contact.phone}</span>
                <span className="text-sm font-medium text-foreground">
                  {contactInfo.phone}
                </span>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.contact.email}</span>
                <span className="text-sm font-medium text-foreground break-all">
                  {contactInfo.email}
                </span>
              </a>

              <a
                href={contactInfo.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Instagram className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.contact.instagram}</span>
                <span className="text-sm font-medium text-foreground">
                  {contactInfo.instagram}
                </span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
