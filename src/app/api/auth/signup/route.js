import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { executeQuery } from "@/lib/database"; // Adjust path if needed

export async function POST(request) {
  try {
    const { email, name, password, role } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 },
      );
    }

    // 1. Check if user already exists
    const findUserQuery = `SELECT 1 FROM users WHERE email = :email`;
    const existingUser = await executeQuery(findUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 },
      );
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert the new user using simple positional binds
    const insertQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES (:1, :2, :3, :4)
    `;

    await executeQuery(insertQuery, [
      name,
      
    // 4. Fetch the newly created user to return its details (without the password)
    const newUserResult = await executeQuery(
      `SELECT id, name, email, role FROM users WHERE email = :email`,
      [email],
    );

    // Check if the user was actually created before sending a response
    if (newUserResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    return NextResponse.json(newUserResult.rows[0], { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
