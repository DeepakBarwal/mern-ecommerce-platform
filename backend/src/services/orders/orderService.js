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

  async getAllOrdersAndPopulate() {
    try {
      const orders = await Order.find({}).populate("user", "id name");
      return orders;
    } catch (error) {
      console.error(`Error at Order Service layer: ${error}`);
      throw error;
    }
  }

  async updateOrderToPaid(orderId, reqBody) {
    try {
      const order = await Order.findById(orderId);
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: reqBody.id,
        status: reqBody.status,
        update_time: reqBody.update_time,
        email_address: reqBody.payer_email_address,
      };

      const updatedOrder = await order.save();
      return updatedOrder;
    } catch (error) {
      console.error(`Error at Order Service layer: ${error}`);
      throw error;
    }
  }
}

export default OrderService;
