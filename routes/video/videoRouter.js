// routes/videoRouter.js
import express from 'express';
import { getVideos, addVideo, getComments, getReplyComments, addComments } from '../../controller/video/videoController.js';

const videoRouter = express.Router();

// 동영상 목록 조회 API
videoRouter.get("/list", getVideos);
videoRouter.get("/:videoId/comments", getComments);
videoRouter.post("/:videoId/comments", addComments);
videoRouter.get("/:commentId/replies",getReplyComments);
videoRouter.post("/list", addVideo);

export default videoRouter;
