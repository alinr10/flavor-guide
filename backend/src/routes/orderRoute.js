import express from 'express'
import * as orderController from '../controllers/orderController.js';

const router = express.Router()

router.route("/").post(orderController.order)
router.route("/getorder").get(orderController.getOrder)
router.route("/personalized").get(orderController.personalized)


export default router   
