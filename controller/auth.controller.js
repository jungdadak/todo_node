import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authController = {};
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.autehticate = (req, res, next) => {
	try {
		const tokenString = req.headers.authorization;
		if (!tokenString) {
			throw new Error("Token is required");
		}
		const token = tokenString.replace("Bearer ", "");
		jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
			if (error) {
				throw new Error("Token is invalid");
			}
			//	res.status(200).json({ status: "success", userID: payload });
			req.userId = payload._id;
			next();
		});
	} catch (error) {
		res.status(400).json({ status: "fail", message: error.message });
	}
};

export default authController;
