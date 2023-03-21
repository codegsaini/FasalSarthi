import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/css/Services.css";
import ServiceItem from "./ServiceItem";
import { API_URL } from "./util/ApiUtil";

const Services = () => {
	const [services, setServices] = useState([]);
	const { user } = useSelector((state) => state.auth);
	const getServices = async () => {
		try {
			let docs = await axios.get(API_URL + "service/get");
			if (!docs) {
				throw "Something went wrong while getting service";
			}
			setServices(docs.data.snapshot);
		} catch (error) {
			alert(error);
		}
	};
	useEffect(() => {
		getServices();
	}, []);
	return (
		<div id="service-container">
			<div id="service-upload-section">
				<h3>You provide agriculture related service?</h3>
				<p>List your service at our site today!</p>
				{user && <Link to={"submit-service"}>Submit Service</Link>}
				{!user && <Link to={"register"}>Submit Service</Link>}
			</div>
			<h2 className="section-label">Affordable services</h2>
			<div id="services-wrapper">
				{services.map((service, index) => {
					return ServiceItem(service);
				})}
			</div>
		</div>
	);
};

export default Services;
