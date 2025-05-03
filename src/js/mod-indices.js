// CONSTANTES DE INDICES MANUALES
const mesAlquilerManual = 8;
const alquilerProm2amb = 538324;
const ipc_manual = 2.4;

// Alquiler medio: 1amb 40m2, 2amb 50m2, 3amb 70m2
const alquilerProm3amb = Math.round(alquilerProm2amb * (7 / 5) * 0.965);
const alquilerProm1amb = Math.round((alquilerProm2amb * (4 / 5)) / 0.955);

const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
];

const indices_manuales = {
    alquilerProm1amb,
    alquilerProm2amb,
    alquilerProm3amb,
    mesAlquilerManual,
    ipc_manual,
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
