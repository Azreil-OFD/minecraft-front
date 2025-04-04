import Nora from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/content',
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
  ],
  primevue: {
    options: {
      theme: {
        preset: Nora
      }
    }
  },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

})