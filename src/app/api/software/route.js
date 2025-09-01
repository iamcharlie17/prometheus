// src/app/api/software/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET() {
  try {
    const query = `SELECT id, name, description, version, price, icon_url, developer_id, download_url, downloads
                   FROM software
                   WHERE is_active = 1`;
    const result = await executeQuery(query);

    const plainRows = result.rows.map((row) => {
      return row;
    });

    console.log(result);

    return NextResponse.json(plainRows);
  } catch (error) {
    console.error("Get All Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function readClob(lob) {
  return new Promise((resolve, reject) => {
    let clobData = "";

    lob.setEncoding("utf8"); // ensure it’s read as text
    lob.on("data", (chunk) => {
      clobData += chunk;
    });

    lob.on("end", () => {
      resolve(clobData);
    });

    lob.on("error", (err) => {
      reject(err);
    });
  });
}
