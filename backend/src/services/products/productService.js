import { CrudRepository } from "../../repository/index.js";
import Product from "../../models/Product.js";

class ProductService extends CrudRepository {
  constructor() {
    super(Product);
  }

  alreadyReviewed(userId, product) {
    return product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );
  }

  async createReview(productId, review) {
    try {
      const product = await Product.findById(productId);
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
      await product.save();
      return product;
    } catch (error) {
      console.error(`Error at Product Service layer: ${error}`);
      throw error;
    }
  }

  async getTotalProducts(keyword) {
    try {
      return await Product.countDocuments({ ...keyword });
    } catch (error) {
      console.error(`Error at Product Service layer: ${error}`);
      throw error;
    }
  }

  async getPaginatedProducts(pageSize, page, keyword) {
    try {
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return products;
    } catch (error) {
      console.error(`Error at Product Service layer: ${error}`);
      throw error;
    }
  }

  async getTopProducts() {
    try {
      const products = await Product.find({}).sort({ rating: -1 }).limit(3);
      return products;
    } catch (error) {
      console.error(`Error at Product Service layer: ${error}`);
      throw error;
    }
  }
}

export default ProductService;
