import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Paginación">
            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ← Anterior
            </button>

            <span className="page-info">
                Página {currentPage} de {totalPages}
            </span>

            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Siguiente →
            </button>
        </nav>
    );
};

export default Pagination;
