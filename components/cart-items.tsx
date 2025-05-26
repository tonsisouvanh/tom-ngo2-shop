"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";

export function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <Card className="border-border/40">
        <CardContent className="p-6 sm:p-8 text-center">
          <p className="mb-6 text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="rounded-full px-8">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <Card
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          className="border-border/40"
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                <Image
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>

              <div className="flex-grow min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>

                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  <span>Size: {item.selectedSize?.toUpperCase()}</span>
                  <span className="mx-2">|</span>
                  <span>Color: {item.selectedColor}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-2 sm:mt-3">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 sm:h-7 sm:w-7 rounded-full"
                      onClick={() =>
                        updateQuantity(item, Math.max(1, item.quantity - 1))
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-6 sm:w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 sm:h-7 sm:w-7 rounded-full"
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                    <span className="font-medium">
                      ${item.price * item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 sm:h-7 sm:w-7 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      onClick={() => removeFromCart(item)}
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
