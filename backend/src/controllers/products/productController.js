import asyncHandler from "../../middleware/asyncHandler.js";
import { ProductService } from "../../services/index.js";

const productService = new ProductService();

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAll();
  res.json({ status: "success", data: products });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.get(req.params.id);

  if (product) {
    res.json({ status: "success", data: product });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
