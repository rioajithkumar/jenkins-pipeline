import express from "express";

import {
  getDashboard
} from "../controllers/dashboardController.js";

import {
  adminAuth
} from "../middleware/adminAuth.js";

const router = express.Router();

router.get(
  "/",
  adminAuth,
  getDashboard
);

export default router;
