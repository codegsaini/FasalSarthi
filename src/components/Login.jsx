import "../style/css/Auth.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import $ from "jquery";

let errorTimer;
let errorTimeout;
const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

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

	useEffect(() => {
		if (isError) {
			showError(message);
		}
		if (isSuccess || user) {
			navigate("/");
		}
		if (isLoading) {
			showProgressbar(".submitProgressBar", ".submit-button");
		} else {
			hideProgressbar(".submitProgressBar", ".submit-button");
		}
		dispatch(reset());
	}, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (email === "") {
			showError("Email is required");
			return;
		}
		if (password === "") {
			showError("Password should not be empty");
			return;
		}
		const userData = {
			email,
			password,
		};
		dispatch(login(userData));
	};
	const onRegistrationClicked = () => {
		navigate("/register");
	};

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
		$("#login-error-div").show();
		$("#login-error-message").text(message);

		hideResponseAfterDelay();
	};
	const hideResponseAfterDelay = () => {
		clearTimeout(errorTimeout);
		errorTimeout = setTimeout(() => {
			$("#login-error-div").hide();
		}, 5000);
	};
	$("#login-error-remove-button").on("click", () => {
		clearTimeout(errorTimeout);
		$("#login-error-div").hide();
	});
	/* RESPONSE ------------------*/
	return (
		<>
			<div className="error-div" id="login-error-div">
				<p className="error-message" id="login-error-message"></p>
				<p
					onClick={() => {
						$("#login-error-div").hide();
					}}
					className="error-remove-button"
					id="login-error-remove-button"
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
							Login <br /> to your Account
						</h2>
					</div>
					<div className="auth-form">
						<h2 className="auth-heading">Login</h2>
						<div className="input-field">
							<p className="input-label">Email</p>
							<input
								className="input-box"
								type="email"
								name="email"
								value={email}
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
							<button
								onClick={() => {
									alert("wait! This feature is pending");
								}}
								id="forgot-password-button"
							>
								Forgot Password?
							</button>
						</div>
						<input
							onClick={onSubmit}
							className="input-box submit-button"
							type="submit"
						/>
						<div className="progressbar submitProgressBar"></div>
						<p
							className="auth-type-change-link"
							onClick={onRegistrationClicked}
						>
							Don't have account? Click to register.
						</p>
						<p id="error-div"></p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
