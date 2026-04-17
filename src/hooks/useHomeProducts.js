import { useCallback, useMemo } from "react";
import { getProducts } from "../services/product.service";
import {
    getFeaturedProducts,
    getRecentHistoryProducts,
    getRelatedWishlistProducts,
} from "../utils/homeProducts";
import { useAsync } from "./useAsync";

export const useHomeProducts = (wishlist, history) => {
    const fetchHomeProducts = useCallback(() => getProducts({ limit: 0 }), []);
    const {
        data,
        loading,
        error,
    } = useAsync(fetchHomeProducts, {
        initialData: { products: [] },
    });

    const products = data?.products || [];

    const featured = useMemo(() => {
        return getFeaturedProducts(products, 8);
    }, [products]);

    const relatedToWishlist = useMemo(() => {
        return getRelatedWishlistProducts(products, wishlist, 8);
    }, [products, wishlist]);

    const recentHistory = useMemo(() => getRecentHistoryProducts(history, 8), [history]);

    return {
        featured,
        relatedToWishlist,
        recentHistory,
        loading,
        error,
    };
};