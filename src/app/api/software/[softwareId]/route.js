// src/app/api/software/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search");

    let query = `SELECT id, name, description, version, price, icon_url
                   FROM software
                   WHERE is_active = 1`;
    const binds = {};

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
