
// Centralizamos la URL aquí
//const API_URL = "https://canasta-cba-cbt-back-express.vercel.app/api/v1/cba-cbt/";
//const API_URL_IPC = "https://canasta-cba-cbt-back-express.vercel.app/api/v1/ipc/";
const API_URL = import.meta.env.VITE_API_URL;
const API_URL_IPC = import.meta.env.VITE_API_URL_IPC;
console.log("API_URL", API_URL); // Usará la URL correcta según el entorno
console.log("API_URL_IPC", API_URL_IPC); // Usará la URL  correcta según el entorno


// Función que realiza el fetch y devuelve los datos
export async function fetchDataFromAPI() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data; // Devolvemos los datos para que la otra función los use
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        throw error; // Volvemos a lanzar el error para que sea manejado donde se llame esta función
    }
}
