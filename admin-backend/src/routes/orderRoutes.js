import express from "express";

import {
  getOrders
} from "../controllers/orderController.js";

import {
  adminAuth
} from "../middleware/adminAuth.js";

const router = express.Router();

router.get(
  "/",
  adminAuth,
  getOrders
);

export default router;
