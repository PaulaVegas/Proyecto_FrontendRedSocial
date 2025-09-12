import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByTitle } from "../../redux/posts/postsSlice";

const Search = () => {
	const dispatch = useDispatch();
	const { title } = useParams();
	const { posts, isLoading, totalPages } = useSelector((state) => state.posts);
	const [currentPage, setCurrentPage] = useState(1);

	const API_URL = import.meta.env.VITE_API_URL;
	useEffect(() => {
		if (title) {
			console.log("📤 Dispatching getPostByTitle:", {
				title: title,
				page: currentPage,
			});

			dispatch(getPostByTitle({ title: title, page: currentPage, limit: 10 }));
		}
	}, [dispatch, title, currentPage]);
	console.log("📥 Posts from Redux store:", posts);
	console.log("📊 Pagination:", { currentPage, totalPages });
	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	if (isLoading) return <p>Loading...</p>;
	if (!posts || posts.length === 0) return <p>No posts found</p>;
	return (
		<div className="search-results">
			<h2 className="search-title">Results for "{title}"</h2>
			<div className="posts-grid">
				{posts.map((post) => (
					<div key={post._id} className="post-card">
						{post.image && (
							<img src={post.image} alt={post.title} className="post-image" />
						)}
						<div className="post-content">
							<h3>{post.title}</h3>
							<p>
								{post.content.length > 100
									? post.content.slice(0, 100) + "..."
									: post.content}
							</p>
							<div className="post-meta">
								<span>{post.commentIds.length} comments</span>
								<span>{post.likesCount || 0} likes</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="pagination-controls">
				<button onClick={handlePrev} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} / {totalPages}
				</span>
				<button onClick={handleNext} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Search;
