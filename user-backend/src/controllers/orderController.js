import pool from "../config/db.js";

export const createOrder = async (req, res) => {

  try {

    const {
      product_id,
      quantity
    } = req.body;

    if (!product_id || !quantity) {

      return res.status(400).json({
        message: "Product and quantity are required"
      });

    }

    const [products] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [product_id]
    );

    if (products.length === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    const product = products[0];

    if (product.stock < quantity) {

      return res.status(400).json({
        message: "Insufficient stock"
      });

    }

    const totalAmount =
      Number(product.price) * Number(quantity);

    const connection =
      await pool.getConnection();

    try {

      await connection.beginTransaction();

      const [order] = await connection.execute(
        `INSERT INTO orders
         (user_id, product_id, quantity, total_amount)
         VALUES (?, ?, ?, ?)`,
        [
          req.user.id,
          product_id,
          quantity,
          totalAmount
        ]
      );

      await connection.execute(
        `UPDATE products
         SET stock = stock - ?
         WHERE id = ?`,
        [
          quantity,
          product_id
        ]
      );

      await connection.commit();

      res.status(201).json({
        message: "Order created successfully",
        orderId: order.insertId
      });

    } catch (error) {

      await connection.rollback();

      throw error;

    } finally {

      connection.release();

    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create order"
    });

  }
};


export const getOrders = async (req, res) => {

  try {

    const [orders] = await pool.execute(
      `SELECT
        orders.id,
        orders.quantity,
        orders.total_amount,
        orders.status,
        orders.created_at,
        products.name AS product_name,
        products.image AS product_image
       FROM orders
       JOIN products
         ON orders.product_id = products.id
       WHERE orders.user_id = ?
       ORDER BY orders.created_at DESC`,
      [req.user.id]
    );

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};
