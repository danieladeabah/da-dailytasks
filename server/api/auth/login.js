import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../../utils/db";

const secretKey = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
  // Parse the request body using readBody instead of useBody
  const body = await readBody(event);
  const { email, password } = body;

  try {
    // Fetch user from the database
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    // Check if user exists
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    const user = rows[0];

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        statusCode: 401,
        message: "Invalid credentials",
      };
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      token,
      message: "Login successful",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Error logging in",
    };
  }
});
