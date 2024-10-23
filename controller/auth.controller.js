import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authController = {};
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
	try {
		const tokenString = req.headers.authorization;
		if (!tokenString) {
			throw new Error("토큰이 필요합니다.");
		}
		const token = tokenString.replace("Bearer ", "");
		// 동기적으로 jwt.verify 사용
		const payload = jwt.verify(token, JWT_SECRET_KEY);
		req.userId = payload._id;
		next();
	} catch (error) {
		res.status(401).json({ status: "fail", message: error.message });
	}
};

export default authController;
