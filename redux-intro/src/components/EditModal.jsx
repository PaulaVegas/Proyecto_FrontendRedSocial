import { Button, Modal, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../redux/posts/postsSlice";
import { UploadOutlined } from "@ant-design/icons";

const EditModal = ({ visible, setVisible, post, onSaved }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);

	useEffect(() => {
		if (post) {
			form.setFieldsValue({
				title: post.title || "",
				content: post.content || "",
			});
			setPreview(post.image || null);
			setFile(null);
		} else {
			form.resetFields();
			setFile(null);
			setPreview(null);
		}
	}, [post, form]);

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("content", values.content);

			if (file) {
				formData.append("image", file);
			} else if (post?.image) {
				formData.append("existingImage", post.image);
			}
			await dispatch(update({ id: post._id, postData: formData })).unwrap();

			setVisible(false);
			if (onSaved) onSaved();
		} catch (err) {
			console.error("Error updating post:", err);
		}
	};

	const handleFileChange = (info) => {
		const selectedFile = info.fileList[0]?.originFileObj;
		console.log("Selected file:", selectedFile);
		setFile(selectedFile || null);
		setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
	};

	return (
		<Modal
			title="Edit Post"
			open={visible}
			onOk={handleOk}
			onCancel={() => setVisible(false)}
			okText="Save"
			cancelText="Cancel"
		>
			<Form form={form} layout="vertical" name="edit_post_form">
				<Form.Item name="title" label="Title" rules={[{ required: true }]}>
					<Input />
				</Form.Item>

				<Form.Item name="content" label="Content" rules={[{ required: true }]}>
					<Input.TextArea rows={4} />
				</Form.Item>

				<Form.Item label="Image">
					<Upload
						beforeUpload={() => false}
						onChange={handleFileChange}
						maxCount={1}
					>
						<Button icon={<UploadOutlined />}>Choose Image</Button>
					</Upload>
					{preview && (
						<img
							src={preview}
							alt="Preview"
							style={{ maxWidth: "200px", marginTop: "1rem" }}
						/>
					)}
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default EditModal;
