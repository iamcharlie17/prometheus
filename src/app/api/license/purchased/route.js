// src/app/api/users/me/licenses/route.js

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { verifyTokenAndGetPayload } from "@/lib/auth-utils";

export async function GET(request) {
  try {
    const decoded = verifyTokenAndGetPayload(request);
    const customerId = decoded.id;

    const query = `
      SELECT l.id, l.license_key, l.status, l.expires_at, s.name as software_name
      FROM license_keys l
      JOIN software s ON l.software_id = s.id
      WHERE l.customer_id = :id
      ORDER BY l.created_at DESC
    `;
    const result = await executeQuery(query, [customerId]);
    return NextResponse.json(result.rows);
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error("Get My Licenses Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
