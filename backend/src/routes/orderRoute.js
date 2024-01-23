import express from 'express'
import * as orderController from '../controllers/orderController.js';

const router=express.Router()

router.route("/").post(orderController.order)
router.route("/getorder").get(orderController.getOrder)


export default router   
