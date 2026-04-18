export const FormSelect = ({ id, label, value, onChange, error, showError, list, title }) => {
    return (
        <div className="wf-group">
            <label htmlFor={id}>{label}</label>
            <select id={id} name={id} value={value} onChange={onChange}>
                <option value="">{title}</option>
                {list.map((l) => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>
            {showError && <span className="wf-error">{error}</span>}
        </div>
    );
};
