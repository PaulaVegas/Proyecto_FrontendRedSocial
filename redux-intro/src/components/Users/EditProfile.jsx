import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const userId = user._id || user.id;

	const [formData, setFormData] = useState({
		username: user?.username || "",
		email: user?.email || "",
		password: "",
		password2: "",
		profileImage: null,
	});

	useEffect(() => {
		setFormData((prev) => ({
			...prev,
			username: user?.username || "",
			email: user?.email || "",
		}));
	}, [user]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpload = ({ file }) => {
		setFormData({ ...formData, profileImage: file });
	};

	const handleSubmit = async () => {
		if (formData.password && formData.password !== formData.password2) {
			return notification.error({
				message: "Error",
				description: "Passwords do not match",
			});
		}

		const data = new FormData();
		data.append("username", formData.username);
		data.append("email", formData.email);
		if (formData.password) data.append("password", formData.password);
		if (formData.profileImage) data.append("image", formData.profileImage);

		try {
			const res = await axios.put(
				`http://localhost:3000/users/${userId}`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			notification.success({
				message: "Success",
				description: res.data.message,
			});
			navigate("/profile");
		} catch (err) {
			notification.error({
				message: "Error",
				description: err.response?.data?.message || "Something went wrong",
			});
		}
	};

	return (
		<div className="profile-container">
			<Card className="profile-card">
				<h2 className="profile-title">Edit Pawfile 🐾</h2>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item label="Username">
						<Input
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item label="Email">
						<Input
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item label="New Password">
						<Input.Password
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item label="Confirm Password">
						<Input.Password
							name="password2"
							value={formData.password2}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item label="Avatar">
						<Upload
							beforeUpload={() => false}
							showUploadList={false}
							onChange={handleUpload}
						>
							<Button icon={<UploadOutlined />}>Choose Image</Button>
						</Upload>
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						style={{
							backgroundColor: "var(--accent)",
							borderColor: "var(--accent)",
						}}
					>
						Save Changes
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default EditProfile;
