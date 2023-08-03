import { CrudRepository } from "../../repository/index.js";
import Product from "../../models/Product.js";

class ProductService extends CrudRepository {
  constructor() {
    super(Product);
  }
}

export default ProductService;
