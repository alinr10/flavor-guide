import mongoose from 'mongoose';
const { Schema } = mongoose;
const OrderSchema = new Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: String, required: false },
    status: { type: Boolean, required: false },
    userId: { type: String, required: false },
    date: { type: Date, default: Date.now },
})


const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;