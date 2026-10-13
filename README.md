# Librería Daisy — Landing page (prototipo funcional)

Landing responsive diseñada para una librería de barrio moderna, cercana y colorida.

## Tecnologías

- Next.js 16 / React 19 / TypeScript
- CSS custom responsive, sin framework adicional
- GSAP + ScrollTrigger para animaciones de entrada, al scroll y cambios del carrusel
- Lucide React para iconografía
- Ilustraciones originales hechas con CSS (no dependen de fotografías de stock)

## Iniciar

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

Para producción: `npm run build && npm run start`.

## Contacto por WhatsApp

El enlace oficial y el mensaje inicial se centralizan en `lib/whatsapp.ts`. Los CTA generales abren una consulta nueva y cada tarjeta de servicio incluye el nombre del servicio en su mensaje.

## Pendientes antes de publicar

1. **Horarios:** confirmar horarios actuales de atención. El prototipo redirige a la ficha de Maps para consultar información vigente.
2. **Logo:** sustituir el wordmark tipográfico temporal por versión aprobada del logo.
3. **Fotografías:** agregar fotos reales del local y productos en una siguiente versión, sin perder las ilustraciones decorativas.
4. **Contenido:** validar los servicios anunciados, la historia del traslado y el tono de los textos con la librería.
5. **Dominio:** definir `NEXT_PUBLIC_SITE_URL` en el despliegue de producción con el origen público, por ejemplo `https://www.ejemplo.com`. Debe ser un origen sin ruta, credenciales ni fragmento. Sin esta variable no se generan canonical, URL de Open Graph ni URLs absolutas en sitemap/robots; las direcciones locales se rechazan.
6. **SEO pendiente:** definir el dominio real, crear una imagen Open Graph aprobada y verificar la ficha de Google Business Profile. No se configuró favicon ni imagen OG porque no hay recursos disponibles.
7. **Datos del negocio:** confirmar horarios actuales antes de publicarlos. El sitio no incorpora horarios ni calificaciones no verificadas.

## Dirección de arte

- Violeta `#20116F`
- Coral `#FF8A80`
- Menta `#B8E0D2`
- Lavanda `#D6B8F5`
- Crema `#FFF7F2`

**Restricción:** no combinar azul y amarillo. No se usa amarillo en la paleta.

## Accesibilidad

- Enlaces y botones semánticos
- Carrusel con controles manuales y nombres accesibles, sin avance automático
- Compatible con `prefers-reduced-motion`
- Enlace para saltar al contenido y menú móvil accesible
