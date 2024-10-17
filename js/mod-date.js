export const yearGet = new Date().getFullYear();
let monthGet = new Date().getMonth() + 1;

// function datesMain() {
let selectedYear;
let selectedMonth;
let array_years = [];
let canasta_year_select = document.getElementById("canasta_date_year");
let canasta_month_select = document.getElementById("canasta_date_month");

let cba;
let cbt;
let cba_a;
let cbt_t;
let canasta_compare_cba = document.querySelector(".canasta_compare_cba");
let canasta_compare_cbt = document.querySelector(".canasta_compare_cbt");
let canasta_compare_cbaja = document.querySelector(".canasta_compare_cbaja");
// let url_cba_cbt =
//     "https://apis.datos.gob.ar/series/api/series/?ids=150.1_CSTA_BARIA_0_D_26,150.1_CSTA_BATAL_0_D_20&collapse=month&start_date=2016-01-01&limit=1000&format=json";

// Función centralizada fetch +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function fetchDataFromAPI(onSuccess, onError) {
    // const url =
    //     "https://apis.datos.gob.ar/series/api/series/?ids=150.1_CSTA_BARIA_0_D_26,150.1_CSTA_BATAL_0_D_20&collapse=month&start_date=2016-01-01&limit=1000&format=json"; // Centralizamos la URL

    //const url = "http://localhost:3000/api/cba-cbt";

    const url = "https://canasta-cba-cbt-back-express.vercel.app/api/cba-cbt/";

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => onSuccess(data)) // Ejecuta el callback de éxito
        .catch((error) => (onError ? onError(error) : console.error("Error:", error))); // Callback de error opcional
}

// Llamada a función centralizada in TOP short cba cbt++++++++++++++++++++++++++++++++++++++++++
fetchDataFromAPI(
    (data) => {
        // Data en TOP short cba cbt ++++++++++++++++++++++++
        cba = Math.round(data[data.length - 1].cba * 3.09);
        const cba_top_short = document.querySelector(".indices_short_cba");
        cba_top_short.innerHTML = `$${cba}`;

        cbt = Math.round(data[data.length - 1].cbt * 3.09);
        const cbt_top_short = document.querySelector(".indices_short_cbt");
        cbt_top_short.innerHTML = `$${cbt}`;

        //console.log("cba_cbt", data[2].cba);

        //selectedYear = canasta_year_select.value;
        //console.log("selectedYear2:", selectedYear);

        // console.log("date[i][0]", data[2].fecha.slice(0,4));
        //         console.log("date[i][0]", data[i][1]);
        //         console.log("cba_cbt[i][1]", data[i][2]);

        for (let i = 0; i < data.length; i++) {
            if (data[i].fecha == "2022-05-01") {
                //console.log("date[i][0]", data[i].fecha);
            }
        }
    },
    (error) => console.log("ERROR", error)
);

for (let i = 0; i <= yearGet; i++) {
    if (yearGet - i >= 2016) {
        array_years.push(`
            <option class="canasta_date_option" value="${yearGet - i}"> ${yearGet - i} </option>`);
    }
}

let str_years = array_years.join("");
canasta_year_select.innerHTML = `
            <option class="canasta_date_option" value="year" selected disabled>Año</option> + ${str_years}`;

// EVENT change select year ++++++++++++++++++++++++++++++++++++++++++
// canasta_year_select.addEventListener("change", function () {
//     fetchDataFromAPI(
//         (data) => {
//             // Data en TOP short cba cbt ++++++++++++++++++++++++
//             cba = Math.round(data.data[data.data.length - 1][1] * 3.09);

//             cbt = Math.round(data.data[data.data.length - 1][2] * 3.09);

//             //console.log("cba_cbt", data.data[2][0]);

//             selectedYear = canasta_year_select.value;

//             for (let i = 0; i < data.data.length; i++) {
//                 if (data.data[i][0] == "2022-06-01") {
//                     // console.log("date[i][0]", data.data[i][0]);
//                     // console.log("date[i][0]", data.data[i][1]);
//                     // console.log("cba_cbt[i][1]", data.data[i][2]);
//                 }
//             }

//             selectedYear = canasta_year_select.value;
//             //console.log("selectedYear:", selectedYear);
//             ///console.log("Mes seleccionado:", selectedMonth);
//             canasta_compare_cbt.innerHTML = `${selectedYear}`;

//             if (selectedYear == "2016") {
//                 //console.log("Año seleccionado es 2016");
//                 document.querySelector(".canasta_month_option[value='01']").setAttribute("disabled", true);
//                 document.querySelector(".canasta_month_option[value='02']").setAttribute("disabled", true);
//                 document.querySelector(".canasta_month_option[value='03']").setAttribute("disabled", true);
//                 canasta_month_select.value = "04";
//                 selectedMonth = canasta_month_select.value;
//                 canasta_compare_cba.innerHTML = `${selectedMonth}`;

//                 //console.log("Mes seleccionado:", selectedMonth);
//             } else {
//                 document.querySelector(".canasta_month_option[value='01']").removeAttribute("disabled");
//                 document.querySelector(".canasta_month_option[value='02']").removeAttribute("disabled");
//                 document.querySelector(".canasta_month_option[value='03']").removeAttribute("disabled");
//             }
//             //console.log("Mes seleccionado 3:", selectedMonth);
//         },
//         (error) => console.log("ERROR", error)
//     );

//     // canasta_month_select.addEventListener("change", function () {
//     //     selectedMonth = canasta_month_select.value;
//     //     console.log("Mes seleccionado 2:", selectedMonth);
//     //     canasta_compare_cba.innerHTML = `${selectedMonth}`;
//     // });
// });

//console.log("año seleccionado:", selectedYear);

let monthSelected = false;
let yearSelected = false;

// Función para verificar si ambos selectores han disparado su evento
function checkBothSelected() {
    if (monthSelected && yearSelected) {
        document.querySelector(".table-all-canastas-past").style.display = "block";
    } else {
        document.querySelector(".table-all-canastas-past").style.display = "none";
    }
}

// Función de callback que se ejecutará cuando cambie el valor
function handleMonthChange(callbackMonth, callbackYear, callCba, callCbt) {
    canasta_month_select.addEventListener("change", function () {
        selectedMonth = canasta_month_select.value;
        selectedYear = canasta_year_select.value;
        //console.log("AÑO seleccionado en evento Month:", selectedYear);
        //console.log("Mes seleccionado en evento Month:", selectedMonth);

        if (selectedMonth !== "") {
            monthSelected = true;
        } else {
            monthSelected = false;
        }
        checkBothSelected();

        if (parseInt(selectedMonth) > monthGet) {
            if (parseInt(selectedYear) == yearGet) {
                //console.log("No existe aun");
            }
        }

        fetchDataFromAPI(
            (data) => {
                // Data en TOP short cba cbt ++++++++++++++++++++++++
                //cba = Math.round(data.data[data.data.length - 1][1] * 3.09);
                //console.log("data2", data[100]);

                //cbt = Math.round(data.data[data.data.length - 1][2] * 3.09);
                //console.log("cbt", cbt);

                //console.log("cba_cbt", data.data[2][0]);

                //selectedYear = canasta_year_select.value;
                //console.log("selectedYear2:", selectedYear);

                if (selectedMonth < 10) {
                    selectedMonth = "0" + selectedMonth;
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].fecha == `${selectedYear}-${selectedMonth}-01`) {
                        //console.log("data[i].fecha", data[i].fecha);
                        // console.log("date[i][0]", data.data[i][1]);
                        // console.log("cba_cbt[i][1]", data.data[i][2]);
                        canasta_compare_cba.innerHTML = `${data[i].cba}`;
                        canasta_compare_cbt.innerHTML = `${data[i].cbt}`;
                    }
                }
            },
            (error) => console.log("ERROR", error)
        );

        // Ejecuta el callback con el valor actualizado
        if (callbackMonth) {
            callbackMonth(selectedMonth);
        }

        if (callCba) {
            callCba(selectedMonth, cba);
        }
    });

    canasta_year_select.addEventListener("change", function (data) {
        selectedYear = canasta_year_select.value;
        selectedMonth = canasta_month_select.value;

        if (selectedYear !== "") {
            yearSelected = true;
        } else {
            yearSelected = false;
        }
        checkBothSelected();

        if (parseInt(selectedYear) == yearGet) {
            if (parseInt(selectedMonth) > monthGet) {
                //console.log("No existe aun");
            }
        }

        if (selectedYear == "2016") {
            //console.log("Año seleccionado es 2016");
            document.querySelector(".canasta_month_option[value='1']").setAttribute("disabled", true);
            document.querySelector(".canasta_month_option[value='2']").setAttribute("disabled", true);
            document.querySelector(".canasta_month_option[value='3']").setAttribute("disabled", true);
            canasta_month_select.value = "4";
            selectedMonth = canasta_month_select.value;
            canasta_compare_cba.innerHTML = `${selectedMonth}`;

            //console.log("Mes seleccionado:", selectedMonth);
        } else {
            document.querySelector(".canasta_month_option[value='1']").removeAttribute("disabled");
            document.querySelector(".canasta_month_option[value='2']").removeAttribute("disabled");
            document.querySelector(".canasta_month_option[value='3']").removeAttribute("disabled");
        }

        // if año actual, deshabilita los meses que no existen
        if (selectedYear == yearGet) {
            //console.log("Año seleccionado es el actual", selectedMonth);
            if (parseInt(selectedMonth) >= monthGet) {
                let month_actual = (monthGet - 2).toString();
                selectedMonth = canasta_month_select.value;
                canasta_month_select.value = month_actual.toString();
                selectedMonth = canasta_month_select.value;

                //console.log("canasta_month_Value 22", canasta_month_select.value);
                //console.log("Mes seleccionado 22:", selectedMonth);

                canasta_compare_cba.innerHTML = `${cba}`;
                canasta_compare_cbt.innerHTML = `${cbt}`;

                // fetchDataFromAPI(
                //     (data) => {
                //         if (selectedMonth < 10) {
                //             selectedMonth = "0" + selectedMonth;
                //         }

                //         for (let i = 0; i < data.data.length; i++) {
                //             if (data.data[i][0] == `${selectedYear}-${selectedMonth}-01`) {
                //                 console.log("date[i][0]", data.data[i][0]);
                //                 console.log("date[i][0]", data.data[i][1]);
                //                 console.log("cba_cbt[i][1]", data.data[i][2]);
                //                 canasta_compare_cba.ierHTML = `${data.data[i][1]}`;
                //                 canasta_compare_cbt.ierHTML = `${data.data[i][2]}`;
                //             }
                //         }
                //     },
                //     (error) => console.log("ERROR", error)
                // );
            }

            for (let i = monthGet; i <= 12; i++) {
                document.querySelector(`.canasta_month_option[value='${i}']`).setAttribute("disabled", true);
            }
        } else {
            for (let i = monthGet; i <= 12; i++) {
                document.querySelector(`.canasta_month_option[value='${i}']`).removeAttribute("disabled");
            }
        }

        //console.log("Año seleccionado dentro del evento:", selectedYear);

        fetchDataFromAPI(
            (data) => {
                //selectedYear = canasta_year_select.value;

                // Data en TOP short cba cbt ++++++++++++++++++++++++
                //cba = Math.round(data[data.length - 1][1] * 3.09);
                //console.log("cba 2", cba);

                //cbt = Math.round(data[data.length - 1][2] * 3.09);
                //console.log("cbt 2", cbt);

                //console.log("cba_cbt", data.data[2][0]);

                //selectedYear = canasta_year_select.value;
                //console.log("selectedYear2:", selectedYear);
                //console.log("SSselectedMonth", selectedMonth);

                if (selectedMonth < 10) {
                    selectedMonth = "0" + selectedMonth;
                }

                for (let i = 0; i < data.length; i++) {
                    if (data[i].fecha == `${selectedYear}-${selectedMonth}-01`) {
                        //console.log("date[i][0]", data[i].fecha);
                        //console.log("date[i][0]", data.data[i][1]);
                        //console.log("cba_cbt[i][1]", data.data[i][2]);
                        canasta_compare_cba.innerHTML = `${data[i].cba}`;
                        canasta_compare_cbt.innerHTML = `${data[i].cbt}`;
                    }
                }
            },
            (error) => console.log("ERROR", error)
        );

        // Ejecuta el callback con el valor actualizado
        if (callbackYear) {
            callbackYear(selectedYear);
        }

        if (callCbt) {
            callCbt(selectedYear, cbt);
        }
        console.log("cba", cba);
        console.log("cbt", cbt);
    });
}

function doCallCba(month, cba) {
    //console.log("cba-22", cba);
    //console.log("Mes seleccionado 22:", month);
}

function doCallCbt(years, cbt) {
    //console.log("cbt-22", cbt);
    //console.log("Año seleccionado 22:", years);
}

// Función que devuelve el valor actualizado
function doSomethingWithSelectedYear(years) {
    //canasta_compare_cba.innerHTML = `${years}`;
    //console.log("Año seleccionado fuera del evento, usando callback:", years);
    // Aquí haces lo que necesites con el año seleccionado
}

// Configurar el listener y pasarle una función de callback
//handleMonthChange(doSomethingWithSelectedMonth, doSomethingWithSelectedYear);

// Función que usa el valor actualizado
function doSomethingWithSelectedMonth(month) {
    //console.log("Mes seleccionado fuera del evento, usando callback:", month);
    // Aquí haces lo que necesites con el mes seleccionado
}

handleMonthChange(doSomethingWithSelectedMonth, doSomethingWithSelectedYear, doCallCba, doCallCbt);

// Configurar el listener y pasarle una función de callback
//handleMonthChange(doSomethingWithSelectedMonth, doSomethingWithSelectedYear);

//console.log("Mes seleccionado 4:", getSelectedMonth());

// canasta_month_select.addEventListener("change", function getmesSelect (mesSelect) {
//     (mesSelect) => {
//         selectedMonth = canasta_month_select.value;
//         console.log("Mes seleccionado 2:", selectedMonth);
//     };
// });

// canasta_month_select.addEventListener("change", function () {
//     selectedMonth = canasta_month_select.value;
//     console.log("Mes seleccionado 2:", selectedMonth);
// });

//console.log("Mes seleccionado 4:", getSelectedMonth());

let alquiler_past;
let alquiler_past_value;
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

function get_tabla_compare(suma_CBA_Personas_past, suma_CBT_Personas_past, alquiler_past_value, suma_con_alquiler) {
    alquiler_past_value = parseInt(document.getElementById("alquiler_past").value);
    //alquiler_out = document.getElementById("alquiler_out");
    if (isNaN(alquiler_past_value)) {
        alquiler_past_value = 0;
    } else if (alquiler_past_value < 0) {
        alquiler_past_value = alquiler_past_value * -1;
    }

    if (!suma_CBA_Personas_past || !suma_CBT_Personas_past) {
        suma_CBA_Personas_past = 0;
        suma_CBT_Personas_past = 0;
    }

    suma_CT_clase_baja_past = suma_CBT_Personas_past * 1.2;

    suma_indigencia_past = alquiler_past_value + Math.round(suma_CBA_Personas_past);
    suma_pobreza_past = alquiler_past_value + Math.round(suma_CBT_Personas_past);
    suma_clase_baja_fragil_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 1.2);
    suma_clase_baja_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 1.5);
    suma_clase_media_fragil_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 2);
    suma_clase_media_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 5);
    suma_clase_media_alta_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 8);
    suma_clase_alta_baja_past = alquiler_past_value + Math.round(suma_CBT_Personas_past * 12);

    document.querySelector(".show_indigencia_min_past").textContent = 0;
    document.querySelector(".show_indigencia_max_past").textContent = suma_indigencia_past;

    document.querySelector(".show_pobreza_min_past").textContent = suma_indigencia_past;
    document.querySelector(".show_pobreza_max_past").textContent = suma_pobreza_past;

    document.querySelector(".show_clase_baja_min_past").textContent = suma_pobreza_past;
    document.querySelector(".show_clase_baja_max_past").textContent = suma_clase_baja_past;

    document.querySelector(".suma_clase_media_fragil_min_past").textContent = suma_clase_baja_past;
    document.querySelector(".suma_clase_media_fragil_max_past").textContent = suma_clase_media_fragil_past;

    document.querySelector(".suma_clase_media_min_past").textContent = suma_clase_media_fragil_past;
    document.querySelector(".suma_clase_media_max_past").textContent = suma_clase_media_past;

    document.querySelector(".suma_clase_media_alta_min_past").textContent = suma_clase_media_past;
    document.querySelector(".suma_clase_media_alta_max_past").textContent = suma_clase_media_alta_past;

    document.querySelector(".suma_clase_alta_min_past").textContent = suma_clase_media_alta_past;
    document.querySelector(".suma_clase_alta_max_past").textContent = suma_clase_alta_baja_past;
}
