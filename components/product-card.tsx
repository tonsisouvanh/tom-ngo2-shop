"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShareButton } from "@/components/share-button";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/types/types";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { event as gaEvent } from "@/lib/gtag";
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleAddToCart = () => {
    addToCart(product);
    toast("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  const goToImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe left - next image
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      } else {
        // Swipe right - previous image
        setCurrentImageIndex(
          (prev) => (prev - 1 + product.images.length) % product.images.length
        );
      }
    }
  };

  const handleProductClick = (productId: string, productName: string) => {
    // Send a custom GA event when the product link is clicked
    gaEvent({
      action: "product_click", // Action: 'product_click' for clarity
      category: "Product Engagement", // Category: 'Product Engagement' for grouping
      label: `Product: ${productName} (ID: ${productId})`, // Label: specific product name and ID
      value: 1, // Optional: You could assign a value, e.g., for products with a certain price range
    });
    console.log(
      `GA Event: Product clicked - ${productName} (ID: ${productId})`
    );
  };

  return (
    <Card
      className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5 border-border/40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square group">
        <Link
          href={`/products/${product.id}`}
          className="block w-full h-full"
          onClick={() => handleProductClick(product.id, product.name)}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={product.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Navigation arrows - only show if multiple images and on hover */}
        {product.images.length > 1 && isHovered && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </Button>
          </>
        )}

        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                )}
                onClick={(e) => goToImage(index, e)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        {product.images.length > 1 && (
          <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1}/{product.images.length}
          </div>
        )}

        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full z-10">
            New
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-8 right-2 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full z-10">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <CardContent className="flex-grow">
        <Link
          href={`/products/${product.id}`}
          onClick={() => handleProductClick(product.id, product.name)}
        >
          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
      </CardContent>

      <CardFooter className="flex max-sm:flex-col max-sm:gap-2 items-center justify-between">
        <div>
          {product.discount > 0 ? (
            <div className="flex flex-col xs:flex-row xs:items-center xs:gap-2">
              <span className="font-bold">{formatPrice(product.price)}</span>
              <span className="text-muted-foreground hidden text-sm line-through">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="font-bold text-xl">
              {formatPrice(product.price) || "N/A"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ShareButton product={product} className="h-8 w-8" />
          <Button
            size="sm"
            variant="outline"
            className="rounded-full hidden"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden xs:inline">Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
