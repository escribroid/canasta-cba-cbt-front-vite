// JavaScript para controlar el offcanvas
const offcanvasToggle = document.getElementById('offcanvasToggle');
const offcanvas = document.getElementById('offcanvas');
const offcanvasClose = document.getElementById('offcanvasClose');

offcanvasToggle.addEventListener('click', () => {
    offcanvas.classList.toggle('hidden');
    offcanvas.classList.toggle('block');
    offcanvas.classList.toggle('translate-x-full');
});

offcanvasClose.addEventListener('click', () => {
    offcanvas.classList.add('hidden');
    offcanvas.classList.remove('block');
    offcanvas.classList.add('translate-x-full');
});

// Cerrar el offcanvas al hacer clic fuera del menú
offcanvas.addEventListener('click', (e) => {
    if (e.target === offcanvas) {
        offcanvas.classList.add('hidden');
        offcanvas.classList.remove('block');
        offcanvas.classList.add('translate-x-full');
    }
});