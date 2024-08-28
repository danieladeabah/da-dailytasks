import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail";
import connection from "../../utils/db";

const secretKey = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  try {
    // Find user by email
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    const user = rows[0];

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ id: user.id, resetToken }, secretKey, {
      expiresIn: "1h",
    });

    // Store token in the database
    await connection.query(
      `UPDATE users SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE id = ?`,
      [token, Date.now() + 3600000, user.id]
    );

    // Send email
    const resetUrl = `${event.node.req.headers.origin}/auth/${token}`;
    const message = `
      <h1>Password Reset Request</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    return {
      statusCode: 200,
      message: "Email sent successfully. Please check your inbox.",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: "Server error",
    };
  }
});
