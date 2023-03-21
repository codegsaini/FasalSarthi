import "../style/css/Home.css";
import Services from "./Services";
import Farmer from "../img/kkkk.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
	let { user } = useSelector((state) => state.auth);
	return (
		<div id="home-container">
			<div id="rates-header">
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderTop: "10px solid red",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Musturd</p>
						<p className="crop-rating-rate">-2%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
				<div className="crop-rating" href="#">
					<p
						className="crop-rating-sign"
						style={{
							borderBottom: "10px solid #5fad49",
						}}
					></p>
					<div className="crop-rating-info">
						<p className="crop-rating-title">Wheat</p>
						<p className="crop-rating-rate">20%</p>
					</div>
				</div>
			</div>
			<div id="full-header">
				<a href="#service-container" className="header-button">
					<div>
						<p>किफायती सेवाएं खोजें</p>
						<p>Affordable services</p>
					</div>
					<div>
						<img src={Farmer} alt="" />
					</div>
				</a>
				{user && (
					<Link to={"manage-farm"} className="header-button">
						<div>
							<p>खेती बाड़ी की देख रेख</p>
							<p>Manage Farm</p>
						</div>
						<div>
							<img src={Farmer} alt="" />
						</div>
					</Link>
				)}
				{!user && (
					<Link to={"login"} className="header-button">
						<div>
							<p>खेती बाड़ी की देख रेख</p>
							<p>Manage Farm</p>
						</div>
						<div>
							<img src={Farmer} alt="" />
						</div>
					</Link>
				)}
			</div>
			<Services />
		</div>
	);
};

export default Home;
