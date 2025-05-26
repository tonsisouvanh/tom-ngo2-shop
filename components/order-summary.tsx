"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";

export function OrderSummary() {
  const { cartItems } = useCartStore();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex justify-between"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <div className="text-sm text-muted-foreground">
                  {item.selectedSize?.toUpperCase()}, {item.selectedColor} ×{" "}
                  {item.quantity}
                </div>
              </div>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{subtotal} LAK</span>
            </div>

            <div className="flexd hidden justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `${shipping} LAK`}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{total} LAK</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
