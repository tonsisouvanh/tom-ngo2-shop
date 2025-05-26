"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/share-button";
import { Product } from "@/types/types";

interface ProductShareCardProps {
  product: Product;
  onClose: () => void;
}

export function ProductShareCard({ product, onClose }: ProductShareCardProps) {
  // Format the price with discount if applicable
  const priceDisplay =
    product.discount > 0 ? (
      <div className="flex items-center gap-2">
        <span className="font-bold">${product.price}</span>
        <span className="text-muted-foreground text-sm line-through">
          ${product.price / (1 - product.discount / 100)}
        </span>
        <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
          {product.discount}% OFF
        </span>
      </div>
    ) : (
      <span className="font-bold">${product.price}</span>
    );

  return (
    <Card className="max-w-md mx-auto border-border/40">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>

          <div className="flex-grow">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {product.category}
            </p>
            <div className="mt-2">{priceDisplay}</div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <ShareButton
          product={product}
          variant="full"
          className="bg-green-600 hover:bg-green-700 text-white border-none"
        />
      </CardFooter>
    </Card>
  );
}
