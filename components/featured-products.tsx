import { getFeaturedProducts } from "@/lib/data/products";
import { FeaturedProductsContent } from "./featured-products-content";
import React from "react";

const FeaturedProducts = async () => {
  const products = await getFeaturedProducts();

  return (
    <>
      <FeaturedProductsContent products={products} />
    </>
  );
};

export default FeaturedProducts;
