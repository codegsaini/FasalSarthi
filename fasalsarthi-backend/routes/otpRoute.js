import express from "express";
import { addOtp, deleteOtp, getOtp } from "../controller/otpController.js";

const otpRoute = express.Router();

otpRoute.post("/otp/add", addOtp);
otpRoute.post("/otp/get", getOtp);
otpRoute.post("/otp/delete", deleteOtp);

export default otpRoute;
