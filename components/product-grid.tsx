"use client";

import { Product } from "@/types/types";
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import("@/components/product-card"), {
  ssr: false,
});

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
