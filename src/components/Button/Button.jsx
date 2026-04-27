import "./Button.css";

const Button = ({ text, children, type="button", styleVariant="default-btn", onClick, disabled = false }) => {
    return (
        <button
            className={`custom-btn ${styleVariant}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children || text}
        </button>
    )
}

export default Button;