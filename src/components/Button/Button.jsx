import "./Button.css";

const Button = ({ text, type="button", styleVariant="default-btn", onClick, disabled = false }) => {
    return (
        <button
            className={`custom-btn ${styleVariant}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button;