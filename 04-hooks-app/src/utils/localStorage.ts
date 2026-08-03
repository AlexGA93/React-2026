export const addToLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const readFromLocalStorage = (key: string) => localStorage.getItem(key);

export const deleteFromLocalStorage = (key: string) =>
  localStorage.removeItem(key);
