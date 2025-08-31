import { Check } from "lucide-react";
import Link from "next/link";

export function CheckoutHeader({ step }) {
  const steps = [
    { id: "details", label: "Details", completed: step !== "details" },
    { id: "payment", label: "Payment", completed: step === "confirmation" },
    { id: "confirmation", label: "Confirmation", completed: false },
  ];

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/marketplace" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                PT
              </span>
            </div>
            <span className="font-semibold text-lg">PROMETHEUS</span>
          </Link>

          <div className="flex items-center gap-4">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepItem.completed
                        ? "bg-green-600 text-white"
                        : step === stepItem.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {stepItem.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step === stepItem.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stepItem.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
