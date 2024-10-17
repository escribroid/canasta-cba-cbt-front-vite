import indices_manuales from "./mod-indices.js";
import tabla_equivalentes from "./mod-canasta-custom.js";

//console.log("tabla_equivalentes[0].mujer", tabla_equivalentes[0].mujer);
// console.log("in", indices_manuales.cbt_manual);

const cba_equivalente = indices_manuales.cba_manual;
const cbt_equivalente = indices_manuales.cbt_manual;
//console.log("cba_equivalente", cba_equivalente);
//console.log("cbt_equivalente", cbt_equivalente);

const cba_unformat = Math.round(indices_manuales.cba_manual * 3.09);
const cbt_unformat = Math.round(indices_manuales.cbt_manual * 3.09);
const mes = indices_manuales.mes_cba_cbt_manual;
const cbt_alquiler_1amb_unformat = cbt_unformat + indices_manuales.alquilerProm1amb;
const cbt_alquiler_2amb_unformat = cbt_unformat + indices_manuales.alquilerProm2amb;
const cbt_alquiler_3amb_unformat = cbt_unformat + indices_manuales.alquilerProm3amb;

// Formatear el número con separador de miles+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const cba = cba_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt = cbt_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt_alquiler_2amb = cbt_alquiler_2amb_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt_alquiler_3amb = cbt_alquiler_3amb_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
//console.log("cba", cba);

// Calculos cba, cbt, cbt_alquiler_2amb, cbt_alquiler_3amb +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function calcular_cba() {
    const view_cba = document.querySelector(".view_cba");
    view_cba.innerHTML = `<span class="card_cba_value">  $${cba} </span>`;
}

function calcular_cbt() {
    const view_cbt = document.querySelector(".view_cbt");
    view_cbt.innerHTML = `<span class="card_cba_value">  $${cbt} </span>`;
}

function calcular_cbt_y_alquiler(personas, edad) {
    const view_cbt_alquiler_3amb = document.querySelector(".view_cbt_alquiler_3amb");
    view_cbt_alquiler_3amb.innerHTML = `<span class="card_cba_value">  $${cbt_alquiler_3amb} </span>`;
    // let view_cbt_alquiler_2amb = document.querySelector(".view_cbt_alquiler_2amb");
    // view_cbt_alquiler_2amb.innerHTML = `<span class="card_cba_value">  $${cbt_alquiler_2amb} </span>`;
}

function linea_indigencia() {
    const linea_indigencia = document.querySelector(".linea_indigencia");
    linea_indigencia.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Indigencia con Casa Propia: ingreso mensual menor a $${cba}</span></div>`;

    // const cba_top_short = document.querySelector(".indices_short_cba");
    // cba_top_short.innerHTML = "$" + cba;
}

function linea_pobreza() {
    const linea_pobreza = document.querySelector(".linea_pobreza");
    linea_pobreza.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Pobreza con Casa Propia: ingreso mensual menor a $${cbt}</span></div>`;

    // const cbt_top_short = document.querySelector(".indices_short_cbt");
    // cbt_top_short.innerHTML = "$" + cbt;
}

function linea_pobreza_alquilando() {
    const linea_pobreza_alquilando = document.querySelector(".linea_pobreza_alquilando");
    linea_pobreza_alquilando.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Pobreza ALQUILANDO: ingreso mensual menor a $${cbt_alquiler_3amb}</span></div>`;
}

calcular_cba();
calcular_cbt();
calcular_cbt_y_alquiler();
linea_indigencia();
linea_pobreza();
linea_pobreza_alquilando();

/* TABLA CANASTA PERSONALIZADA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
let add_partials;
let age;
let age_toStr;
let age_mostrar_table;
let alquiler_out = 0;
let alquiler_in = 0;
alquiler_in = document.getElementById("alquiler_in");
let alquiler_in_value = 0;
alquiler_in_value = parseFloat(alquiler_in.value);
let canasta_basica_alimentaria_ind_indigencia;
let canasta_basica_total_ind_pobreza;
let canasta_basica_clase_baja_individual;
let canasta_basica_clase_media_fragil_individual;
let canasta_basica_clase_media_individual;
let canasta_basica_clase_media_alta_individual;
let canasta_basica_clase_alta_individual;
let count_person = 0;
let gender;
let gender_show;
let gender_lowercase;
let index;
let index_array_cells = 0;
let index_array_cells_new = 0;
let suma_CBA_Personas = 0;
let suma_CBT_Personas = 0;
let suma_clase_baja = 0;
let suma_clase_media_fragil = 0;
let suma_clase_media = 0;
let suma_clase_media_alta = 0;
let suma_clase_alta = 0;
let suma_con_alquiler = 0;
let suma_indigencia_alquilando = 0;
let suma_pobreza_alquilando = 0;
let suma_clase_baja_fragil_alquilando = 0;
let suma_clase_baja_alquilando = 0;
let suma_clase_media_fragil_alquilando = 0;
let suma_clase_media_alquilando = 0;
let suma_clase_media_alta_alquilando = 0;
let suma_clase_alta_baja_alquilando = 0;
let suma_CT_clase_baja = 0;
let vivienda;
let show_indigencia_max = document.querySelector(".show_indigencia_max");
let ingresos = document.getElementById("ingresos_input").value;
vivienda = document.getElementById("select_canasta_alquiler");
document.querySelector(".row_mostrar_alquiler").style.display = "none";

let array_cba_individual = [];
let array_cbt_individual = [];
let array_clase_baja = [];
let array_clase_media_fragil = [];
let array_clase_media = [];
let array_clase_media_alta = [];
let array_clase_alta = [];
let array_count_person = [];
let table_matrix = [];
let table_rows = [];

export let dataso = {
    gender,
    age_mostrar_table,
    canasta_basica_alimentaria_ind_indigencia,
    canasta_basica_total_ind_pobreza,
    array_count_person,
    count_person,
};

const form = document.getElementById("person-form");
const tableBody = document.getElementById("person-list");
let personas_de_local = JSON.parse(localStorage.getItem("personas_de_local")) || [];

/* Borrar Rows de la tabla ++++++++++++++++++++++++++++++++++++++++++++++ */
tableBody.addEventListener("click", (event) => {
    const filas = tableBody.querySelectorAll("tr");
    let array_filas = Array.from(filas);

    //console.log("filas", filas);

    const cells = tableBody.querySelectorAll("td");

    //console.log("cells", cells);

    let array_cells = Array.from(cells); // Convertir NodeList a array

    const clickedCell = event.target.closest("td"); // Detectar la fila clickeada
    const cell_select_id = clickedCell.id;

    //console.log("cell_select_id=", clickedCell.id);

    const clickedRow = clickedCell.parentNode; // Detectar la fila clickeada
    const clickedRowId = clickedRow.id; // Detectar el id de la fila clickeada

    //console.log("clickedRowId", clickedRowId);

    if (clickedCell && clickedCell.id) {
        let index_array_cells = array_cells.findIndex((cell) => cell.id === cell_select_id);
        // console.log("index_array_cells=", index_array_cells);

        if (index_array_cells !== 3) {
            index_array_cells_new = (index_array_cells - 3) / 5;
        } else if (index_array_cells === 3) {
            index_array_cells_new = 0;
        }
        // console.log("index_array_cells_new", index_array_cells_new);

        subsPersonToTable(array_cba_individual, array_cbt_individual, array_count_person, index_array_cells_new);

        const row_del = clickedCell.parentNode;
        row_del.remove();
    }
});

// change select detalles canastas
document.getElementById("detalle_personal").addEventListener("change", function () {
    //console.log("CAMBIO");
    let select_canastas = document.getElementById("detalle_personal").value;

    if (select_canastas == "indigencia") {
        console.log("indigencia");
        console.log("array_cba_individual-2", array_cba_individual);
        console.log("table_rows", table_rows);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_cba_individual[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_cba_individual[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_indigencia_alquilando;

        console.log("table_rows D-", table_rows);
    } else if (select_canastas == "pobreza") {
        console.log("pobreza");
        console.log("array_cbt_individual", array_cbt_individual);

        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_cbt_individual[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_cbt_individual[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_pobreza_alquilando;
    } else if (select_canastas == "clase_baja") {
        console.log("clase_baja");
        console.log("array_clase_baja", array_clase_baja);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_baja[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_baja[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_clase_baja_alquilando;
    } else if (select_canastas == "clase_media_fragil") {
        console.log("clase_media_fragil");
        console.log("array_clase_media_fragil", array_clase_media_fragil);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media_fragil[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media_fragil[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_clase_media_fragil_alquilando;
    } else if (select_canastas == "clase_media") {
        console.log("clase_media");
        console.log("array_clase_media", array_clase_media);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_clase_media_alquilando;
    } else if (select_canastas == "clase_media_alta") {
        console.log("clase_media_alta");
        console.log("array_clase_media_alta", array_clase_media_alta);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media_alta[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media_alta[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_clase_media_alta_alquilando;
    } else if (select_canastas == "clase_alta") {
        console.log("clase_alta");
        console.log("array_clase_alta", array_clase_alta);
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_alta[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_alta[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_clase_alta_baja_alquilando;
    }
});

// Función para agregar persona a la tabla y al array de personas +++++++++++++++++++++++++++++++
export function addPersonToTable(
    gender,
    age_mostrar_table,
    canasta_basica_alimentaria_ind_indigencia,
    canasta_basica_total_ind_pobreza,
    array_count_person,
    count_person
) {
    const row = document.createElement("tr");

    table_matrix.pop();

    if (gender === "Femenino") {
        gender_show = "Femenino";
    } else {
        gender_show = "Masculino";
    }

    row.id = `person_${count_person}`;

    //console.log("count_ADD", count_person);

    let cells = [gender_show, age_mostrar_table, canasta_basica_total_ind_pobreza];

    table_rows.push(cells);

    //console.log("table_rows", table_rows);

    row.innerHTML = `<td class="p-1">${table_rows[array_count_person.length - 1][0]}</td><td class="col-1 p-1">${
        table_rows[array_count_person.length - 1][1]
    }</td><td id="detalles_monto_person_${count_person}" class="add_Partials p-1">$${table_rows[
        array_count_person.length - 1
    ][2].toLocaleString("es-AR", {
        maximumFractionDigits: 0,
    })}</td><td class="p-1 detalles_delete" id="detalles_person_${count_person}">
    <svg id="testSvg" class="detalles_delete_body" width="20px" height="20px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    </td>`;
    tableBody.appendChild(row);

    return table_rows;
}

// Quitar personas de la tabla y del array de personas +++++++++++++++++++++++++++++++++
function subsPersonToTable(array_cba_individual, array_cbt_individual, array_count_person, index_array_cells_new) {
    array_cba_individual.splice(index_array_cells_new, 1);
    ingresos = document.getElementById("ingresos_input").value;
    vivienda = document.getElementById("select_canasta_alquiler");

    //console.log("array_cba_individual-SUB:", array_cba_individual);

    suma_CBA_Personas = 0;
    for (let i = 0; i < array_cba_individual.length; i++) {
        suma_CBA_Personas = parseFloat(suma_CBA_Personas) + parseFloat(array_cba_individual[i]);
    }

    table_rows.splice(index_array_cells_new, 1);

    console.log("table_rows-SUB:", table_rows);

    array_cbt_individual.splice(index_array_cells_new, 1);
    // console.log("array_cbt_individual-SUB:", array_cbt_individual);
    suma_CBT_Personas = 0;
    for (let i = 0; i < array_cbt_individual.length; i++) {
        suma_CBT_Personas = parseFloat(suma_CBT_Personas) + parseFloat(array_cbt_individual[i]);
    }

    array_count_person.pop();
    console.log("array_count_person-SUB:", array_count_person);

    suma_con_alquiler = 0;

    suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
    suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);

    ingresos_input_in(ingresos);

    if (array_cba_individual.length === 0 && (vivienda.value == "vivienda_slc" || vivienda.value == "noAlquilo")) {
        document.querySelector(".icon-svg-reset").style.transition = "transform 0.3s ease-in-out";
        document.querySelector(".icon-svg-reset").style.transform = "translatex(100%)";
        setTimeout(() => {
            document.querySelector(".icon-svg-reset").style.opacity = "0";
            document.querySelector(".icon-svg-reset").style.display = "none";
        }, 400);
    }
}

// SUMA DE CANASTA PERSONALIZADA +++++++++++++++++++++++
suma_con_alquiler = 0;
function suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler) {
    alquiler_in_value = parseInt(document.getElementById("alquiler_in").value);
    alquiler_out = document.getElementById("alquiler_out");
    if (isNaN(alquiler_in_value)) {
        alquiler_in_value = 0;
        alquiler_out.textContent = "0";
    } else if (alquiler_in_value < 0) {
        alquiler_in_value = alquiler_in_value * -1;
    }
    //suma_con_alquiler = 0;
    suma_con_alquiler = alquiler_in_value + suma_CBT_Personas;

    if (isNaN(suma_con_alquiler)) {
        suma_con_alquiler = alquiler_in_value;
    }

    //console.log("suma_con_alquiler", suma_con_alquiler);

    document.getElementById("total-canasta").innerHTML =
        "$" +
        suma_con_alquiler.toLocaleString("es-AR", {
            maximumFractionDigits: 0,
        });
}

function suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler) {
    alquiler_in_value = parseInt(document.getElementById("alquiler_in").value);
    //alquiler_out = document.getElementById("alquiler_out");
    if (isNaN(alquiler_in_value)) {
        alquiler_in_value = 0;
    } else if (alquiler_in_value < 0) {
        alquiler_in_value = alquiler_in_value * -1;
    }

    if (!suma_CBA_Personas || !suma_CBT_Personas) {
        suma_CBA_Personas = 0;
        suma_CBT_Personas = 0;
    }

    suma_CT_clase_baja = suma_CBT_Personas * 1.2;

    suma_indigencia_alquilando = alquiler_in_value + Math.round(suma_CBA_Personas);
    suma_pobreza_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas);
    suma_clase_baja_fragil_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 1.2);
    suma_clase_baja_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 1.5);
    suma_clase_media_fragil_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 2);
    suma_clase_media_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 5);
    suma_clase_media_alta_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 8);
    suma_clase_alta_baja_alquilando = alquiler_in_value + Math.round(suma_CBT_Personas * 12);

    document.querySelector(".show_indigencia_min").textContent = 0;
    document.querySelector(".show_indigencia_max").textContent = suma_indigencia_alquilando;

    document.querySelector(".show_pobreza_min").textContent = suma_indigencia_alquilando;
    document.querySelector(".show_pobreza_max").textContent = suma_pobreza_alquilando;

    document.querySelector(".show_clase_baja_min").textContent = suma_pobreza_alquilando;
    document.querySelector(".show_clase_baja_max").textContent = suma_clase_baja_alquilando;

    document.querySelector(".suma_clase_media_fragil_min").textContent = suma_clase_baja_alquilando;
    document.querySelector(".suma_clase_media_fragil_max").textContent = suma_clase_media_fragil_alquilando;

    document.querySelector(".suma_clase_media_min").textContent = suma_clase_media_fragil_alquilando;
    document.querySelector(".suma_clase_media_max").textContent = suma_clase_media_alquilando;

    document.querySelector(".suma_clase_media_alta_min").textContent = suma_clase_media_alquilando;
    document.querySelector(".suma_clase_media_alta_max").textContent = suma_clase_media_alta_alquilando;

    document.querySelector(".suma_clase_alta_min").textContent = suma_clase_media_alta_alquilando;
    document.querySelector(".suma_clase_alta_max").textContent = suma_clase_alta_baja_alquilando;
}

// Agregar un evento al select para cambiar el estado del input
vivienda.addEventListener("input", function () {
    vivienda = document.getElementById("select_canasta_alquiler");
    alquiler_in = document.getElementById("alquiler_in");

    if (vivienda.value === "siAlquilo") {
        alquiler_in.value = "";
        alquiler_in.enabled = true; // Habilitar el input
        alquiler_in.removeAttribute("disabled"); // Deshabilitar el input
        alquiler_in.placeholder = "$ valor alquiler"; // Mostrar texto en el input
        document.querySelector(".row_mostrar_alquiler").style.display = "table-row";
    } else if (vivienda.value === "noAlquilo") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = ""; // Limpiar el input
        alquiler_in.placeholder = "No alquilo"; // Mostrar texto en el input
        document.getElementById("alquiler_out").textContent = "No";
        document.querySelector(".row_mostrar_alquiler").style.display = "none";
    } else if (vivienda.value === "AlquilerProm3amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm3amb}`;
        document.getElementById("alquiler_out").textContent = alquiler_in.value;
        document.querySelector(".row_mostrar_alquiler").style.display = "table-row";
    } else if (vivienda.value === "AlquilerProm2amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm2amb}`;
        parseInt(alquiler_in.value);

        document.getElementById("alquiler_out").textContent = alquiler_in.value;
        document.querySelector(".row_mostrar_alquiler").style.display = "table-row";
        suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
        suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
    } else if (vivienda.value === "AlquilerProm1amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm1amb}`;
        parseInt(alquiler_in.value);

        document.getElementById("alquiler_out").textContent = alquiler_in.value;
        document.querySelector(".row_mostrar_alquiler").style.display = "table-row";
    }

    if (vivienda.value !== "siAlquilo" && vivienda.value !== "vivienda_slc" && vivienda.value !== "noAlquilo") {
        document.querySelector(".icon-svg-reset").style.display = "flex";
        setTimeout(() => {
            document.querySelector(".icon-svg-reset").style.transition = "transform 0.3s ease-in-out";
            document.querySelector(".icon-svg-reset").style.transform = "translatex(0)";
            document.querySelector(".icon-svg-reset").style.opacity = "1";
        }, 400);
    }

    suma_con_alquiler = 0;
    alquiler_in_value = 0;
    alquiler_in_value = alquiler_in.value;
    suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
    suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
});

/* Agregar a la tabla SUBMIT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
document.getElementById("person-form").addEventListener("submit", function (e) {
    e.preventDefault();
    age = document.getElementById("selected-age").value;
    gender = document.getElementById("selected-gender").value;
    alquiler_in = document.getElementById("alquiler_in");
    alquiler_in_value = alquiler_in.value;
    ingresos = document.getElementById("ingresos_input").value;

    //console.log("ingresos", ingresos.value);

    // Evitar que se agreguen personas sin género
    if (!gender) {
        age = "";
    }

    if (!age || !gender) {
        // console.log("No se puede agregar persona");
        return;
    } else {
        // Obtener el valor de la edad seleccionada +
        age_mostrar_table = parseInt(age);

        if (age < 18) {
            age = age;
        } else if (age >= 18 && age <= 29) {
            age = "18";
        } else if (age >= 30 && age <= 45) {
            age = "30";
        } else if (age >= 46 && age <= 60) {
            age = "46";
        } else if (age >= 61 && age <= 75) {
            age = "61";
        } else if (age >= 76 && age <= 99) {
            age = "76";
        } else if (age >= 100) {
            age = "99";
        }

        age_toStr = age.toString();

        // Obtener GENDER ++++++++++++++++++++
        gender_lowercase = gender.toLowerCase();

        count_person = count_person + 1;
        array_count_person.push(count_person);
        // console.log("array_count_person1+", array_count_person);
        //console.log("array_count_person_LEN", array_count_person.length);
        // console.log("count_person", count_person);

        canasta_basica_alimentaria_ind_indigencia =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cba_equivalente;
        //console.log("canasta_basica_alimentaria_ind_indigencia", canasta_basica_alimentaria_ind_indigencia);
        array_cba_individual.push(canasta_basica_alimentaria_ind_indigencia);
        suma_CBA_Personas = 0;
        for (let i = 0; i < array_cba_individual.length; i++) {
            suma_CBA_Personas = parseFloat(suma_CBA_Personas) + parseFloat(array_cba_individual[i]);
        }
        console.log("array_cba_individual-SUB", array_cba_individual);
        // console.log("suma_CBA_Personas-SUB", suma_CBA_Personas);

        canasta_basica_total_ind_pobreza = tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente;
        //console.log("canasta_basica_total_ind_pobreza", canasta_basica_total_ind_pobreza);
        array_cbt_individual.push(canasta_basica_total_ind_pobreza);
        suma_CBT_Personas = 0;
        for (let i = 0; i < array_cbt_individual.length; i++) {
            suma_CBT_Personas = parseFloat(suma_CBT_Personas) + parseFloat(array_cbt_individual[i]);
        }

        canasta_basica_clase_baja_individual =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente * 1.5;
        array_clase_baja.push(canasta_basica_clase_baja_individual);
        suma_clase_baja = 0;
        for (let i = 0; i < array_clase_baja.length; i++) {
            suma_clase_baja = parseFloat(suma_clase_baja) + parseFloat(array_clase_baja[i]);
        }

        canasta_basica_clase_media_fragil_individual =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente * 2;
        array_clase_media_fragil.push(canasta_basica_clase_media_fragil_individual);
        suma_clase_media_fragil = 0;
        for (let i = 0; i < array_clase_media_fragil.length; i++) {
            suma_clase_media_fragil = parseFloat(suma_clase_media_fragil) + parseFloat(array_clase_media_fragil[i]);
        }

        canasta_basica_clase_media_individual =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente * 4.5;
        array_clase_media.push(canasta_basica_clase_media_individual);
        suma_clase_media = 0;
        for (let i = 0; i < array_clase_media.length; i++) {
            suma_clase_media = parseFloat(suma_clase_media) + parseFloat(array_clase_media[i]);
        }

        canasta_basica_clase_media_alta_individual =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente * 6.5;
        array_clase_media_alta.push(canasta_basica_clase_media_alta_individual);
        suma_clase_media_alta = 0;
        for (let i = 0; i < array_clase_media_alta.length; i++) {
            suma_clase_media_alta = parseFloat(suma_clase_media_alta) + parseFloat(array_clase_media_alta[i]);
        }

        canasta_basica_clase_alta_individual =
            tabla_equivalentes[`${age_toStr}`][`${gender_lowercase}`] * cbt_equivalente * 10;
        array_clase_alta.push(canasta_basica_clase_alta_individual);
        suma_clase_alta = 0;
        for (let i = 0; i < array_clase_alta.length; i++) {
            suma_clase_alta = parseFloat(suma_clase_alta) + parseFloat(array_clase_alta[i]);
        }

        // console.log("suma_CBA_Personas", suma_CBA_Personas);
        // console.log("suma_CBT_Personas", suma_CBT_Personas);
        // console.log("suma_clase_baja", suma_clase_baja);

        // activar boton reset
        document.querySelector(".icon-svg-reset").style.display = "flex";

        setTimeout(() => {
            document.querySelector(".icon-svg-reset").style.transform = "translatex(0)";
            document.querySelector(".icon-svg-reset").style.transition = "transform .3s ease-in-out";
            document.querySelector(".icon-svg-reset").style.opacity = "1";

            // Ocultar después de la transición
        }, 300); // Esperar que la transición termine (0.5s)
    }
    // array_cbt_individual.push(canasta_basica_total_ind_pobreza);
    // suma_CBT_Personas = 0;
    // for (let i = 0; i < array_cbt_individual.length; i++) {
    //     suma_CBT_Personas = parseFloat(suma_CBT_Personas) + parseFloat(array_cbt_individual[i]);
    // }

    // console.log("array_cbt_individual", array_cbt_individual);
    // console.log("array_cbt_individual", array_cbt_individual.length);
    // console.log("suma_CBT_Personas", suma_CBT_Personas);

    // Agregar la persona a la tabla +++++++++++++++++++
    addPersonToTable(
        gender,
        age_mostrar_table,
        canasta_basica_alimentaria_ind_indigencia,
        canasta_basica_total_ind_pobreza,
        array_count_person,
        count_person
    );
    suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
    suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
    ingresos_input_in(ingresos);

    console.log("table_rows", table_rows);
    // console.log("table_rows1", table_rows);
    // console.log("table_rows2", table_rows);

    // Limpiar el formulario
    //document.getElementById("person-form").reset();

    // LOCAL STORAGE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const local_persona = {
        age,
        age_mostrar_table,
        gender,
        add_partials,
        suma_CBA_Personas,
        suma_CBT_Personas,
        alquiler_in_value,
        alquiler_out,
        suma_con_alquiler,
    };
    personas_de_local.push(local_persona);
    localStorage.setItem("personas_de_local", JSON.stringify(personas_de_local));
    return { suma_CBT_Personas, alquiler_in_value, suma_con_alquiler };
});

// Evento keydown prevenir caracteres no numéricos
alquiler_in.addEventListener("keydown", function (e) {
    // Permitir números (del 0 al 9) y la tecla Backspace
    if (
        (e.key >= "0" && e.key <= "9") || // Números
        e.key === "Backspace" || // Retroceso
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" || // Flechas
        e.key === "Delete" // Suprimir
    ) {
        return;
    } else {
        // Evitar que se ingrese cualquier otra tecla
        e.preventDefault();
    }
});

// Evento input prevenir caracteres no numéricos
alquiler_in.addEventListener("input", function () {
    const cursorPos = alquiler_in.selectionStart; // Guardar la posición actual del cursor
    alquiler_in.value = alquiler_in.value.replace(/[^0-9]/g, "");
    alquiler_in.selectionEnd = cursorPos; // Restaurar la posición del cursor
});

// event INPUT ++++++++++++++++++++++++++++++++++++++++++++++++++++
function input_alquiler_in() {
    document.getElementById("alquiler_in").addEventListener("input", () => {
        age = document.getElementById("selected-age").value;
        gender = document.getElementById("selected-gender").value;
        alquiler_in_value = parseInt(document.getElementById("alquiler_in").value);
        alquiler_out = document.getElementById("alquiler_out").value;

        if (isNaN(alquiler_in_value)) {
            alquiler_in_value = 0;
        } else if (alquiler_in_value < 0) {
            alquiler_in_value = alquiler_in_value * -1;
        }

        if (isNaN(parseInt(document.getElementById("alquiler_out").value))) {
            document.getElementById("alquiler_out").textContent = alquiler_in_value;
        } else {
            document.getElementById("alquiler_out").textContent = alquiler_in_value;
        }

        suma_con_alquiler = 0;
        alquiler_in_value = 0;
        suma_Total(suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);
        suma_tabla_indigencia(suma_CBA_Personas, suma_CBT_Personas, alquiler_in_value, suma_con_alquiler);

        suma_CBT_Personas = suma_CBT_Personas + alquiler_in_value;
        suma_con_alquiler = suma_CBT_Personas;

        if (!alquiler_in_value || alquiler_in_value !== 0) {
            document.querySelector(".icon-svg-reset").style.display = "flex";
            setTimeout(() => {
                document.querySelector(".icon-svg-reset").style.transition = "transform 0.3s ease-in-out";
                document.querySelector(".icon-svg-reset").style.transform = "translatex(0)";
                document.querySelector(".icon-svg-reset").style.opacity = "1";
            }, 400);
        }
    });
}
input_alquiler_in();

document.getElementById("btn-reset-person").addEventListener("click", () => {
    //localStorage.removeItem('personas_de_local');
    personas_de_local = [];
    localStorage.setItem("personas_de_local", JSON.stringify(personas_de_local));
    document.querySelector(".icon-svg-reset").style.transition = "transform 0.3s ease-in-out";
    document.querySelector(".icon-svg-reset").style.transform = "translatex(100%)";
    setTimeout(() => {
        document.querySelector(".icon-svg-reset").style.opacity = "0";
        document.querySelector(".icon-svg-reset").style.display = "none";
        document.getElementById("person-form").reset();
    }, 400);
    setTimeout(() => {
        document.getElementById("person-list").innerHTML = "";
        location.reload();
    }, 400);
});

function ingresos_input_in(ingresos) {
    // Verificar si los límites están definidos
    if (
        typeof suma_indigencia_alquilando === "undefined" ||
        typeof suma_pobreza_alquilando === "undefined" ||
        typeof suma_clase_baja_alquilando === "undefined" ||
        typeof suma_clase_media_fragil_alquilando === "undefined" ||
        typeof suma_clase_media_alquilando === "undefined" ||
        typeof suma_clase_media_alta_alquilando === "undefined"
    ) {
        return;
    }

    if (
        suma_indigencia_alquilando === 0 &&
        suma_pobreza_alquilando === 0 &&
        suma_clase_baja_alquilando === 0 &&
        suma_clase_media_fragil_alquilando === 0 &&
        suma_clase_media_alquilando === 0 &&
        suma_clase_media_alta_alquilando === 0
    ) {
        document.querySelector(".all_canasta_indigencia").style.removeProperty("background-color");

        document.querySelector(".all_canasta_pobreza").style.removeProperty("background-color");
        document.querySelector(".all_canasta_baja").style.removeProperty("background-color");
        document.querySelector(".all_canasta_media_fragil").style.removeProperty("background-color");
        document.querySelector(".all_canasta_media").style.removeProperty("background-color");
        document.querySelector(".all_canasta_media_alta").style.removeProperty("background-color");
        document.querySelector(".all_canasta_alta").style.removeProperty("background-color");
        return;
    }

    if (isNaN(ingresos)) {
        document.querySelector(".all_canasta_indigencia").style.removeProperty("background-color");
        return;
    }

    if (ingresos > 0 && ingresos < suma_indigencia_alquilando) {
        document.querySelector(".show_indigencia").style.setProperty("background-color", "#FF1100", "important");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_indigencia_alquilando && ingresos < suma_pobreza_alquilando) {
        document.querySelector(".show_pobreza").style.setProperty("background-color", "#FF1100", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_pobreza_alquilando && ingresos < suma_clase_baja_alquilando) {
        document.querySelector(".show_clase_baja").style.setProperty("background-color", "#FF5500 ", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_clase_baja_alquilando && ingresos < suma_clase_media_fragil_alquilando) {
        document
            .querySelector(".show_clase_media_fragil")
            .style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_clase_media_fragil_alquilando && ingresos < suma_clase_media_alquilando) {
        document.querySelector(".show_clase_media").style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_clase_media_alquilando && ingresos < suma_clase_media_alta_alquilando) {
        document.querySelector(".show_clase_media_alta").style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    } else if (ingresos >= suma_clase_media_alta_alquilando && ingresos < suma_clase_alta_baja_alquilando) {
        document.querySelector(".show_clase_alta").style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
    } else if (ingresos > suma_clase_alta_baja_alquilando) {
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");
        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
    }

    if (ingresos === "" || !ingresos) {
        document.querySelector(".show_indigencia").style.removeProperty("background-color");
        document.querySelector(".show_pobreza").style.removeProperty("background-color");

        document.querySelector(".show_clase_baja").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_fragil").style.removeProperty("background-color");
        document.querySelector(".show_clase_media").style.removeProperty("background-color");
        document.querySelector(".show_clase_media_alta").style.removeProperty("background-color");
        document.querySelector(".show_clase_alta").style.removeProperty("background-color");
    }
}

ingresos_input_in(ingresos);

document.getElementById("ingresos_input").addEventListener("input", (e) => {
    const ingresosEvent = parseInt(e.target.value);
    ingresos_input_in(ingresosEvent);
});

// Cerrar el offcanvas al hacer clic en cualquier enlace dentro de él
document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.closest(".offcanvas")) {
        e.preventDefault(); // Previene el comportamiento de scroll por defecto
        const targetId = e.target.getAttribute("href"); // Obtiene el destino del enlace
        const targetElement = document.querySelector(targetId); // Selecciona la sección objetivo

        const offcanvas = e.target.closest(".offcanvas"); // Encuentra el offcanvas actual

        // Cierra el offcanvas
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        offcanvasInstance.hide();

        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave a la sección
        }, 200); // 300 ms para asegurarse de que el offcanvas se cierra primero
    }
});

document.getElementById("nav-link-cbt").addEventListener("click", () => {
    document.querySelector(".card-solapada-3").style.boxShadow = "0px 0px 6px 4px #ff3366";
});
