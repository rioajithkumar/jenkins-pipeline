import pool from "../config/db.js";

export const getUsers = async (req, res) => {

  try {

    const [users] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        created_at
       FROM users
       ORDER BY id DESC`
    );

    res.json(users);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users"
    });

  }
};
