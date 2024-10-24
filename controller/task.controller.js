import Task from "../model/Task.js";
const taskController = {};

taskController.createTask = async (req, res) => {
	try {
		const { task, isComplete } = req.body;
		const { userId } = req;
		const newTask = new Task({ task, isComplete, author: userId });
		await newTask.save();
		res.status(200).json({ status: "ok", data: newTask });
	} catch (err) {
		res.status(400).json({ status: "fail", error: err });
	}
};
taskController.getTask = async (req, res) => {
	try {
		const taskList = await Task.find().select("-__v").populate("author", "name"); // 필요한 필드만 선택 가능
		res.status(200).json({ status: "ok", data: taskList });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ status: "fail", message: "서버 오류가 발생했습니다." });
	}
};

taskController.updateTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			throw new Error("App can not find the task");
		}
		const fields = Object.keys(req.body);
		fields.map((item) => (task[item] = req.body[item]));
		await task.save();
		res.status(200).json({ status: "success", data: task });
	} catch (error) {
		res.status(400).json({ status: "fail", error });
	}
};
taskController.deleteTask = async (req, res) => {
	try {
		const deleteItem = await Task.findByIdAndDelete(req.params.id);
		res.status(200).json({ status: "success", data: deleteItem });
	} catch (error) {
		res.status(400).json({ status: "fail", error });
	}
};
export default taskController;
