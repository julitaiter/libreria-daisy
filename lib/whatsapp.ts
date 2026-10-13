export const WHATSAPP_NUMBER = '5491157633750';
export const WHATSAPP_DISPLAY_NUMBER = '+54 11 5763-3750';
export const WHATSAPP_INITIAL_MESSAGE = 'Hola, quisiera hacer una consulta.';

export function createWhatsAppUrl(message = WHATSAPP_INITIAL_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
