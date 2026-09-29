// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://onlineovertimecalculator.com',
  redirects: {
    '/': '/OvertimeCalculator/select-state/',
    '/privacy': '/privacy-policy/',
    '/terms': '/terms-and-conditions/',
    '/about': '/about-us/',
    '/contact': '/contact-us/',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});