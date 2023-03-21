import "../style/css/Auth.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import $ from "jquery";
import axios from "axios";
import { API_URL } from "./util/ApiUtil";

let errorTimer;
let errorTimeout;

const UploadService = () => {
	const location = useLocation();

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
		$("#service-upload-error-div").show();
		$("#service-upload-error-message").text(message);

		hideResponseAfterDelay();
	};
	const hideResponseAfterDelay = () => {
		clearTimeout(errorTimeout);
		errorTimeout = setTimeout(() => {
			$("#service-upload-error-div").hide();
		}, 5000);
	};
	$("#service-upload-error-remove-button").on("click", () => {
		clearTimeout(errorTimeout);
		$("#service-upload-error-div").hide();
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

	const [formData, setFormData] = useState({
		title: "",
		price: "",
	});
	const { title, price } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (title.trim() == "") {
			showError("Title is required");
			return;
		}
		if (price.trim() == "") {
			showError("Price is required");
			return;
		}

		const serviceData = {
			title: title,
			price: price,
		};
		try {
			let response = await axios.post(
				API_URL + "service/set",
				serviceData
			);
			if (!response) {
				throw "Something went wrong while setting service";
			}
			alert("Service uploaded successfully!");
			navigate("/");
		} catch (error) {
			alert(error);
		}
	};

	return (
		<>
			<div className="error-div" id="service-upload-error-div">
				<p
					className="error-message"
					id="service-upload-error-message"
				></p>
				<p
					onClick={() => {
						$("#service-upload-error-div").hide();
					}}
					className="error-remove-button"
					id="service-upload-error-remove-button"
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
							Upload <br /> Your service
						</h2>
					</div>
					<div className="auth-form">
						<h2 className="auth-heading">New service</h2>

						<div id="submit-service">
							<div className="input-field">
								<p className="input-label">Title</p>
								<input
									className="input-box"
									type="text"
									name="title"
									value={title}
									onChange={onChange}
								/>
							</div>

							<div className="input-field">
								<p className="input-label">Price</p>
								<input
									className="input-box"
									type="number"
									name="price"
									value={price}
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

						<p id="error-div"></p>
					</div>
				</div>
			</div>
		</>
	);
};

export default UploadService;
