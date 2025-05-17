"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast"
import { ShareButton } from "@/components/share-button";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  // const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product);
    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // });
  };

  return (
    <Card className="overflow-hidden h-full pt-0 flex flex-col transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5 border-border/40">
      <Link href={`/products/${product.id}`} className="relative aspect-square">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
            New
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
      </Link>

      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          {product.discount > 0 ? (
            <div className="flex flex-col xs:flex-row xs:items-center xs:gap-2">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              <span className="text-muted-foreground text-sm line-through">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ShareButton product={product} className="h-8 w-8" />
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Add</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
