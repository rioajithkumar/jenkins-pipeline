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


export const addProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      image,
      stock
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        message: "Name and price are required"
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO products
       (name, description, price, image, stock)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        description || "",
        price,
        image || "",
        stock || 0
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to add product"
    });

  }
};


export const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      description,
      price,
      image,
      stock
    } = req.body;

    const [result] = await pool.execute(
      `UPDATE products
       SET name = ?,
           description = ?,
           price = ?,
           image = ?,
           stock = ?
       WHERE id = ?`,
      [
        name,
        description || "",
        price,
        image || "",
        stock || 0,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product updated successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update product"
    });

  }
};


export const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const [result] = await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete product"
    });

  }
};
