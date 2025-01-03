// routes/videoRouter.js
import express from 'express';
import { getVideos, addVideo } from '../../controller/video/videoController.js';

const videoRouter = express.Router();

// 동영상 목록 조회 API
videoRouter.get("/list", getVideos);

// 동영상 추가 API
videoRouter.post("/list", addVideo);

export default videoRouter;
