import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Avatar, Button, Typography, Row, Col } from "antd";
import defaultAvatar from "../../assets/logos/default-avatar.jpg";
const { Title, Text } = Typography;

const Profile = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	if (!user) return <p>Loading...</p>;

	return (
		<div className="profile-container">
			<Card className="profile-card">
				<div className="profile-avatar">
					<Avatar
						size={120}
						src={
							user.user_img
								? `http://localhost:3000/${user.user_img}`
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
							<strong>Followers:</strong> {user.followers?.length || 0} |{" "}
							<strong>Following:</strong> {user.following?.length || 0}
						</p>
						<p>
							<strong>Posts:</strong> {user.posts?.length || 0}
						</p>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Profile;
