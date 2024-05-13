import express from 'express';
const userRouter = express.Router();
import { createUser, loginUser } from '../controllers/userController.js';
userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
export default userRouter;