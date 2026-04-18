export const FormField = ({
    id,
    label,
    value,
    onChange,
    onFocus,
    error,
    showError,
    placeholder,
    inputMode = "text",
}) => {
    return (
        <div className="wf-group">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={id}
                type="text"
                inputMode={inputMode}
                autoComplete="off"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
            />
            {showError && <span className="wf-error">{error}</span>}
        </div>
    );
};
