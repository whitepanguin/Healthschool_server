// routes/videoRouter.js
import express from 'express';
import {upload, getVideos, uploadVideoWithThumbnail, getComments, getReplyComments, addComments, addReplyComments, deleteReplyComments, getVideoAndIncViewCount, deleteComment } from '../../controller/video/videoController.js';

const videoRouter = express.Router();

// 동영상 목록 조회 API
videoRouter.get("/list", getVideos);
videoRouter.get("/:videoId", getVideoAndIncViewCount);
videoRouter.get("/:videoId/comments", getComments);
videoRouter.post("/:videoId/comments", addComments);
videoRouter.get("/:commentId/replies",getReplyComments);
videoRouter.post("/:commentId/replies",addReplyComments);
videoRouter.delete("/:parentId/replies/:childId",deleteReplyComments);
videoRouter.post("/uploads",upload,uploadVideoWithThumbnail )
videoRouter.delete("/:videoId/comments/:commentId", deleteComment);
export default videoRouter;
