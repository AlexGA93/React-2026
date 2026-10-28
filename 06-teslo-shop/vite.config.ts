import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const src = fileURLToPath(new URL("./src", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@": src,
      "@admin": `${src}/admin`,
      "@auth": `${src}/auth`,
      "@shop": `${src}/shop`,
      "@pages": `${src}/pages`,
    },
  },
});
