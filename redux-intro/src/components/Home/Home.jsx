import React, { useState } from "react";
import Posts from "../Post/Posts";
import NewPostIcon from "../../assets/logos/newPawst.svg";
import NewPost from "../Post/NewPost";
import SidebarLeft from "./LeftSidebar";
import "./home.scss";

const Home = () => {
	const [showNewPost, setShowNewPost] = useState(false);

	const handleToggleNewPost = () => {
		setShowNewPost((prev) => !prev);
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
						<Posts />
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
