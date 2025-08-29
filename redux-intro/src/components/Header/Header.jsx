import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { useState, useEffect } from "react";
import { Layout, Menu, Drawer, Button, Input } from "antd";
import dm_cat from "../../assets/logos/dm_cat.svg";
import home_cat from "../../assets/logos/home_cat.svg";
import logo_catsocial from "../../assets/logos/logo_catsocial.svg";
import pawfile from "../../assets/logos/pawfile.svg";
import { MenuOutlined } from "@ant-design/icons";
const { Header } = Layout;

const useIsMobile = (breakpoint = 768) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
	window.addEventListener("resize", () =>
		setIsMobile(window.innerWidth < breakpoint)
	);
	return isMobile;
};

const AppHeader = () => {
	const isMobile = useIsMobile();
	const [drawerVisible, setDrawerVisible] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [text, setText] = useState("");

	const handleSearch = (e) => {
		if (e.key === "Enter" && text.trim()) {
			navigate(`/posts/title/${text}`);
			setText("");
		}
	};

	const onLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	const menuItems = [
		{
			label: "Nest",
			key: "/",
			icon: <img src={home_cat} alt="home" className="icon" />,
			onClick: () => navigate("/"),
		},
		user && {
			label: "Pawfile",
			key: "/profile",
			icon: <img src={pawfile} alt="pawfile" className="icon" />,
			onClick: () => navigate("/profile"),
		},
		!user && {
			label: "Login",
			key: "/login",
			icon: <img src={dm_cat} alt="dm" className="icon" />,
			onClick: () => navigate("/login"),
		},
		!user && {
			label: "Register",
			key: "/register",
			icon: <img src={logo_catsocial} alt="catsocial" className="icon" />,
			onClick: () => navigate("/register"),
		},
		user && {
			label: "Logout",
			key: "/logout",
			onClick: onLogout,
		},
	].filter(Boolean);

	const selectedKey =
		menuItems.find((item) => location.pathname.startsWith(item.key))?.key ||
		"/";

	return (
		<Header className="app-header">
			<div className="header-left" onClick={() => navigate("/")}>
				<img src={logo_catsocial} alt="logo" />
				<h1>
					Meow<span>Space</span>
				</h1>
			</div>

			{!isMobile && (
				<div className="header-center">
					<Input
						placeholder="Search post"
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyUp={handleSearch}
					/>
				</div>
			)}

			<div className="header-right">
				{!isMobile ? (
					<Menu
						mode="horizontal"
						selectedKeys={[selectedKey]}
						items={menuItems}
						className="custom-menu"
					/>
				) : (
					<>
						<Button
							type="text"
							icon={<MenuOutlined />}
							onClick={() => setDrawerVisible(true)}
						/>
						<Drawer
							title="Menu"
							placement="right"
							onClose={() => setDrawerVisible(false)}
							open={drawerVisible}
						>
							<Menu
								mode="inline"
								selectedKeys={[selectedKey]}
								items={menuItems}
								onClick={() => setDrawerVisible(false)}
							/>
						</Drawer>
					</>
				)}
			</div>
		</Header>
	);
};
export default AppHeader;
