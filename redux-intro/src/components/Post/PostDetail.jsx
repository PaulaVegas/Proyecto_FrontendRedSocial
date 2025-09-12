import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import axios from "axios";
import { getById } from "../../redux/posts/postsSlice";
import LikeButton from "./LikeButton";
import EditModal from "../EditModal";

const { TextArea } = Input;

const PostDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { post, isLoading } = useSelector((state) => state.posts);
	const userId = localStorage.getItem("userId");
	const API_URL = import.meta.env.VITE_API_URL;
	const [likesCount, setLikesCount] = useState(0);
	const [liked, setLiked] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentText, setCommentText] = useState("");
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (id) dispatch(getById(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (post) {
			setLikesCount(post.likes?.length || 0);
			setLiked(
				post.likes?.some((like) => {
					if (typeof like === "string") return like === userId;
					if (like?._id) return like._id.toString() === userId;
					return false;
				})
			);
			setComments(post.commentIds || []);
		}
	}, [post, userId]);

	const handleComment = async (e) => {
		e.preventDefault();
		if (!commentText.trim()) return;

		try {
			const res = await axios.post(
				`${API_URL}/comments/`,
				{ postId: post._id, content: commentText },
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			setComments((prev) => [...prev, res.data]);
			setCommentText("");
		} catch (err) {
			console.error(err);
		}
	};

	if (isLoading) return <p className="loading">Loading...</p>;
	if (!post?._id) return <p className="no-posts">Post not found</p>;

	const imageUrl =
		post.image &&
		(post.image.startsWith("http") ? post.image : `${API_URL}/${post.image}`);
	const isOwner =
		post.userId?._id?.toString() === userId?.toString() ||
		post.userId?.toString() === userId?.toString();

	const handleSaved = () => {
		setEditing(false);
		dispatch(getById(id));
	};

	return (
		<div className="post-detail-wrapper">
			<div className="post-detail-card">
				<h2>{post.title}</h2>
				<p>{post.content}</p>
				{imageUrl && (
					<img className="post-image" src={imageUrl} alt={post.title} />
				)}
				<p>By {post.userId?.username || "Unknown"}</p>

				<LikeButton
					postId={post._id}
					liked={liked}
					likesCount={likesCount}
					setLiked={setLiked}
					setLikesCount={setLikesCount}
				/>
				{isOwner && (
					<div style={{ marginTop: "1rem" }}>
						<Button type="primary" onClick={() => setEditing(true)}>
							Editar
						</Button>
					</div>
				)}

				<h3>Comments ({comments.length})</h3>
				<List
					itemLayout="horizontal"
					dataSource={comments}
					renderItem={(comment) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar>{comment.userId?.username?.[0]}</Avatar>}
								title={comment.userId?.username || "Unknown"}
								description={comment.content}
							/>
						</List.Item>
					)}
				/>

				<form
					onSubmit={handleComment}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.5rem",
						marginTop: "1rem",
					}}
				>
					<TextArea
						rows={3}
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						placeholder="Write a comment..."
						autoSize={{ minRows: 3, maxRows: 5 }}
					/>
					<Button type="primary" htmlType="submit">
						Comment
					</Button>
				</form>
			</div>

			{editing && (
				<EditModal
					visible={editing}
					setVisible={setEditing}
					post={post}
					onSaved={handleSaved}
				/>
			)}
		</div>
	);
};

export default PostDetail;
