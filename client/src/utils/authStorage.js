const TOKEN_KEY = 'qms_token';
const ADMIN_KEY = 'qms_admin';

/**
 * Storage helpers for token and admin profiles using sessionStorage
 */
export const saveToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const saveAdmin = (admin) => {
  sessionStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const getAdmin = () => {
  const admin = sessionStorage.getItem(ADMIN_KEY);
  return admin ? JSON.parse(admin) : null;
};

export const removeAdmin = () => {
  sessionStorage.removeItem(ADMIN_KEY);
};

export const clearAuth = () => {
  removeToken();
  removeAdmin();
};

