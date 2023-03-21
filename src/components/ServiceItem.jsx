import "../style/css/ServiceItem.css";
import Icon from "../img/tractor.png";
const ServiceItem = ({ title, price }) => {
	return (
		<div className="service-item">
			<img src={Icon} alt="" />
			<h2>{title}</h2>
			<p id="service-price">₹{price}</p>
			<p>4.3 rating | 443 reviews</p>
		</div>
	);
};

export default ServiceItem;
