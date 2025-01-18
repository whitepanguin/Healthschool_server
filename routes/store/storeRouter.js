// routes/videoRouter.js
import express from 'express';
import { getStores, addStore, checkStore, addreceipt, getreceipt } from '../../controller/store/storeController.js';

const storeRouter = express.Router();

// 스토어 목록 조회 API
storeRouter.get("/list", getStores);

// 스토어 추가 API
storeRouter.post("/list", addStore);

// 스토어 체크크
storeRouter.post("/details", checkStore);

storeRouter.post("/receipt", addreceipt);

storeRouter.get("/check", getreceipt);


export default storeRouter;
