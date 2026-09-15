import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "Ajith E-Commerce",
    service: "User Backend API",
    version: "1.0.0",
    status: "Running",
    message: "Welcome to the User Backend API"
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/profile",
  profileRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `User Backend running on port ${PORT}`
  );

});
