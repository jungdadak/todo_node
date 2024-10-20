import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const Schema = mongoose.Schema;
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 패스워드를 애초부터 제공하지 않는 방법이 있다 -> 음???get에서막으면되나
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
  //this는 userSchema를 가리킨다.
}; //json으로 변환시 패스워드를 제거한다!!

//스키마에서 jwt 토큰 생성 하는 이유??
//몽구스 스키마 instance method : 모델에 메서드를 사용 가능하다.
//필드에 메서드를 정의하거나  스키마.method로 정의한 메서드를 사용할 수 있다.

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: '7d',
  });
  return token;
};
const User = mongoose.model('User', userSchema);
export default User;
