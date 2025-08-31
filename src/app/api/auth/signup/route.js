import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { executeQuery } from "@/lib/database"; // Your Oracle DB helper

export async function POST(request) {
  try {
    const { email, name, password, role } = await request.json();

    console.log(email);

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Please provide name, email, and password" },
        { status: 400 },
      );
    }

    // 1. Check if user already exists using Oracle-style positional binds
    // The placeholder must be :1, :2, etc., not '?'
    const findUserQuery = `SELECT id FROM users WHERE email = :1`;
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

    // 3. Insert the new user using Oracle-style positional binds
    const userRole = role || "user"; // Set a default role
    const insertQuery = `
        INSERT INTO users (name, email, password, role)
        VALUES (:1, :2, :3, :4)
    `;

    // This is the main logical fix: providing the full, correct array of parameters
    await executeQuery(insertQuery, [name, email, hashedPassword, userRole]);

    // 4. Fetch the newly created user to return its details
    const newUserResult = await executeQuery(
      `SELECT id, name, email, role FROM users WHERE email = :1`,
      [email],
    );

    // Check if the user was actually created
    if (newUserResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Failed to retrieve user after creation" },
        { status: 500 },
      );
    }

    // 5. Return the newly created user's data
    return NextResponse.json(newUserResult.rows[0], { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const GET = async(req, res) => {
  return NextResponse.json({ message: "GET request successful" });
}
