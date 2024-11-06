// // // JavaScript para controlar el offcanvas
// document.addEventListener("DOMContentLoaded", function() {

// const offcanvasToggle = document.getElementById('offcanvasToggle');
// const offcanvas = document.getElementById('offcanvas');
// const offcanvasClose = document.getElementById('offcanvasClose');

// offcanvasToggle.addEventListener('click', () => {
//     offcanvas.classList.toggle('hidden');
//     offcanvas.classList.toggle('block');
//     offcanvas.classList.toggle('translate-x-full');
// });

// offcanvasClose.addEventListener('click', () => {
//     offcanvas.classList.add('hidden');
//     offcanvas.classList.remove('block');
//     offcanvas.classList.add('translate-x-full');
// });

// // Cerrar el offcanvas al hacer clic fuera del menú
// offcanvas.addEventListener('click', (e) => {
//     if (e.target === offcanvas) {
//         offcanvas.classList.add('hidden');
//         offcanvas.classList.remove('block');
//         offcanvas.classList.add('translate-x-full');
//     }
// });
// });

// document.addEventListener("DOMContentLoaded", function() {
//   const offcanvasToggle = document.getElementById("offcanvasToggle");
//   const offcanvas = document.getElementById("offcanvas");
//   const offcanvasClose = document.getElementById("offcanvasClose");

//   // Abre y cierra el offcanvas con animación
//   offcanvasToggle.addEventListener("click", () => {
//       offcanvas.classList.toggle("translate-x-full");
//       offcanvas.classList.toggle("translate-x-0");
//   });

//   offcanvasClose.addEventListener("click", () => {
//       offcanvas.classList.add("translate-x-full");
//       offcanvas.classList.remove("translate-x-0");
//   });

//   // Cierra el offcanvas al hacer clic fuera del menú
//   document.addEventListener("click", (e) => {
//       if (!offcanvas.contains(e.target) && e.target !== offcanvasToggle) {
//           offcanvas.classList.add("translate-x-full");
//           offcanvas.classList.remove("translate-x-0");
//       }
//   });
// });
