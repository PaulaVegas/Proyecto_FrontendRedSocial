import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { postSchema } from "../../utils/validationSchemas";
import { showNotification } from "../../utils/notifications";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import api from "../../utils/axiosConfig";

const NewPost = ({ postToEdit = null, onSuccess, onCancel }) => {
	const [form] = Form.useForm();
	const [preview, setPreview] = useState(null);
	const { execute, isLoading } = useAsyncOperation();
	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (postToEdit) {
			form.setFieldsValue({
				title: postToEdit.title,
				content: postToEdit.content,
			});
			setPreview(postToEdit.image ? `${API_URL}/${postToEdit.image}` : null);
		}
	}, [postToEdit, form]);

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
			setPreview(URL.createObjectURL(file));
		} else {
			setPreview(null);
		}
	};

	const handleSubmit = async (values) => {
		const formData = new FormData();
		formData.append("title", values.title);
		formData.append("content", values.content);
		
		if (values.image && values.image.file) {
			formData.append("image", values.image.file);
		}

		await execute(
			async () => {
				if (postToEdit) {
					return await api.put(`/posts/update/${postToEdit._id}`, formData, {
						headers: { "Content-Type": "multipart/form-data" },
					});
				} else {
					return await api.post("/posts/newPost", formData, {
						headers: { "Content-Type": "multipart/form-data" },
					});
				}
			},
			{
				showSuccessMessage: true,
				successMessage: postToEdit ? "Post actualizado correctamente" : "Post creado correctamente",
				onSuccess: () => {
					form.resetFields();
					setPreview(null);
					if (onSuccess) onSuccess();
				},
			}
		);
	};

	return (
		<div className="new-post-form">
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				validateMessages={{
					required: '${label} es obligatorio',
					string: {
						min: '${label} debe tener al menos ${min} caracteres',
						max: '${label} no puede tener más de ${max} caracteres',
					},
				}}
			>
				<Form.Item
					label="Título"
					name="title"
					rules={[
						{ required: true },
						{ min: 5, message: "El título debe tener al menos 5 caracteres" },
						{ max: 100, message: "El título no puede tener más de 100 caracteres" },
					]}
				>
					<Input 
						placeholder="Título de tu post" 
						disabled={isLoading}
					/>
				</Form.Item>

				<Form.Item
					label="Contenido"
					name="content"
					rules={[
						{ required: true },
						{ min: 10, message: "El contenido debe tener al menos 10 caracteres" },
						{ max: 2000, message: "El contenido no puede tener más de 2000 caracteres" },
					]}
				>
					<Input.TextArea 
						placeholder="¿Qué quieres compartir?" 
						rows={4}
						disabled={isLoading}
					/>
				</Form.Item>

				<Form.Item
					label="Imagen (opcional)"
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
						beforeUpload={() => false} // Prevenir subida automática
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

				{preview && (
					<div style={{ marginBottom: "1rem" }}>
						<img
							src={preview}
							alt="Preview"
							style={{ 
								maxWidth: "200px", 
								maxHeight: "200px",
								objectFit: "cover",
								borderRadius: "8px",
								border: "1px solid #d9d9d9"
							}}
						/>
					</div>
				)}

				<Form.Item>
					<div style={{ display: "flex", gap: "1rem" }}>
						<Button 
							type="primary" 
							htmlType="submit" 
							loading={isLoading}
							disabled={isLoading}
						>
							{isLoading 
								? (postToEdit ? "Actualizando..." : "Creando...") 
								: (postToEdit ? "Actualizar Post" : "Crear Post")
							}
						</Button>
						
						{postToEdit && onCancel && (
							<Button 
								type="default" 
								onClick={onCancel}
								disabled={isLoading}
							>
								Cancelar
							</Button>
						)}
					</div>
				</Form.Item>
			</Form>
		</div>
	);
};

export default NewPost;
