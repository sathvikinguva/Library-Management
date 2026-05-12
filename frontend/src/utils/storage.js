const STORAGE_KEY = "library-auth";

export const loadAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveAuth = (payload) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};
