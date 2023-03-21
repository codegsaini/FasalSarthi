import OTP from "../models/OTP.js";
import { Err } from "../helper/Err.js";

export const addOtp = async (req, res, next) => {
	let { email, otp } = req.body;
	try {
		let response = await OTP.findOneAndUpdate(
			{
				email: email,
			},
			{
				email: email,
				otp: otp,
			},
			{
				upsert: true,
				new: true,
				setDefaultsOnInsert: true,
			}
		);
		if (!response) {
			throw new Err(422, "Something went wrong");
		}
		res.status(200).json({
			message: "Success",
			data: response.data,
		});
	} catch (error) {
		next(error);
	}
};
export const getOtp = async (req, res, next) => {
	let { email } = req.body;
	try {
		let otpDoc = await OTP.findOne({ email: email });
		if (otpDoc == null) {
			res.status(200).json({
				data: otpDoc,
			});
			return;
		}
		if (!otpDoc) {
			throw new Err(422, "Something went wrong");
		}
		res.status(200).json({
			data: otpDoc,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteOtp = async (req, res, next) => {
	let { email } = req.body;
	try {
		let response = await OTP.deleteOne({ email: email });
		if (!response) {
			throw new Err(422, "Something went wrong");
		}
		res.status(200).json({
			message: "Deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};
