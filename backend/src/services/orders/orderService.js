import { CrudRepository } from "../../repository/index.js";
import Order from "../../models/Order.js";

class OrderService extends CrudRepository {
  constructor() {
    super(Order);
  }

  async getMyOrders(userId) {
    try {
      const orders = await Order.find({ user: userId });
      return orders;
    } catch (error) {
      console.error(`Error at Order Service layer: ${error}`);
      throw error;
    }
  }

  async getOrderByIDAndPopulate(orderId) {
    try {
      const order = await Order.findById(orderId).populate(
        "user",
        "name email"
      );
      return order;
    } catch (error) {
      console.error(`Error at Order Service layer: ${error}`);
      throw error;
    }
  }
}

export default OrderService;
