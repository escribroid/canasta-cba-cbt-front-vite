/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
    content: ["./index.html", "./js/**/*.{js,jsx,ts,tsx,vue}", "./css/**/*.css"],
    theme: {
        extend: {},
    },
    plugins: [typography, forms],
    safelist: [
        "hidden",
        "block",
        "translate-x-full",
        "translate-x-0", // Asegura la animación de transición completa
    ],
};
