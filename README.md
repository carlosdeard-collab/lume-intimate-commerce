# Lume / tienda de bienestar íntimo

SPA React + TypeScript + Vite para una marca premium de bienestar íntimo. El proyecto vive en `web/` para mantenerse separado del automatizador Python existente.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación y ejecución

```bash
cd web
npm install
copy .env.example .env
npm run dev
```

Para producción local:

```bash
npm run build
npm run preview
```

## Configuración

Las variables públicas están en `.env.example`: WhatsApp, redes sociales, proveedor de pagos y URL futura de API. No se deben colocar secretos en variables `VITE_`; la integración de pagos real debe ejecutarse mediante backend y SDK oficial.

## Estructura

- `src/data`: catálogo demo centralizado.
- `src/components`: header, tarjetas, verificación de edad y herramientas flotantes.
- `src/context`: carrito y favoritos persistidos en `localStorage`.
- `src/services`: límites reemplazables para chatbot y futuras APIs.
- `src/config.ts`: identidad, enlaces y formateo de precios.
- `src/App.tsx`: rutas y vistas del flujo de compra.

## Personalización

Agrega productos en `src/data/products.ts`, cambia redes y WhatsApp en `.env`, y sustituye `getChatReply` en `src/services/chatService.ts` por una llamada a tu API. El checkout actual es demo: está listo para conectar Wompi, Mercado Pago, PayU o ePayco sin almacenar tarjetas en frontend.

## Rutas

Inicio, catálogo, categorías, detalle de producto, carrito, checkout, contacto, nosotros, FAQ, privacidad y términos. La SPA usa rutas amigables mediante React Router.
