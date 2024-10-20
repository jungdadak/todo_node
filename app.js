import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRouter from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const app = express();
app.use(cors());
// JSON 요청 본문을 처리
app.use(express.json());

// 라우터 설정
app.use('/api', indexRouter);
const mongoURI = MONGODB_URI_PROD;
// MongoDB URI (환경 변수에서 불러오기)

// MongoDB 연결
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.log('DB connection failed', err);
  });

// 서버 시작
app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});
