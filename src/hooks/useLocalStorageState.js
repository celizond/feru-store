import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

export const useLocalStorageState = (key, initialValue) => {
    const [value, setValue] = useState(() => getFromStorage(key, initialValue));

    useEffect(() => {
        saveToStorage(key, value);
    }, [key, value]);

    return [value, setValue];
};