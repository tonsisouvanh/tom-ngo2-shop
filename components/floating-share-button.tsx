"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductShareCard } from "@/components/product-share-card";
import { Product } from "@/types/types";

interface FloatingShareButtonProps {
  product: Product;
}

export function FloatingShareButton({ product }: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:hidden z-40">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share product</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto rounded-t-xl">
          <SheetHeader className="text-left pb-2">
            <SheetTitle>Share this product</SheetTitle>
            <SheetDescription>
              Share this product with friends and family
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <ProductShareCard
              product={product}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
