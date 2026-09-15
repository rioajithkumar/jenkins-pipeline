import pool from "../config/db.js";

export const getDashboard = async (req, res) => {

  try {

    const [[users]] = await pool.execute(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[products]] = await pool.execute(
      "SELECT COUNT(*) AS total FROM products"
    );

    const [[orders]] = await pool.execute(
      "SELECT COUNT(*) AS total FROM orders"
    );

    const [[revenue]] = await pool.execute(
      `SELECT COALESCE(SUM(total_amount), 0) AS total
       FROM orders`
    );

    res.json({
      totalUsers: users.total,
      totalProducts: products.total,
      totalOrders: orders.total,
      totalRevenue: revenue.total
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard"
    });

  }
};
