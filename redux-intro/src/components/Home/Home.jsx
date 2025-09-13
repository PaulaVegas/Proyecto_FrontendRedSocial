import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostsContainer from "../Post/PostContainer";
import NewPostIcon from "../../assets/logos/newPawst.svg";
import NewPost from "../Post/NewPost";
import "./home.scss";

const Home = () => {
	const [showNewPost, setShowNewPost] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="page-layout">
			<div className="home-content-wrapper">
				<div className="home-page">
					<div
						className="new-post-button-wrapper"
						onClick={() => setShowNewPost((prev) => !prev)}
					>
						<span className="new-post-text">New</span>
						<img src={NewPostIcon} alt="New Post" className="new-post-icon" />
						<span className="new-post-text">Pawst</span>
					</div>

					<main className="posts-center">
						<PostsContainer
							showNewPost={showNewPost}
							setShowNewPost={setShowNewPost}
						/>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Home;
