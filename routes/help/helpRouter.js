import express from 'express';
import {  getPopularQuestion } from '../../controller/help/helpcontroller.js';

const helpRouter = express.Router()

helpRouter.get("/getPopularQuesetion", getPopularQuestion)

export default helpRouter;