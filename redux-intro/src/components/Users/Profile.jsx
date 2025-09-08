import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../redux/auth/authSlice";
import { Card, Avatar, Button, Row, Col, List } from "antd";
import defaultAvatar from "../../assets/logos/default-avatar.jpg";
import PostCard from "../Post/PostCard";
import EditModal from "../EditModal";
import { deletePost } from "../../redux/posts/postsSlice";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const [editingPost, setEditingPost] = useState(null);

	useEffect(() => {
		if (!user || !user.followers) {
			dispatch(fetchUserInfo());
		}
	}, [dispatch, user]);

	if (!user) return <p>Loading...</p>;

	const handleEditPost = (post) => {
		setEditingPost(post);
	};

	const handleCancelEdit = () => {
		setEditingPost(null);
	};

	const handlePostSaved = () => {
		setEditingPost(null);
		dispatch(fetchUserInfo());
	};

	const handleDeletePost = async (id) => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;

		try {
			await dispatch(deletePost(id));
			dispatch(fetchUserInfo());
		} catch (err) {
			console.error("Error deleting post:", err);
		}
	};

	const renderUserItem = (u) => (
		<List.Item>
			<List.Item.Meta
				avatar={
					<Avatar
						src={
							u.profileImage
								? `http://localhost:3000/${u.profileImage}`
								: defaultAvatar
						}
					/>
				}
				title={u.username}
			/>
		</List.Item>
	);

	return (
		<div className="profile-container">
			<Card className="profile-card">
				<div className="profile-avatar">
					<Avatar
						size={120}
						src={
							user.profileImage
								? `http://localhost:3000/${user.profileImage}`
								: defaultAvatar
						}
						alt={user.username}
					/>
				</div>

				<div className="profile-info">
					<h2 className="profile-username">{user.username}</h2>
					<p className="profile-email">{user.email}</p>

					<div className="profile-actions">
						<Button
							type="primary"
							block
							onClick={() => navigate("/edit-profile")}
							style={{
								backgroundColor: "var(--accent)",
								borderColor: "var(--accent)",
								fontWeight: 600,
								borderRadius: "12px",
							}}
						>
							Edit Profile
						</Button>
					</div>

					<div className="profile-stats">
						<p>
							<strong>Posts:</strong> {user.posts?.length || 0}
						</p>
					</div>

					<Row gutter={16} style={{ marginTop: 20 }}>
						<Col span={12}>
							<Card
								title={`Followers (${user.followers?.length || 0})`}
								size="small"
							>
								<List
									dataSource={user.followers || []}
									renderItem={renderUserItem}
									size="small"
								/>
							</Card>
						</Col>
						<Col span={12}>
							<Card
								title={`Following (${user.following?.length || 0})`}
								size="small"
							>
								<List
									dataSource={user.following || []}
									renderItem={renderUserItem}
									size="small"
								/>
							</Card>
						</Col>
					</Row>
					<div className="profile-posts">
						<h3>My Posts</h3>
						{user.posts && user.posts.length > 0 ? (
							<div className="post-container">
								{user.posts
									.slice()
									.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
									.map((post) => (
										<PostCard
											key={post._id}
											post={post}
											currentUserId={user._id}
											onEdit={handleEditPost}
											onDelete={handleDeletePost}
										/>
									))}
							</div>
						) : (
							<p>No posts yet</p>
						)}
					</div>
				</div>
			</Card>

			{editingPost && (
				<EditModal
					visible={!!editingPost}
					setVisible={setEditingPost}
					post={editingPost}
					onSaved={handlePostSaved}
				/>
			)}
		</div>
	);
};

export default Profile;
