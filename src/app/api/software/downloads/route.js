// src/app/api/software/downloads/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const softwareId = searchParams.get("softwareId");

    let query;
    let params = [];

    if (softwareId) {
      // Get downloads for a specific software
      query = `
        SELECT id, name, downloads
        FROM software
        WHERE id = :id
      `;
      params = [softwareId];
    } else {
      // Get downloads for all software
      query = `
        SELECT id, name, downloads
        FROM software
        ORDER BY downloads DESC
      `;
    }

    const result = await executeQuery(query, params);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching download stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch download statistics" },
      { status: 500 },
    );
  }
}
