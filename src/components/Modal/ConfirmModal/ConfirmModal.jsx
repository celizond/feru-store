import Button from "../../Button/Button";
import "../Modal.css";

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = "Sí, borrar" }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div
                className="modal-content confirm-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onCancel}>✕</button>
                <h2 className="confirm-title">{title}</h2>
                <p className="confirm-message">{message}</p>
                <div className="confirm-actions">
                    <Button
                        text="Cancelar"
                        onClick={onCancel}
                    />
                    <Button
                        text={confirmText}
                        styleVariant="danger-btn"
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
