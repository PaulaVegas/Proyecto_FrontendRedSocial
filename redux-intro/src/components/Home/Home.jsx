import React, { useState, useEffect } from "react";
import Posts from "../Post/Posts";
import NewPostIcon from "../../assets/logos/newPawst.svg";
import NewPost from "../Post/NewPost";
import SidebarLeft from "./LeftSidebar";
import axios from "axios";
import "./home.scss";

const Home = () => {
	const [showNewPost, setShowNewPost] = useState(false);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [page, setPage] = useState(1);
	const [limit] = useState(10);

	const token = localStorage.getItem("token");

	const fetchPosts = async (pageNumber = 1) => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`http://localhost:3000/posts?page=${pageNumber}&limit=${limit}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setPosts(res.data);
		} catch (err) {
			console.error("Error fetching posts:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts(page);
	}, [page]);

	const handleToggleNewPost = () => {
		setShowNewPost((prev) => !prev);
	};
	const handlePrevPage = () => {
		if (page > 1) setPage((prev) => prev - 1);
	};
	const handleNextPage = () => {
		setPage((prev) => prev + 1);
	};
	const refreshPosts = () => {
		setPage(1);
		fetchPosts(1);
	};

	return (
		<div className="page-layout">
			<div className="home-content-wrapper">
				<SidebarLeft />

				<div className="home-page">
					<header className="home-header">
						<h1>Welcome to MeowSpace 🐾</h1>
						<p className="home-subtitle">
							Discover cute posts and share your own adventures with other cat
							lovers!
						</p>
					</header>

					<main className="posts-center">
						<Posts
							posts={posts
								.slice()
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
						/>
					</main>

					<div
						className="new-post-button-wrapper"
						onClick={handleToggleNewPost}
					>
						<span className="new-post-text">New</span>
						<img src={NewPostIcon} alt="New Post" className="new-post-icon" />
						<span className="new-post-text">Pawst</span>
					</div>

					{showNewPost && (
						<div className="new-post-form-wrapper">
							<NewPost />
						</div>
					)}

					<div className="pagination-controls">
						<button onClick={handlePrevPage} disabled={page === 1}>
							Previous
						</button>
						<span>Page {page}</span>
						<button onClick={handleNextPage} disabled={posts.length < limit}>
							Next
						</button>
					</div>
				</div>

				<aside className="sidebar-right">
					<h3>Publicidad</h3>
					<p>🐾 ¡Compra snacks para tu gato!</p>
				</aside>
			</div>
		</div>
	);
};
export default Home;
