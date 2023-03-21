import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import { handleError } from "./helper/Err.js";

import authRoute from "./routes/auth.js";
import otpRoute from "./routes/otpRoute.js";
dotenv.config();

let mongoDBOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

(async () => {
	try {
		await mongoose.connect(process.env.ATLAS_URI, mongoDBOptions);
		console.log("Database connected!");
	} catch (error) {
		console.log("Database connection failed with following error" + error);
	}
})();

const app = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoute);
app.use("/api", otpRoute);
app.use((error, request, response, next) => {
	handleError(error, response);
});

app.use("/", (request, response) => response.send("Unauthorized access"));

app.listen(process.env.PORT, () => console.log("Server started"));
