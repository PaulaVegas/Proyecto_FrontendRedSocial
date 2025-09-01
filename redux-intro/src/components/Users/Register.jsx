import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/auth/authSlice";
import { notification, Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isSuccess, message, isError } = useSelector((state) => state.auth);
	useEffect(() => {
		if (isSuccess) {
			notification.success({
				message: "Success",
				description: message,
			});
			navigate("/login");
		}

		if (isError) {
			notification.error({ message: "Error", description: message });
		}

		dispatch(reset());
	}, [isSuccess, isError, message, dispatch, navigate]);

	const onSubmit = (values) => {
		if (values.password !== values.password2) {
			return notification.error({
				message: "Error",
				description: "Passwords do not match",
			});
		}
		dispatch(register(values));
	};

	return (
		<div className="auth-container">
			<Card className="auth-card">
				<h2 className="auth-title">🐱 Create your Pawfile</h2>
				<Form layout="vertical" onFinish={onSubmit}>
					<Form.Item
						label="First Name"
						name="firstName"
						rules={[
							{ required: true, message: "Please enter your first name" },
						]}
					>
						<Input placeholder="First name" />
					</Form.Item>

					<Form.Item
						label="Username"
						name="username"
						rules={[{ required: true, message: "Please enter a username" }]}
					>
						<Input placeholder="Username" />
					</Form.Item>

					<Form.Item
						label="Age"
						name="age"
						rules={[{ required: true, message: "Please enter your age" }]}
					>
						<Input type="number" placeholder="Age" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Please enter your email" },
							{ type: "email", message: "Invalid email format" },
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please enter your password" }]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>

					<Form.Item
						label="Confirm Password"
						name="password2"
						rules={[
							{ required: true, message: "Please confirm your password" },
						]}
					>
						<Input.Password placeholder="Confirm password" />
					</Form.Item>

					<Button type="primary" htmlType="submit" block>
						Register
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default Register;

