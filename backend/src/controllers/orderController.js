import OrderModel from '../models/Order.js';


const order = async (req, res) => {
  try {

    const { meal, userId } = req.body;


    console.log("meal : ", meal)


    console.log(userId, "orderr")

    const order = await OrderModel.create({
      name: meal,
      userId: userId
    });


    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in order function:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getOrder = async (req, res) => {
  try {

    const { userId } = req.query
    console.log(userId, "useraaa")
    const orders = await OrderModel.find({ userId: userId })

    console.log(orders, "getttt")

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in order function:", error);

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }





}



export { order, getOrder }