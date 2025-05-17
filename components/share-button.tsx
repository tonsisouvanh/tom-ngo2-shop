"use client";

import { useState } from "react";
import { Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Product } from "@/types/types";

interface ShareButtonProps {
  product: Product;
  variant?: "icon" | "full";
  className?: string;
}

export function ShareButton({
  product,
  variant = "icon",
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleShareViaWhatsApp = () => {
    // Get the current URL (will work on client-side)
    const productUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://yourdomain.com/products/${product.id}`;

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

    // Create the message text
    const message = `Check out this product from StyleHub!\n\n*${product.name}*\n\nPrice: ${priceDisplay}\n\nDescription: ${product.description}\n\nMaterial: ${product.material}\nMade in: ${product.madeIn}\n\nView product: ${productUrl}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create the WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");

    // Close the popover
    setIsOpen(false);
  };

  const handleCopyLink = () => {
    const productUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://yourdomain.com/products/${product.id}`;

    navigator.clipboard
      .writeText(productUrl)
      .then(() => {
        // Show a toast or some feedback (using existing toast system)
        if (typeof window !== "undefined") {
          // Simple temporary feedback
          const feedback = document.createElement("div");
          feedback.textContent = "Link copied!";
          feedback.className =
            "fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50";
          document.body.appendChild(feedback);

          setTimeout(() => {
            document.body.removeChild(feedback);
          }, 2000);
        }
      })
      .catch((err) => console.error("Failed to copy link:", err));

    // Close the popover
    setIsOpen(false);
  };

  // On mobile, use a simpler approach with direct WhatsApp sharing
  if (isMobile && variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        className={cn("rounded-full", className)}
        onClick={handleShareViaWhatsApp}
      >
        <Share2 className="h-4 w-4" />
        <span className="sr-only">Share product</span>
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="outline"
            size="icon"
            className={cn("rounded-full", className)}
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share product</span>
          </Button>
        ) : (
          <Button variant="outline" className={cn("rounded-full", className)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="grid gap-1">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <h4 className="font-medium">Share Product</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="p-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
              onClick={handleShareViaWhatsApp}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share via WhatsApp
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleCopyLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Copy Link
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
