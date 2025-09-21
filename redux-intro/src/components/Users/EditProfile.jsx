import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Upload, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { profileSchema } from "../../utils/validationSchemas";
import { showNotification } from "../../utils/notifications";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import api from "../../utils/axiosConfig";

const EditProfile = () => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const userId = user._id || user.id;
	const [form] = Form.useForm();
	const [previewImage, setPreviewImage] = useState("");
	const { execute, isLoading } = useAsyncOperation();

	useEffect(() => {
		if (user) {
			form.setFieldsValue({
				username: user?.username || "",
				email: user?.email || "",
				bio: user?.bio || "",
			});
			setPreviewImage(user.profileImage || "");
		}
	}, [user, form]);

	const handleImageChange = (info) => {
		const file = info.file;
		
		// Validar tamaño del archivo
		if (file && file.size > 5 * 1024 * 1024) {
			message.error("El archivo es muy grande. Máximo 5MB.");
			return;
		}

		// Validar tipo de archivo
		if (file && !["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
			message.error("Solo se permiten imágenes (JPG, PNG, GIF).");
			return;
		}

		if (file) {
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (values) => {
		const formData = new FormData();
		formData.append("username", values.username);
		formData.append("email", values.email);
		if (values.bio) formData.append("bio", values.bio);
		if (values.password) formData.append("password", values.password);
		if (values.image && values.image.file) {
			formData.append("image", values.image.file);
		}

		await execute(
			() => api.put(`/users/${userId}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			}),
			{
				showSuccessMessage: true,
				successMessage: "Perfil actualizado correctamente",
				onSuccess: () => {
					navigate("/profile");
				},
			}
		);
	};

	return (
		<div className="profile-container">
			<Card className="profile-card">
				<h2 className="profile-title">Editar Perfil</h2>
				
				{previewImage && (
					<div style={{ textAlign: "center", marginBottom: "1rem" }}>
						<Avatar
							size={100}
							src={previewImage}
							icon={<UserOutlined />}
							style={{ border: "2px solid #d9d9d9" }}
						/>
					</div>
				)}

				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					validateMessages={{
						required: '${label} es obligatorio',
						types: {
							email: '${label} no es un email válido',
						},
						string: {
							min: '${label} debe tener al menos ${min} caracteres',
							max: '${label} no puede tener más de ${max} caracteres',
							matches: '${label} contiene caracteres no válidos',
						},
					}}
				>
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
							placeholder="Tu nombre de usuario" 
							disabled={isLoading}
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
						label="Biografía"
						name="bio"
						rules={[
							{ max: 500, message: "La biografía no puede tener más de 500 caracteres" },
						]}
					>
						<Input.TextArea 
							placeholder="Cuéntanos algo sobre ti..." 
							rows={3}
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Nueva contraseña (opcional)"
						name="password"
						rules={[
							{ min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
							{ 
								pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
								message: "Debe contener al menos una mayúscula, una minúscula y un número" 
							},
						]}
					>
						<Input.Password 
							placeholder="Nueva contraseña" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Confirmar nueva contraseña"
						name="confirmPassword"
						dependencies={['password']}
						rules={[
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
							placeholder="Confirma tu nueva contraseña" 
							disabled={isLoading}
						/>
					</Form.Item>

					<Form.Item
						label="Imagen de perfil"
						name="image"
						valuePropName="fileList"
						getValueFromEvent={(e) => {
							if (Array.isArray(e)) {
								return e;
							}
							return e && e.fileList;
						}}
					>
						<Upload
							beforeUpload={() => false}
							accept="image/jpeg,image/png,image/gif"
							onChange={handleImageChange}
							showUploadList={false}
							disabled={isLoading}
						>
							<Button icon={<UploadOutlined />} disabled={isLoading}>
								Seleccionar imagen
							</Button>
						</Upload>
					</Form.Item>

					<Form.Item>
						<div style={{ display: "flex", gap: "1rem" }}>
							<Button
								type="primary"
								htmlType="submit"
								loading={isLoading}
								disabled={isLoading}
								style={{
									backgroundColor: "var(--detail-pink)",
									borderColor: "var(--calico-black)",
									flex: 1,
								}}
							>
								{isLoading ? "Guardando..." : "Guardar Cambios"}
							</Button>
							
							<Button
								type="default"
								onClick={() => navigate("/profile")}
								disabled={isLoading}
								style={{ flex: 1 }}
							>
								Cancelar
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default EditProfile;
