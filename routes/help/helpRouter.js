import express from 'express';
import {  getNotice, getPopularQuestion } from '../../controller/help/helpcontroller.js';

const helpRouter = express.Router()

helpRouter.get("/getPopularQuesetion", getPopularQuestion)
helpRouter.get("/getNotice", getNotice)

export default helpRouter;