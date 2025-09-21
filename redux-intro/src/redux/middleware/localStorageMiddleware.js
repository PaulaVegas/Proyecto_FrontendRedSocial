// Middleware para sincronizar Redux con localStorage
export const localStorageMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	
	// Solo sincronizar acciones específicas de auth
	if (action.type?.startsWith('auth/')) {
		const state = store.getState();
		const { user, token } = state.auth;
		
		// Sincronizar con localStorage
		if (user && token) {
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token', token);
			localStorage.setItem('userId', user.id || user._id);
		} else if (action.type === 'auth/logout/fulfilled' || 
				   action.type === 'auth/logout/rejected') {
			// Limpiar localStorage en logout
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
		}
	}
	
	return result;
};

export default localStorageMiddleware;
