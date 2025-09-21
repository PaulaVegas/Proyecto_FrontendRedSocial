import { Spin } from "antd";
import "./LoadingSpinner.scss";

const LoadingSpinner = ({ 
	size = "default", 
	text = "Cargando...", 
	fullScreen = false,
	className = "" 
}) => {
	const content = (
		<div className={`loading-spinner ${className} ${fullScreen ? 'fullscreen' : ''}`}>
			<Spin size={size} />
			{text && <p className="loading-text">{text}</p>}
		</div>
	);

	return content;
};

export default LoadingSpinner;
