import PageButton from "../Button/PageButton";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Paginación">
            <PageButton 
                text="← Anterior"
                onPageChange={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            <span className="page-info">
                Página {currentPage} de {totalPages}
            </span>
            <PageButton
                text="Siguiente →"
                onPageChange={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </nav>
    );
};

export default Pagination;