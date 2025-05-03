// main.js

// import "../css/styles.css"

const main = document.querySelector("main");
document.querySelectorAll(".tooltip-custom-container").forEach((container) => {
    const button = container.querySelector(".info-btn");
    const tooltip = container.querySelector(".tooltip-custom");

    let timeout;
    let isTooltipVisible = false; // Bandera para controlar la visibilidad del tooltip

    function showTooltip() {
        if (isTooltipVisible) return; // Si el tooltip ya está visible, no hacer nada

        clearTimeout(timeout);
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        isTooltipVisible = true; // Marcar el tooltip como visible
        button.disabled = true; // Deshabilitar el botón

        // Obtener tamaños y posiciones
        const tooltipRect = tooltip.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const tooltipHeight = tooltipRect.height;

        const mainWidth = main.offsetWidth;
        const mainOffsetTop = main.offsetTop;
        const padding = 10; // Espacio extra para evitar que toque los bordes
        const mainVisible = windowHeight - mainOffsetTop;

        // console.log("windowWidth", windowWidth);
        // console.log("windowHeigth", windowHeigth);

        // console.log("tooltipRect", tooltipRect);
        // console.log("tooltipRect.right", tooltipRect.right);
        // console.log("tooltipRect.left", tooltipRect.left);
        // console.log("mainWidth", mainWidth);
        // console.log("mainOffsetTop", mainOffsetTop);
        // console.log("mainVisible", mainVisible);

        // Ajustar horizontalmente
        if (tooltipRect.right > mainWidth - padding) {
            // Si se sale por la derecha, moverlo a la izquierda
            tooltip.style.left = "auto";
            tooltip.style.transform = "none";
            // tooltip.style.inset = "100% 0px auto auto";
        } else if (tooltipRect.left > 10) {
            // Si se sale por la izquierda, alinear con el botón
            tooltip.style.left = "auto";
            tooltip.style.transform = "none";
            // tooltip.style.inset = "100% 0px auto auto";
        } else {
            //Si hay espacio, centrar normalmente
            tooltip.style.left = "auto";
            tooltip.style.right = "auto";
        }

        const tooltipCenter = (tooltipHeight - 26) / 2;

        // Ajustar verticalmente si es necesario
        let tooltipBottom = tooltipRect.bottom;
        //const windowHeight = window.innerHeight;
        const tooltipATop = tooltipBottom - windowHeight + 14;

        console.log("tooltipBottom", tooltipBottom);
        console.log("windowHeight", windowHeight);
        console.log("tooltipATop", tooltipATop);
        console.log("tooltipHeight", tooltipHeight);
        console.log("tooltipCenter", tooltipCenter);

        if (tooltipBottom > windowHeight - 24) {
            //tooltip.style.top = "auto";
            //tooltip.style.bottom = "auto";
            tooltip.style.top = `${-tooltipCenter}px`;
        } else {
            //tooltip.style.top = "auto";
            //tooltip.style.bottom = "auto";
            tooltip.style.top = `${-tooltipCenter}px`;
        }

        document.addEventListener("click", closeOnClickOutside);
    }

    function hideTooltip() {
        timeout = setTimeout(() => {
            //tooltip.style.inset = "100% 0px auto auto";
            button.disabled = false; // Habilitar el botón nuevamente
        }, 200);
        tooltip.style.visibility = "hidden";
        tooltip.style.opacity = "0";

        isTooltipVisible = false; // Marcar el tooltip como oculto
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

    tooltip.addEventListener("click", (event) => {
        event.stopPropagation();
        hideTooltip();
    });
});
