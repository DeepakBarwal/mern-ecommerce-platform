import expres from "express";
import { getAllProducts, getProductById } from "../../../controllers/index.js";

const router = expres.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;
