import { useProductSearch } from "../../hooks/useProductSearch";
import SearchHeader from "../../components/Search/SearchHeader/SearchHeader";
import SearchFilters from "../../components/Search/SearchFilters/SearchFilters";
import SearchResults from "../../components/Search/SearchResults/SearchResults";
import "./SearchPage.css";

const SearchPage = () => {
    const {
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
    } = useProductSearch();

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
                    onSubmit={handleFilterSubmit}
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
                    onPageChange={handlePageChange}
                />
            </section>
        </div>
    );
};

export default SearchPage;