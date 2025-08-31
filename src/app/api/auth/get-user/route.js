import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { executeQuery } from "@/lib/database";

export async function GET(request) {
  try {
    // 1. Get the token from the Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is missing or invalid." },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    // 2. Verify the token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Handles expired or invalid tokens
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 },
      );
    }

    const userId = decoded.id;

    // 3. Fetch the user from the database, excluding the password
    const query = `SELECT id, name, email, role, created_at FROM users WHERE id = :id`;
    const result = await executeQuery(query, [userId]);

    // 4. Check if the user exists
    if (result.rows.length === 0) {
      // This case is unlikely if the token is valid, but it's good practice to handle it
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const user = result.rows[0];

    // 5. Return the user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
