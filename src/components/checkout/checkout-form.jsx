"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock, AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function CheckoutForm({ software, currentStep, onStepChange }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [licenseKey, setLicenseKey] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [paymentError, setPaymentError] = useState(null); // New state for payment step errors

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear any payment errors when user starts typing
    if (paymentError) {
      setPaymentError(null);
    }
  };

  const handleContinueToPayment = () => {
    onStepChange("payment");
  };

  const handleCompleteOrder = async () => {
    setIsLoading(true);
    setOrderError(null);
    setPaymentError(null); // Clear any previous payment errors

    try {
      const purchaseLicense = async () => {
        const response = await fetch(`/api/software/${software.id}/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          // Handle specific error codes with custom messages
          if (response.status === 409) {
            throw new Error(
              "You already own a license for this software. Please check your account.",
            );
          } else if (response.status === 402) {
            throw new Error(
              "Payment failed. Please check your payment information and try again.",
            );
          } else if (response.status >= 500) {
            throw new Error("Server error. Please try again later.");
          } else {
            throw new Error(`Purchase failed with status: ${response.status}`);
          }
        }

        const data = await response.json();
        setLicenseKey(data.licenseKey);
      };

      await purchaseLicense();
      onStepChange("confirmation");
    } catch (error) {
      console.error("Purchase failed:", error);
      setOrderError(error.message);
      setPaymentError(error.message); // Also set payment error to show in payment step
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep === "confirmation") {
    // Show order failure if licenseKey is null
    if (!licenseKey) {
      return (
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="text-white w-5 h-5" />
              </div>
            </div>
            <CardTitle className="text-2xl text-red-600">
              Order Failed!
            </CardTitle>
            <CardDescription>
              {orderError || "There was a problem processing your order."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium">What to do next:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Please check your payment information and try again</li>
                <li>• Contact support if the problem persists</li>
                <li>• Check your email for any notifications from us</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  setOrderError(null);
                  setPaymentError(null);
                  onStepChange("payment");
                }}
              >
                Try Again
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Show success if licenseKey is available
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Order Complete!</CardTitle>
          <CardDescription>
            Your license has been generated and sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">License Key</h3>
            <div className="font-mono text-sm bg-background p-3 rounded border">
              {licenseKey}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Next Steps:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Download your software from the link in your email</li>
              <li>• Use the license key above to activate your software</li>
              <li>• Check your account dashboard for license management</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Download Software</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              View Account
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <Spinner className="w-8 h-8 mb-2" />
            <p>Processing your order...</p>
          </div>
        </div>
      )}

      {currentStep === "details" && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              We'll send your license key to this email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
              />
            </div>

            <Button className="w-full" onClick={handleContinueToPayment}>
              Continue to Payment
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === "payment" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </CardTitle>
            <CardDescription>
              Your payment is secured with 256-bit SSL encryption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Show payment error if it exists */}
            {paymentError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start gap-2">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Payment Error</p>
                  <p className="text-sm">{paymentError}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Billing Address</h3>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Address</Label>
                <Input
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) =>
                    handleInputChange("billingAddress", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              className="w-full gap-2"
              onClick={handleCompleteOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isLoading
                ? "Processing..."
                : `Complete Order - $${software.price}`}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
