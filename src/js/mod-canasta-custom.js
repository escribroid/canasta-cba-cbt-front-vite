//import indices_manuales from "./mod-indices.js";

// tabla equivalencias personas
const tabla_equivalentes = {
    0: { femenino: 0.35, masculino: 0.35, embarazada: 0.35, lactante: 0.35 },
    1: { femenino: 0.37, masculino: 0.37, embarazada: 0.37, lactante: 0.37 },
    2: { femenino: 0.46, masculino: 0.46, embarazada: 0.46, lactante: 0.46 },
    3: { femenino: 0.51, masculino: 0.51, embarazada: 0.51, lactante: 0.51 },
    4: { femenino: 0.55, masculino: 0.55, embarazada: 0.55, lactante: 0.55 },
    5: { femenino: 0.6, masculino: 0.6, embarazada: 0.6, lactante: 0.6 },
    6: { femenino: 0.64, masculino: 0.64, embarazada: 0.64, lactante: 0.64 },
    7: { femenino: 0.66, masculino: 0.66, embarazada: 0.66, lactante: 0.66 },
    8: { femenino: 0.68, masculino: 0.68, embarazada: 0.68, lactante: 0.68 },
    9: { femenino: 0.69, masculino: 0.69, embarazada: 0.69, lactante: 0.69 },

    10: { femenino: 0.7, masculino: 0.79, embarazada: 0.784, lactante: 0.854 },
    11: { femenino: 0.72, masculino: 0.82, embarazada: 0.8064, lactante: 0.8784 },
    12: { femenino: 0.74, masculino: 0.85, embarazada: 0.8288, lactante: 0.9028 },
    13: { femenino: 0.76, masculino: 0.9, embarazada: 0.8512, lactante: 0.9272 },
    14: { femenino: 0.76, masculino: 0.96, embarazada: 0.8512, lactante: 0.9272 },
    15: { femenino: 0.77, masculino: 1.0, embarazada: 0.8624, lactante: 0.9394 },
    16: { femenino: 0.77, masculino: 1.03, embarazada: 0.8624, lactante: 0.9394 },
    17: { femenino: 0.77, masculino: 1.04, embarazada: 0.8624, lactante: 0.9394 },

    18: { femenino: 0.76, masculino: 1.02, embarazada: 0.8512, lactante: 0.9272 },
    29: { femenino: 0.76, masculino: 1.02, embarazada: 0.8512, lactante: 0.9272 },

    30: { femenino: 0.77, masculino: 1.0, embarazada: 0.8624, lactante: 0.9394 },
    45: { femenino: 0.77, masculino: 1.0, embarazada: 0.8624, lactante: 0.9394 },

    46: { femenino: 0.76, masculino: 1.0, embarazada: 0.8512, lactante: 0.9272 },
    60: { femenino: 0.76, masculino: 1.0, embarazada: 0.8512, lactante: 0.9272 },

    61: { femenino: 0.67, masculino: 0.83, embarazada: 0.7504, lactante: 0.8174 },
    75: { femenino: 0.67, masculino: 0.83, embarazada: 0.7504, lactante: 0.8174 },

    76: { femenino: 0.63, masculino: 0.74, embarazada: 0.63, lactante: 0.63 },
    99: { femenino: 0.63, masculino: 0.74, embarazada: 0.63, lactante: 0.63 },
};

export default tabla_equivalentes;

// Embarazo +12%
// Lactancia +22%
