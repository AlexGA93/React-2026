export const addToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const readFromLocalStorage = (key: string) => localStorage.getItem(key);