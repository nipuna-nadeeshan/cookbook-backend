import express from 'express';
import cors from 'cors';
import './db/db.js'
import userRouter from './routers/userRouter.js';
import authenticateUserToken from './middlewares/userAuth.js';
import likeRouter from './routers/likeRouter.js';
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authenticateUserToken)
app.use("/users", userRouter);
app.use("/likes", likeRouter);
app.listen(
    5000,
    console.log('server running on port 5000')
)