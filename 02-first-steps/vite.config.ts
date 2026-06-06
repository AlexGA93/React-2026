import { defineConfig } from 'vitest/config' // antes importado de vite, ahora vitest
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  // extendemos parte de la informacion compartida globalmente en una app de vite,
  test: {
    globals: true, // para usar funciones globales de vitest como describe, test, expect sin necesidad de importarlas
    environment: 'jsdom', // para simular un entorno de navegador en los tests, necesario para testear componentes de React que interactuan con el DOM
  }
})
