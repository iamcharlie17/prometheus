import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { executeQuery } from "@/lib/database"; // Adjust path

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide email and password" },
        { status: 400 },
      );
    }

    // 1. Find the user by email
    const findUserQuery = `SELECT ID, NAME, EMAIL, PASSWORD, ROLE FROM users WHERE email = :email`;
    const result = await executeQuery(findUserQuery, [email]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const user = result.rows[0];

    // 2. Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 3. Create a JWT
    const token = jwt.sign(
      { id: user.ID, email: user.EMAIL, role: user.ROLE },
      process.env.JWT_SECRET,
      { expiresIn: "1D" },
    );

    return NextResponse.json({ USERID: user.ID, token });
  } catch (error) {
    console.error("Signin Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
