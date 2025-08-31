import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const { developerId } = params;

    // 1. Fetch only ACTIVE software for the given developer ID.
    // This is a public view, so we don't show inactive/delisted products.
    const query = `
      SELECT s.id, s.name, s.description, s.version, s.price, s.icon_url, u.name as developer_name
      FROM software s
      JOIN users u ON s.developer_id = u.id
      WHERE s.developer_id = :id AND s.is_active = 1
      ORDER BY s.name ASC
    `;
    const result = await executeQuery(query, [developerId]);

    // 2. Sanitize the database results to create plain objects.
    const plainRows = result.rows.map((row) =>
      Object.keys(row).reduce((acc, key) => {
        acc[key] = row[key];
        return acc;
      }, {}),
    );

    // It's not an error if a developer has no active software, just return an empty array.
    return NextResponse.json(plainRows);
  } catch (error) {
    console.error("Get Developer Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
