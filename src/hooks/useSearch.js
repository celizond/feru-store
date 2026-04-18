import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../services/product.service";
import {
    buildSearchResultCount,
    filterProductsByCriteria,
    getVisibleSearchResults,
    hasActiveClientFilters,
} from "../utils/productSearch";
import { useAsync } from "./useAsync";
import { SEARCH_RESULTS_LIMIT } from "../constants/search.constants";

export const useSearch = () => {
    const [searchParams] = useSearchParams();

    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [results, setResults] = useState([]);
    const [allResults, setAllResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientPage, setClientPage] = useState(1);
    const [searched, setSearched] = useState(false);

    const currentQuery = searchParams.get("q") || "";

    const fetchCategories = useCallback(() => getCategories(), []);
    const { data: categoriesData } = useAsync(fetchCategories, {
        initialData: [],
    });

    const searchProducts = useCallback((page = 1, overrideQuery) => {
        const skip = (page - 1) * SEARCH_RESULTS_LIMIT;
        const activeQuery = overrideQuery !== undefined ? overrideQuery : currentQuery;

        return getProducts({ query: activeQuery, limit: SEARCH_RESULTS_LIMIT, skip });
    }, [currentQuery]);

    const fetchAllProducts = useCallback(() => {
        return getProducts({ query: currentQuery, limit: 0, skip: 0 });
    }, [currentQuery]);

    const {
        loading: searchLoading,
        error: searchError,
        execute: executeSearch,
    } = useAsync(searchProducts, {
        immediate: false,
        initialData: { products: [], total: 0 },
    });

    const {
        loading: allResultsLoading,
        error: allResultsError,
        execute: executeAllResults,
    } = useAsync(fetchAllProducts, {
        immediate: false,
        initialData: { products: [] },
    });

    const fetchResults = useCallback(async (page = 1, overrideQuery) => {
        const data = await executeSearch(page, overrideQuery);

        if (data) {
            setResults(data.products);
            setAllResults(data.products);
            setTotal(data.total);
            setCurrentPage(page);
            setSearched(true);
        }
    }, [executeSearch]);

    const fetchAllResults = useCallback(async () => {
        const data = await executeAllResults();

        if (data) {
            setAllResults(data.products);
        }
    }, [executeAllResults]);

    useEffect(() => {
        fetchResults(1, currentQuery);
    }, [currentQuery, fetchResults]);

    useEffect(() => {
        const hasClientFilters = hasActiveClientFilters(category, priceRange);

        if (hasClientFilters && total > SEARCH_RESULTS_LIMIT) {
            fetchAllResults();
        } else {
            setAllResults(results);
        }
    }, [category, priceRange, total, results, fetchAllResults]);

    useEffect(() => {
        const filtered = filterProductsByCriteria(allResults, category, priceRange);

        setFilteredResults(filtered);
        setClientPage(1);
    }, [allResults, category, priceRange]);

    const hasClientFilters = hasActiveClientFilters(category, priceRange);

    const totalPages = useMemo(() => {
        return hasClientFilters
            ? Math.ceil(filteredResults.length / SEARCH_RESULTS_LIMIT)
            : Math.ceil(total / SEARCH_RESULTS_LIMIT);
    }, [filteredResults.length, hasClientFilters, total]);

    const activePage = hasClientFilters ? clientPage : currentPage;

    const visibleResults = useMemo(() => {
        return getVisibleSearchResults({
            hasClientFilters,
            filteredResults,
            clientPage,
            results,
            limit: SEARCH_RESULTS_LIMIT,
        });
    }, [clientPage, filteredResults, hasClientFilters, results]);

    const handlePageChange = useCallback((page) => {
        if (hasClientFilters) {
            setClientPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        fetchResults(page);
    }, [fetchResults, hasClientFilters]);

    const handleFilterSubmit = useCallback((event) => {
        event.preventDefault();

        if (results.length === 0) {
            fetchResults(1);
        }
    }, [fetchResults, results.length]);

    const resultCount = useMemo(() => {
        return buildSearchResultCount({
            hasClientFilters,
            filteredLength: filteredResults.length,
            total,
        });
    }, [filteredResults.length, hasClientFilters, total]);

    const categories = categoriesData || [];
    const loading = searchLoading || allResultsLoading;
    const error = searchError || allResultsError;

    return {
        category,
        setCategory,
        priceRange,
        setPriceRange,
        categories,
        loading,
        error,
        searched,
        currentQuery,
        filteredResults,
        visibleResults,
        totalPages,
        activePage,
        handlePageChange,
        handleFilterSubmit,
        resultCount,
    };
};
