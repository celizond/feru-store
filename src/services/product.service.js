const BASE_URL = "https://dummyjson.com/";

export const getProducts = async (params = "") => {
  try {
    const res = await fetch(`${BASE_URL}/products?limit=194`);
    if (!res.ok) throw new Error("Error en la API");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};