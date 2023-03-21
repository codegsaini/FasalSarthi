import jwt from "jsonwebtoken";
import { Err } from "../helper/Err.js";

import User from "../models/User.js";

export const protect = async (req, res, next) => {
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				throw new Err(401, "Unauthorized access");
			}
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
			if (!decoded) {
				throw new Err(401, "Unauthorized access");
			}
			const user = await User.findById(decoded.userId).select(
				"-password"
			);
			if (!user) {
				throw new Err(401, "Failed to check authorization");
			}
			req.user = user;
			next();
		} else {
			throw new Err(401, "Unauthorized access");
		}
	} catch (error) {
		next(error);
	}
};
export const protectAdmin = async (req, res, next) => {
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			const token = req.headers.authorization.split(" ")[1];
			if (!token) {
				throw new Err(401, "Unauthorized access");
			}
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
			if (!decoded) {
				throw new Err(401, "Session timeout ! PLease login again");
			}
			const user = await User.findById(decoded.userId).select(
				"-password"
			);
			if (!user) {
				throw new Err(401, "Failed to check authorization");
			}
			if (!user.isMaster) {
				throw new Err(401, "Unauthorized access");
			}
			req.user = user;
			next();
		} else {
			throw new Err(401, "Unauthorized access");
		}
	} catch (error) {
		next(error);
	}
};
