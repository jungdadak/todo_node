import User from "../model/User.js";
import bcrypt from "bcryptjs";

const userController = {};
const saltRounds = 10;

userController.createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (user) {
			throw new Error("감사하지만 가입은 한번만 가능해요");
		}
		const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(password, salt);
		const newUser = new User({ name, email, password: hash });
		await newUser.save();
		res.status(200).json({ status: "가입완료" });
	} catch (error) {
		res.status(400).json({ status: "오류", message: error.message });
	}
};

userController.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }, "-__v -createdAt -updatedAt");
		if (!user) {
			throw new Error("아이디를 다시 확인해주세요");
		}
		const isMatch = bcrypt.compareSync(password, user.password);
		if (isMatch) {
			const token = user.generateToken();
			return res.status(200).json({ status: "로그인 성공", user, token });
		}
		throw new Error("비밀번호를 다시 확인해주세요");
	} catch (err) {
		res.status(400).json({ status: "오류", message: err.message });
	}
};

export default userController;

userController.getUser = async (req, res) => {
	try {
		const { userId } = req;
		const user = User.findById(userId);
		if (!user) {
			throw new Error("사용자를 찾을 수 없습니다.");
		}
		res.status(200).json({ status: "success", user });
	} catch (error) {}
};
