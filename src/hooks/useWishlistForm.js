import { useState } from "react";
import { NOTA_MAX_CHARS, LISTAS, isPositiveInteger } from "../constants/wishlist.constants";

export const useWishlistForm = (product) => {
    const availableStock = Number(product?.stock ?? 0);

    const [formData, setFormData] = useState({
        cantidad: "1",
        lista: "",
        nota: "",
    });
    const [isInitialAmount, setIsInitialAmount] = useState(true);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.cantidad) {
            newErrors.cantidad = "La cantidad es requerida.";
        } else if (!isPositiveInteger(formData.cantidad)) {
            newErrors.cantidad = "La cantidad debe ser un número mayor a cero.";
        } else if (availableStock <= 0) {
            newErrors.cantidad = "No hay stock disponible para este producto.";
        } else if (Number(formData.cantidad) > availableStock) {
            newErrors.cantidad = `No hay stock suficiente, solo quedan ${availableStock} unidades para este producto.`;
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
            setIsInitialAmount(false);
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

    const handleCantidadFocus = () => {
        if (isInitialAmount) {
            setFormData((prev) => ({ ...prev, cantidad: "" }));
            setIsInitialAmount(false);
        }
    };

    const setSubmitError = (message) => {
        setErrors((prev) => ({ ...prev, submit: message }));
    };

    const setValidationErrors = (newErrors) => {
        setErrors(newErrors);
    };

    return {
        formData,
        errors,
        isInitialAmount,
        validate,
        handleChange,
        handleCantidadFocus,
        setSubmitError,
        setValidationErrors,
    };
};
   