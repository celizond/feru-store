export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    return;
  }
};

export const getFromStorage = (key, fallback = null) => {
  try {
    const data = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    return typeof fallback === "function" ? fallback() : fallback;
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    return;
  }
};