"use client";

import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast"
import { ShareButton } from "@/components/share-button";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { MerchantContactButton } from "@/components/merchant-contact-button";
import { Product } from "@/types/types";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();
  // const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize) {
      // toast({
      //   title: "Please select a size",
      //   variant: "destructive",
      // });
      return;
    }

    if (!selectedColor) {
      // toast({
      //   title: "Please select a color",
      //   variant: "destructive",
      // })
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });

    // toast({
    //   title: "Added to cart",
    //   description: `${product.name} has been added to your cart.`,
    // })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div>
        <ProductImageGallery
          images={product.images}
          productName={product.name}
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground mt-2">{product.category}</p>
        </div>

        <div className="flex items-center gap-4">
          {product.discount > 0 ? (
            <>
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
              <span className="text-muted-foreground text-lg line-through">
                ${product.price / (1 - product.discount / 100)}
              </span>
              <span className="bg-destructive text-destructive-foreground text-sm px-3 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="rounded-full"
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-full"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="flex-1 rounded-full hidden"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <ShareButton product={product} />
        </div>

        <div className="pt-2">
          <MerchantContactButton
            product={product}
            size={selectedSize}
            color={selectedColor}
            variant="secondary"
            className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
          />
        </div>

        <Tabs defaultValue="description" className="mt-8 hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="details" className="pt-4">
            <ul className="list-disc pl-5 space-y-2">
              <li>Material: {product.material}</li>
              <li>Care: {product.care}</li>
              <li>Made in: {product.madeIn}</li>
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <p>
              Free shipping on all orders over $50. Standard delivery takes 3-5
              business days.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
