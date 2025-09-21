import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Crear instancia de axios
const api = axios.create({
	baseURL: API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor para requests - añadir token automáticamente
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Interceptor para responses - manejar errores globalmente
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Si el token expiró o es inválido, limpiar localStorage y redirigir
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.removeItem("userId");
			// Redirigir al login si no estamos ya ahí
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default api;
