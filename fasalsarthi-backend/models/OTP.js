import pkg from "mongoose";

const { mongoose, model } = pkg;

const Schema = mongoose.Schema;

let otpSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		otp: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: "otp",
	}
);
otpSchema.index(
	{
		updatedAt: 1,
	},
	{ expireAfterSeconds: 300 }
);

export default mongoose.model("OTP", otpSchema);
