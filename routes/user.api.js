import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.send('create user controller will be here');
});

export default router;
