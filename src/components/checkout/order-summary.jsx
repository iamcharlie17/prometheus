import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function OrderSummary({ software }) {
  const subtotal = software.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your purchase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Image
            src={software.iconUrl || "/placeholder.svg?height=48&width=48"}
            alt={software.name}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium">{software.name}</h3>
            <p className="text-sm text-muted-foreground">
              Version {software.version}
            </p>
            <p className="text-sm text-muted-foreground">Lifetime License</p>
          </div>
          <div className="text-right">
            <div className="font-medium">${software.price}</div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg text-sm">
          <h4 className="font-medium mb-2">What you'll receive:</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Instant license key delivery</li>
            <li>• Download link via email</li>
            <li>• 30-day money-back guarantee</li>
            <li>• Free updates for 1 year</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
