import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "./WishlistForm.css";

const NOTA_MAX_CHARS = 150;

const LISTAS = ["Para mí", "Cumpleaños", "Navidad", "Regalos", "Otro"];

const isPositiveInteger = (value) => /^\d+$/.test(value) && Number(value) > 0;

const WishlistForm = ({ product, onSuccess }) => {
    const { addToWishlist } = useAppContext();
    const availableStock = Number(product?.stock ?? 0);

    const [formData, setFormData] = useState({
        cantidad: "",
        lista: "",
        nota: "",
    });
    const [errors, setErrors] = useState({});

    const hasStockExceeded =
        isPositiveInteger(formData.cantidad) &&
        availableStock > 0 &&
        Number(formData.cantidad) > availableStock;

    const stockExceededMessage = "No hay stock suficiente";

    const validate = () => {
        const newErrors = {};

        if (!formData.cantidad) {
            newErrors.cantidad = "La cantidad es requerida.";
        } else if (!isPositiveInteger(formData.cantidad)) {
            newErrors.cantidad = "La cantidad debe ser un número mayor a cero.";
        } else if (availableStock <= 0) {
            newErrors.cantidad = "No hay stock disponible para este producto.";
        } else if (Number(formData.cantidad) > availableStock) {
            newErrors.cantidad = stockExceededMessage;
        }

        if (!formData.lista) {
            newErrors.lista = "Seleccioná una lista.";
        } else if (!LISTAS.includes(formData.lista)) {
            newErrors.lista = "La lista seleccionada no es válida.";
        }

        if (formData.nota.length > NOTA_MAX_CHARS) {
            newErrors.nota = `La nota no puede superar los ${NOTA_MAX_CHARS} caracteres.`;
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "cantidad") {
            const onlyDigits = value.replace(/\D/g, "");
            setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }

        if (errors.submit) {
            setErrors((prev) => ({ ...prev, submit: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const saved = addToWishlist(product, formData);
        if (!saved) {
            setErrors({ submit: "Este producto ya está en tu lista de deseos." });
            return;
        }

        onSuccess();
    };

    const isCantidadValid =
        isPositiveInteger(formData.cantidad) &&
        availableStock > 0 &&
        Number(formData.cantidad) <= availableStock;

    const isListaValid = LISTAS.includes(formData.lista);

    const isFormReadyToSubmit = isCantidadValid && isListaValid;

    return (
        <div className="wishlist-form">
            <h2>Agregar a lista de deseos</h2>
            <p className="wf-product-name">{product.title}</p>

            <form onSubmit={handleSubmit} noValidate>

                <div className="wf-group">
                    <label htmlFor="cantidad">Cantidad *</label>
                    <input
                        id="cantidad"
                        name="cantidad"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        placeholder="Ej: 2"
                        value={formData.cantidad}
                        onChange={handleChange}
                    />
                    {hasStockExceeded && <span className="wf-error">{stockExceededMessage}</span>}
                    {errors.cantidad && <span className="wf-error">{errors.cantidad}</span>}
                </div>

                <div className="wf-group">
                    <label htmlFor="lista">Lista *</label>
                    <select
                        id="lista"
                        name="lista"
                        value={formData.lista}
                        onChange={handleChange}
                    >
                        <option value="">Seleccioná una lista</option>
                        {LISTAS.map((l) => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                    {errors.lista && <span className="wf-error">{errors.lista}</span>}
                </div>

                <div className="wf-group">
                    <label htmlFor="nota">
                        Nota personal
                        <span className="wf-char-count">
                            {formData.nota.length}/{NOTA_MAX_CHARS}
                        </span>
                    </label>
                    <textarea
                        id="nota"
                        name="nota"
                        placeholder="Ej: Quiero el color azul..."
                        value={formData.nota}
                        onChange={handleChange}
                        rows={3}
                    />
                    {errors.nota && <span className="wf-error">{errors.nota}</span>}
                </div>

                <button type="submit" className="wf-submit" disabled={!isFormReadyToSubmit}>
                    Guardar en lista
                </button>
                {errors.submit && <span className="wf-error">{errors.submit}</span>}

            </form>
        </div>
    );
};

export default WishlistForm;