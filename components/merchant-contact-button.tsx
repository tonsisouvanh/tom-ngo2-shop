"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";

interface MerchantContactButtonProps {
  product?: Product;
  isFloating?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
}

export function MerchantContactButton({
  product,
  isFloating = false,
  className = "",
  variant = "default",
}: MerchantContactButtonProps) {
  const handleContactMerchant = () => {
    // Merchant's phone number
    const phoneNumber = "2056373308";

    // Create the message text
    let message = "Hello, I'm interested in your products.";

    if (product) {
      // Format the price with discount if applicable
      const priceDisplay =
        product.discount > 0
          ? `$${product.price.toFixed(2)} (${
              product.discount
            }% OFF - Original: $${(
              product.price /
              (1 - product.discount / 100)
            ).toFixed(2)})`
          : `$${product.price.toFixed(2)}`;

      message = `Hello, I'm interested in this product:\n\n*${product.name}*\n\nPrice: ${priceDisplay}\n\nProduct ID: ${product.id}\n\nCan you provide more information?`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp URL with the merchant's phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  if (isFloating) {
    return (
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
        <Button
          onClick={handleContactMerchant}
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white ${className}`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Contact Merchant</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleContactMerchant}
      variant={variant}
      className={`rounded-full ${className}`}
    >
      <ShoppingBag className="h-4 w-4 mr-2" />
      Contact Merchant
    </Button>
  );
}
