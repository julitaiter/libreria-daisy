# Guía de desarrollo — Librería Daisy

Documentación técnica de la landing page de **Librería Daisy**. El `README.md` principal está orientado a presentar el comercio; este archivo reúne las instrucciones para desarrollar y mantener el sitio.

## Tecnologías

- Next.js 16 (App Router) y React 19.
- TypeScript.
- GSAP y ScrollTrigger para animaciones.
- CSS del proyecto (`app/globals.css`).
- Lucide React para íconos.

No se necesita un entorno virtual de Python (`venv`): el proyecto utiliza Node.js y npm.

## Requisitos

- Node.js compatible con Next.js 16 (mínimo 20.9; se probó con Node.js 24.21.0).
- npm.
- Git (recomendado).

En Ubuntu, se puede administrar Node.js con [nvm](https://github.com/nvm-sh/nvm).

Verificar versiones:

```bash
node -v
npm -v
```

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
npm install
cp .env.example .env.local
npm run dev
```

`NEXT_PUBLIC_SITE_URL` puede dejarse vacío durante el desarrollo local. Abrir `http://localhost:3000`. Si la configuración de red lo permite, también puede accederse desde otro dispositivo de la misma red utilizando la IP local del equipo y el puerto `3000`.

Para detener el servidor, presionar `Ctrl+C`.

### Compilación de producción

```bash
npm run build
npm run start
```

Antes de subir cambios importantes, ejecutar:

```bash
npm audit
npm run build
```

No usar `npm audit fix --force` sin revisar las actualizaciones incompatibles que pueda introducir.

## Estructura principal

```text
app/
  favicon.ico       # Ícono del sitio
  globals.css       # Estilos generales y responsive
  layout.tsx        # Layout, metadatos y datos estructurados
  page.tsx          # Página principal
  robots.ts         # Directivas de rastreo
  sitemap.ts        # Mapa del sitio
components/
  Illustrations.tsx # Ilustraciones de la landing
  WhatsAppButton.tsx # Botón flotante de contacto
lib/
  whatsapp.ts       # Enlaces y mensajes de WhatsApp
  site-url.ts       # Validación de la URL pública
public/
  og-image.jpg      # Imagen de vista previa para redes sociales
```

Esta estructura refleja la implementación de referencia y puede evolucionar con el proyecto.

## Datos del comercio

Mantener actualizados los datos visibles en la página y los datos estructurados de `app/layout.tsx`.

- **Dirección:** Av. Las Heras 2444, Recoleta, CABA.
- **WhatsApp:** +54 11 5763-3750.
- **Instagram:** https://www.instagram.com/libreriadaisy_/

No publicar horarios, promociones o servicios nuevos sin confirmarlos con el comercio.

## WhatsApp

La configuración de enlaces y mensajes está centralizada en `lib/whatsapp.ts`. Los CTA generales abren una consulta genérica y los servicios pueden generar mensajes específicos.

Formato internacional para `wa.me`: `5491157633750` (sin espacios, `+` ni guiones).

Comprobar que el botón flotante y los enlaces por servicio funcionen en móvil y escritorio. Mantener el texto accesible y respetar `prefers-reduced-motion` en las animaciones.

## SEO e identidad visual

En `app/layout.tsx` se definen metadatos generales, Open Graph, Twitter Cards y datos estructurados JSON-LD de tipo `Store`.

- `app/favicon.ico`: favicon detectado automáticamente por Next.js.
- `public/og-image.jpg`: imagen social recomendada de **1200 × 630 px**.
- `app/robots.ts` y `app/sitemap.ts`: rutas generadas por Next.js.

### URL pública

La URL del sitio se obtiene mediante `getPublicSiteUrl()` de `lib/site-url.ts`, a partir de la variable de entorno `NEXT_PUBLIC_SITE_URL`.

La plantilla `.env.example` documenta esta única variable de entorno. Para desarrollo local, se puede dejar vacía. Antes del despliegue público, configurar `NEXT_PUBLIC_SITE_URL` en `.env.local` o en el proveedor de hosting con el dominio real:

```env
NEXT_PUBLIC_SITE_URL=https://www.tudominio.com.ar
```

Debe ser el origen público completo (`https://...`), sin rutas, credenciales ni barra final. Si no se configura, el sitio funciona, pero no genera URL canónica ni incluye una URL en `sitemap.xml`; en desarrollo, los metadatos de imágenes usan `http://localhost:3000`. No hace falta guardar secretos en el `.env` para esta aplicación. El número de WhatsApp y los datos públicos del comercio están definidos en el código.

No subir archivos `.env` con información sensible al repositorio. Documentar valores de ejemplo en `.env.example` si se necesitan.

## Animaciones y responsive

El sitio utiliza GSAP para el carrusel y animaciones de entrada o scroll. Antes de incorporar efectos nuevos:

1. Comprobar el comportamiento en pantallas pequeñas y con dispositivos táctiles.
2. Evitar animaciones que bloqueen el desplazamiento o dificulten la lectura.
3. Respetar `prefers-reduced-motion`.
4. Verificar que las animaciones no provoquen desbordamiento horizontal.

Los colores de referencia son violeta, coral, menta, lavanda y crema. **No combinar azul y amarillo** en la identidad ni en las nuevas propuestas visuales.

## Checklist previo al despliegue

- [ ] `npm audit` sin vulnerabilidades conocidas.
- [ ] `npm run build` finaliza sin errores.
- [ ] Hero, carrusel, enlaces y animaciones funcionan en móvil y escritorio.
- [ ] WhatsApp abre el número oficial y usa los mensajes esperados.
- [ ] Los enlaces de Instagram y Maps apuntan a los destinos correctos.
- [ ] `favicon.ico` y `og-image.jpg` se sirven correctamente.
- [ ] `NEXT_PUBLIC_SITE_URL` utiliza el dominio público definitivo.
- [ ] Metadatos, JSON-LD, `robots.txt` y `sitemap.xml` contienen datos correctos.
- [ ] El sitio no publica información no confirmada del comercio.

## Publicación

La landing puede desplegarse en un proveedor compatible con Next.js, como Vercel. Configurar las variables de entorno en el proveedor, realizar un build de producción y probar la URL pública antes de difundirla o vincularla con Google Business Profile.

Para cambios versionados, utilizar mensajes de commit en español, por ejemplo:

```bash
git commit -m "docs: agregar guía de desarrollo de la landing"
```
