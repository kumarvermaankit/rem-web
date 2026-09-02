const API_BASE = process.env.REACT_APP_API_BASE || 'https://reminder-backend-production-ping.up.railway.app';
export const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL || `${API_BASE}/auth/google`;

const getToken = () => localStorage.getItem('ping_token') || '';

export const setToken = (token) => localStorage.setItem('ping_token', token);
export const clearToken = () => localStorage.removeItem('ping_token');
export const isLoggedIn = () => !!getToken();

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
}

export default API_BASE;
