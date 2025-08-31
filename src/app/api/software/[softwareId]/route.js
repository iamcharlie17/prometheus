import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { verifyTokenAndGetPayload } from "@/lib/auth-utils"; // Keep for PUT/DELETE
import jwt from "jsonwebtoken"; // Import JWT for optional verification

// GET a single piece of software
export async function GET(request, { params }) {
  try {
    const { softwareId } = params;

    // 1. First, fetch the core software details, including the potentially sensitive download URL.
    const softwareQuery = `
        SELECT s.id, s.name, s.description, s.version, s.price, s.icon_url, s.download_url, u.name as developer_name
        FROM software s
        JOIN users u ON s.developer_id = u.id
        WHERE s.id = :id AND s.is_active = 1
    `;
    const softwareResult = await executeQuery(softwareQuery, [softwareId]);

    if (softwareResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Software not found" },
        { status: 404 },
      );
    }

    const softwareData = softwareResult.rows[0];
    let hasValidLicense = false;

    // 2. Check for an authenticated user and verify their license for this software.
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (userId) {
          const licenseQuery = `
            SELECT 1 FROM license_keys
            WHERE customer_id = :userId
            AND software_id = :softwareId
            AND status = 'active'
            AND expires_at > CURRENT_TIMESTAMP
          `;
          const licenseResult = await executeQuery(licenseQuery, [
            userId,
            softwareId,
          ]);

          if (licenseResult.rows.length > 0) {
            hasValidLicense = true;
          }
        }
      } catch (err) {
        // This handles invalid or expired tokens.
        // We don't return an error; we just treat them as a non-privileged user.
        console.warn(
          "An invalid token was provided while checking for a software license.",
        );
      }
    }

    // 3. Sanitize the result into a plain object.
    const plainRow = Object.keys(softwareData).reduce((acc, key) => {
      acc[key] = softwareData[key];
      return acc;
    }, {});

    // 4. Conditionally remove the download URL if the user does not have a valid license.
    if (!hasValidLicense) {
      delete plainRow.DOWNLOAD_URL;
    }

    return NextResponse.json(plainRow);
  } catch (error) {
    console.error("Get Software Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
