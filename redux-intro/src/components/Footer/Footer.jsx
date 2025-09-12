import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const AppFooter = () => {
	return (
		<Footer className="app-footer">
			<div className="footer-inner">
				<div className="footer-links">
					<Link to="/about">Sobre nosotros</Link>
					<Link to="/cookies">Política de cookies</Link>
					<Link to="/contact">Contacto</Link>
				</div>
				<div className="footer-copy">
					© {new Date().getFullYear()} MeowSpace 🐾
					<p>Proyecto de aprendizaje</p>
				</div>
			</div>
		</Footer>
	);
};

export default AppFooter;
