import express from "express";
import productsRouter from "./products/productRoutes.js";
import usersRouter from "./users/userRoutes.js";
import ordersRouter from "./orders/orderRoutes.js";
import { PAYPAL_CLIENT_ID } from "../../config/serverConfig.js";

const router = express.Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/users", usersRouter);
router.use("/config/paypal", (req, res) =>
  res.send({ clientId: PAYPAL_CLIENT_ID })
);

export default router;
