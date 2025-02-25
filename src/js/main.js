// main.js
import { yearGet } from "./mod-date.js";
import { version } from "./mod-version.js";
//import indices_manuales from "./mod-indices.js";

// yearUpdated
//const yearUpdated = document.querySelector(".copyleftYear").innerHTML = yearGet;
// version
/* const versionUpdated = (document.querySelector(".version").innerHTML = version);


/* ############################################################## */
document.querySelectorAll(".tooltip-container").forEach((container) => {
    const button = container.querySelector(".info-btn");
    const tooltip = container.querySelector(".tooltip");
    const link = container.querySelector(".tooltip-link");

    let timeout;

    function showTooltip() {
        clearTimeout(timeout);
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        // Agregar evento para cerrar cuando se toca fuera
        document.addEventListener("click", closeOnClickOutside);
    }

    function hideTooltip() {
        timeout = setTimeout(() => {
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        }, 200);
    }

    function closeOnClickOutside(event) {
        if (!container.contains(event.target)) {
            hideTooltip();
            document.removeEventListener("click", closeOnClickOutside);
        }
    }

    button.addEventListener("mouseenter", showTooltip);
    button.addEventListener("mouseleave", hideTooltip);
    tooltip.addEventListener("mouseenter", showTooltip);
    tooltip.addEventListener("mouseleave", hideTooltip);

    // Soporte para toque en dispositivos móviles
    button.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita cierre inmediato
        showTooltip();
    });

    tooltip.addEventListener("click", (event) => event.stopPropagation()); // Permite tocar sin cerrar

    // Cerrar tooltip al hacer click en el enlace
    link.addEventListener("click", () => hideTooltip());
});
