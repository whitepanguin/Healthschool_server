// routes/videoRouter.js
import express from 'express';
import { getStores, addStore } from '../../controller/store/storeController.js';

const storeRouter = express.Router();

// 동영상 목록 조회 API
storeRouter.get("/list", getStores);

// 동영상 추가 API
storeRouter.post("/list", addStore);

export default storeRouter;
