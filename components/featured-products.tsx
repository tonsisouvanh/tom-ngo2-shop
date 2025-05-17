import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/data/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
