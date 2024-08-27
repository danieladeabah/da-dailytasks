import bcrypt from "bcryptjs";
import { encodeBase62 } from "@/utils/encodeBase62";
import connection from "../../utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { first_name, last_name, email, password } = body;

  if (!first_name || !last_name || !email || !password) {
    return {
      statusCode: 400,
      message: "All fields are required",
    };
  }

  try {
    // Check if email is already registered
    const [existingUser] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return {
        statusCode: 409,
        message: "Email is already in use",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const base62 = encodeBase62(Date.now()); // Unique ID and username using base62

    // Insert new user into the database
    await connection.query(
      `INSERT INTO users (id, first_name, last_name, username, email, password) VALUES (?, ?, ?, ?, ?, ?)`,
      [base62, first_name, last_name, base62, email, hashedPassword]
    );

    return {
      statusCode: 201,
      message: "User registered successfully",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Error registering user",
    };
  }
});
