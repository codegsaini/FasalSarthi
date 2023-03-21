import "../style/css/Auth.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import { TempMails } from "./TempMail";

import $ from "jquery";
import axios from "axios";
import { API_URL } from "./util/ApiUtil";

let OneTimePass = "0";

let resendTimer;
let resendTimeout;
let errorTimer;
let errorTimeout;
let shouldSendOtp = true;
let passwordIsStrong = false;

const Register = () => {
	const location = useLocation();
	const isFromUpload = location.state
		? location.state.isFromUpload
			? location.state.isFromUpload
			: false
		: false;
	const navigate = useNavigate();
	/**************RESPONSE */
	const showError = (message) => {
		clearInterval(errorTimer);
		let timeout = 5;
		errorTimer = setInterval(
			(function f() {
				if (timeout < 1) {
					clearInterval(errorTimer);
				}
				return f;
			})(),
			1000
		);
		$("#registration-error-div").show();
		$("#registration-error-message").text(message);

		hideResponseAfterDelay();
	};
	const hideResponseAfterDelay = () => {
		clearTimeout(errorTimeout);
		errorTimeout = setTimeout(() => {
			$("#registration-error-div").hide();
		}, 5000);
	};
	$("#registration-error-remove-button").on("click", () => {
		clearTimeout(errorTimeout);
		$("#registration-error-div").hide();
	});
	/* RESPONSE ------------------*/
	const showProgressbar = (progressbar, element) => {
		$(progressbar).show();
		if (element) {
			$(element).hide();
		}
	};

	const hideProgressbar = (progressbar, element) => {
		$(progressbar).hide();
		if (element) {
			$(element).show();
		}
	};

	const generateOTP = () => {
		let digits = "0123456789";
		let OTP = "";
		for (let i = 0; i < 6; i++) {
			OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
	};

	useEffect(() => {
		$("#signupmode-normal").trigger("click");
	}, []);

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		otp: "",
		password: "",
		cpassword: "",
	});

	const { username, email, otp, password, cpassword } = formData;

	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			showError(message);
		}
		if (isLoading) {
			showProgressbar(".submitProgressBar", ".submit-button");
		} else {
			hideProgressbar(".submitProgressBar", ".submit-button");
		}
		if (isSuccess) {
			navigate("/");
		}
		dispatch(reset());
	}, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (username.trim() == "") {
			showError("Username is required");
			return;
		}
		if (email.trim() == "") {
			showError("Email is required");
			return;
		}
		if (password == "") {
			showError("Password should not be empty");
			return;
		}
		if (password !== cpassword) {
			showError("Password was not matched");
			return;
		}
		if (!passwordIsStrong) {
			showError("Please choose a strong password");
			return;
		}

		const userData = {
			username: username,
			email: email,
			otp: otp,
			password: password,
			cpassword: cpassword,
		};
		dispatch(register(userData));
	};
	const onLoginClicked = () => {
		navigate("/login");
	};

	const getOTP = async () => {
		if (emailNotValid()) {
			showError("Email is invalid");
			return;
		}
		if (!shouldSendOtp) {
			return;
		}
		showProgressbar(".otpProgressBar", ".mail-otp-get-button");
		OneTimePass = generateOTP();
		try {
			let data = {
				email: email,
				otp: OneTimePass,
			};
			let response = await axios.post(API_URL + "otp/add", data);
			if (!response) {
				showError("Something went wrong");
				return;
			}
		} catch (error) {
			showError("Something went wrong!");
			return;
		}
		let data = {
			email: email,
			username: username.trim() == "" ? "User" : username,
			otp: OneTimePass,
		};
		try {
			let mail = await axios.post(API_URL + "get-otp", data);
			hideProgressbar(".otpProgressBar", ".mail-otp-get-button");
			if (!mail) {
				showError("Somthing went wrong!");
				return;
			}
			waitForResend();
		} catch (error) {
			showError(error);
		}
	};

	const waitForResend = () => {
		$(".mail-otp-get-button").addClass("otp-wait");
		shouldSendOtp = false;
		clearInterval(resendTimer);
		let timeout = 15;
		resendTimer = setInterval(
			(function f() {
				$(".mail-otp-get-button").text("Resend in " + --timeout + " s");
				if (timeout < 1) {
					clearInterval(resendTimer);
				}
				return f;
			})(),
			1000
		);

		allowResend();
	};
	const allowResend = () => {
		clearTimeout(resendTimeout);
		resendTimeout = setTimeout(() => {
			$(".mail-otp-get-button").removeClass("otp-wait");
			$(".mail-otp-get-button").text("Get OTP");
			shouldSendOtp = true;
		}, 15000);
	};
	useEffect(() => {
		checkStrength(password);
	}, [password]);

	function checkStrength(password) {
		let strength = 0;

		//If password contains both lower and uppercase characters
		if (password.match(/([a-z])|([A-Z])/)) {
			strength += 1;
		}
		if (password.match(/([A-Z])/) && password.length > 7) {
			strength += 1;
		}
		//If it has numbers and characters
		if (password.match(/([0-9])/)) {
			strength += 1;
		}
		//If it has one special character
		if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
			strength += 1;
		}
		//If password is greater than 7
		if (password.length > 7) {
			strength += 1;
		}

		showPasswordStrength(strength);
	}
	const showPasswordStrength = (level) => {
		let background = "#fff";

		// eslint-disable-next-line default-case
		switch (level) {
			case 1:
				background = "#ff4848";
				break;
			case 2:
				background = "#ffc048";
				break;
			case 3:
				background = "#f2ff48";
				break;
			case 4:
				background = "#62ff48";
				break;
			case 5:
				background = "#309f16";
				break;
		}
		if (level > 2) {
			passwordIsStrong = true;
		} else {
			passwordIsStrong = false;
		}
		$(".password-strength")
			.width(20 * level + "%")
			.css("background", background);
	};

	const emailNotValid = () => {
		var regex =
			/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		let check1 = regex.test(email);
		let domain = email.split("@").pop();
		const array = TempMails;

		let check2 = array.includes(domain);
		return !(check1 && !check2);
	};
	return (
		<>
			<div className="error-div" id="registration-error-div">
				<p
					className="error-message"
					id="registration-error-message"
				></p>
				<p
					onClick={() => {
						$("#registration-error-div").hide();
					}}
					className="error-remove-button"
					id="registration-error-remove-button"
				>
					X
				</p>
			</div>
			<div className="form-container">
				<div className="form-wrapper">
					<div className="auth-page-info-wrapper">
						<button
							onClick={() => {
								navigate(-1);
							}}
						>
							Back
						</button>
						<h2>
							Welcome <br /> to Fasal Sarthi
						</h2>
					</div>
					<div className="auth-form">
						<h2 className="auth-heading">New Registration</h2>

						<div id="signup-admin">
							<div className="input-field">
								<p className="input-label">Full Name</p>
								<input
									className="input-box"
									type="text"
									name="username"
									value={username}
									onChange={onChange}
								/>
							</div>

							<div className="input-field mail-input-field">
								<p className="input-label">Email</p>
								<div className="mail-input-wrapper">
									<input
										className="input-box mail-input-box"
										type="email"
										name="email"
										value={email}
										onChange={onChange}
									/>
									<button
										onClick={getOTP}
										className="mail-otp-get-button"
									>
										Get OTP
									</button>
									<div className="progressbar otpProgressBar"></div>
								</div>
							</div>
							<div className="input-field">
								<p className="input-label">OTP</p>
								<input
									className="input-box"
									type="number"
									name="otp"
									value={otp}
									onChange={onChange}
								/>
							</div>
							<div className="input-field">
								<p className="input-label">Password</p>
								<input
									className="input-box"
									type="password"
									name="password"
									value={password}
									onChange={onChange}
								/>
								<div className="password-strength-wrapper">
									<div className="password-strength"></div>
								</div>
							</div>
							<div className="input-field">
								<p className="input-label">Confirm Password</p>
								<input
									className="input-box"
									type="password"
									name="cpassword"
									value={cpassword}
									onChange={onChange}
								/>
							</div>
							<button
								onClick={onSubmit}
								className="input-box submit-button"
								value={1}
							>
								Submit
							</button>
							<div className="progressbar submitProgressBar"></div>
						</div>
						<p
							className="auth-type-change-link"
							onClick={onLoginClicked}
						>
							Already have an account? Click to login.
						</p>

						<p id="error-div"></p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
