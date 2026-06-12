import axios from 'axios';

const DEFAULT_API_URL = 'http://localhost:8000/api/ascii/';
const API_URL = normalizeApiUrl(import.meta.env.VITE_API_URL || DEFAULT_API_URL);

const api = axios.create({
  timeout: 60000,
});

function normalizeApiUrl(url) {
  if (!url || url === '/') {
    return DEFAULT_API_URL;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.pathname === '/') {
      return new URL('/api/ascii/', parsedUrl.origin).toString();
    }

    return parsedUrl.toString();
  } catch {
    return url;
  }
}

export async function generateAscii({ image, width, height, colors }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('width', String(width));
  formData.append('height', String(height));
  formData.append('colors', String(Boolean(colors)));

  const { data } = await api.post(API_URL, formData);
  return data;
}

export function getApiErrorMessage(error) {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }

  if (error.response?.status) {
    return `La API respondió con estado ${error.response.status}.`;
  }

  if (error.code === 'ECONNABORTED') {
    return 'La conversión tardó demasiado. Inténtalo con una imagen más pequeña.';
  }

  return 'No fue posible conectar con la API. Revisa que Django esté ejecutándose.';
}
