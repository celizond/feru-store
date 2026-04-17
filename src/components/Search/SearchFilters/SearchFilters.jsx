const SearchFilters = ({
    category,
    setCategory,
    categories,
    priceRange,
    setPriceRange,
    onSubmit,
}) => {
    return (
        <form className="filters-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((categoryOption) => (
                        <option key={categoryOption.slug} value={categoryOption.slug}>
                            {categoryOption.name}
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
                        onChange={(event) => setPriceRange((prev) => ({ ...prev, min: event.target.value }))}
                    />
                    <span>—</span>
                    <input
                        type="number"
                        placeholder="Máximo"
                        min="0"
                        value={priceRange.max}
                        onChange={(event) => setPriceRange((prev) => ({ ...prev, max: event.target.value }))}
                    />
                </div>
            </div>

            <button type="submit" className="filter-btn">Aplicar filtros</button>
        </form>
    );
};

export default SearchFilters;
