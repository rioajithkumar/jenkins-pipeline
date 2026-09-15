import pool from "../config/db.js";

export const getProducts = async (req, res) => {

  try {

    const [products] = await pool.execute(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });

  }
};


export const getProductById = async (req, res) => {

  try {

    const { id } = req.params;

    const [products] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (products.length === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.json(products[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product"
    });

  }
};
