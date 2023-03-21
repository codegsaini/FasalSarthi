import "../style/css/ManageFarm.css";

import Logo from "../img/crops.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Weather from "../img/weather.png";
import Wheat from "../img/wheatt.png";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const ManageFarm = () => {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	});
	const dispatch = useDispatch();
	return (
		<div id="manage-farm-container">
			<div id="admin-sidebar">
				<img id="company-logo" src={Logo} alt="" />
				<div id="user-info-wrapper">
					<div id="user-img"></div>
					<p id="username">Username</p>
					<button onClick={() => dispatch(logout())}>Logout</button>
				</div>
				<div id="admin-nav-links-wrapper">
					<a href="#">Dashboard</a>
					<a href="#">My Crops</a>
					<a href="#">Notification</a>
					<a href="#">Subscription</a>
					<a href="#">Call expert</a>
					<a href="#">Settings</a>
				</div>
			</div>
			<div id="dashboard-content">
				<div id="left">
					<h2>Planning to sow a crop?</h2>
					<div id="addcrop">
						<button>Start crop journey</button>
						<p>OR</p>
						<button>Call Expert</button>
					</div>

					<p className="section-label">Weather Forecast</p>
					<div id="weather-wrapper">
						<img src={Weather} alt="" />
						<h3>
							Jaipur, <span>Rajasthan</span>
						</h3>
						<h2>37°C</h2>
					</div>
					<p className="section-label">
						Crop suggestion for current season
					</p>
					<div id="crop-suggestion-wrapper">
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
					</div>
					<p className="section-label">Recommended</p>
					<div id="crop-recommendation-wrapper">
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
						<p className="crop-suggestion">Example crop</p>
					</div>
				</div>
				<div id="right">
					<p className="section-label">Your crops information</p>
					<div id="crop-information-container">
						<div className="crop-info">
							<img src={Wheat} alt="" />
							<h2>Crop : Wheat _example_</h2>
							<p className="completed-task">
								Task 1 : Prepare soil
							</p>
							<p className="completed-task">
								Task 2 : Sow in seeds
							</p>
							<p className="completed-task">
								Task 3 : First watering
							</p>
							<p className="completed-task">
								Task 4 : Precaution for diseases
							</p>
							<p className="completed-task">
								Task 5 : Second watering
							</p>
							<p className="completed-task">
								Task 6 : Third watering
							</p>
							<p>Task 7 : Harvesting</p>
						</div>
						<div className="crop-info">
							<img src={Wheat} alt="" />
							<h2>Crop : Wheat _example_</h2>
							<p className="completed-task">
								Task 1 : Prepare soil
							</p>
							<p className="completed-task">
								Task 2 : Sow in seeds
							</p>
							<p className="completed-task">
								Task 3 : First watering
							</p>
							<p className="completed-task">
								Task 4 : Precaution for diseases
							</p>
							<p className="completed-task">
								Task 5 : Second watering
							</p>
							<p className="completed-task">
								Task 6 : Third watering
							</p>
							<p>Task 7 : Harvesting</p>
						</div>
						<div className="crop-info">
							<img src={Wheat} alt="" />
							<h2>Crop : Wheat _example_</h2>
							<p className="completed-task">
								Task 1 : Prepare soil
							</p>
							<p className="completed-task">
								Task 2 : Sow in seeds
							</p>
							<p className="completed-task">
								Task 3 : First watering
							</p>
							<p className="completed-task">
								Task 4 : Precaution for diseases
							</p>
							<p className="completed-task">
								Task 5 : Second watering
							</p>
							<p className="completed-task">
								Task 6 : Third watering
							</p>
							<p>Task 7 : Harvesting</p>
						</div>
						<div className="crop-info">
							<img src={Wheat} alt="" />
							<h2>Crop : Wheat _example_</h2>
							<p className="completed-task">
								Task 1 : Prepare soil
							</p>
							<p className="completed-task">
								Task 2 : Sow in seeds
							</p>
							<p className="completed-task">
								Task 3 : First watering
							</p>
							<p className="completed-task">
								Task 4 : Precaution for diseases
							</p>
							<p className="completed-task">
								Task 5 : Second watering
							</p>
							<p className="completed-task">
								Task 6 : Third watering
							</p>
							<p>Task 7 : Harvesting</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageFarm;
