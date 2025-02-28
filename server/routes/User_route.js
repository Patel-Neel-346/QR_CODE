import express from 'express';
import { getUserData, login, logout, register, resetPassword } from '../controller/User_controller.js';
import { authUser } from '../middleware/authUser.js';
const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/register',register);
userRouter.get('/logout',authUser,logout);
userRouter.get('/get',authUser,getUserData);
userRouter.post('/reset',resetPassword)

export default userRouter;