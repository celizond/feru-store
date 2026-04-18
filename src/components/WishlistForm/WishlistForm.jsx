import { useAppContext } from "../../context/AppContext";
import { useWishlistForm } from "../../hooks/useWishlistForm";
import { FormField } from "../FormField/FormField";
import { FormSelect } from "../FormSelect/FormSelect";
import "./WishlistForm.css";
import { LISTAS, NOTA_MAX_CHARS } from "../../constants/wishlist.constants";
import { FormTextarea } from "../FormTextarea/FormTextArea";

const WishlistForm = ({ product, onSuccess }) => {
    const { addToWishlist } = useAppContext();
    const {
        formData,
        errors,
        hasStockExceeded,
        stockExceededMessage,
        isFormReadyToSubmit,
        validate,
        handleChange,
        handleCantidadFocus,
        setSubmitError,
    } = useWishlistForm(product);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const saved = addToWishlist(product, formData);
        if (!saved) {
            setSubmitError("Este producto ya está en tu lista de deseos.");
            return;
        }

        onSuccess();
    };


    return (
        <div className="wishlist-form">
            <h2>Agregar a lista de deseos</h2>
            <p className="wf-product-name">{product.title}</p>

            <form onSubmit={handleSubmit} noValidate>
                <FormField
                    id="cantidad"
                    label="Cantidad *"
                    value={formData.cantidad}
                    onChange={handleChange}
                    onFocus={handleCantidadFocus}
                    error={errors.cantidad}
                    showError={!!errors.cantidad}
                    placeholder="Ingrese la cantidad deseada"
                    inputMode="numeric"
                />
                {hasStockExceeded && <span className="wf-error">{stockExceededMessage}</span>}

                <FormSelect
                    id="lista"
                    label="Lista *"
                    value={formData.lista}
                    onChange={handleChange}
                    error={errors.lista}
                    showError={!!errors.lista}
                    list={LISTAS}
                    title="Seleccioná una lista"
                />

                <FormTextarea
                    id="nota"
                    label="Nota personal"
                    value={formData.nota}
                    onChange={handleChange}
                    error={errors.nota}
                    showError={!!errors.nota}
                    placeholder="Ej: Quiero el color azul..."
                    maxChars={NOTA_MAX_CHARS}
                />

                <button type="submit" className="wf-submit" disabled={!isFormReadyToSubmit}>
                    Guardar en lista
                </button>
                {errors.submit && <span className="wf-error">{errors.submit}</span>}
            </form>
        </div>
    );
};

export default WishlistForm;