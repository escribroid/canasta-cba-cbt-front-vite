// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
    css: {
        postcss: './postcss.config.js'
    },
    build: {
        outDir: "dist",
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    const assetName = assetInfo.names ? assetInfo.names[0] : "assets";

                    if (assetName === "styles.css") {
                        return "assets/styles.css";
                    }
                    return "assets/[name][extname]";
                },
            },
        },
    },
});
