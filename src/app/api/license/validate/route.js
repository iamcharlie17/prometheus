// src/app/api/licenses/validate/route.js

import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function POST(request) {
  try {
    const { licenseKey } = await request.json();
    if (!licenseKey) {
      return NextResponse.json(
        { error: "licenseKey is required" },
        { status: 400 },
      );
    }

    const query = `
      SELECT status, expires_at FROM license_keys WHERE license_key = :key
    `;
    const result = await executeQuery(query, [licenseKey]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { isValid: false, reason: "License key not found." },
        { status: 404 },
      );
    }

    const license = result.rows[0];
    const now = new Date();
    const expiresAt = new Date(license.EXPIRES_AT);

    if (license.STATUS !== "active") {
      return NextResponse.json({
        isValid: false,
        reason: `License is not active. Current status: ${license.STATUS}.`,
      });
    }

    if (expiresAt < now) {
      return NextResponse.json({
        isValid: false,
        reason: "License has expired.",
      });
    }

    return NextResponse.json({ isValid: true, expiresAt: license.EXPIRES_AT });
  } catch (error) {
    console.error("License Validation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
