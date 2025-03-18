// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        sourcemap: true,
    },
    css: {
        devSourcemap: true, // Habilita sourcemaps en CSS para ver el origen real de las reglas
    },
});
