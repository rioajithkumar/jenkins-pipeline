import express from "express";

import {
  createOrder,
  getOrders
} from "../controllers/orderController.js";

import {
  authenticate
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  getOrders
);

router.post(
  "/",
  authenticate,
  createOrder
);

export default router;
