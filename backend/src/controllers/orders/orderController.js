import asyncHandler from "../../middleware/asyncHandler.js";
import { OrderService } from "../../services/index.js";

const orderService = new OrderService();

// @desc    Create new order
// @route   POST /orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  res.json("add order items");
});

// @desc    Get logged in user's orders
// @route   GET /orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  res.json("get my orders");
});

// @desc    Get order by id
// @route   GET /orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  res.json("get order by id");
});

// @desc    Update order to paid
// @route   GET /orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.json("update order to paid");
});

// @desc    Update order to delivered
// @route   GET /orders/:id/delivered
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("update order to Delivered");
});

// @desc    Get all orders
// @route   GET /orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  res.json("get all orders");
});
