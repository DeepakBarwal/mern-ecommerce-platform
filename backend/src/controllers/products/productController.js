import asyncHandler from "../../middleware/asyncHandler.js";
import { ProductService } from "../../services/index.js";

const productService = new ProductService();

// @desc    Fetch All Products
// @route   GET /products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query?.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await productService.getTotalProducts(keyword);

  const products = await productService.getPaginatedProducts(
    pageSize,
    page,
    keyword
  );
  res.status(200).json({
    status: "success",
    data: products,
    page,
    pages: Math.ceil(count / pageSize),
  });
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

// @desc    Delete a Product
// @route   DELETE /products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productService.get(req.params.id);
  if (product) {
    await productService.delete(req.params.id);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
  res.status(200).json({ status: "success", data: null });
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

// @desc    Create a new review
// @route   POST /products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await productService.get(req.params.id);
  if (product) {
    const alreadyReviewed = productService.alreadyReviewed(
      req.user._id,
      product
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const reviewedProduct = await productService.createReview(req.params.id, {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    });
    res.status(201).json({
      status: "success",
      data: reviewedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
