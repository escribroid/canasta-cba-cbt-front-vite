// CONSTANTES DE INDICES MANUALES
const mes_cba_cbt_manual = 11;
const cba_manual = 142148.73;
const cbt_manual = 324099.1;
const mesAlquilerManual = 8;
const alquilerProm2amb = 538324;
const ipc_manual = 2.4;

const linea_indigencia = Math.round(cba_manual);
const linea_pobreza = Math.round(cbt_manual);
const linea_clase_baja_fragil = Math.round(cbt_manual * 1.2);
const linea_clase_baja = Math.round(cbt_manual * 1.5);
const linea_clase_media_fragil = Math.round(cbt_manual * 2);
const linea_clase_media_media = Math.round(cbt_manual * 4.5);
const linea_clase_media_alta = Math.round(cbt_manual * 6.5);
const linea_clase_alta_baja = Math.round(cbt_manual * 10);

// Alquiler medio: 1amb 40m2, 2amb 50m2, 3amb 70m2
const alquilerProm3amb = Math.round(alquilerProm2amb * (7 / 5) * 0.965);
const alquilerProm1amb = Math.round((alquilerProm2amb * (4 / 5)) / 0.955);

const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
];

const indices_manuales = {
    cba_manual,
    cbt_manual,
    mes_cba_cbt_manual,
    alquilerProm1amb,
    alquilerProm2amb,
    alquilerProm3amb,
    mesAlquilerManual,
    ipc_manual,
    linea_indigencia,
    linea_pobreza,
    linea_clase_baja_fragil,
    linea_clase_baja,
    linea_clase_media_fragil,
    linea_clase_media_media,
    linea_clase_media_alta,
    linea_clase_alta_baja,
    days,
};

export default indices_manuales;

/* CT(clase baja) = CBT*1.2
# Indigencia: En situación de indigencia: Menor a la Canasta Básica Alimentaria (CBA - Línea de indigencia).
# Pobreza: entre CBA y  la Canasta Básica Total (CBT – Línea de pobreza).
# Baja(CT): No pobres vulnerables: hogares cuyo ingreso total mensual es de al menos la CBT y no alcanza la Canasta Total (CT) del Sistema de Canastas de Consumo.
# Medio frágil: hogares cuyo ingreso total mensual es de al menos la CT y no alcanza 1,25 veces la CT del Sistema de Canastas de Consumo. (1.2*1.25 = 1.5) 
# Medio "clase media": hogares cuyo ingreso total mensual es de al menos 1,25 veces la CT y no alcanza 4 veces la CT del Sistema de Canastas de Consumo. (1.2*4.5 = 5.4)
# Media Alta, Sector acomodado: hogares cuyo ingreso mensual es de 4 veces o más la CT del Sistema de Canastas de Consumo. 

*/
