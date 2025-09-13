import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { notification, Form, Input, Button, Card } from "antd";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			notification.error({ message: "Error", description: message });
		}
		if (isSuccess) {
			notification.success({ message: "Success", description: message });
			setTimeout(() => {
				navigate("/profile");
			}, 2000);
		}
		dispatch(reset());
	}, [isError, isSuccess, message, dispatch, navigate]);

	const onSubmit = (values) => {
		dispatch(login(values));
	};

	return (
		<div className="auth-container">
			<Card className="auth-card">
				<h2 className="auth-title">Login to MeowSpace</h2>
				<Form layout="vertical" onFinish={onSubmit}>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please enter your email" }]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please enter your password" }]}
					>
						<Input.Password placeholder="Enter your password" />
					</Form.Item>
					<Button type="primary" htmlType="submit" block>
						Login
					</Button>
				</Form>
				<p style={{ marginTop: "1rem", textAlign: "center" }}>
					New to MeowSpace?{" "}
					<Link to="/register">
						<b>Sign Up</b>
					</Link>
				</p>
			</Card>
		</div>
	);
};
export default Login;
