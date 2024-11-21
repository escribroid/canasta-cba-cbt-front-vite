// main.js
import { yearGet } from "./mod-date.js";
import { version } from "./mod-version.js";
//import indices_manuales from "./mod-indices.js";

// yearUpdated
//const yearUpdated = document.querySelector(".copyleftYear").innerHTML = yearGet;
// version
const versionUpdated = (document.querySelector(".version").innerHTML = version);

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
// const tooltipList = [...tooltipTriggerList].map(
//     (tooltipTriggerEl) =>
//         new bootstrap.Tooltip(tooltipTriggerEl, {
//             placement: "top",
//             offset: [-75, 0],
//         })
// );

let tooltipInstance;

// Detectar si el dispositivo es táctil
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    // Dispositivo táctil: mostrar tooltip al hacer clic
    tooltipTriggerList.forEach((tooltipTriggerTo) => {
        new bootstrap.Tooltip(tooltipTriggerTo, {
            placement: "top",
            offset: [-75, 0],
        });
    });
} else {
    // Dispositivo con ratón: mostrar tooltip al pasar el cursor
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
            placement: "top",
            offset: [-75, 0],
            trigger: "manual", // Controlar manualmente cuándo mostrar/ocultar
        });

        let timer; // Para manejar el temporizador

        // Mostrar tooltip al pasar el cursor
        tooltipTriggerEl.addEventListener("mouseenter", () => {
            tooltip.show();

            // Iniciar un temporizador para ocultar el tooltip después de 2 segundos
            clearTimeout(timer); // Limpiar cualquier temporizador previo
            // timer = setTimeout(() => {
            //     tooltip.hide();
            // }, 5000); // 2000ms = 2 segundos
        });

        // Ocultar tooltip al salir si no se hace clic en el enlace
        tooltipTriggerEl.addEventListener("mouseleave", () => {
            //clearTimeout(timer); // Cancelar temporizador si se mueve el mouse
            timer = setTimeout(() => {
                tooltip.hide();
            }, 2000); // 2000ms = 2 segundos
        });
    });
}
