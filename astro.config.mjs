import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 👇 AQUÍ ESTÁ LA MAGIA DEL SEO
  // Reemplaza esto con el dominio real de la empresa cuando lo tengan (ej: 'https://www.doma.com')
  // Mientras estés trabajando en tu computadora (localhost), Astro es lo suficientemente
  // inteligente para manejarlo, pero esta línea es vital para cuando lo publiques.
  site: 'https://tu-dominio-real.com', 
  
  integrations: [tailwind(), react()]
});