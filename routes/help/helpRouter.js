import express from 'express';
import {  getNotice, getPopularQuestion,postChat } from '../../controller/help/helpcontroller.js';

const helpRouter = express.Router()

helpRouter.get("/getPopularQuesetion", getPopularQuestion)
helpRouter.get("/getNotice", getNotice)
helpRouter.post("/postchat", postChat)

export default helpRouter;