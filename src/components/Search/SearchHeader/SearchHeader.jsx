import PageTitle from "../../Text/PageTitle/PageTitle";


const SearchHeader = ({ currentQuery }) => {
    return currentQuery ? (
        <section aria-labelledby="search-title-results">
            <PageTitle
                id="search-title-results"
                title={
                    <>
                        Resultados para: <span>"{currentQuery}"</span>
                    </>
                }
            />
        </section>
    ) : (
        <section aria-labelledby="search-title-explore">
            <PageTitle
                id="search-title-explore"
                title="Explorar productos"
            />
        </section>
    );
};

export default SearchHeader;
