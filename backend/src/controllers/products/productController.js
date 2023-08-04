import asyncHandler from "../../middleware/asyncHandler.js";
import { ProductService } from "../../services/index.js";

const productService = new ProductService();

// @desc    Fetch All Products
// @route   GET /products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAll();
  res.json({ status: "success", data: products });
});

// @desc    Fetch a Product
// @route   GET /products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.get(req.params.id);

  if (product) {
    res.json({ status: "success", data: product });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
