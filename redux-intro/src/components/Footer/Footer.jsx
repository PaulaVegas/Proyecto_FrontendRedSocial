import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const AppFooter = () => {
	return (
		<Footer className="app-footer">
			<div className="footer-inner">
				<div className="footer-links">
					<Link to="/about">About us</Link>
					<Link to="/cookies">Cookie Policy</Link>
					<Link to="/contact">Contact</Link>
				</div>
				<div className="footer-copy">
					© {new Date().getFullYear()} MeowSpace 🐾
					<p>Learning project</p>
				</div>
			</div>
		</Footer>
	);
};

export default AppFooter;
