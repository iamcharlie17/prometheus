"use client";

import { useState } from "react";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { mockSoftware } from "@/lib/mock-data";

export default function CheckoutPage() {
  const [step, setStep] = useState("details");

  // In a real app, this would come from cart state or URL params
  const selectedSoftware = mockSoftware[0];

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader step={step} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm
              software={selectedSoftware}
              currentStep={step}
              onStepChange={setStep}
            />
          </div>

          <div>
            <OrderSummary software={selectedSoftware} />
          </div>
        </div>
      </main>
    </div>
  );
}
