// src/app/api/software/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET() {
  try {
    const query = `SELECT id, name, description, version, price, icon_url
                   FROM software
                   WHERE is_active = 1`;
    const result = await executeQuery(query);

    const plainRows = await Promise.all(
      result.rows.map(async (row) => {
        const obj = {};
        for (const [key, value] of Object.entries(row)) {
          if (value && value.iLob) {
            // Convert Oracle CLOB to string
            obj[key.toLowerCase()] = await lobToString(value);
          } else if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            value === null
          ) {
            obj[key.toLowerCase()] = value;
          } else {
            // Fallback: stringify unknown objects safely
            obj[key.toLowerCase()] = String(value);
          }
        }
        return obj;
      }),
    );

    return NextResponse.json(plainRows);
  } catch (error) {
    console.error("Get All Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Convert Oracle CLOB to string
async function lobToString(lob) {
  return new Promise((resolve, reject) => {
    let clob = "";
    lob.setEncoding("utf8");
    lob.on("data", (chunk) => (clob += chunk));
    lob.on("end", () => resolve(clob));
    lob.on("error", reject);
  });
}
