import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const adapter = (process.env.NETLIFY) 
  ? netlify() 
  : vercel();

export default defineConfig({
  output: 'server',
  adapter,
  integrations: [
    tailwind(),
    react(),
  ],
});
