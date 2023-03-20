import "../style/css/Services.css";
import ServiceItem from "./ServiceItem";

const Services = () => {
	return (
		<div id="service-container">
			<div id="service-upload-section">
				<h3>You provide agriculture related service?</h3>
				<p>List your service at our site today!</p>
				<button>Submit Service</button>
			</div>
			<h2 className="section-label">Affordable services</h2>
			<div id="services-wrapper">
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
			</div>
		</div>
	);
};

export default Services;
