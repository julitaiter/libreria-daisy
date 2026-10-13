import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Librería Daisy | Tu librería en Recoleta',
  description: 'Artículos escolares, de oficina, fotocopias, impresiones, anillados y mucho más. Encontranos en Av. Las Heras 2444, CABA.',
  openGraph: { title: 'Librería Daisy | Tu librería en Recoleta', description: 'Un montón de ideas, cerquita tuyo.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
