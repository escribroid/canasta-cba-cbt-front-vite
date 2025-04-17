import version from "./mod-version"

/* Version ############################################################## */
document.querySelector(".version").innerHTML = version;


// Escuchar el evento de click en el documento para detectar el click en el enlace del tooltip
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


// Limita input a 10 caracteres
// Selecciona todos los inputs de la página
const inputs = document.querySelectorAll('input[type="number"]');

// Agrega el evento de restricción a cada input
inputs.forEach(input => {
    input.addEventListener('input', function () {
        const maxLength = 15; // Define la longitud máxima permitida
        if (this.value.length > maxLength) {
            this.value = this.value.slice(0, maxLength); // Corta el exceso de caracteres
        }
    });
});

// inputs.forEach((input) => {
//     input.addEventListener("focusin", () => {
//       input.classList.add("ring-2", "ring-emerald-600");
//     });
  
//     input.addEventListener("focusout", () => {
//       input.classList.remove("ring-2", "ring-emerald-600");
//     });
//   });






