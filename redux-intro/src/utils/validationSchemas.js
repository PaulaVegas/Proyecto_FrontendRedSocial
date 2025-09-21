import * as Yup from "yup";

// Esquema de validación para registro
export const registerSchema = Yup.object({
	username: Yup.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(20, "El nombre de usuario no puede tener más de 20 caracteres")
		.matches(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos")
		.required("El nombre de usuario es obligatorio"),
	
	email: Yup.string()
		.email("Debe ser un email válido")
		.required("El email es obligatorio"),
	
	password: Yup.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"La contraseña debe contener al menos una mayúscula, una minúscula y un número"
		)
		.required("La contraseña es obligatoria"),
	
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
		.required("Confirma tu contraseña"),
});

// Esquema de validación para login
export const loginSchema = Yup.object({
	email: Yup.string()
		.email("Debe ser un email válido")
		.required("El email es obligatorio"),
	
	password: Yup.string()
		.required("La contraseña es obligatoria"),
});

// Esquema de validación para posts
export const postSchema = Yup.object({
	title: Yup.string()
		.min(5, "El título debe tener al menos 5 caracteres")
		.max(100, "El título no puede tener más de 100 caracteres")
		.required("El título es obligatorio"),
	
	content: Yup.string()
		.min(10, "El contenido debe tener al menos 10 caracteres")
		.max(2000, "El contenido no puede tener más de 2000 caracteres")
		.required("El contenido es obligatorio"),
	
	image: Yup.mixed()
		.test("fileSize", "La imagen es muy grande (máximo 5MB)", (value) => {
			if (!value) return true; // Permitir sin imagen
			return value.size <= 5 * 1024 * 1024;
		})
		.test("fileType", "Solo se permiten imágenes (JPG, PNG, GIF)", (value) => {
			if (!value) return true; // Permitir sin imagen
			return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
		}),
});

// Esquema de validación para perfil
export const profileSchema = Yup.object({
	username: Yup.string()
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres")
		.max(20, "El nombre de usuario no puede tener más de 20 caracteres")
		.matches(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),
	
	email: Yup.string()
		.email("Debe ser un email válido"),
	
	bio: Yup.string()
		.max(500, "La biografía no puede tener más de 500 caracteres"),
});

// Esquema de validación para búsqueda
export const searchSchema = Yup.object({
	query: Yup.string()
		.min(2, "La búsqueda debe tener al menos 2 caracteres")
		.max(50, "La búsqueda no puede tener más de 50 caracteres")
		.required("Ingresa algo para buscar"),
});

export default {
	registerSchema,
	loginSchema,
	postSchema,
	profileSchema,
	searchSchema,
};
