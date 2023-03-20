import "../style/css/ManageFarm.css";

import Logo from "../img/crops.png";
const ManageFarm = () => {
	return (
		<div id="manage-farm-container">
			<div id="admin-sidebar">
				<img id="company-logo" src={Logo} alt="" />
				<div id="user-info-wrapper">
					<div id="user-img"></div>
					<p id="username">Gaurav Saini</p>
				</div>
			</div>
		</div>
	);
};

export default ManageFarm;
