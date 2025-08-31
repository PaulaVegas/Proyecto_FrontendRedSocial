import { Button, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";

const LikeButton = ({ postId, liked, likesCount, setLiked, setLikesCount }) => {
	const token = localStorage.getItem("token");

	const handleLike = async () => {
		try {
			const res = await axios.post(
				`http://localhost:3000/posts/${postId}/toggle-like`,
				{},
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setLikesCount(res.data.likesCount);
			setLiked(res.data.liked);
		} catch (err) {
			message.error(err.response?.data?.message || "Error updating like");
		}
	};

	return (
		<Button
			onClick={handleLike}
			type="text"
			icon={
				liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />
			}
		>
			{likesCount}
		</Button>
	);
};

export default LikeButton;
