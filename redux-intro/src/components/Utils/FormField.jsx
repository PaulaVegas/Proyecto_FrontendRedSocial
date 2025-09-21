import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FormField = ({
	label,
	name,
	type = "text",
	placeholder,
	required = false,
	disabled = false,
	rows = 1,
	accept,
	...props
}) => {
	const renderInput = () => {
		switch (type) {
			case "password":
				return (
					<Input.Password
						placeholder={placeholder}
						disabled={disabled}
						{...props}
					/>
				);
			case "textarea":
				return (
					<Input.TextArea
						placeholder={placeholder}
						disabled={disabled}
						rows={rows}
						{...props}
					/>
				);
			case "file":
				return (
					<Upload
						beforeUpload={() => false} // Prevenir subida automática
						accept={accept}
						disabled={disabled}
						{...props}
					>
						<Button icon={<UploadOutlined />}>
							{placeholder || "Seleccionar archivo"}
						</Button>
					</Upload>
				);
			case "email":
				return (
					<Input
						type="email"
						placeholder={placeholder}
						disabled={disabled}
						{...props}
					/>
				);
			default:
				return (
					<Input
						placeholder={placeholder}
						disabled={disabled}
						{...props}
					/>
				);
		}
	};

	return (
		<Form.Item
			label={label}
			name={name}
			rules={[
				{
					required,
					message: `${label} es obligatorio`,
				},
			]}
		>
			{renderInput()}
		</Form.Item>
	);
};

export default FormField;
