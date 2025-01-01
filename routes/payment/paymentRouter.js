import express from 'express'
import { tossPayment } from '../../controller/payment/payment.js';

const paymentRouter = express.Router()

paymentRouter.post("/toss", tossPayment)

export default paymentRouter;