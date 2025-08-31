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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Shield, Download, Star } from "lucide-react";

export function SoftwarePurchase({ software }) {
  const [isInCart, setIsInCart] = useState(false);

  const addToCart = () => {
    setIsInCart(true);
    // In a real app, this would add to cart state/context
  };

  const buyNow = () => {
    // In a real app, this would redirect to checkout
    window.location.href = `/checkout?software=${software.id}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">${software.price}</CardTitle>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {software.isActive ? "Available" : "Unavailable"}
            </Badge>
          </div>
          <CardDescription>One year license</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              className="w-full gap-2"
              onClick={buyNow}
              disabled={!software.isActive}
            >
              <CreditCard className="w-4 h-4" />
              Buy Now
            </Button>
            {/* <Button
              variant="outline"
              className="w-full gap-2 bg-transparent"
              onClick={addToCart}
              disabled={!software.isActive || isInCart}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </Button>*/}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">What's included:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Lifetime license key
              </li>
              <li className="flex items-center gap-2">
                <Download className="w-4 h-4 text-green-600" />
                Instant download access
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-green-600" />
                Free updates for 1 year
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Email support
              </li>
            </ul>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• 30-day money-back guarantee</p>
            <p>• Secure payment processing</p>
            <p>• Instant license delivery</p>
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle className="text-base">License Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">License Type:</span>
            <span>Commercial</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Devices:</span>
            <span>Up to 3 devices</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>Lifetime</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Updates:</span>
            <span>1 year included</span>
          </div>
        </CardContent>
      </Card>*/}
    </div>
  );
}
