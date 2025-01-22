import express from 'express';
import {  getNotice, getPopularQuestion,getPostChat,postChat } from '../../controller/help/helpcontroller.js';

const helpRouter = express.Router()

helpRouter.get("/getPopularQuesetion", getPopularQuestion)
helpRouter.get("/getNotice", getNotice)
helpRouter.post("/postchat", postChat)
helpRouter.post("/getPostChat", getPostChat)

export default helpRouter;