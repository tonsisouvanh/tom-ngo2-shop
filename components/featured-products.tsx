import { getFeaturedProducts } from "@/lib/data/products";
import { FeaturedProductsContent } from "./featured-products-content";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <>
      <FeaturedProductsContent products={products} />
    </>
  );
}
