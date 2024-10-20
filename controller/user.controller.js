import User from '../model/User.js';
import bcrypt from 'bcrypt';
const userController = {};
const saltRounds = 10;

userController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error('감사하지만 가입은 한번만 가능해요');
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(200).json({ status: '가입완료' });
  } catch (error) {
    res.status(400).json({ status: '오류', message: error.message });
  }
};

export default userController;
