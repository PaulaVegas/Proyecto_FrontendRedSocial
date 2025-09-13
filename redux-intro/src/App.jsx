import Home from "./components/Home/Home";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";
import PostDetail from "./components/Post/PostDetail";
import Search from "./components/Search/Search";
import EditProfile from "./components/Users/EditProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout";
import PrivateZone from "./guards/PrivateZone";
import NotFound from "./components/Utils/NotFound";
import AboutUs from "./components/Utils/AboutUs";

function App() {
	return (
		<>
			<BrowserRouter>
				<AppLayout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/profile"
							element={
								<PrivateZone>
									<Profile />
								</PrivateZone>
							}
						/>
						<Route path="/edit-profile" element={<EditProfile />} />
						<Route path="/posts/:id" element={<PostDetail />} />
						<Route path="/posts/title/:title" element={<Search />} />
						<Route path="/about" element={<AboutUs />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AppLayout>
			</BrowserRouter>
		</>
	);
}
export default App;
