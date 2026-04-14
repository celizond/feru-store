import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "./WishlistForm.css";

const NOTA_MAX_CHARS = 150;

const LISTAS = ["Para mí", "Cumpleaños", "Navidad", "Regalos", "Otro"];

const WishlistForm = ({ product, onSuccess }) => {
    const { addToWishlist } = useAppContext();

    const [formData, setFormData] = useState({
        cantidad: "",
        lista: "",
        nota: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        const cantidad = parseInt(formData.cantidad);
        if (!formData.cantidad) {
            newErrors.cantidad = "La cantidad es requerida.";
        } else if (isNaN(cantidad) || cantidad <= 0) {
            newErrors.cantidad = "La cantidad debe ser un número mayor a cero.";
        }

        if (!formData.lista) {
            newErrors.lista = "Seleccioná una lista.";
        }

        if (formData.nota.length > NOTA_MAX_CHARS) {
            newErrors.nota = `La nota no puede superar los ${NOTA_MAX_CHARS} caracteres.`;
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Limpiar error del campo al escribir
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        addToWishlist(product, formData);
        onSuccess();
    };

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
                        type="number"
                        min="1"
                        placeholder="Ej: 2"
                        value={formData.cantidad}
                        onChange={handleChange}
                    />
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

                <button type="submit" className="wf-submit">
                    Guardar en lista
                </button>

            </form>
        </div>
    );
};

export default WishlistForm;