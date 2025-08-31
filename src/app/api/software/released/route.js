import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { verifyTokenAndGetPayload } from "@/lib/auth-utils";

export async function GET(request) {
  try {
    // 1. Verify the token and ensure the user has the 'developer' role.
    const decoded = verifyTokenAndGetPayload(request, "developer");
    const developerId = decoded.id;

    // 2. Fetch ALL software belonging to this developer, including inactive ones.
    const query = `
      SELECT id, name, version, price, is_active, created_at, download_url, icon_url
      FROM software
      WHERE developer_id = :id
      ORDER BY created_at DESC
    `;
    const result = await executeQuery(query, [developerId]);

    // 3. Sanitize the database results to prevent circular reference errors.
    const plainRows = result.rows.map((row) =>
      Object.keys(row).reduce((acc, key) => {
        acc[key] = row[key];
        return acc;
      }, {}),
    );

    return NextResponse.json(plainRows);
  } catch (error) {
    // If the error is a NextResponse (from the auth helper), return it directly.
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Get My Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
