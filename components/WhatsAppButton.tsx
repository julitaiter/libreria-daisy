import { MessageCircle, Phone } from 'lucide-react';
import { createWhatsAppUrl } from '../lib/whatsapp';

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={createWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Librería Daisy por WhatsApp"
    >
      <span className="whatsapp-icon" aria-hidden="true">
        <MessageCircle size={30} strokeWidth={2} />
        <Phone className="whatsapp-phone" size={13} strokeWidth={2.5} />
      </span>
    </a>
  );
}
