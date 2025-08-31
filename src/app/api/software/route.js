// src/app/api/software/route.js

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request) {
  try {
    const query = `SELECT id, name, description, version, price, icon_url FROM software WHERE is_active = 1`;
    const result = await executeQuery(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Get All Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
