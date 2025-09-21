import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/auth/authSlice";
import { Form, Input, Button, Card, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../../utils/validationSchemas";
import { showNotification } from "../../utils/notifications";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isSuccess, message, isError } = useSelector((state) => state.auth);
	const { execute, isLoading } = useAsyncOperation();

	useEffect(() => {
		if (isSuccess) {
			showNotification.success(message);
			navigate("/login");
		}

		if (isError) {
			showNotification.error(message);
		}

		dispatch(reset());
	}, [isSuccess, isError, message, dispatch, navigate]);

	const onSubmit = async (values) => {
		await execute(
			() => dispatch(register(values)).unwrap(),
			{
				showSuccessMessage: false, // Ya se maneja en useEffect
				showErrorMessage: false, // Ya se maneja en useEffect
			}
		);
	};

	return (
		<div className="auth-container">
			<Card className="auth-card">
				<h2 className="auth-title">Crea tu cuenta de MeowSpace</h2>
				<Form 
					layout="vertical" 
					onFinish={onSubmit}
					validateMessages={{
						required: '${label} es obligatorio',
						types: {
							email: '${label} no es un email válido',
							number: '${label} debe ser un número válido',
						},
						string: {
							min: '${label} debe tener al menos ${min} caracteres',
							max: '${label} no puede tener más de ${max} caracteres',
							matches: '${label} contiene caracteres no válidos',
						},
					}}
				>
					<Form.Item
						label="Nombre"
						name="firstName"
						rules={[
							{ required: true },
							{ min: 2, message: "El nombre debe tener al menos 2 caracteres" },
							{ max: 50, message: "El nombre no puede tener más de 50 caracteres" },
						]}
					>
						<Input 
							placeholder="Tu nombre" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Nombre de usuario"
						name="username"
						rules={[
							{ required: true },
							{ min: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" },
							{ max: 20, message: "El nombre de usuario no puede tener más de 20 caracteres" },
							{ 
								pattern: /^[a-zA-Z0-9_]+$/, 
								message: "Solo se permiten letras, números y guiones bajos" 
							},
						]}
					>
						<Input 
							placeholder="Nombre de usuario" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Edad"
						name="age"
						rules={[
							{ required: true },
							{ type: "number", min: 13, message: "Debes tener al menos 13 años" },
							{ type: "number", max: 120, message: "Edad no válida" },
						]}
					>
						<InputNumber 
							placeholder="Tu edad" 
							disabled={isLoading}
							style={{ width: "100%" }}
							min={13}
							max={120}
						/>
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true },
							{ type: "email" },
						]}
					>
						<Input 
							placeholder="Tu email" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Contraseña"
						name="password"
						rules={[
							{ required: true },
							{ min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
							{ 
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
								message: "Debe contener al menos una mayúscula, una minúscula y un número" 
							},
						]}
					>
						<Input.Password 
							placeholder="Tu contraseña" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Confirmar Contraseña"
						name="password2"
						dependencies={['password']}
						rules={[
							{ required: true },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Las contraseñas no coinciden'));
								},
							}),
						]}
					>
						<Input.Password 
							placeholder="Confirma tu contraseña" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Button 
						type="primary" 
						htmlType="submit" 
						block 
						loading={isLoading}
						disabled={isLoading}
					>
						{isLoading ? "Creando cuenta..." : "Registrarse"}
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default Register;
