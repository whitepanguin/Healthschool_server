import express from 'express';
import { getCertifyList, updateCertifyStatus } from '../../controller/admin/adminController.js';

const certifyRouter = express.Router()

certifyRouter.get("/list",getCertifyList)
certifyRouter.put("/update/:id", updateCertifyStatus);

export default certifyRouter;