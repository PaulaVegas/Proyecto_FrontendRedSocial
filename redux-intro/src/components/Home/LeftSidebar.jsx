import { useEffect, useState } from "react";
import axios from "axios";

const SidebarLeft = () => {
	const [suggestions, setSuggestions] = useState([]);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchSuggestions = async () => {
			try {
				const res = await axios.get("http://localhost:3000/users/suggestions", {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				});
				setSuggestions(res.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSuggestions();
	}, []);

	const handleFollow = async (id) => {
		try {
			await axios.post(
				`http://localhost:3000/users/${id}/follow`,
				{},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			// Actualizar UI local
			setSuggestions((prev) => prev.filter((user) => user._id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	const handleUnfollow = async (id) => {
		try {
			await axios.post(
				`http://localhost:3000/users/${id}/unfollow`,
				{},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			// Actualizar UI local
			setSuggestions((prev) => prev.filter((user) => user._id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<aside className="sidebar-left">
			<h3>Sugerencias</h3>
			<ul>
				{suggestions.map((user) => (
					<li
						key={user._id}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: "0.5rem",
						}}
					>
						<div
							style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
						>
							{user.avatar && (
								<img
									src={`http://localhost:3000/${user.avatar}`}
									alt={user.username}
									style={{ width: "32px", height: "32px", borderRadius: "50%" }}
								/>
							)}
							<span>@{user.username}</span>
						</div>
						<button
							onClick={() => handleFollow(user._id)}
							style={{
								background: "#ff9e80",
								border: "none",
								color: "#fff",
								padding: "0.25rem 0.5rem",
								borderRadius: "8px",
								cursor: "pointer",
								fontSize: "0.8rem",
								fontWeight: 600,
							}}
						>
							Seguir
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default SidebarLeft;
