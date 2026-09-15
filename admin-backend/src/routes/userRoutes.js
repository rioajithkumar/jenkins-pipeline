import express from "express";

import {
  getUsers
} from "../controllers/userController.js";

import {
  adminAuth
} from "../middleware/adminAuth.js";

const router = express.Router();

router.get(
  "/",
  adminAuth,
  getUsers
);

export default router;
