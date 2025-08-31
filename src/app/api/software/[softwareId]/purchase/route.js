import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { verifyTokenAndGetPayload } from "@/lib/auth-utils";
import oracledb from "oracledb";

export async function POST(request, { params }) {
  try {
    const decoded = verifyTokenAndGetPayload(request, "user");
    const customerId = decoded.id;
    const { softwareId } = params;

    // 1. Get software price from DB to ensure it's not manipulated on the client
    const softwareResult = await executeQuery(
      `SELECT price FROM software WHERE id = :id AND is_active = 1`,
      [softwareId],
    );
    if (softwareResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Software not found or is inactive" },
        { status: 404 },
      );
    }
    const price = softwareResult.rows[0].PRICE;

    // 2. NEW: Check if the user already has an active license for this software
    const licenseCheckQuery = `
      SELECT 1 FROM license_keys
      WHERE customer_id = :customerId
      AND software_id = :softwareId
      AND status = 'active'
      AND expires_at > CURRENT_TIMESTAMP
    `;
    const existingLicenseResult = await executeQuery(licenseCheckQuery, [
      customerId,
      softwareId,
    ]);

    if (existingLicenseResult.rows.length > 0) {
      return NextResponse.json(
        {
          error:
            "You already have an active license for this software. You cannot purchase it again at this time.",
        },
        { status: 409 }, // 409 Conflict is the appropriate HTTP status code
      );
    }

    // 3. In a real app, you would process payment here with Stripe, PayPal, etc.
    // For now, we simulate a successful payment.
    const paymentMethod = "Simulated Card";
    const transactionId = `TRANS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 4. Call the stored procedure to create the license and log the purchase
    const procedureCall = `
      BEGIN
        process_purchase(
          p_customer_id    => :p_customer_id,
          p_software_id    => :p_software_id,
          p_amount         => :p_amount,
          p_currency       => 'USD',
          p_payment_method => :p_payment_method,
          p_transaction_id => :p_transaction_id,
          p_generated_key  => :p_generated_key
        );
      END;
    `;

    const binds = {
      p_customer_id: customerId,
      p_software_id: softwareId,
      p_amount: price,
      p_payment_method: paymentMethod,
      p_transaction_id: transactionId,
      p_generated_key: {
        dir: oracledb.BIND_OUT,
        type: oracledb.STRING,
        maxSize: 255,
      },
    };

    const result = await executeQuery(procedureCall, binds);
    const generatedKey = result.outBinds.p_generated_key;

    return NextResponse.json(
      {
        message: "Purchase successful!",
        licenseKey: generatedKey,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error("Purchase Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
