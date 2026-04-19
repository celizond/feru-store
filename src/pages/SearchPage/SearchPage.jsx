import { useSearch } from "../../hooks/useSearch";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchFilters from "../../components/Search/SearchFilters";
import SearchResults from "../../components/Search/SearchResults";
import "./SearchPage.css";

const SearchPage = () => {
    const {
        category,
        priceRange,
        categories,
        loading,
        error,
        searched,
        currentQuery,
        filteredResults,
        visibleResults,
        totalPages,
        activePage,
        resultCount,
        setCategory,
        setPriceRange,
        handlePageChange,
        handleFilterSubmit,
        handleClearFilters,
    } = useSearch();

    return (
        <div className="search-page">

            <SearchHeader currentQuery={currentQuery} />

            <section className={"content-margin"}>
                <SearchFilters
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    currentQuery={currentQuery}
                    onSubmit={handleFilterSubmit}
                    onClear={handleClearFilters}
                />

                <SearchResults
                    loading={loading}
                    error={error}
                    searched={searched}
                    filteredResults={filteredResults}
                    visibleResults={visibleResults}
                    resultCount={resultCount}
                    activePage={activePage}
                    totalPages={totalPages}
                    onClick={handlePageChange}
                />
            </section>
        </div>
    );
};

export default SearchPage;