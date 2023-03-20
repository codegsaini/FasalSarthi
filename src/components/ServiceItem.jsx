import "../style/css/ServiceItem.css";
import Icon from "../img/tractor.png";
const ServiceItem = () => {
	return (
		<div className="service-item">
			<img src={Icon} alt="" />
			<h2>Example of service name</h2>
			<p id="service-price">₹999</p>
			<p>4.3 rating | 443 reviews</p>
		</div>
	);
};

export default ServiceItem;
