"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MerchantContactButton } from "@/components/merchant-contact-button";
import { useCartStore } from "@/store/cart-store";

export function CartSummary() {
  const { cartItems } = useCartStore();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <Card className="border-border/40">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <Separator className="my-2 bg-border/40" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-3">
        <Button
          className="w-full rounded-full"
          asChild
          disabled={cartItems.length === 0}
        >
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>

        <MerchantContactButton
          variant="secondary"
          className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
        />
      </CardFooter>
    </Card>
  );
}
