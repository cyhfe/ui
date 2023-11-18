import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  console.log(1);
  res.json({ msg: 'hello ' });
});
export default router;
