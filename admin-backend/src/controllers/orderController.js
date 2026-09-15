import pool from "../config/db.js";

export const getOrders = async (req, res) => {

  try {

    const [orders] = await pool.execute(
      `SELECT
        orders.id,
        users.name AS user_name,
        users.email AS user_email,
        products.name AS product_name,
        orders.quantity,
        orders.total_amount,
        orders.status,
        orders.created_at
       FROM orders

       JOIN users
         ON orders.user_id = users.id

       JOIN products
         ON orders.product_id = products.id

       ORDER BY orders.id DESC`
    );

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};
