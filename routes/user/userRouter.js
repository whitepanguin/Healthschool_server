import express from 'express';
import { register, login, modify, remove, updatePicture, findUser, findPassword } from '../../controller/user/userController.js';

const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.put("/modify", modify)
userRouter.delete("/remove", remove)
userRouter.post("/picture", updatePicture)
userRouter.post("/findUser", findUser)
userRouter.post("/findPass", findPassword)

export default userRouter;