import notFound from "../assets/images/404_error.jpg";

const NotFound = () => {
	return (
		<div>
			<img src={notFound} alt="404 Not Found" />
		</div>
	);
};

export default NotFound;
