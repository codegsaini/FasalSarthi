import { Link, Outlet } from "react-router-dom";
import "../style/css/Layout.css";
import Logo from "../img/crops.png";
import AshokLogo from "../img/ashok_logo.png";
const Layout = () => {
	return (
		<div id="main-container">
			<div id="header">
				<div id="logo-container">
					<img src={Logo} alt="" srcset="" />
				</div>
				<nav>
					<Link to="login" className="nav-link">
						Login Account
					</Link>
					<a>|</a>
					<Link to="register" id="header-primary-action-button">
						Register Now
					</Link>
				</nav>
			</div>
			<div id="nav-header">
				<div id="nav-header-link-container">
					<a className="nav-link" href="#">
						Home
					</a>
					<a className="nav-link" href="#">
						Machinery
					</a>
					<a className="nav-link" href="#">
						Tools
					</a>
					<a className="nav-link" href="#">
						Service
					</a>
					<a id="header-primary-action-button" href="#">
						Manage Farm
					</a>
				</div>
				<div id="nav-header-official-links-container">
					<a
						id="nav-ministry-link"
						href="https://agricoop.nic.in/en/Major"
						target={"_blank"}
					>
						<img src={AshokLogo} alt="Ashok logo" />
						Government schemes
					</a>
				</div>
			</div>
			<div id="content-wrapper">
				<Outlet />
			</div>
		</div>
	);
};
export default Layout;
