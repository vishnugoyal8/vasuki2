/**
 * Centralized API client for CareerSync platform
 */

const BASE_URL = '/api';

export const apiClient = {
  async get(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`, window.location.origin);
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        url.searchParams.append(key, val);
      }
    });

    const res = await fetch(url.toString());
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: Failed to GET ${endpoint}`);
    }
    return res.json();
  },

  async post(endpoint, body = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: Failed to POST ${endpoint}`);
    }
    return res.json();
  },

  async patch(endpoint, body = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: Failed to PATCH ${endpoint}`);
    }
    return res.json();
  },

  async delete(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}: Failed to DELETE ${endpoint}`);
    }
    return res.json();
  },
};

export default apiClient;
