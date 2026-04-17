export const getFeaturedProducts = (products, limit = 8) => {
    return [...products]
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, limit);
};

export const getRelatedWishlistProducts = (products, wishlist, limit = 8) => {
    if (!wishlist.length) {
        return [];
    }

    const wishlistCategories = [...new Set(wishlist.map((product) => product.category))];
    const wishlistIds = new Set(wishlist.map((product) => product.id));

    return products
        .filter(
            (product) =>
                wishlistCategories.includes(product.category) &&
                !wishlistIds.has(product.id)
        )
        .slice(0, limit);
};

export const getRecentHistoryProducts = (history, limit = 8) => {
    return history.slice(0, limit);
};