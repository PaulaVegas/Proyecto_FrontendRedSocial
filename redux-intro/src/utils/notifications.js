import { message } from "antd";

// Configuración global de notificaciones
message.config({
	top: 100,
	duration: 4,
	maxCount: 3,
});

export const showNotification = {
	success: (text, duration = 4) => {
		message.success({
			content: text,
			duration,
		});
	},

	error: (text, duration = 6) => {
		message.error({
			content: text,
			duration,
		});
	},

	warning: (text, duration = 4) => {
		message.warning({
			content: text,
			duration,
		});
	},

	info: (text, duration = 4) => {
		message.info({
			content: text,
			duration,
		});
	},

	loading: (text) => {
		return message.loading({
			content: text,
			duration: 0,
		});
	},
};

// Función para manejar errores de API de forma consistente
export const handleApiError = (error, defaultMessage = "Ha ocurrido un error") => {
	let errorMessage = defaultMessage;

	if (error.response) {
		// Error de respuesta del servidor
		const { status, data } = error.response;
		
		if (status === 401) {
			errorMessage = "Sesión expirada. Por favor, inicia sesión nuevamente.";
		} else if (status === 403) {
			errorMessage = "No tienes permisos para realizar esta acción.";
		} else if (status === 404) {
			errorMessage = "Recurso no encontrado.";
		} else if (status === 500) {
			errorMessage = "Error interno del servidor. Inténtalo más tarde.";
		} else if (data?.message) {
			errorMessage = data.message;
		} else if (data?.error) {
			errorMessage = data.error;
		} else if (Array.isArray(data?.errors)) {
			errorMessage = data.errors.map(err => err.msg || err).join(", ");
		}
	} else if (error.request) {
		// Error de red
		errorMessage = "Error de conexión. Verifica tu internet.";
	} else if (error.message) {
		errorMessage = error.message;
	}

	showNotification.error(errorMessage);
	return errorMessage;
};

// Función para mostrar loading y manejar promesas
export const withLoading = async (promise, loadingText = "Cargando...") => {
	const hideLoading = showNotification.loading(loadingText);
	
	try {
		const result = await promise;
		hideLoading();
		return result;
	} catch (error) {
		hideLoading();
		handleApiError(error);
		throw error;
	}
};
