import express from "express";
import productsRouter from "./products/productRoutes.js";
import usersRouter from "./users/userRoutes.js";
import ordersRouter from "./orders/orderRoutes.js";

const router = express.Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);

export default router;
