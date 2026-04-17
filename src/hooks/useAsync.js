import { useCallback, useEffect, useState } from "react";

export const useAsync = ( asyncFunction, { immediate = true, initialData = null } = {}) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const result = await asyncFunction(...args);

            setData(result);

            return result;
        } catch (err) {
            const errorMessage = err?.message || "Ocurrió un error inesperado";

            setError(errorMessage);

            return null;
        } finally {
            setLoading(false);
        }
    }, [asyncFunction]);

    useEffect(() => {
        if (!immediate) return;

        execute();
    }, [execute, immediate]);

    return {
        data,
        loading,
        error,
        execute,
        setData,
        setError,
    };
};