// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: true, // Asegúrate de que preflight esté habilitado
    },
};

// ==============================
