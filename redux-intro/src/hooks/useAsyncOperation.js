import { useState, useCallback } from "react";
import { showNotification } from "../utils/notifications";

export const useAsyncOperation = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const execute = useCallback(async (asyncFunction, options = {}) => {
		const {
			showSuccessMessage = false,
			successMessage = "Operación completada",
			showErrorMessage = true,
			errorMessage = "Ha ocurrido un error",
			onSuccess,
			onError,
		} = options;

		setIsLoading(true);
		setError(null);

		try {
			const result = await asyncFunction();
			
			if (showSuccessMessage) {
				showNotification.success(successMessage);
			}
			
			if (onSuccess) {
				onSuccess(result);
			}
			
			return result;
		} catch (err) {
			const errorMsg = err.message || errorMessage;
			setError(errorMsg);
			
			if (showErrorMessage) {
				showNotification.error(errorMsg);
			}
			
			if (onError) {
				onError(err);
			}
			
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setError(null);
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		execute,
		reset,
	};
};

export default useAsyncOperation;
