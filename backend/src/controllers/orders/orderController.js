import asyncHandler from "../../middleware/asyncHandler.js";
import { OrderService } from "../../services/index.js";

const orderService = new OrderService();

// @desc    Create new order
// @route   POST /orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  let {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    orderItems = orderItems.map((order) => ({
      ...order,
      product: order._id,
      _id: undefined,
    }));
    const order = await orderService.create({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json({
      status: "success",
      data: order,
    });
  }
});

// @desc    Get logged in user's orders
// @route   GET /orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user._id);
  res.status(200).json({
    status: "success",
    data: orders,
  });
});

// @desc    Get order by id
// @route   GET /orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderByIDAndPopulate(req.params.id);
  if (order) {
    res.status(200).json({
      status: "success",
      data: order,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderService.get(req.params.id);
  if (order) {
    const updatedOrder = await orderService.updateOrderToPaid(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /orders/:id/delivered
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
