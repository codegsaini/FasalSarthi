import User from "../models/User.js";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import createJWT from "../utils/auth.js";

import { Err } from "../helper/Err.js";

import NodeMailer from "nodemailer";
import Handlebars from "handlebars";
import pkg from "path";
const { path, dirname } = pkg;
import { fileURLToPath } from "url";
import OTP from "../models/OTP.js";
import Service from "../models/Service.js";
import { response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const emailRegexp =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const signup = async (req, res, next) => {
	let { username, email, otp, password, cpassword } = req.body;

	try {
		if (!username) {
			throw new Err(422, "Name is required");
		}
		if (!email) {
			throw new Err(422, "Email address is required");
		}
		if (!emailRegexp.test(email)) {
			throw new Err(422, "Email is not valid");
		}
		if (!otp) {
			throw new Err(422, "OTP is required");
		}
		if (!password) {
			throw new Err(422, "Password must not be empty");
		}
		if (password !== cpassword) {
			throw new Err(422, "Password does not match");
		}

		let otpDoc = await OTP.findOne({ email: email });

		if (otpDoc == null) {
			throw new Err(422, "OTP is incorrect");
		}
		if (!otpDoc) {
			throw new Err(422, "Something went wrong! Please try again");
		}
		if (otp != otpDoc.otp) {
			throw new Err(422, "OTP is incorrect");
		}

		const userExists = await User.findOne({ email: email });

		if (userExists) {
			throw new Err(422, "Email already exist");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name: username,
			email: email,
			password: hashedPassword,
		});

		if (!user) {
			throw new Err(
				500,
				"Something went wrong while registration! Please try again."
			);
		}
		await OTP.deleteOne({ email: email });

		res.status(200).json({
			name: user.name,
			email: user.email,
			token: createJWT(user.email, user.id, 604800),
		});
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	let { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.status(200).json({
				id: user.id,
				isMaster: user.isMaster,
				name: user.name,
				email: user.email,
				token: createJWT(user.email, user.id, 604800),
				primaryBranch: user.primaryBranch,
				primaryInstitute: user.primaryInstitute,
				otherBranchUpload: user.otherBranchUpload,
				otherInstituteUpload: user.otherInstituteUpload,
			});
		} else {
			throw new Err(422, "Invalid login credentials");
		}
	} catch (error) {
		next(error);
	}
};

export const updatePassword = async (req, res, next) => {
	let { email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		let response = await User.updateOne(
			{ email: email },
			{ password: hashedPassword }
		);
		if (!response) {
			throw new Err(422, "Something went wrong");
		}
		await PasswordResetToken.deleteOne({ email: email });
		res.status(200).json({
			message: "Success",
		});
	} catch (error) {
		next(error);
	}
};

export const getOTP = async (req, res, next) => {
	let { email, username, otp } = req.body;
	const source = `
    <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Verify your email address</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
			rel="stylesheet"
		/>
		<style>
			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}
			body {
				padding: 50px;
			}
			h1 {
				font-family: "DM Serif Display", serif;
				font-size: 35px;
				padding: 10px 0;
			}
			p {
				font-family: "Roboto", sans-serif;
				font-weight: 400;
				padding: 20px 0;
				font-size: 20px;
			}
			#border {
				width: 100%;
				height: 2px;
				background: #e7e7e7;
			}
			#header {
				font-size: 35px;
				font-family: "Roboto", sans-serif;
				font-weight: 100;
				padding: 20px 0;
			}
			#otp {
				font-size: 60px;
				padding: 10px 0;
			}
			#note {
				font-size: 17px;
				color: #000000;
			}
			#footer {
				background: #5fad49;
				font-size: 16px;
				text-align: center;
				padding: 50px;
			}
			@media only screen and (max-width: 768px) {
				body {
					padding: 20px;
				}
				h1 {
					font-size: 35px;
				}
				#header {
					font-size: 35px;
					font-weight: 100;
					padding: 20px 0;
				}
			}
		</style>
	</head>
	<body>
		<h1>फसल सारथि</h1>
		<div id="border"></div>
		<p id="header">Verify your email to finish your registration</p>
		<p>Hi {{username}}, <br />फसल सारथि से जुड़ने के लिए धन्यवाद</p>
		<p>
			Please enter below One Time Password in the window where you started
			creating your account. This OTP is only valid for 5 minutes.
		</p>
		<p style="font-weight: 300; font-size: 30px; padding: 20px 0 0 0">
			Your OTP is:
		</p>
		<p id="otp">{{otp}}</p>
		<p id="note">
			If you didn't create an account in Fasal Sarthi, please ignore this
			message.
		</p>
		<p id="footer">
			You have received this message because someone have signed up for
			फसल सारथि using this email address. <br />If this was not you, ignore this message.
		</p>
	</body>
</html>
`;
	const template = Handlebars.compile(source);
	const replacements = {
		username: username,
		otp: otp,
	};
	const htmlToSend = template(replacements);
	const transporter = NodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
	});
	try {
		transporter.sendMail(
			{
				from: {
					name: "Fasal Sarthi",
					address: "no-reply@fasalsarthi.web.app",
				},
				to: email,
				subject: "Email verification",
				html: htmlToSend,
			},
			(error, data) => {
				if (error) {
					throw new Err(422, error);
				}
				res.status(200).json({
					message: "Success",
				});
			}
		);
	} catch (error) {
		next(error);
	}
};

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: "10d",
	});
};

const generateRandomNumber = (length) => {
	return Math.floor(
		Math.pow(10, length - 1) +
			Math.random() *
				(Math.pow(10, length) - Math.pow(10, length - 1) - 1)
	);
};

export const setService = async (req, res, next) => {
	let { title, price } = req.body;
	try {
		let task = await Service.create({
			title: title,
			price: price,
		});
		if (!task) {
			throw new Err(422, "Something went wrong while uploading service!");
		}
		res.status(200).json({
			message: "Service upload success",
		});
	} catch (error) {
		next(error);
	}
};
export const getService = async (req, res, next) => {
	try {
		let docs = await Service.find();
		if (!docs) {
			throw new Err(422, "Something went wrong while getting services");
		}
		res.status(200).json({
			snapshot: docs,
		});
	} catch (error) {
		next(error);
	}
};
