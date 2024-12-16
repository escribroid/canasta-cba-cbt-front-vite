export const yearGet = new Date().getFullYear();

let monthGet = new Date().getMonth() + 1;
let coef_age_gender_add = 1;
let selectedYear;
let selectedMonth;
let array_years = [];
let canasta_year_select = document.getElementById("table-compare-year");
let canasta_month_select = document.getElementById("table-compare-month");
let cba_Old = null;
let cbt_Old = null;
let cba_Top;
let cbt_Top;
let canasta_compare_cba = document.querySelector(".canasta_compare_cba");
let canasta_compare_cbt = document.querySelector(".canasta_compare_cbt");
let canasta_compare_cbaja = document.querySelector(".canasta_compare_cbaja");
let ingresos = document.getElementById("table-compare-income-in").value;

let dataJsonFront = [];
let alquiler_past;
let alquiler_past_value = parseInt(document.getElementById("rent-past").value);
let suma_CBA_Personas_past;
let suma_CBT_Personas_past;
let suma_CT_clase_baja_past;
let suma_indigencia_past;
let suma_pobreza_past;
let suma_clase_baja_fragil_past;
let suma_clase_baja_past;
let suma_clase_media_fragil_past;
let suma_clase_media_past;
let suma_clase_media_alta_past;
let suma_clase_alta_baja_past;

// Centralizamos la URL aquí
const API_URL = "https://canasta-cba-cbt-back-express.vercel.app/api/cba-cbt/";

// Función que realiza el fetch y devuelve los datos
async function fetchDataFromAPI() {
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

// Función usa fetchDataFromAPI para obtener datos, actualiza UI
async function fetchDataAndUpdateUI() {
    try {
        const data = await fetchDataFromAPI(); // Llamamos a la función centralizada
        dataJsonFront = data;
        cba_top_process();
        // console.log("dataJsonFront", dataJsonFront[101]);

        // Emitir un evento personalizado con el valor de ax
        const even = new CustomEvent("dataJsonFront", {
            detail: { dataJsonFront: dataJsonFront },
        });
        window.dispatchEvent(even); // Disparar el evento

        // ver cuantas comas tiene el string, borrar todas salvo la ultima
        // reemplazarla por un punto
    } catch (error) {
        console.error("Error al actualizar la UI:", error);
    }
}
// Llamamos a la función que actualiza la UI
fetchDataAndUpdateUI();

function cba_top_process() {
    if (dataJsonFront.length > 0) {
        // Actualizar valores en la UI
        cba_Top = Math.round(dataJsonFront[dataJsonFront.length - 1].cba * 3.09);
        const cba_top_short = document.querySelector(".index-data-cba");
        cba_top_short.innerHTML = `$ ${cba_Top}`;
        cbt_Top = Math.round(dataJsonFront[dataJsonFront.length - 1].cbt * 3.09);
        const cbt_top_short = document.querySelector(".index-data-cbt");
        cbt_top_short.innerHTML = `$ ${cbt_Top}`;
    }
}

for (let i = 0; i <= yearGet; i++) {
    if (yearGet - i >= 2016) {
        array_years.push(`
<option class="canasta_date_option" value="${yearGet - i}"> ${yearGet - i} </option>`);
    }
}

let str_years = array_years.join("");
canasta_year_select.innerHTML = `
<option class="canasta_date_option" value="year" selected disabled>Año</option> + ${str_years}`;

let monthSelected = false;
let yearSelected = false;
// Función verificar si ambos select han disparado su evento
function checkBothSelected() {
    if (monthSelected && yearSelected) {
        document.querySelector(".table-classes-past").style.display = "block";
    } else {
        document.querySelector(".table-classes-past").style.display = "block";
    }
}

// Escuchar el evento personalizado emitido desde a.js
window.addEventListener("axUpdated", function (event) {
    coef_age_gender_add = event.detail.coef_age_gender_add;

    if (coef_age_gender_add) {
        document.getElementById("aclaracion-date--over").style.zIndex = "-5";
    } else {
        document.getElementById("aclaracion-date--over").style.zIndex = "1000";
    }

    get_table_past(coef_age_gender_add);

    // Función de callback que se ejecutará cuando cambie el valor
    function handleMonthChange(callbackMonth, callbackYear, callCba, callCbt) {
        canasta_month_select.addEventListener("change", function () {
            selectedMonth = canasta_month_select.value;
            selectedYear = canasta_year_select.value;
            ingresos = document.getElementById("table-compare-income-in").value;

            if (selectedMonth !== "") {
                monthSelected = true;
            } else {
                monthSelected = false;
            }
            checkBothSelected();

            if (parseInt(selectedMonth) > monthGet) {
                if (parseInt(selectedYear) == yearGet) {
                }
            }

            if (selectedMonth < 10) {
                selectedMonth = "0" + selectedMonth;
            }

            for (let i = 0; i < dataJsonFront.length; i++) {
                if (dataJsonFront[i].fecha == `${selectedYear}-${selectedMonth}-01`) {
                    cba_Old = `${dataJsonFront[i].cba}`;
                    cbt_Old = `${dataJsonFront[i].cbt}`;
                }
            }
            get_table_past(coef_age_gender_add);

            // Ejecuta el callback con el valor actualizado
            if (callbackMonth) {
                callbackMonth(selectedMonth);
            }

            if (callCba) {
                callCba(selectedMonth, cba_Old);
            }

            ingresos_input_past(ingresos);
        });

        canasta_year_select.addEventListener("change", function () {
            selectedYear = canasta_year_select.value;
            selectedMonth = canasta_month_select.value;
            ingresos = document.getElementById("table-compare-income-in").value;

            if (selectedYear !== "") {
                yearSelected = true;
            } else {
                yearSelected = false;
            }
            checkBothSelected();

            if (parseInt(selectedYear) == yearGet) {
                if (parseInt(selectedMonth) > monthGet) {
                }
            }

            if (selectedYear == "2016") {
                //console.log("Año seleccionado es 2016");
                document.querySelector(".table-compare-month-option[value='1']").setAttribute("disabled", true);
                document.querySelector(".table-compare-month-option[value='2']").setAttribute("disabled", true);
                document.querySelector(".table-compare-month-option[value='3']").setAttribute("disabled", true);
                canasta_month_select.value = "4";
                selectedMonth = canasta_month_select.value;
                // canasta_compare_cba.innerHTML = `${selectedMonth}`;
                canasta_compare_cba = `${selectedMonth}`;
            } else {
                document.querySelector(".table-compare-month-option[value='1']").removeAttribute("disabled");
                document.querySelector(".table-compare-month-option[value='2']").removeAttribute("disabled");
                document.querySelector(".table-compare-month-option[value='3']").removeAttribute("disabled");
            }

            // if año actual, deshabilita los meses que no existen
            if (selectedYear == yearGet) {
                if (parseInt(selectedMonth) >= monthGet) {
                    let month_actual = (monthGet - 2).toString();
                    selectedMonth = canasta_month_select.value;
                    canasta_month_select.value = month_actual.toString();
                    selectedMonth = canasta_month_select.value;
                }

                for (let i = monthGet; i <= 12; i++) {
                    document.querySelector(`.table-compare-month-option[value='${i}']`).setAttribute("disabled", true);
                }
            } else {
                for (let i = monthGet; i <= 12; i++) {
                    document.querySelector(`.table-compare-month-option[value='${i}']`).removeAttribute("disabled");
                }
            }

            if (selectedMonth < 10) {
                selectedMonth = "0" + selectedMonth;
            }

            for (let i = 0; i < dataJsonFront.length; i++) {
                if (dataJsonFront[i].fecha == `${selectedYear}-${selectedMonth}-01`) {
                    cba_Old = `${dataJsonFront[i].cba}`;
                    cbt_Old = `${dataJsonFront[i].cbt}`;
                }
            }
            get_table_past(coef_age_gender_add);

            // Ejecuta el callback con el valor actualizado
            if (callbackYear) {
                callbackYear(selectedYear);
            }

            if (callCbt) {
                callCbt(selectedYear, cbt_Old);
            }
            ingresos_input_past(ingresos);
        });
    }

    function doCallCba(month, cba_Old) {}

    function doCallCbt(years, cbt_Old) {}

    // Función que devuelve el valor actualizado
    function doSomethingWithSelectedYear(years) {}

    // Función que usa el valor actualizado
    function doSomethingWithSelectedMonth(month) {}

    handleMonthChange(doSomethingWithSelectedMonth, doSomethingWithSelectedYear, doCallCba, doCallCbt);

    function get_table_past(coef_age_gender_add) {
        alquiler_past_value = parseInt(document.getElementById("rent-past").value);
        if (isNaN(alquiler_past_value)) {
            alquiler_past_value = 0;
        } else if (alquiler_past_value < 0) {
            alquiler_past_value = alquiler_past_value * -1;
        }

        if (!suma_CBA_Personas_past || !suma_CBT_Personas_past) {
            suma_CBA_Personas_past = 0;
            suma_CBT_Personas_past = 0;
        }

        suma_indigencia_past = alquiler_past_value + Math.round(coef_age_gender_add * cba_Old);
        suma_pobreza_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old);
        suma_clase_baja_fragil_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 1.2);
        suma_clase_baja_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 1.5);
        suma_clase_media_fragil_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 2);
        suma_clase_media_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 5);
        suma_clase_media_alta_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 8);
        suma_clase_alta_baja_past = alquiler_past_value + Math.round(coef_age_gender_add * cbt_Old * 12);

        document.querySelector(".table-classes-indigencia-min-past").textContent = 0;
        document.querySelector(".table-classes-indigencia-max-past").textContent = suma_indigencia_past;

        document.querySelector(".table-classes-pobreza-min-past").textContent = suma_indigencia_past;
        document.querySelector(".table-classes-pobreza-max-past").textContent = suma_pobreza_past;

        document.querySelector(".table-classes-baja-min-past").textContent = suma_pobreza_past;
        document.querySelector(".table-classes-baja-max-past").textContent = suma_clase_baja_past;

        document.querySelector(".table-classes-media-fragil-min-past").textContent = suma_clase_baja_past;
        document.querySelector(".table-classes-media-fragil-max-past").textContent = suma_clase_media_fragil_past;

        document.querySelector(".table-classes-media-min-past").textContent = suma_clase_media_fragil_past;
        document.querySelector(".table-classes-media-max-past").textContent = suma_clase_media_past;

        document.querySelector(".table-classes-media-alta-min-past").textContent = suma_clase_media_past;
        document.querySelector(".table-classes-media-alta-max-past").textContent = suma_clase_media_alta_past;

        document.querySelector(".table-classes-alta-min-past").textContent = suma_clase_media_alta_past;
        document.querySelector(".table-classes-alta-max-past").textContent = suma_clase_alta_baja_past;
    }

    function ingresos_input_past(ingresos) {
        // Verificar si los límites están definidos
        if (
            typeof suma_indigencia_past === "undefined" ||
            typeof suma_pobreza_past === "undefined" ||
            typeof suma_clase_baja_past === "undefined" ||
            typeof suma_clase_media_fragil_past === "undefined" ||
            typeof suma_clase_media_past === "undefined" ||
            typeof suma_clase_media_alta_past === "undefined" ||
            typeof suma_clase_alta_baja_past === "undefined"
        ) {
            return;
        }

        if (
            suma_indigencia_past === 0 &&
            suma_pobreza_past === 0 &&
            suma_clase_baja_past === 0 &&
            suma_clase_media_fragil_past === 0 &&
            suma_clase_media_past === 0 &&
            suma_clase_media_alta_past === 0 &&
            suma_clase_alta_baja_past === 0
        ) {
            document.querySelector(".class-indigencia-row-past").style.removeProperty("background-color");

            document.querySelector(".class-pobreza-row-past").style.removeProperty("background-color");
            document.querySelector(".class-baja-row-past").style.removeProperty("background-color");
            document.querySelector(".class-media-fragil-row-past").style.removeProperty("background-color");
            document.querySelector(".class-media-row-past").style.removeProperty("background-color");
            document.querySelector(".class-media-alta-row-past").style.removeProperty("background-color");
            document.querySelector(".class-alta-row-past").style.removeProperty("background-color");
            return;
        }

        if (ingresos > 0 && ingresos < suma_indigencia_past) {
            document
                .querySelector(".table-classes-indigencia-past")
                .style.setProperty("background-color", "#FF1100", "important");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_indigencia_past && ingresos < suma_pobreza_past) {
            document
                .querySelector(".table-classes-pobreza-past")
                .style.setProperty("background-color", "#FF1100", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_pobreza_past && ingresos < suma_clase_baja_past) {
            document
                .querySelector(".table-classes-baja-past")
                .style.setProperty("background-color", "#FF5500 ", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_clase_baja_past && ingresos < suma_clase_media_fragil_past) {
            document
                .querySelector(".table-classes-media-fragil-past")
                .style.setProperty("background-color", "#4CAF50", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_clase_media_fragil_past && ingresos < suma_clase_media_past) {
            document
                .querySelector(".table-classes-media-past")
                .style.setProperty("background-color", "#4CAF50", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_clase_media_past && ingresos < suma_clase_media_alta_past) {
            document
                .querySelector(".table-classes-media-alta-past")
                .style.setProperty("background-color", "#4CAF50", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos >= suma_clase_media_alta_past && ingresos < suma_clase_alta_baja_past) {
            document
                .querySelector(".table-classes-alta-past")
                .style.setProperty("background-color", "#4CAF50", "important");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-acomodada-past").style.removeProperty("background-color");
        } else if (ingresos > suma_clase_alta_baja_past) {
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document
                .querySelector(".table-classes-acomodada-past")
                .style.setProperty("background-color", "#4CbF50", "important");
        }

        if (ingresos === "" || !ingresos) {
            document.querySelector(".table-classes-indigencia-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-pobreza-past").style.removeProperty("background-color");

            document.querySelector(".table-classes-baja-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-fragil-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-media-alta-past").style.removeProperty("background-color");
            document.querySelector(".table-classes-alta-past").style.removeProperty("background-color");
        }
    }

    ingresos_input_past(ingresos);

    document.getElementById("table-compare-income-in").addEventListener("input", (e) => {
        const ingresosEvent = parseInt(e.target.value);
        ingresos_input_past(ingresosEvent);
    });

    // event INPUT rent-input ++++++++++++++++++++++++++++++++++++++++++++++++++++
    function input_alquiler_past() {
        document.getElementById("rent-past").addEventListener("input", () => {
            ingresos = document.getElementById("table-compare-income-in").value;
            alquiler_past_value = parseInt(document.getElementById("rent-past").value);

            if (isNaN(alquiler_past_value)) {
                alquiler_past_value = 0;
            } else if (alquiler_past_value < 0) {
                alquiler_past_value = alquiler_past_value * -1;
            }

            // console.log("alquiler_past_value", alquiler_past_value);

            suma_indigencia_past = alquiler_past_value + suma_indigencia_past;
            suma_pobreza_past = alquiler_past_value + suma_pobreza_past;
            suma_clase_baja_fragil_past = alquiler_past_value + suma_clase_baja_fragil_past;
            suma_clase_baja_past = alquiler_past_value + suma_clase_baja_past;
            suma_clase_media_fragil_past = alquiler_past_value + suma_clase_media_fragil_past;
            suma_clase_media_past = alquiler_past_value + suma_clase_media_past;
            suma_clase_media_alta_past = alquiler_past_value + suma_clase_media_alta_past;
            suma_clase_alta_baja_past = alquiler_past_value + suma_clase_alta_baja_past;

            alquiler_past_value = 0;

            get_table_past(coef_age_gender_add);
            ingresos_input_past(ingresos);

            if (!alquiler_past_value || alquiler_past_value !== 0) {
                document.querySelector(".card__svg--reset").style.display = "flex";
                setTimeout(() => {
                    document.querySelector(".card__svg--reset").style.transition = "transform 0.3s ease-in-out";
                    document.querySelector(".card__svg--reset").style.transform = "translatex(0)";
                    document.querySelector(".card__svg--reset").style.opacity = "1";
                }, 400);
            }
        });
    }
    input_alquiler_past();
});
