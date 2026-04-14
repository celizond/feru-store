// src/pages/Search/Search.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../../services/product.service";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import "./Search.css";

const LIMIT = 10;

const Search = () => {
    const [searchParams] = useSearchParams();

    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [categories, setCategories] = useState([]);
    const [results, setResults] = useState([]);         // página actual (servidor)
    const [allResults, setAllResults] = useState([]);   // todos los resultados (para filtros)
    const [filteredResults, setFilteredResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientPage, setClientPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch { }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const qFromUrl = searchParams.get("q") || "";
        fetchResults(1, qFromUrl);
    }, [searchParams]);

    // Cuando se activan filtros de cliente, traer todos los productos
    useEffect(() => {
        const hasClientFilters = category !== "" || priceRange.min !== "" || priceRange.max !== "";
        if (hasClientFilters && total > LIMIT) {
            fetchAllResults();
        } else {
            setAllResults(results);
        }
    }, [category, priceRange]);

    // Aplicar filtros sobre allResults
    useEffect(() => {
        let filtered = [...allResults];

        if (category) {
            filtered = filtered.filter((p) => p.category === category);
        }

        const min = parseFloat(priceRange.min);
        const max = parseFloat(priceRange.max);
        if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
        if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);

        setFilteredResults(filtered);
        setClientPage(1);
    }, [allResults, priceRange, category]);

    const fetchResults = async (page = 1, overrideQuery) => {
        setLoading(true);
        setError(null);
        try {
            const skip = (page - 1) * LIMIT;
            const activeQuery = overrideQuery !== undefined ? overrideQuery : searchParams.get("q") || "";
            const data = await getProducts({ query: activeQuery, limit: LIMIT, skip });
            setResults(data.products);
            setAllResults(data.products);
            setTotal(data.total);
            setCurrentPage(page);
            setSearched(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllResults = async () => {
        setLoading(true);
        try {
            const activeQuery = searchParams.get("q") || "";
            const data = await getProducts({ query: activeQuery, limit: 0, skip: 0 });
            setAllResults(data.products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        if (results.length === 0) {
            fetchResults(1);
        }
    };

    const hasClientFilters = category !== "" || priceRange.min !== "" || priceRange.max !== "";

    const totalPages = hasClientFilters
        ? Math.ceil(filteredResults.length / LIMIT)
        : Math.ceil(total / LIMIT);

    const activePage = hasClientFilters ? clientPage : currentPage;

    const visibleResults = hasClientFilters
        ? filteredResults.slice((clientPage - 1) * LIMIT, clientPage * LIMIT)
        : results;

    const handlePageChange = (page) => {
        if (hasClientFilters) {
            setClientPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            fetchResults(page);
        }
    };

    const resultCount = hasClientFilters
        ? `${filteredResults.length} resultado${filteredResults.length !== 1 ? "s" : ""} (filtrado${filteredResults.length !== 1 ? "s" : ""} de ${total})`
        : `${total} resultado${total !== 1 ? "s" : ""} encontrado${total !== 1 ? "s" : ""}`;

    const currentQuery = searchParams.get("q");

    return (
        <section className="search-page">

            {currentQuery ? (
                <h1 className="search-title">Resultados para: <span>"{currentQuery}"</span></h1>
            ) : (
                <h1 className="search-title">Explorar productos</h1>
            )}

            <form className="filters-form" onSubmit={handleFilterSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat) => (
                            <option key={cat.slug} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group price-range">
                    <label>Rango de precio</label>
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Mínimo"
                            min="0"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                        />
                        <span>—</span>
                        <input
                            type="number"
                            placeholder="Máximo"
                            min="0"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                        />
                    </div>
                </div>

                <button type="submit" className="filter-btn">Aplicar filtros</button>
            </form>

            {loading && <p className="search-status">Buscando...</p>}
            {error && <p className="search-status error">Error: {error}</p>}
            {searched && !loading && filteredResults.length === 0 && (
                <p className="search-status">No se encontraron resultados.</p>
            )}

            {searched && !loading && filteredResults.length > 0 && (
                <>
                    <p className="search-count">{resultCount}</p>
                    <div className="products-grid">
                        {visibleResults.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={activePage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

        </section>
    );
};

export default Search;