// src/lib/auth-utils.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Verifies the JWT from the request, checks for a required role, and returns the decoded token.
 * Throws a NextResponse object on failure, which should be returned by the calling route.
 * @param {Request} request The Next.js request object.
 * @param {string} [requiredRole] - The role required to access the route (e.g., 'admin', 'developer').
 * @returns {object} The decoded JWT payload.
 */
export function verifyTokenAndGetPayload(request, requiredRole) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw NextResponse.json(
      { error: "Authorization header is missing or invalid." },
      { status: 401 },
    );
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 401 },
    );
  }

  if (requiredRole && decoded.role !== requiredRole) {
    throw NextResponse.json(
      { error: `Access denied. Requires '${requiredRole}' role.` },
      { status: 403 },
    );
  }

  return decoded;
}
