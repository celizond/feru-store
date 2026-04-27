import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { removeFromStorage } from "../utils/storage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [wishlist, setWishlist] = useLocalStorageState("wishlist", []);
    const [history, setHistory] = useLocalStorageState("history", []);

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
            const filtered = prev.filter((item) => item.id !== product.id);
            return [{ ...product, visitedAt: new Date().toISOString() }, ...filtered];
        });
    };

    const clearWishlist = () => {
        removeFromStorage("wishlist");
        setWishlist([]);
    };

    const clearHistory = () => {
        removeFromStorage("history");
        setHistory([]);
    };

    return (
        <AppContext.Provider value={{
            wishlist,
            history,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            addToHistory,
            clearWishlist,
            clearHistory,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext debe usarse dentro de AppProvider");
    return context;
};
