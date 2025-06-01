"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/types";

interface MerchantContactButtonProps {
  product?: Product;
  size?: string;
  color?: string;
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
  size,
  color,
  isFloating = false,
  className = "",
  variant = "default",
}: MerchantContactButtonProps) {
  // Helper function to format price in LAK
  const formatLAKPrice = (price: number): string => {
    return new Intl.NumberFormat("lo-LA", {
      style: "currency",
      currency: "LAK",
      minimumFractionDigits: 0, // LAK doesn't typically use minor units
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleContactMerchant = () => {
    // Merchant's phone number (ensure it's in international format)
    const phoneNumber = "8562055102460"; // Example: +856 20 5637 3308 for Laos

    let message = "ສະບາຍດີ, ຂ້ອຍສົນໃຈໃນສິນຄ້າ."; // "Hello, I'm interested in your products." in Lao

    if (product) {
      const originalPrice = product.price;
      const discountedPrice =
        product.discount > 0
          ? originalPrice * (1 - product.discount / 100)
          : originalPrice;

      // Format prices in LAK
      const formattedOriginalPrice = formatLAKPrice(originalPrice);
      const formattedDiscountedPrice = formatLAKPrice(discountedPrice);

      let priceDisplay = `ລາຄາ: *${formattedOriginalPrice}*`; // Price: *LAK190,000*

      if (product.discount > 0) {
        priceDisplay = `ລາຄາ: *${formattedDiscountedPrice}* (ຫຼຸດ ${product.discount}% ຈາກ ${formattedOriginalPrice})`; // Price: *LAK152,000* (Discount 20% from LAK190,000)
      }

      // Add more product details to the message
      message =
        `ສະບາຍດີ, ຂ້ອຍສົນໃຈສິນຄ້ານີ້:\n\n` +
        `*${product.name}*\n` +
        // `ລາຍລະອຽດ: ${product.description}\n` +
        `${priceDisplay}\n` +
        `ປະເພດ: ${product.category}\n` +
        `ຂະໜາດ: ${size}\n` +
        `ສີ: ${color}\n` +
        // `ວັດສະດຸ: ${product.material}\n` +
        // `ຜະລິດຢູ່: ${product.madeIn}\n` +
        `\n` +
        `ລະຫັດສິນຄ້າ: ${product.id}\n\n` +
        `ສາມາດໃຫ້ຂໍ້ມູນເພີ່ມເຕີມໄດ້ບໍ່?`; // Can you provide more information?
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp URL
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
