import Router from 'express'
import { Adduser, loginUser } from '../Controllers/userController.js';
import { verifyToken } from '../Middlewares/token.js';
export const userRouter = Router();
userRouter.post('/addUser',Adduser)
.post('/login',loginUser)
