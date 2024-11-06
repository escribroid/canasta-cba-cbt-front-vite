// // Código genérico de tooltips (excluyendo el botón de información específico)
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
// const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => {
//     // Excluir el botón específico con ID "canasta_compare_info_button"
//     if (tooltipTriggerEl.id !== "canasta_compare_info_button") {
//         return new bootstrap.Tooltip(tooltipTriggerEl, {
//             placement: "top",
//             offset: [-75, 0],
//         });
//     }
// });

// /* tooltip compare canastas ++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// let cardCompareBodyDisabled = document.getElementById("card-compare-disabled");
// const linkAddFamily = document.getElementById("canasta_txt_familia");

// // Tooltip para dispositivos táctiles (usando touchstart)
// let tooltipTouch = new bootstrap.Tooltip(cardCompareBodyDisabled, {
//     trigger: "manual",
//     placement: "top",
//     html: true,
//     offset: [-75, 0],
//     container: cardCompareBodyDisabled,
// });

// // Tooltip para escritorio (usando hover)
// const tooltipHover = new bootstrap.Tooltip(cardCompareBodyDisabled, {
//     trigger: "hover",
//     placement: "top",
//     html: true,
//     offset: [-75, 0],
//     container: cardCompareBodyDisabled,
// });

// let tooltipVisible = false;
// let touchStartTime = 0;

// // Configurar el tooltip táctil solo en dispositivos táctiles
// function initializeTooltip() {
//     const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

//     if (isTouchDevice) {
//         // Manejar el evento touchstart en el overlay
//         cardCompareBodyDisabled.addEventListener("touchstart", (event) => {
//             touchStartTime = Date.now();
//         });

//         // Manejar el evento touchend en el overlay
//         cardCompareBodyDisabled.addEventListener("touchend", (event) => {
//             const touchDuration = Date.now() - touchStartTime;

//             // Si el toque fue breve (menor a 250 ms), activar el tooltip solo si no está visible
//             if (touchDuration < 200) {
//                 if (!tooltipVisible) {
//                     // Asegurarse de que solo haya un tooltip, destruir si ya existe
//                     tooltipTouch.dispose();
//                     tooltipTouch = new bootstrap.Tooltip(cardCompareBodyDisabled, {
//                         trigger: "manual",
//                         placement: "top",
//                         html: true,
//                         container: cardCompareBodyDisabled,
//                     });
//                     tooltipTouch.show();
//                     tooltipVisible = true;
//                     event.preventDefault(); // Evitar la navegación inmediata
//                 } else {
//                     // Si el tooltip ya está visible, ocultarlo para permitir que se vuelva a mostrar
//                     tooltipTouch.hide();
//                     tooltipVisible = false;
//                 }
//             }

//             touchStartTime = 0; // Resetear el tiempo de inicio del toque
//         });

//         // Detectar toques en el enlace dentro del tooltip
//         linkAddFamily.addEventListener("touchstart", (event) => {
//             // Permitir la navegación tocando el enlace sin ocultar el tooltip
//             event.stopPropagation();
//         });
//     }
// }

// initializeTooltip();

// // Cerrar el tooltip al hacer clic fuera
// document.addEventListener("click", (event) => {
//     if (tooltipVisible && !cardCompareBodyDisabled.contains(event.target)) {
//         tooltipTouch.hide();
//         //tooltipHover.hide();
//         tooltipVisible = false;
//     }
// });

// /* tooltip hover with links +++++++++++++++++++++++++++++++++++*/

// function initializeTooltips() {
//   const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
//   const infoButtonWithLink = document.getElementById("canasta_compare_info_button");
//   const linkFamily = document.getElementById("canasta_txt_familia");

//   // Tooltip para modo hover (PC)
//   const tooltipHover = new bootstrap.Tooltip(infoButtonWithLink, {
//       trigger: "manual", // Control manual para evitar cierres inesperados
//       placement: "top",
//       html: true,
//       offset: [-75, 0],
//   });

//   let tooltipVisible = false;

//   // Mostrar el tooltip hover al pasar el mouse sobre el botón "i"
//   infoButtonWithLink.addEventListener("mouseenter", () => {
//       tooltipHover.show();
//       tooltipVisible = true;
//   });

//   // Ocultar el tooltip hover cuando el mouse sale del botón "i" o el tooltip
//   infoButtonWithLink.addEventListener("mouseleave", () => {
//       /* setTimeout(() => {
//           if (!tooltipHover._element.closest('.tooltip:hover') || !tooltipHover._element.closest('.tooltip:focus')) {
//               tooltipHover.hide();
//               tooltipVisible = false;
//           }
//       }, 1000); */
//       if (!tooltipHover._element.closest('.tooltip:hover') || !tooltipHover._element.closest('.tooltip:focus')) {
//         tooltipHover.hide();
//         tooltipVisible = false;
//     }
//   });

//   // Mantener el tooltip visible si el mouse está sobre el tooltip
//   document.addEventListener("mouseover", (event) => {
//       if (event.target.closest(".tooltip") || event.target === infoButtonWithLink) {
//           tooltipVisible = true; // Mantener visible
//       } else {
//           tooltipVisible = false; // Cambiar a no visible
//       }
//   });

//   // Evento para cerrar el tooltip hover al hacer clic en el enlace
//   linkFamily.addEventListener("click", (event) => {
//       event.preventDefault(); // Evita la navegación inmediata
//       tooltipHover.hide(); // Cierra el tooltip
//       tooltipVisible = false; // Marca como no visible
//   });

//   // Manejador para dispositivos táctiles
//   if (isTouchDevice) {
//       infoButtonWithLink.addEventListener("click", () => {
//           if (tooltipVisible) {
//               tooltipHover.hide(); // Oculta si ya está visible
//               tooltipVisible = false;
//           } else {
//               tooltipHover.show(); // Muestra el tooltip
//               tooltipVisible = true;
//           }
//       });

//       // Cerrar el tooltip táctil al hacer clic en el enlace
//       linkFamily.addEventListener("click", (event) => {
//           event.preventDefault(); // Evita la navegación inmediata
//           tooltipHover.hide(); // Cierra el tooltip
//           tooltipVisible = false; // Marca como no visible
//       });
//   }
// }

// // Inicializa la funcionalidad de los tooltips
// initializeTooltips();
