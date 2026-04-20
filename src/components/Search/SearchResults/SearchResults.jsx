import Pagination from "../../Pagination/Pagination";
import ProductCard from "../../ProductCard/ProductCard";

const SearchResults = ({
    loading,
    error,
    searched,
    filteredResults,
    visibleResults,
    resultCount,
    activePage,
    totalPages,
    onClick,
}) => {
    return (
        <>
            {loading && <p className="search-status">Buscando...</p>}
            {error && <p className="search-status">Ha ocurrido un error, vuelva más tarde</p>}
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
                        onClick={onClick}
                    />
                </>
            )}
        </>
    );
};

export default SearchResults;
