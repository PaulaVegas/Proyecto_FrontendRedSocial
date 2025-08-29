import { Link } from "react-router-dom";

const PostCard = ({ post, index }) => {
	return (
		<div className="post-card">
			<Link to={`/posts/${post._id}`} className="post-title">
				{post.title || `Post nº ${index + 1}`}
			</Link>

			<p className="post-content">{post.content}</p>

			{post.image && (
				<img
					src={`http://localhost:3000/${post.image}`}
					alt={post.title}
					className="post-image"
				/>
			)}

			{post.author && <p className="post-author">By {post.author.username}</p>}
		</div>
	);
};

export default PostCard;
