import { MessageCircle } from 'lucide-react';
import { contactInfo } from '@/data/products';

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi! I'd like to know more about Aura Cosmetics products."
  );

  return (
    <a
      href={`${contactInfo.whatsappLink}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
}
