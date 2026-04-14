import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const loadFromStorage = (key, fallback) => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
};

export const AppProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => loadFromStorage("wishlist", []));
    const [history, setHistory] = useState(() => loadFromStorage("history", []));

    // Sincronizar con localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history));
    }, [history]);

    const addToWishlist = (product, formData) => {
        const alreadyIn = wishlist.some((item) => item.id === product.id);
        if (alreadyIn) return false;
        setWishlist((prev) => [...prev, { ...product, wishlistData: formData }]);
        return true;
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const addToHistory = (product) => {
        setHistory((prev) => {
            // Evitar duplicados: si ya existe, lo movemos al tope
            const filtered = prev.filter((item) => item.id !== product.id);
            return [{ ...product, visitedAt: new Date().toISOString() }, ...filtered];
        });
    };

    return (
        <AppContext.Provider value={{
            wishlist,
            history,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            addToHistory,
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook personalizado para usar el contexto fácilmente
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext debe usarse dentro de AppProvider");
    return context;
};
