import notFound from "../../assets/images/404_error.jpg";

const NotFound = () => {
	return (
		<div>
			<h1>Oops, nothing to see here!</h1>
			<img src={notFound} alt="404 Not Found" />
		</div>
	);
};

export default NotFound;
