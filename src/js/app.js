import indices_manuales from "./mod-indices.js";
import tabla_equivalentes from "./mod-canasta-custom.js";

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

// Formatear el número con separador de miles+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const cba = cba_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt = cbt_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt_alquiler_2amb = cbt_alquiler_2amb_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });
const cbt_alquiler_3amb = cbt_alquiler_3amb_unformat.toLocaleString("es-AR", { minimumFractionDigits: 0 });

// Calculos cba, cbt, cbt_alquiler_2amb, cbt_alquiler_3amb ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function calcular_cba() {
    const view_cba = document.querySelector(".view-cba");
    view_cba.innerHTML = `<span class="card-cba_value">  $ ${cba} </span>`;
}

function calcular_cbt() {
    const view_cbt = document.querySelector(".view-cbt");
    view_cbt.innerHTML = `<span class="card-cba_value">  $ ${cbt} </span>`;
}

function calcular_cbt_y_alquiler(personas, edad) {
    const view_cbt_alquiler_3amb = document.querySelector(".view-cbt-rent-3amb");
    view_cbt_alquiler_3amb.innerHTML = `<span class="card-cba_value">  $ ${cbt_alquiler_3amb} </span>`;
}

function linea_indigencia() {
    const linea_indigencia = document.querySelector(".linea-indigencia");
    linea_indigencia.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Indigencia con Casa Propia: ingreso mensual menor a $ ${cba}</span></div>`;
}

function linea_pobreza() {
    const linea_pobreza = document.querySelector(".linea-pobreza");
    linea_pobreza.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Pobreza con Casa Propia: ingreso mensual menor a $ ${cbt}</span></div>`;
}

function linea_pobreza_alquilando() {
    const linea_pobreza_alquilando = document.querySelector(".linea-pobreza-renting");
    linea_pobreza_alquilando.innerHTML = `<div class="cards_nota"><span class="cards_nota_txt">» Pobreza ALQUILANDO: ingreso mensual menor a $ ${cbt_alquiler_3amb}</span></div>`;
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
alquiler_in = document.getElementById("card-rent-in");
let alquiler_in_value = 0;
alquiler_in_value = parseFloat(alquiler_in.value);
let cba_individual_indigencia;
let cbt_individual_pobreza;
let cb_clase_baja_individual;
let cb_clase_media_fragil_individual;
let cb_clase_media_individual;
let cb_clase_media_alta_individual;
let cb_clase_alta_individual;
// let cell_select_id;
let cells;
let cb_table_cells_detail;
let clickedCell_id;
let count_person = 0;
let filas;
let gender;
let gender_show;
let gender_lowercase;
let index_array_cells_new = 0;
let local_persona;
let cba_add_group = 0;
let cbt_add_group = 0;
let clase_baja_add_group = 0;
let clase_media_fragil_add_group = 0;
let clase_media_add_group = 0;
let clase_media_alta_add_group = 0;
let clase_alta_add_group = 0;
let suma_con_alquiler = 0;
let suma_indigencia_alquilando;
let suma_pobreza_alquilando = 0;
let clase_baja_add_group_fragil_alquilando = 0;
let clase_baja_add_group_alquilando = 0;
let clase_media_fragil_add_group_alquilando = 0;
let clase_media_add_group_alquilando = 0;
let clase_media_alta_add_group_alquilando = 0;
let clase_alta_add_group_baja_alquilando = 0;
let select_canastas;
let suma_CT_clase_baja = 0;
let vivienda;
let show_indigencia_max = document.querySelector(".table-classes-indigencia-max");
let ingresos = document.getElementById("income__input").value;
vivienda = document.getElementById("card__select-rent");
let rent_in_show = document.querySelector(".table-canastas-rent");
let coef_age_gender = 0;
let coef_age_gender_add = 0;
let array_cba_individual = [];
let array_cbt_individual = [];
let array_clase_baja = [];
let array_clase_media_fragil = [];
let array_clase_media = [];
let array_clase_media_alta = [];
let array_clase_alta = [];
let array_count_person = [];
let array_cells = [];
let array_filas = [];
let table_matrix = [];
let table_rows = [];
let coef_age_gender_array = [];

rent_in_show.style.display = "none";

const form = document.getElementById("form");
const tableBody = document.getElementById("table-canastas__list");
let personas_local_storage = JSON.parse(localStorage.getItem("personas_local_storage")) || [];

/* Borrar Rows de la tabla ++++++++++++++++++++++++++++++++++++++++++++++ */
tableBody.addEventListener("click", (event) => {
    filas = tableBody.querySelectorAll("tr");
    array_filas = Array.from(filas);
    cells = tableBody.querySelectorAll("td");
    array_cells = Array.from(cells);
    const clickedRow = event.target.closest("tr");
    const clickRow_id = clickedRow.id[7];
    const clickedCell = event.target.closest("td");
    clickedCell_id = clickedCell.id[7];
    ingresos = document.getElementById("income__input").value;

    if (clickRow_id === clickedCell_id) {
        filas = tableBody.querySelectorAll("tr");

        array_filas = Array.from(filas);
        coef_age_gender_array.splice([clickRow_id - 1], 1);

        coef_age_gender_add = coef_age_gender_array.reduce((acc, cur) => acc + cur, 0);
        if (coef_age_gender_add === 0) {
            coef_age_gender_array = [];
        }
        //console.log("coef_age_gender_add|||", coef_age_gender_add);

        const row_del = clickedCell.parentNode;
        row_del.remove();

        filas = tableBody.querySelectorAll("tr");
        cells = tableBody.querySelectorAll("td");

        array_filas = Array.from(filas);
        array_cells = Array.from(cells);
        //console.log("array_filasLL", array_filas.length);

        count_person = array_filas.length;

        for (let i = 0; i < array_filas.length; i++) {
            array_filas[i].id = `person_${i + 1}`;
            array_cells[(i + 1) * 4 - 1].id = `person_${i + 1}_detalles`;
            array_cells[(i + 1) * 4 - 2].id = `detalles_monto_person_${i + 1}`;
        }

        // Emitir un evento personalizado con el valor de ax
        const event = new CustomEvent("axUpdated", {
            detail: { coef_age_gender_add: coef_age_gender_add },
        });
        window.dispatchEvent(event); // Disparar el evento

        subsPersonToTable(
            array_cba_individual,
            array_cbt_individual,
            array_count_person,
            index_array_cells_new,
            coef_age_gender_array
        );
    }
});

// change select detalles canastas +++++++++++++++++++++++++++++++++
document.getElementById("table-canastas__select").addEventListener("change", function () {
    select_canastas = document.getElementById("table-canastas__select").value;

    if (select_canastas == "indigencia") {
        // console.log("indigencia");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_cba_individual[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_cba_individual[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_indigencia_alquilando;

        //console.log("table_rows D-", table_rows);
    } else if (select_canastas == "pobreza") {
        // console.log("pobreza");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_cbt_individual[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_cbt_individual[i]);
        }
        document.getElementById("total-canasta").innerHTML = suma_pobreza_alquilando;
    } else if (select_canastas == "clase_baja") {
        // console.log("clase_baja");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_baja[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_baja[i]);
        }
        document.getElementById("total-canasta").innerHTML = clase_baja_add_group_alquilando;
    } else if (select_canastas == "clase_media_fragil") {
        // console.log("clase_media_fragil");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media_fragil[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media_fragil[i]);
        }
        document.getElementById("total-canasta").innerHTML = clase_media_fragil_add_group_alquilando;
    } else if (select_canastas == "clase_media") {
        // console.log("clase_media");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media[i]);
        }
        document.getElementById("total-canasta").innerHTML = clase_media_add_group_alquilando;
    } else if (select_canastas == "clase_media_alta") {
        // console.log("clase_media_alta");
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_media_alta[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_media_alta[i]);
        }
        document.getElementById("total-canasta").innerHTML = clase_media_alta_add_group_alquilando;
    } else if (select_canastas == "clase_alta") {
        for (let i = 0; i < table_rows.length; i++) {
            table_rows[i][2] = array_clase_alta[i];
            let existingRow = tableBody.rows[i];
            let existingCell = existingRow.cells[2];
            existingCell.textContent = Math.round(array_clase_alta[i]);
        }
        document.getElementById("total-canasta").innerHTML = clase_alta_add_group_baja_alquilando;
    }
});

// Función para agregar persona a la tabla y al array de personas +++++++++++++++++++++++++++++++
function addPersonToTable(
    gender,
    age_mostrar_table,
    cba_individual_indigencia,
    cbt_individual_pobreza,
    array_count_person,
    count_person,
    suma_indigencia_alquilando
) {
    select_canastas = document.getElementById("table-canastas__select").value;

    const row = document.createElement("tr");

    table_matrix.pop();

    if (gender === "Femenino") {
        gender_show = "Femenino";
    } else if(gender === "Masculino") {
        gender_show = "Masculino";
    } else if(gender === "Embarazada") {
        gender_show = "Embarazada";
    } else if(gender === "Lactante") {
        gender_show = "F. Lactante";
    }

    row.id = `person_${count_person}`;

    if (select_canastas == "indigencia") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cba_individual_indigencia];
        console.log("select_canastas", select_canastas);
    } else if (select_canastas == "pobreza") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cbt_individual_pobreza];
    } else if (select_canastas == "clase_baja") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cb_clase_baja_individual];
    } else if (select_canastas == "clase_media_fragil") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cb_clase_media_fragil_individual];
    } else if (select_canastas == "clase_media") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cb_clase_media_individual];
    } else if (select_canastas == "clase_media_alta") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cb_clase_media_alta_individual];
    } else if (select_canastas == "clase_alta") {
        cb_table_cells_detail = [gender_show, age_mostrar_table, cb_clase_alta_individual];
    }
    table_rows.push(cb_table_cells_detail);

    row.innerHTML = `<td class="p-1 text-start">${table_rows[array_count_person.length - 1][0]}</td>
    <td class="col-1 p-1">${table_rows[array_count_person.length - 1][1]}</td>
    <td id="detalles_monto_person_${count_person}" class="add_Partials p-1">$ ${cb_table_cells_detail[2].toLocaleString(
        "es-AR",
        {
            maximumFractionDigits: 0,
        }
    )}</td>
    <td class="p-1 detalles_delete" id="person_${count_person}_detalles">
    <svg id="testSvg" class="detalles_delete_body" width="20px" height="20px" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    </td>`;
    tableBody.appendChild(row);
    return table_rows;
}

// Quitar personas de la tabla y del array de personas +++++++++++++++++++++++++++++++++
function subsPersonToTable(
    array_cba_individual,
    array_cbt_individual,
    array_count_person,
    index_array_cells_new,
    coef_age_gender_array
) {
    array_cba_individual.splice(index_array_cells_new, 1);
    ingresos = document.getElementById("income__input").value;
    vivienda = document.getElementById("card__select-rent");
    //console.log("array_cba_individual-SUB||", array_cba_individual);

    cba_add_group = 0;
    coef_age_gender_add;
    cba_add_group = parseFloat(coef_age_gender_add * cba_equivalente);
    //console.log("index_array_cells_new", index_array_cells_new);

    table_rows.splice(index_array_cells_new, 1);

    array_cbt_individual.splice(index_array_cells_new, 1);
    // console.log("array_cbt_individual-SUB:", array_cbt_individual);
    cbt_add_group = 0;
    cbt_add_group = parseFloat(coef_age_gender_add * cbt_equivalente);

    array_count_person.pop();
    //console.log("array_count_person-SUB:", array_count_person);

    suma_con_alquiler = 0;

    suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler);
    add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler);

    ingresos_input_in(ingresos);

    if (array_cba_individual.length === 0 && (vivienda.value == "vivienda_slc" || vivienda.value == "noAlquilo")) {
        document.querySelector(".card__svg--reset").style.transition = "transform 0.3s ease-in-out";
        document.querySelector(".card__svg--reset").style.transform = "translatex(100%)";
        setTimeout(() => {
            document.querySelector(".card__svg--reset").style.opacity = "0";
            document.querySelector(".card__svg--reset").style.display = "none";
        }, 400);
    }
}

// SUMA DE CANASTA PERSONALIZADA +++++++++++++++++++++++
suma_con_alquiler = 0;
function suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler) {
    alquiler_in_value = parseInt(document.getElementById("card-rent-in").value);
    alquiler_out = document.getElementById("card-main-rent-out");
    select_canastas = document.getElementById("table-canastas__select").value;

    if (isNaN(alquiler_in_value)) {
        alquiler_in_value = 0;
        alquiler_out.textContent = "0";
    } else if (alquiler_in_value < 0) {
        alquiler_in_value = alquiler_in_value * -1;
    }

    if (select_canastas == "indigencia") {
        suma_con_alquiler = alquiler_in_value + cba_add_group;
    } else if (select_canastas == "pobreza") {
        suma_con_alquiler = alquiler_in_value + cbt_add_group;
    } else if (select_canastas == "clase_baja") {
        suma_con_alquiler = alquiler_in_value + clase_baja_add_group;
    } else if (select_canastas == "clase_media_fragil") {
        suma_con_alquiler = alquiler_in_value + clase_media_fragil_add_group;
    } else if (select_canastas == "clase_media") {
        suma_con_alquiler = alquiler_in_value + clase_media_add_group;
    } else if (select_canastas == "clase_media_alta") {
        suma_con_alquiler = alquiler_in_value + clase_media_alta_add_group;
    } else if (select_canastas == "clase_alta") {
        suma_con_alquiler = alquiler_in_value + clase_alta_add_group;
    }

    if (isNaN(suma_con_alquiler)) {
        suma_con_alquiler = alquiler_in_value;
    }

    document.getElementById("total-canasta").innerHTML =
        "$ " +
        suma_con_alquiler.toLocaleString("es-AR", {
            maximumFractionDigits: 0,
        });
}

function add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler) {
    alquiler_in_value = parseInt(document.getElementById("card-rent-in").value);
    //alquiler_out = document.getElementById("card-main-rent-out");
    if (isNaN(alquiler_in_value)) {
        alquiler_in_value = 0;
    } else if (alquiler_in_value < 0) {
        alquiler_in_value = alquiler_in_value * -1;
    }

    if (!cba_add_group || !cbt_add_group) {
        cba_add_group = 0;
        cbt_add_group = 0;
    }

    suma_CT_clase_baja = cbt_add_group * 1.2;

    suma_indigencia_alquilando = alquiler_in_value + Math.round(cba_add_group);

    suma_pobreza_alquilando = alquiler_in_value + Math.round(cbt_add_group);
    clase_baja_add_group_fragil_alquilando = alquiler_in_value + Math.round(cbt_add_group * 1.2);
    clase_baja_add_group_alquilando = alquiler_in_value + Math.round(cbt_add_group * 1.5);
    clase_media_fragil_add_group_alquilando = alquiler_in_value + Math.round(cbt_add_group * 2);
    clase_media_add_group_alquilando = alquiler_in_value + Math.round(cbt_add_group * 5);
    clase_media_alta_add_group_alquilando = alquiler_in_value + Math.round(cbt_add_group * 8);
    clase_alta_add_group_baja_alquilando = alquiler_in_value + Math.round(cbt_add_group * 12);

    document.querySelector(".table-classes-indigencia-min").textContent = 0;
    document.querySelector(".table-classes-indigencia-max").textContent = suma_indigencia_alquilando;

    document.querySelector(".table-classes-pobreza-min").textContent = suma_indigencia_alquilando;
    document.querySelector(".table-classes-pobreza-max").textContent = suma_pobreza_alquilando;

    document.querySelector(".table-classes-baja-min").textContent = suma_pobreza_alquilando;
    document.querySelector(".table-classes-baja-max").textContent = clase_baja_add_group_alquilando;

    document.querySelector(".table-classes-media-fragil-min").textContent = clase_baja_add_group_alquilando;
    document.querySelector(".table-classes-media-fragil-max").textContent = clase_media_fragil_add_group_alquilando;

    document.querySelector(".table-classes-media-min").textContent = clase_media_fragil_add_group_alquilando;
    document.querySelector(".table-classes-media-max").textContent = clase_media_add_group_alquilando;

    document.querySelector(".table-classes-media-alta-min").textContent = clase_media_add_group_alquilando;
    document.querySelector(".table-classes-media-alta-max").textContent = clase_media_alta_add_group_alquilando;

    document.querySelector(".table-classes-alta--min").textContent = clase_media_alta_add_group_alquilando;
    document.querySelector(".table-classes-alta-max").textContent = clase_alta_add_group_baja_alquilando;
    return suma_indigencia_alquilando;
}

// Agregar un evento al select para cambiar el estado del input
vivienda.addEventListener("input", function () {
    vivienda = document.getElementById("card__select-rent");
    alquiler_in = document.getElementById("card-rent-in");

    if (vivienda.value === "siAlquilo") {
        alquiler_in.value = "";
        alquiler_in.enabled = true; // Habilitar el input
        alquiler_in.removeAttribute("disabled"); // Deshabilitar el input
        alquiler_in.placeholder = "$ valor alquiler"; // Mostrar texto en el input
        document.querySelector(".table-canastas-rent").style.display = "table-row";
    } else if (vivienda.value === "noAlquilo") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = ""; // Limpiar el input
        alquiler_in.placeholder = "No alquilo"; // Mostrar texto en el input
        document.getElementById("card-main-rent-out").textContent = "No";
        document.querySelector(".table-canastas-rent").style.display = "none";
    } else if (vivienda.value === "AlquilerProm3amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm3amb}`;
        document.getElementById("card-main-rent-out").textContent = alquiler_in.value;
        document.querySelector(".table-canastas-rent").style.display = "table-row";
    } else if (vivienda.value === "AlquilerProm2amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm2amb}`;
        parseInt(alquiler_in.value);

        document.getElementById("card-main-rent-out").textContent = alquiler_in.value;
        document.querySelector(".table-canastas-rent").style.display = "table-row";
        alquiler_in_value = alquiler_in.value;
        suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler);
        add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler);
    } else if (vivienda.value === "AlquilerProm1amb") {
        alquiler_in.setAttribute("disabled", "true"); // Deshabilitar el input
        alquiler_in.value = `${indices_manuales.alquilerProm1amb}`;
        parseInt(alquiler_in.value);

        document.getElementById("card-main-rent-out").textContent = alquiler_in.value;
        document.querySelector(".table-canastas-rent").style.display = "table-row";
    }

    if (vivienda.value !== "siAlquilo" && vivienda.value !== "vivienda_slc" && vivienda.value !== "noAlquilo") {
        document.querySelector(".card__svg--reset").style.display = "flex";
        setTimeout(() => {
            document.querySelector(".card__svg--reset").style.transition = "transform 0.3s ease-in-out";
            document.querySelector(".card__svg--reset").style.transform = "translatex(0)";
            document.querySelector(".card__svg--reset").style.opacity = "1";
        }, 400);
    }

    suma_con_alquiler = 0;
    alquiler_in_value = 0;
    alquiler_in_value = alquiler_in.value;
    suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler);
    add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler);
});

/* Agregar PERSONAS a la tabla SUBMIT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
document.getElementById("form-submit").addEventListener("click", function (e) {
    e.preventDefault();
    age = document.getElementById("form__select-age").value;
    gender = document.getElementById("form__select-gender").value;
    alquiler_in = document.getElementById("card-rent-in");
    alquiler_in_value = alquiler_in.value;
    ingresos = document.getElementById("income__input").value;

    // Evitar que se agreguen personas sin género
    if (!gender) {
        age = "";
    }

    if (!age || !gender) {
        return;
    } else {
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

        // Actualizar la variable con los nuevos valores
        coef_age_gender = tabla_equivalentes[`${age}`][`${gender.toLowerCase()}`];
        coef_age_gender_array.push(coef_age_gender);
        coef_age_gender_add = coef_age_gender_array.reduce((acc, cur) => acc + cur, 0);

        if (coef_age_gender_add === 0) {
            coef_age_gender_array = [];
        }

        // Emitir un evento personalizado con el valor de ax
        const event = new CustomEvent("axUpdated", {
            detail: { coef_age_gender_add: coef_age_gender_add },
        });
        window.dispatchEvent(event); // Disparar el evento

        cba_individual_indigencia = coef_age_gender * cba_equivalente;
        array_cba_individual.push(cba_individual_indigencia);
        cba_add_group = 0;
        cba_add_group = parseFloat(cba_equivalente * coef_age_gender_add);

        cbt_individual_pobreza = coef_age_gender * cbt_equivalente;
        array_cbt_individual.push(cbt_individual_pobreza);
        cbt_add_group = 0;
        cbt_add_group = parseFloat(cbt_equivalente * coef_age_gender_add);

        cb_clase_baja_individual = cbt_individual_pobreza * 1.5;
        array_clase_baja.push(cb_clase_baja_individual);
        clase_baja_add_group = 0;
        clase_baja_add_group = parseFloat(cbt_add_group * 1.5);

        cb_clase_media_fragil_individual = cbt_individual_pobreza * 2;
        array_clase_media_fragil.push(cb_clase_media_fragil_individual);
        clase_media_fragil_add_group = 0;
        clase_media_fragil_add_group = parseFloat(cbt_add_group * 2);

        cb_clase_media_individual = cbt_individual_pobreza * 4.5;
        array_clase_media.push(cb_clase_media_individual);
        clase_media_add_group = 0;
        clase_media_add_group = parseFloat(cbt_add_group * 4.5);

        cb_clase_media_alta_individual = cbt_individual_pobreza * 6.5;
        array_clase_media_alta.push(cb_clase_media_alta_individual);
        clase_media_alta_add_group = 0;
        clase_media_alta_add_group = parseFloat(cbt_add_group * 6.5);

        cb_clase_alta_individual = cbt_individual_pobreza * 10;
        array_clase_alta.push(cb_clase_alta_individual);
        clase_alta_add_group = 0;
        clase_alta_add_group = parseFloat(cbt_add_group * 10);

        // activar boton reset
        document.querySelector(".card__svg--reset").style.display = "flex";

        setTimeout(() => {
            document.querySelector(".card__svg--reset").style.transform = "translatex(0)";
            document.querySelector(".card__svg--reset").style.transition = "transform .3s ease-in-out";
            document.querySelector(".card__svg--reset").style.opacity = "1";
        }, 300); // Esperar que la transición termine (0.5s)
    }

    // Agregar la persona a la tabla +++++++++++++++++++
    addPersonToTable(
        gender,
        age_mostrar_table,
        cba_individual_indigencia,
        cbt_individual_pobreza,
        array_count_person,
        count_person,
        suma_indigencia_alquilando
    );
    suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler);
    add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler);
    ingresos_input_in(ingresos);

    // LOCAL STORAGE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    local_persona = {
        age,
        age_mostrar_table,
        gender,
        add_partials,
        cba_add_group,
        cbt_add_group,
        alquiler_in_value,
        alquiler_out,
        suma_con_alquiler,
    };

    personas_local_storage.push(local_persona);
    localStorage.setItem("personas_local_storage", JSON.stringify(personas_local_storage));
    return { cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler };
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

// event INPUT rent-input ++++++++++++++++++++++++++++++++++++++++++++++++++++
function input_alquiler_in() {
    document.getElementById("card-rent-in").addEventListener("input", () => {
        age = document.getElementById("form__select-age").value;
        gender = document.getElementById("form__select-gender").value;
        alquiler_in_value = parseInt(document.getElementById("card-rent-in").value);
        alquiler_out = document.getElementById("card-main-rent-out").value;

        if (isNaN(alquiler_in_value)) {
            alquiler_in_value = 0;
        } else if (alquiler_in_value < 0) {
            alquiler_in_value = alquiler_in_value * -1;
        }

        if (isNaN(parseInt(document.getElementById("card-main-rent-out").value))) {
            document.getElementById("card-main-rent-out").textContent = alquiler_in_value;
        } else {
            document.getElementById("card-main-rent-out").textContent = alquiler_in_value;
        }

        suma_con_alquiler = 0;
        alquiler_in_value = 0;
        suma_Total(cbt_add_group, alquiler_in_value, suma_con_alquiler);
        add_total_table(cba_add_group, cbt_add_group, alquiler_in_value, suma_con_alquiler);

        cbt_add_group = cbt_add_group + alquiler_in_value;
        suma_con_alquiler = cbt_add_group;
        ingresos_input_in(ingresos);

        if (!alquiler_in_value || alquiler_in_value !== 0) {
            document.querySelector(".card__svg--reset").style.display = "flex";
            setTimeout(() => {
                document.querySelector(".card__svg--reset").style.transition = "transform 0.3s ease-in-out";
                document.querySelector(".card__svg--reset").style.transform = "translatex(0)";
                document.querySelector(".card__svg--reset").style.opacity = "1";
                rent_in_show.style.display = "table-row";
            }, 400);
        }
    });
}
input_alquiler_in();

document.getElementById("card__btn--reset").addEventListener("click", () => {
    //localStorage.removeItem('personas_local_storage');
    personas_local_storage = [];
    localStorage.setItem("personas_local_storage", JSON.stringify(personas_local_storage));
    document.querySelector(".card__svg--reset").style.transition = "transform 0.3s ease-in-out";
    document.querySelector(".card__svg--reset").style.transform = "translatex(100%)";
    setTimeout(() => {
        document.querySelector(".card__svg--reset").style.opacity = "0";
        document.querySelector(".card__svg--reset").style.display = "none";
        document.getElementById("form").reset();
    }, 400);
    setTimeout(() => {
        document.getElementById("table-canastas__list").innerHTML = "";
        location.reload();
    }, 400);
});

function ingresos_input_in(ingresos) {
    // Verificar si los límites están definidos
    ingresos = parseInt(document.getElementById("income__input").value);

    if (
        suma_indigencia_alquilando === undefined &&
        suma_pobreza_alquilando === undefined &&
        clase_baja_add_group_alquilando === undefined &&
        clase_media_fragil_add_group_alquilando === undefined &&
        clase_media_add_group_alquilando === undefined &&
        clase_media_alta_add_group_alquilando === undefined
    ) {
        document.querySelector(".class-indigencia-row").style.removeProperty("background-color");

        document.querySelector(".class-pobreza-row").style.removeProperty("background-color");
        document.querySelector(".class-baja-row").style.removeProperty("background-color");
        document.querySelector(".class-media-fragil-row").style.removeProperty("background-color");
        document.querySelector(".class-media-row").style.removeProperty("background-color");
        document.querySelector(".class-media-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-acomodada-row").style.removeProperty("background-color");
    }
    if (
        suma_indigencia_alquilando === null &&
        suma_pobreza_alquilando === null &&
        clase_baja_add_group_alquilando === null &&
        clase_media_fragil_add_group_alquilando === null &&
        clase_media_add_group_alquilando === null &&
        clase_media_alta_add_group_alquilando === null
    ) {
        document.querySelector(".class-indigencia-row").style.removeProperty("background-color");

        document.querySelector(".class-pobreza-row").style.removeProperty("background-color");
        document.querySelector(".class-baja-row").style.removeProperty("background-color");
        document.querySelector(".class-media-fragil-row").style.removeProperty("background-color");
        document.querySelector(".class-media-row").style.removeProperty("background-color");
        document.querySelector(".class-media-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-acomodada-row").style.removeProperty("background-color");
    }

    if (
        suma_indigencia_alquilando === 0 &&
        suma_pobreza_alquilando === 0 &&
        clase_baja_add_group_alquilando === 0 &&
        clase_media_fragil_add_group_alquilando === 0 &&
        clase_media_add_group_alquilando === 0 &&
        clase_media_alta_add_group_alquilando === 0
    ) {
        document.querySelector(".class-indigencia-row").style.removeProperty("background-color");
        document.querySelector(".class-pobreza-row").style.removeProperty("background-color");
        document.querySelector(".class-baja-row").style.removeProperty("background-color");
        document.querySelector(".class-media-fragil-row").style.removeProperty("background-color");
        document.querySelector(".class-media-row").style.removeProperty("background-color");
        document.querySelector(".class-media-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-acomodada-row").style.removeProperty("background-color");
    }

    if (ingresos > 0 && ingresos < suma_indigencia_alquilando) {
        document
            .querySelector(".table-classes-indigencia")
            .style.setProperty("background-color", "#FF1100", "important");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= suma_indigencia_alquilando && ingresos < suma_pobreza_alquilando) {
        document.querySelector(".table-classes-pobreza").style.setProperty("background-color", "#FF1100", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= suma_pobreza_alquilando && ingresos < clase_baja_add_group_alquilando) {
        document.querySelector(".table-classes-baja").style.setProperty("background-color", "#FF5500 ", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= clase_baja_add_group_alquilando && ingresos < clase_media_fragil_add_group_alquilando) {
        document
            .querySelector(".table-classes-media-fragil")
            .style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= clase_media_fragil_add_group_alquilando && ingresos < clase_media_add_group_alquilando) {
        document.querySelector(".table-classes-media").style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= clase_media_add_group_alquilando && ingresos < clase_media_alta_add_group_alquilando) {
        document
            .querySelector(".table-classes-media-alta")
            .style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= clase_media_alta_add_group_alquilando && ingresos < clase_alta_add_group_baja_alquilando) {
        document.querySelector(".table-classes-alta").style.setProperty("background-color", "#4CAF50", "important");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    } else if (ingresos >= clase_alta_add_group_baja_alquilando < Infinity) {
        document
            .querySelector(".table-classes-acomodada")
            .style.setProperty("background-color", "#4CbF50", "important");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");
        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
    }

    //console.log("clase_alta_add_group_baja_alquilando", clase_media_alta_add_group_alquilando);
    //console.log("ingresos", ingresos);

    if (clase_media_alta_add_group_alquilando === 0) {
        document.querySelector(".class-indigencia-row").style.removeProperty("background-color");
        document.querySelector(".class-pobreza-row").style.removeProperty("background-color");
        document.querySelector(".class-baja-row").style.removeProperty("background-color");
        document.querySelector(".class-media-fragil-row").style.removeProperty("background-color");
        document.querySelector(".class-media-row").style.removeProperty("background-color");
        document.querySelector(".class-media-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-alta-row").style.removeProperty("background-color");
        document.querySelector(".class-acomodada-row").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    }

    if (ingresos === "" || !ingresos) {
        document.querySelector(".table-classes-indigencia").style.removeProperty("background-color");
        document.querySelector(".table-classes-pobreza").style.removeProperty("background-color");

        document.querySelector(".table-classes-baja").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-fragil").style.removeProperty("background-color");
        document.querySelector(".table-classes-media").style.removeProperty("background-color");
        document.querySelector(".table-classes-media-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-alta").style.removeProperty("background-color");
        document.querySelector(".table-classes-acomodada").style.removeProperty("background-color");
    }
}

ingresos_input_in(ingresos);

document.getElementById("income__input").addEventListener("input", (e) => {
    const ingresosEvent = parseInt(e.target.value);
    ingresos_input_in(ingresosEvent);
});

// Cerrar el offcanvas al hacer clic en cualquier enlace dentro de él
document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.closest(".offcanvas")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const offcanvas = e.target.closest(".offcanvas");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        offcanvasInstance.hide();

        setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }, 200);
    }
});

document.getElementById("nav-link-cbt").addEventListener("click", () => {
    document.querySelector(".card-canastas-3").style.boxShadow = "0px 0px 6px 4px #ff3366";
});
