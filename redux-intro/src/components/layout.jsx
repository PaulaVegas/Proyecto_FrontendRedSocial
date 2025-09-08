import { Layout } from "antd";
import AppHeader from "./Header/Header";
import SidebarLeft from "./LeftSidebar";

const { Sider, Content, Footer } = Layout;

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
					<h3>Publicidad</h3>
					<p>🐾 ¡Compra snacks para tu gato!</p>
				</Sider>
			</Layout>

			<Footer className="app-footer">
				<div className="footer-inner">
					© {new Date().getFullYear()} MeowSpace 🐾
				</div>
			</Footer>
		</Layout>
	);
};

export default AppLayout;
