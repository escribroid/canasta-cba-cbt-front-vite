/* let alquiler_past;
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

function get_tabla_compare(suma_CBA_Personas, suma_CBT_Personas, alquiler_past_value, suma_con_alquiler) {
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
    document.querySelector(".show_indigencia_max_past").textContent = suma_indigencia_alquilando;

    document.querySelector(".show_pobreza_min_past").textContent = suma_indigencia_alquilando;
    document.querySelector(".show_pobreza_max_past").textContent = suma_pobreza_alquilando;

    document.querySelector(".show_clase_baja_min_past").textContent = suma_pobreza_alquilando;
    document.querySelector(".show_clase_baja_max_past").textContent = suma_clase_baja_alquilando;

    document.querySelector(".suma_clase_media_fragil_min_past").textContent = suma_clase_baja_alquilando;
    document.querySelector(".suma_clase_media_fragil_max_past").textContent = suma_clase_media_fragil_alquilando;

    document.querySelector(".suma_clase_media_min_past").textContent = suma_clase_media_fragil_alquilando;
    document.querySelector(".suma_clase_media_max_past").textContent = suma_clase_media_alquilando;

    document.querySelector(".suma_clase_media_alta_min_past").textContent = suma_clase_media_alquilando;
    document.querySelector(".suma_clase_media_alta_max_past").textContent = suma_clase_media_alta_alquilando;

    document.querySelector(".suma_clase_alta_min_past").textContent = suma_clase_media_alta_alquilando;
    document.querySelector(".suma_clase_alta_max_past").textContent = suma_clase_alta_baja_alquilando;
}
 */