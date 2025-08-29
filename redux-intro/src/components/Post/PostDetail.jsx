import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getById } from "../../redux/posts/postsSlice";

const PostDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { post, isLoading } = useSelector((state) => state.posts);

	useEffect(() => {
		if (id) dispatch(getById(id));
	}, [dispatch, id]);

	if (isLoading) return <p className="loading">Loading...</p>;
	if (!post || !post._id) return <p className="no-posts">Post not found</p>;

	return (
		<div className="post-detail-wrapper">
			<div className="post-detail-card">
				<h2 className="post-title">{post.title}</h2>
				<p className="post-content">{post.content}</p>

				{post.image && (
					<img
						src={`http://localhost:3000/${post.image}`}
						alt={post.title}
						className="post-image"
					/>
				)}

				{post.author && (
					<p className="post-author">By {post.author.username}</p>
				)}
			</div>
		</div>
	);
};

export default PostDetail;
