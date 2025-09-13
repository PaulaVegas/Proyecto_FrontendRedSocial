import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import AppHeader from "./Header/Header";
import SidebarLeft from "./Sidebars/LeftSidebar";
import AppFooter from "./Footer/Footer";
import SidebarAds from "./Sidebars/AdsSidebar";

const { Sider, Content } = Layout;

const AppLayout = ({ children }) => {
	const location = useLocation();

	const hideSidebars = ["/login", "/register"];

	const isAuthPage = hideSidebars.includes(location.pathname);

	return (
		<Layout className="app-layout">
			<AppHeader />

			<Layout className="app-content">
				{!isAuthPage && (
					<Sider width={260} className="sidebar-left">
						<SidebarLeft />
					</Sider>
				)}

				<Content className="page-main">{children}</Content>

				{!isAuthPage && (
					<Sider width={260} className="sidebar-right">
						<SidebarAds />
					</Sider>
				)}
			</Layout>

			<AppFooter />
		</Layout>
	);
};

export default AppLayout;
