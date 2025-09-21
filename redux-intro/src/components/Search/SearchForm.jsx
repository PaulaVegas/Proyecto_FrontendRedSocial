import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";

const SearchForm = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { execute, isLoading } = useAsyncOperation();

	const handleSearch = async (values) => {
		const query = values.query.trim();
		
		if (!query) {
			return;
		}

		// Navegar a la página de resultados
		navigate(`/posts/title/${encodeURIComponent(query)}`);
	};

	return (
		<Card className="search-form-card" style={{ marginBottom: "2rem" }}>
			<Form
				form={form}
				layout="inline"
				onFinish={handleSearch}
				style={{ width: "100%" }}
				validateMessages={{
					required: '${label} es obligatorio',
					string: {
						min: '${label} debe tener al menos ${min} caracteres',
						max: '${label} no puede tener más de ${max} caracteres',
					},
				}}
			>
				<Form.Item
					name="query"
					rules={[
						{ required: true, message: "Ingresa algo para buscar" },
						{ min: 2, message: "La búsqueda debe tener al menos 2 caracteres" },
						{ max: 50, message: "La búsqueda no puede tener más de 50 caracteres" },
					]}
					style={{ flex: 1 }}
				>
					<Input
						placeholder="Buscar posts..."
						prefix={<SearchOutlined />}
						disabled={isLoading}
						size="large"
					/>
				</Form.Item>
				
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={isLoading}
						disabled={isLoading}
						size="large"
						icon={<SearchOutlined />}
					>
						{isLoading ? "Buscando..." : "Buscar"}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default SearchForm;
