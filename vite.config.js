import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend', // Your source directory
  build: {
    outDir: 'frontend/dist', // Specify output directory for Vercel to find
  },
  server: {
    port: 5173,
  },
});
