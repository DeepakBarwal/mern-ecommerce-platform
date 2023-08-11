import asyncHandler from "../../middleware/asyncHandler.js";
import { ProductService } from "../../services/index.js";

const productService = new ProductService();

// @desc    Fetch All Products
// @route   GET /products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json({ status: "success", data: products });
});

// @desc    Fetch a Product
// @route   GET /products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.get(req.params.id);

  if (product) {
    res.status(200).json({ status: "success", data: product });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create a Product
// @route   POST /products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.create({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  res.status(201).json({ status: "success", data: product });
});

// @desc    Update a Product
// @route   PUT /products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await productService.get(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }
  let updatedProduct = null;
  if (product) {
    updatedProduct = await productService.update(req.params.id, {
      name,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
    });
  }
  if (!updatedProduct) {
    res.status(400);
    throw new Error("Failed to update the product");
  }
  res.status(200).json({ status: "success", data: updatedProduct });
});
