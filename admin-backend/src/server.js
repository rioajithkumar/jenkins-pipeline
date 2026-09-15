import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.ADMIN_FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    application: "Admin Backend",
    service: "Admin API",
    status: "Running"
  });

});

app.use(
  "/api/admin",
  authRoutes
);

app.use(
  "/api/admin/dashboard",
  dashboardRoutes
);

app.use(
  "/api/admin/products",
  productRoutes
);

app.use(
  "/api/admin/users",
  userRoutes
);

app.use(
  "/api/admin/orders",
  orderRoutes
);

app.use((req, res) => {

  res.status(404).json({
    message: "Admin API endpoint not found"
  });

});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {

  console.log(
    `Admin Backend running on port ${PORT}`
  );

});
