// src/app/api/software/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search");
    const { softwareId } = params;

    let query = `SELECT id, name, description, version, price, icon_url, is_active, downloads
                   FROM software
                   WHERE id=:id`;
    const binds = [softwareId];

    if (searchQuery) {
      query += ` AND (LOWER(name) LIKE :searchQuery OR LOWER(description) LIKE :searchQuery)`;
      binds.searchQuery = `%${searchQuery.toLowerCase()}%`;
    }

    const result = await executeQuery(query, binds);

    const formattedRows = result.rows.map((row) => ({
      id: row.ID,
      name: row.NAME,
      description: row.DESCRIPTION,
      version: row.VERSION,
      price: row.PRICE,
      iconUrl: row.ICON_URL,
      isActive: row.IS_ACTIVE === 1,
      downloads: row.DOWNLOADS,
    }));

    return NextResponse.json(formattedRows);
  } catch (error) {
    console.error("Get All Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
