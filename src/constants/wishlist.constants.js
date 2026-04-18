export const NOTA_MAX_CHARS = 150;

export const LISTAS = ["Para mí", "Cumpleaños", "Navidad", "Regalos", "Otro"];

export const isPositiveInteger = (value) => /^\d+$/.test(value) && Number(value) > 0;
