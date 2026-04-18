export const FormTextarea = ({
    id,
    label,
    value,
    onChange,
    error,
    showError,
    placeholder,
    maxChars
}) => {
    return (
        <div className="wf-group">
            <label htmlFor={id}>
                {label}
                <span className="wf-char-count">
                    {value.length}/{maxChars}
                </span>
            </label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={3}
            />
            {showError && <span className="wf-error">{error}</span>}
        </div>
    );
};
