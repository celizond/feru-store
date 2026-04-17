import "./PageButton.css";

const PageButton = ({ text, onPageChange, disabled }) => {
    return (
        <button
            className="page-btn"
            onClick={onPageChange}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default PageButton;