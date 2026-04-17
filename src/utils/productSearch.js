export const hasActiveClientFilters = (category, priceRange) => {
    return category !== "" || priceRange.min !== "" || priceRange.max !== "";
};

export const filterProductsByCriteria = (products, category, priceRange) => {
    let filtered = [...products];

    if (category) {
        filtered = filtered.filter((product) => product.category === category);
    }

    const min = parseFloat(priceRange.min);
    const max = parseFloat(priceRange.max);

    if (!Number.isNaN(min)) {
        filtered = filtered.filter((product) => product.price >= min);
    }

    if (!Number.isNaN(max)) {
        filtered = filtered.filter((product) => product.price <= max);
    }

    return filtered;
};

export const getVisibleSearchResults = ({
    hasClientFilters,
    filteredResults,
    clientPage,
    results,
    limit,
}) => {
    if (!hasClientFilters) {
        return results;
    }

    return filteredResults.slice((clientPage - 1) * limit, clientPage * limit);
};

export const buildSearchResultCount = ({
    hasClientFilters,
    filteredLength,
    total,
}) => {
    if (hasClientFilters) {
        return `${filteredLength} resultado${filteredLength !== 1 ? "s" : ""} (filtrado${filteredLength !== 1 ? "s" : ""} de ${total})`;
    }

    return `${total} resultado${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`;
};