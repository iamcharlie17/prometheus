// src/app/api/software/[softwareId]/download/route.js
import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";

export async function GET(request, { params }) {
  try {
    const { softwareId } = params;

    // 1. Get the software details
    const getSoftwareQuery = `
      SELECT download_url
      FROM software
      WHERE id = :id
    `;
    const softwareResult = await executeQuery(getSoftwareQuery, [softwareId]);

    if (!softwareResult.rows || softwareResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Software not found" },
        { status: 404 },
      );
    }

    // 2. Update the download count
    const updateDownloadCountQuery = `
      BEGIN
        increment_download_count(:software_id);
      END;
    `;
    await executeQuery(updateDownloadCountQuery, [softwareId]);

    // 3. Return the download URL
    const downloadUrl = softwareResult.rows[0].DOWNLOAD_URL;

    return NextResponse.json({
      success: true,
      download_url: downloadUrl,
    });
  } catch (error) {
    console.error("Error processing download:", error);
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 },
    );
  }
}
