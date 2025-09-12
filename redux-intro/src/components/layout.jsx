import { Layout } from "antd";
import AppHeader from "./Header/Header";
import SidebarLeft from "./LeftSidebar";
import AppFooter from "./Footer/Footer";
import SidebarAds from "./AdsSidebar";

const { Sider, Content } = Layout;

const AppLayout = ({ children }) => {
	return (
		<Layout className="app-layout">
			<AppHeader />

			<Layout className="app-content">
				<Sider width={260} className="sidebar-left">
					<SidebarLeft />
				</Sider>

				<Content className="page-main">{children}</Content>

				<Sider width={260} className="sidebar-right">
					<SidebarAds />
				</Sider>
			</Layout>

			<AppFooter />
		</Layout>
	);
};

export default AppLayout;
