import "./FilterChip.css";

function FilterChip({ label, onRemove }) {
  return (
    <div className="filter-chip">
      <button
        type="button"
        className="filter-chip-remove"
        onClick={onRemove}
        aria-label={`Quitar filtro ${label}`}
      >
        x
      </button>
      <span className="filter-chip-label">{label}</span>
    </div>
  );
}

export default FilterChip;