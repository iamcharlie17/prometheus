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
import { CreditCard, Lock } from "lucide-react";

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = () => {
    onStepChange("payment");
  };

  const handleCompleteOrder = () => {
    onStepChange("confirmation");
  };

  if (currentStep === "confirmation") {
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
              CE-PRO-2024-ABCD-EFGH-IJKL
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

            <Button className="w-full gap-2" onClick={handleCompleteOrder}>
              <Lock className="w-4 h-4" />
              Complete Order - ${software.price}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
