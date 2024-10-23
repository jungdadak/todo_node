import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = Schema(
	{
		task: {
			type: String,
			required: true,
		},
		isComplete: {
			type: Boolean,
			required: true,
		},
		author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
