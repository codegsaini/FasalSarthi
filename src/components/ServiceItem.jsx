import "../style/css/ServiceItem.css";
import Icon from "../img/tractor.png";
const ServiceItem = () => {
	return (
		<div className="service-item">
			<img src={Icon} alt="" />
			<h2>This is service name</h2>
			<p id="service-price">$999</p>
			<p>443 reviews | 4.3 rating</p>
		</div>
	);
};

export default ServiceItem;
