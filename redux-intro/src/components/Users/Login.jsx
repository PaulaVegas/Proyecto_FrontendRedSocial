import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { loginSchema } from "../../utils/validationSchemas";
import { showNotification } from "../../utils/notifications";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isError, isSuccess, message } = useSelector((state) => state.auth);
	const { execute, isLoading } = useAsyncOperation();

	useEffect(() => {
		if (isError) {
			showNotification.error(message);
		}
		if (isSuccess) {
			showNotification.success(message);
			setTimeout(() => {
				navigate("/profile");
			}, 2000);
		}
		dispatch(reset());
	}, [isError, isSuccess, message, dispatch, navigate]);

	const onSubmit = async (values) => {
		await execute(
			() => dispatch(login(values)).unwrap(),
			{
				showSuccessMessage: false, // Ya se maneja en useEffect
				showErrorMessage: false, // Ya se maneja en useEffect
			}
		);
	};

	return (
		<div className="auth-container">
			<Card className="auth-card">
				<h2 className="auth-title">Login to MeowSpace</h2>
				<Form 
					layout="vertical" 
					onFinish={onSubmit}
					validateMessages={{
						required: '${label} es obligatorio',
						types: {
							email: '${label} no es un email válido',
						},
					}}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true },
							{ type: "email" }
						]}
					>
						<Input 
							placeholder="Ingresa tu email" 
							disabled={isLoading}
						/>
					</Form.Item>
					<Form.Item
						label="Contraseña"
						name="password"
						rules={[{ required: true }]}
					>
						<Input.Password 
							placeholder="Ingresa tu contraseña" 
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
						{isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
					</Button>
				</Form>
				<p style={{ marginTop: "1rem", textAlign: "center" }}>
					¿Nuevo en MeowSpace?{" "}
					<Link to="/register">
						<b>Regístrate</b>
					</Link>
				</p>
			</Card>
		</div>
	);
};
export default Login;
