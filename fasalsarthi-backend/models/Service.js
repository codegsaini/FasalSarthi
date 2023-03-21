import pkg from "mongoose";

const { mongoose, model } = pkg;

const Schema = mongoose.Schema;

let serviceSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: "service",
	}
);

export default mongoose.model("Service", serviceSchema);
