import { CrudRepository } from "../../repository/index.js";
import Order from "../../models/Order.js";

class OrderService extends CrudRepository {
  constructor() {
    super(Order);
  }
}

export default OrderService;
