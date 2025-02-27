// main.js
import { yearGet } from "./mod-date.js";
import { version } from "./mod-version.js";
//import indices_manuales from "./mod-indices.js";

// yearUpdated
//const yearUpdated = document.querySelector(".copyleftYear").innerHTML = yearGet;
// version
//const versionUpdated = (document.querySelector(".version").innerHTML = version);


/* ############################################################## */
const main = document.querySelector("main");
document.querySelectorAll(".tooltip-custom-container").forEach((container) => {
    const button = container.querySelector(".info-btn");
    const tooltip = container.querySelector(".tooltip-custom");

    let timeout;

    function showTooltip() {
        clearTimeout(timeout);
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        // Obtener tamaños y posiciones
        const tooltipRect = tooltip.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const mainWidth = main.offsetWidth;
        const padding = 10; // Espacio extra para evitar que toque los bordes

        console.log("windowWidth", windowWidth);
        console.log("tooltipRect", tooltipRect);
        console.log("tooltipRect.right", tooltipRect.right);
        console.log("tooltipRect.left", tooltipRect.left);

        console.log("mainWidth", mainWidth);
        


        
        

        // Ajustar horizontalmente
        if (tooltipRect.right > mainWidth - padding) {
            // Si se sale por la derecha, moverlo a la izquierda
            tooltip.style.left = "auto";
            tooltip.style.right = "0";
            tooltip.style.transform = "none";
        } else if (tooltipRect.left > 10) {
            // Si se sale por la izquierda, alinear con el botón
            tooltip.style.left = "0";
            tooltip.style.right = "auto";
            tooltip.style.transform = "none";
        } else {
            // Si hay espacio, centrar normalmente
            tooltip.style.left = "50%";
            tooltip.style.right = "auto";
            tooltip.style.transform = "translateX(-50%)";
        }

        // Ajustar verticalmente si es necesario
        const tooltipBottom = tooltipRect.bottom;
        const windowHeight = window.innerHeight;
        if (tooltipBottom > windowHeight - 24) {
            tooltip.style.top = "auto";
            tooltip.style.bottom = "100%";
        } else {
            tooltip.style.top = "100%";
            tooltip.style.bottom = "auto";
        }

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

    // Soporte para dispositivos móviles (mostrar tooltip al hacer click)
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        showTooltip();
    });

    tooltip.addEventListener("click", (event) => event.stopPropagation());
});










