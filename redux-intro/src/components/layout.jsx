import { Layout } from "antd";
import AppHeader from "./Header/Header";

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
	return (
		<Layout className="app-layout">
			<AppHeader />
			<Content className="app-content">{children}</Content>
			<Footer className="app-footer">
				<div className="footer-inner">
					© {new Date().getFullYear()} MeowSpace 🐾
				</div>
			</Footer>
		</Layout>
	);
};

export default AppLayout;
