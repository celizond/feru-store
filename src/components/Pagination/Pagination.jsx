import Button from "../Button/Button";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onClick }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Paginación">
            <Button 
                text="← Anterior"
                onClick={() => onClick(currentPage - 1)}
                disabled={currentPage === 1}
            />
            <span className="page-info">
                Página {currentPage} de {totalPages}
            </span>
            <Button
                text="Siguiente →"
                onClick={() => onClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </nav>
    );
};

export default Pagination;