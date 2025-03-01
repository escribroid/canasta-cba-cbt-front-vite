import version from "./mod-version"

/* Version ############################################################## */
document.querySelector(".version").innerHTML = version;


// Escuchar el evento de clic en el documento para detectar el clic en el enlace del tooltip
document.addEventListener("click", (event) => {
    // Verificar si el clic ocurrió en el enlace del tooltip
    if (event.target && event.target.id === "card-canastas-link") {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        // Seleccionar el recuadro de destino
        const recuadro = document.querySelector(".form-container");

        setTimeout(() => {
            // Agregar la clase para resaltar con borde rojo
            recuadro.classList.add("form-recuadrar");
        }, 700);

        // Opcional: Desplazar la página al recuadro
        recuadro.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
            recuadro.classList.remove("form-recuadrar");
        }, 2000);
    }
});
