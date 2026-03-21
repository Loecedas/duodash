import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import cloudflare from "@astrojs/cloudflare";

const adapter = (process.env.NETLIFY) 
  ? netlify() 
  : vercel();

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    tailwind(),
    react(),
  ],
});