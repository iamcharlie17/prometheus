// src/app/api/software/[softwareId]/route.js

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const { softwareId } = params;
    const query = `
        SELECT s.id, s.name, s.description, s.version, s.price, s.icon_url, s.download_url, u.name as developer_name
        FROM software s
        JOIN users u ON s.developer_id = u.id
        WHERE s.id = :id AND s.is_active = 1
    `;
    const result = await executeQuery(query, [softwareId]);
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Software not found" },
        { status: 404 },
      );
    }

    // ROBUST FIX: Explicitly create a plain object for the single result.
    const plainRow = Object.keys(result.rows[0]).reduce((acc, key) => {
      acc[key] = result.rows[0][key];
      return acc;
    }, {});

    return NextResponse.json(plainRow);
  } catch (error) {
    console.error("Get Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
