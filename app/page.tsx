'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Instagram, MapPin, Menu, MessageCircle, Printer, BookOpenText, PenLine, Package, Stamp, X } from 'lucide-react';
import { StationeryArt } from '../components/Illustrations';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { createWhatsAppUrl, WHATSAPP_DISPLAY_NUMBER } from '../lib/whatsapp';

const slides = [
  { eyebrow: 'HOLA, SOMOS LIBRERÍA DAISY', headline: <>Un montón de <em>ideas</em>,<br/> cerquita tuyo.</>, detail: 'Tu librería de barrio para estudiar, trabajar, crear y resolver eso que necesitás hoy.', cta: 'Descubrí Daisy', href: '#nosotros', label: 'Todo empieza con una idea' },
  { eyebrow: 'PARA TODOS LOS DÍAS', headline: <>Todo para tus <em>planes</em> y proyectos.</>, detail: 'Artículos escolares, papelería y oficina. Lo que necesitás, a la vuelta de casa.', cta: 'Explorá las categorías', href: '#servicios', label: 'Escribí tu próxima historia' },
  { eyebrow: 'VENÍ A CONOCERNOS', headline: <>Tu lugar en <em>Las Heras.</em></>, detail: 'Estamos en Av. Las Heras 2444, Recoleta. Pasá, consultanos y encontrá eso que buscás.', cta: 'Cómo llegar', href: '#visitanos', label: 'Nos vemos en el barrio' },
];

const services = [
  { number: '01', icon: BookOpenText, title: 'Escolar y papelería', description: 'Cuadernos, carpetas, útiles y todo para acompañar tus días.', color: 'pink' },
  { number: '02', icon: Printer, title: 'Impresiones y copias', description: 'Fotocopias, impresiones y anillados para tener todo listo.', color: 'mint' },
  { number: '03', icon: PenLine, title: 'Oficina y escritorio', description: 'Lo que necesitás para organizarte y trabajar mejor.', color: 'lilac' },
  { number: '04', icon: Package, title: 'Embalaje y más', description: 'Artículos de embalaje, sellos y formularios automotor.', color: 'peach' },
];

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Av.+Las+Heras+2444%2C+CABA';
const instagramUrl = 'https://www.instagram.com/libreriadaisy_/';
const contactUrl = createWhatsAppUrl();

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const initial = useRef(true);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    async function init() {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      ctx = gsap.context(() => {
        gsap.from('.navbar', { y: -25, opacity: 0, duration: 0.75, ease: 'power2.out' });
        gsap.from('.hero-copy > *', { y: 35, opacity: 0, duration: 0.85, stagger: 0.1, delay: 0.1, ease: 'power3.out' });
        gsap.from('.hero-visual', { scale: 0.94, opacity: 0, duration: 1.1, ease: 'power3.out' });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, { y: 42, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
        });
        gsap.to('.floating-daisy', { y: -20, rotation: 12, repeat: -1, yoyo: true, duration: 3, ease: 'sine.inOut' });
        gsap.from('.whatsapp-fab', { y: 24, scale: 0.88, opacity: 0, duration: 0.7, delay: 0.45, ease: 'power2.out' });
      }, rootRef);
    }
    init();
    return () => { cancelled = true; ctx?.revert(); };
  }, []);

  useEffect(() => {
    if (initial.current) { initial.current = false; return; }
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    let animation: { kill: () => void } | undefined;
    import('gsap').then(({ gsap }) => {
      if (cancelled || !heroRef.current) return;
      animation = gsap.fromTo(heroRef.current.querySelectorAll('.hero-copy > *'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: 'power2.out' });
    });
    return () => { cancelled = true; animation?.kill(); };
  }, [active]);

  return <div ref={rootRef}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="navbar">
      <a className="brand" href="#inicio" aria-label="Librería Daisy, inicio"><span className="brand-flower">✳</span><span>librería<strong>daisy.</strong></span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Menú principal">
        <a onClick={() => setMenuOpen(false)} href="#servicios">Qué encontrás</a>
        <a onClick={() => setMenuOpen(false)} href="#nosotros">Nosotros</a>
        <a onClick={() => setMenuOpen(false)} href="#visitanos">Dónde estamos</a>
        <a onClick={() => setMenuOpen(false)} className="nav-mobile-contact" href={contactUrl} target="_blank" rel="noopener noreferrer">Contactanos ↗</a>
      </nav>
      <a className="nav-contact" href={contactUrl} target="_blank" rel="noopener noreferrer">Hablemos <ArrowUpRight size={17}/></a>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main id="contenido">
      <section id="inicio" className={`hero hero-slide-${active}`} ref={heroRef} aria-label="Presentación de Librería Daisy">
        <div className="hero-left">
          <div className="hero-copy" key={active}>
            <p className="eyebrow"><span className="eyebrow-dot" />{slides[active].eyebrow}</p>
            <h1>{slides[active].headline}</h1>
            <p className="hero-description">{slides[active].detail}</p>
            <a className="button button-dark" href={slides[active].href}>{slides[active].cta}<ArrowUpRight size={19}/></a>
          </div>
          <div className="hero-bottom"><div className="hero-pagination" aria-label="Diapositivas del carrusel">{slides.map((slide, index) => <button type="button" key={index} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Mostrar diapositiva ${index + 1}`} aria-current={active === index ? 'true' : undefined}><span /></button>)}</div><span className="slide-counter">0{active+1} <span>/ 03</span></span></div>
        </div>
        <div className="hero-right" key={`art-${active}`}>
          <span className="hero-handwriting">{slides[active].label} ✳</span>
          <div className="hero-visual"><StationeryArt variant={active}/></div>
          <span className="hero-side-caption">LIBRERÍA DE BARRIO DESDE SIEMPRE</span>
        </div>
        <a className="scroll-hint" href="#servicios"><ArrowDown size={16}/> Deslizá para descubrir</a>
      </section>

      <div className="ticker" aria-label="En Daisy encontrás de todo para tus ideas"><div className="ticker-track" aria-hidden="true">{Array.from({length: 4}, (_, i) => <span key={i}>ÚTILES <b>✳</b> IDEAS <b>✳</b> PAPELERÍA <b>✳</b> IMPRESIONES <b>✳</b> TU LIBRERÍA DE BARRIO <b>✳</b> </span>)}</div></div>

      <section className="section services-section" id="servicios">
        <div className="section-heading" data-reveal><div><p className="eyebrow">UN POCO DE TODO, PARA TODO</p><h2>Lo que necesitás, <span className="serif-italic">acá nomás.</span></h2></div><p>De la lista de útiles a esa impresión de último momento: estamos para darte una mano.</p></div>
        <div className="service-grid">{services.map((item) => <article className={`service-card ${item.color}`} key={item.number} data-reveal><div className="service-top"><span>{item.number} / 04</span><item.icon size={28} strokeWidth={1.7}/></div><div><h3>{item.title}</h3><p>{item.description}</p></div><a className="service-arrow" href={createWhatsAppUrl(`Hola, quisiera consultar por el servicio de ${item.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por WhatsApp sobre ${item.title}`}><ArrowUpRight size={23}/></a></article>)}</div>
        <p className="service-note" data-reveal><Stamp size={18}/> ¿Buscás algo específico? <a href={contactUrl} target="_blank" rel="noopener noreferrer">Escribinos y consultanos <ArrowRight size={16}/></a></p>
      </section>

      <section className="about-section" id="nosotros"><div className="about-art" data-reveal><div className="about-shape about-shape-a"/><div className="about-shape about-shape-b"/><div className="about-circle">D<small>✳</small></div><div className="about-asterisk floating-daisy">✳</div><div className="about-label">HECHO DE BARRIO ♡</div></div><div className="about-copy" data-reveal><p className="eyebrow">UN LUGAR CON HISTORIA</p><h2>De toda la vida.<br/><em>Con ideas nuevas.</em></h2><p>Antes en Av. Cabildo, hoy en Av. Las Heras: Daisy sigue siendo esa librería a la que entrás por algo que necesitás y salís con una idea más.</p><p>Nos gusta lo simple: atenderte bien, ayudarte a encontrar lo que buscás y ser parte de tu día a día.</p><a className="text-link" href="#visitanos">Vení a conocernos <ArrowUpRight size={19}/></a></div></section>

      <section className="invitation" data-reveal><span>✳</span><p>UNA IDEA, UN APUNTE, UN PROYECTO...</p><h2>Siempre hay algo<br/><em>para empezar.</em></h2><a href={contactUrl} className="button button-light" target="_blank" rel="noopener noreferrer">Hacé tu consulta <ArrowUpRight size={19}/></a></section>

      <section className="section visit-section" id="visitanos"><div className="visit-main" data-reveal><p className="eyebrow">ESTAMOS CERQUITA</p><h2>Pasá a <span className="serif-italic">saludarnos.</span></h2><p>Nos encanta ser parte del barrio. Vení a conocernos y encontrá todo lo que necesitás.</p><a href={mapsUrl} className="button button-dark" target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={18}/></a></div><div className="visit-details" data-reveal><div className="visit-detail"><MapPin size={25}/><div><h3>Encontranos</h3><p>Av. Las Heras 2444<br/>Recoleta, CABA</p></div></div><div className="visit-detail"><Clock3 size={25}/><div><h3>Horarios</h3><p>Consultá nuestros horarios actualizados en Google Maps.</p></div></div><div className="visit-detail"><MessageCircle size={25}/><div><h3>Conectemos</h3><a href={contactUrl} target="_blank" rel="noopener noreferrer">WhatsApp · {WHATSAPP_DISPLAY_NUMBER} <ArrowUpRight size={14}/></a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">@libreriadaisy_ <ArrowUpRight size={14}/></a></div></div></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><a className="brand footer-brand" href="#inicio"><span className="brand-flower">✳</span><span>librería<strong>daisy.</strong></span></a><p>Tu librería de barrio,<br/>con un montón de ideas.</p><a className="footer-instagram" href={instagramUrl} aria-label="Instagram de Librería Daisy" target="_blank" rel="noopener noreferrer"><Instagram size={21}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Librería Daisy</span><span>Av. Las Heras 2444 · Recoleta</span><a href="#inicio">Volver arriba ↑</a></div></footer>
    <WhatsAppButton />
  </div>;
}
