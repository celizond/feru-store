// src/services/product.service.js
const BASE_URL = "https://dummyjson.com";

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
};

export const getProducts = async ({ query = "", limit = 10, skip = 0 } = {}) => {
    try {
        // limit=0 significa "traer todos" (DummyJSON lo soporta)
        const limitParam = limit === 0 ? 0 : limit;
        let url;

        if (query) {
            url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limitParam}&skip=${skip}`;
        } else {
            url = `${BASE_URL}/products?limit=${limitParam}&skip=${skip}`;
        }

        const response = await fetch(url);
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Error al obtener el producto: ${error.message}`);
    }
};

export const getCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Error al obtener categorías: ${error.message}`);
    }
};