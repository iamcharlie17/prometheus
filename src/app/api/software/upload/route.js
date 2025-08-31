import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { executeQuery } from "@/lib/database";
import oracledb from "oracledb";

export async function POST(request) {

  try {
    // 1. Authenticate and authorize the user
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header missing or invalid" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Token is invalid or expired
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if the user has the 'developer' role
    if (decoded.role !== "developer") {
      return NextResponse.json(
        { error: "Access denied. Only developers can upload software." },
        { status: 403 },
      );
    }

    const developer_id = decoded.id ;

    // 2. Validate the incoming data
    const { name, description, version, price, download_url, icon_url} =
      await request.json();

    if (
      !name ||
      !description ||
      !version ||
      price === undefined ||
      !download_url
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, version, price, download_url",
        },
        { status: 400 },
      );
    }

    if (typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Price must be a non-negative number." },
        { status: 400 },
      );
    }

    // 3. Use the `add_software` procedure to insert the data
    const procedureCall = `
      BEGIN
        add_software(
          p_developer_id => :developer_id,
          p_name => :name,
          p_description => :description,
          p_version => :version,
          p_price => :price,
          p_download_url => :download_url,
          p_icon_url => :icon_url
        );
      END;
    `;

    const binds = {
      developer_id: {
        dir: oracledb.BIND_IN,
        val: developer_id,
        type: oracledb.NUMBER,
      },
      name: { dir: oracledb.BIND_IN, val: name, type: oracledb.STRING },
      description: {
        dir: oracledb.BIND_IN,
        val: description,
        type: oracledb.STRING,
      },
      version: { dir: oracledb.BIND_IN, val: version, type: oracledb.STRING },
      price: { dir: oracledb.BIND_IN, val: price, type: oracledb.NUMBER },
      download_url: {
        dir: oracledb.BIND_IN,
        val: download_url,
        type: oracledb.STRING,
      },
      icon_url: {
        dir: oracledb.BIND_IN,
        val: icon_url || null,
        type: oracledb.STRING,
      },
    };

    await executeQuery(procedureCall, binds);

    return NextResponse.json(
      { message: "Software uploaded successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Software Upload Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
