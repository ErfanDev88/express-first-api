import { Router } from "express";
import orderRouter from "./orders.js";

const router = Router()


router.use('/orders', orderRouter)

export default router