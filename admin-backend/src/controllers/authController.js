import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const [admins] = await pool.execute(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    const admin = admins[0];

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
