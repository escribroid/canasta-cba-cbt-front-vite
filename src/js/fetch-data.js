
// Centralizamos la URL aquí
const API_URL = import.meta.env.VITE_API_URL;
const API_URL_IPC = import.meta.env.VITE_API_URL_IPC;
console.log("API_URL", API_URL); // Usará la URL correcta según el entorno
console.log("API_URL_IPC", API_URL_IPC); // Usará la URL correcta según el entorno


// Función que realiza el fetch y devuelve los datos
export async function fetchDataFromAPI() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Devolvemos los datos para que la otra función los use
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        throw error; // Volvemos a lanzar el error para que sea manejado donde se llame esta función
    }
}
