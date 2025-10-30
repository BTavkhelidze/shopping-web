import { th } from 'zod/v4/locales';

const API_BASE = 'http://localhost:4000/api';

async function handleResponse(response) {
  if (response.status === 401) throw new Error('Unauthorized');
  if (!response.ok) {
    const text = await response.text().catch(() => 'Unknow Error');

    throw new Error(text);
  }
  return response.json();
}

export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE}/auth/me`, {
    credentials: 'include',
  });
  return handleResponse(response);
}

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return handleResponse(response);
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  return handleResponse(response);
}
export async function logoutUser() {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
}
