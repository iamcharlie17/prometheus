"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { mockSoftware } from "@/lib/mock-data";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("software");

  const [software, setSoftware] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [step, setStep] = useState("details");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/software/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setSoftware(data[0] || data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading software details...</p>
        </div>
      </div>
    );
  }

  console.log(software);
  if (!software || error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader step={step} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CheckoutForm
              software={software}
              currentStep={step}
              onStepChange={setStep}
            />
          </div>

          <div>
            <OrderSummary software={software} />
          </div>
        </div>
      </main>
    </div>
  );
}
