import version from "./mod-version";

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

/* ##############################################################
 Limita input a 10 caracteres / Selecciona todos los inputs de la página */

const inputs = document.querySelectorAll('input[type="number"]');

// Agrega el evento de restricción a cada input
inputs.forEach((input) => {
	input.addEventListener("input", function () {
		const maxLength = 15; // Define la longitud máxima permitida
		if (this.value.length > maxLength) {
			this.value = this.value.slice(0, maxLength); // Corta el exceso de caracteres
		}
	});
});

/* ############################################################## 
Agrega el focus ring a los inputs al hacer clic y lo elimina al perder el foco */
//

inputs.forEach((input) => {
	// Agregar el ring al hacer clic
	input.addEventListener("mousedown", () => {
		if (input !== document.activeElement) {
			input.classList.add("focus-ring");
		}
	});

	// Eliminar el ring cuando se pierde el foco
	input.addEventListener("blur", () => {
		input.classList.remove("focus-ring");
	});
});



/* Ring al SELECT Gender ##############################################################*/
const select_zindex = document.querySelector(".form__select-gender-label"); 

// Agregar el estilo al hacer clic
select_zindex.addEventListener("click", (event) => {
    event.stopPropagation(); // Previene que el evento se propague al documento
    select_zindex.classList.add("select-ring-Zindex");
});

// Detectar clic fuera del elemento y eliminar el estilo
document.addEventListener("click", (event) => {
    if (!select_zindex.contains(event.target)) {
        select_zindex.classList.remove("select-ring-Zindex");
    }
});





// .form__select-gender-label {
// 	position: relative;
// 	outline: 2px solid #059669 !important;
// 	z-index: 999999;
// }