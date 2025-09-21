import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostByTitle } from "../../redux/posts/postsSlice";
import SearchForm from "./SearchForm";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { Button, Empty, Pagination } from "antd";

const Search = () => {
	const dispatch = useDispatch();
	const { title } = useParams();
	const { posts, isLoading, totalPages, totalPosts } = useSelector((state) => state.posts);
	const [currentPage, setCurrentPage] = useState(1);

	const API_URL = import.meta.env.VITE_API_URL;
	
	useEffect(() => {
		if (title) {
			dispatch(getPostByTitle({ title: title, page: currentPage, limit: 10 }));
		}
	}, [dispatch, title, currentPage]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	if (isLoading) {
		return <LoadingSpinner text="Buscando posts..." />;
	}

	return (
		<div className="search-results">
			<SearchForm />
			
			{title && (
				<>
					<h2 className="search-title">
						Resultados para "{decodeURIComponent(title)}"
						{totalPosts > 0 && (
							<span style={{ fontSize: "0.8em", color: "#666", marginLeft: "1rem" }}>
								({totalPosts} {totalPosts === 1 ? 'resultado' : 'resultados'})
							</span>
						)}
					</h2>

					{!posts || posts.length === 0 ? (
						<Empty
							description="No se encontraron posts"
							image={Empty.PRESENTED_IMAGE_SIMPLE}
						>
							<Button type="primary" onClick={() => window.history.back()}>
								Volver
							</Button>
						</Empty>
					) : (
						<>
							<div className="posts-grid">
								{posts.map((post) => (
									<div key={post._id} className="post-card">
										{post.image && (
											<img 
												src={post.image.startsWith('http') ? post.image : `${API_URL}/${post.image}`} 
												alt={post.title} 
												className="post-image" 
											/>
										)}
										<div className="post-content">
											<h3>{post.title}</h3>
											<p>
												{post.content.length > 100
													? post.content.slice(0, 100) + "..."
													: post.content}
											</p>
											<div className="post-meta">
												<span>{post.commentIds?.length || 0} comentarios</span>
												<span>{post.likes?.length || 0} me gusta</span>
											</div>
										</div>
									</div>
								))}
							</div>

							{totalPages > 1 && (
								<div className="pagination-wrapper" style={{ textAlign: "center", marginTop: "2rem" }}>
									<Pagination
										current={currentPage}
										total={totalPosts}
										pageSize={10}
										onChange={handlePageChange}
										showSizeChanger={false}
										showQuickJumper
										showTotal={(total, range) => 
											`${range[0]}-${range[1]} de ${total} resultados`
										}
									/>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Search;
