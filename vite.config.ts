import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'corona.png', 'background.portada.png'],
      manifest: {
        name: 'Poematón 2.0',
        short_name: 'Poematón',
        description:
          'Crea poemas ready-made seleccionando versos de diferentes autores',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'fullscreen',
        orientation: 'landscape',
        start_url: '.',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      injectManifest: {
        // Cache all app assets for offline use (audio excluded — too large for precache)
        globPatterns: ['**/*.{js,css,html,ico,png,woff,woff2}'],
      },
    }),
  ],
  base: '/poematon-v2/',
})
