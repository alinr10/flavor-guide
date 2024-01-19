import OrderModel from '../models/Order.js';


const order = async (req, res) => {
    try {
      const { name, description, payment } = req.body;
  
      const orderName = typeof name === 'object' ? name.value : name;
  
      const order = await OrderModel.create({
        name: orderName,
        description: description,
        payment: payment,
      });
  
  
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("Error in order function:", error);
  
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  
  
export {order}