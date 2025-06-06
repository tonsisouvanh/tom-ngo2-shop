import { ProductDetails } from "@/components/product-details";
import { RelatedProducts } from "@/components/related-products";
import { notFound } from "next/navigation";
import { FloatingShareButton } from "@/components/floating-share-button";
import { MerchantContactButton } from "@/components/merchant-contact-button";
import { getProductById, getRelatedProducts } from "@/lib/data/products";

export const metadata = {
  title: "Product Details | NGO²",
  description: "View detailed product information and add to your cart.",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProductById((await params).id);

  if (!product) {
    notFound();
  }

  // Update metadata dynamically
  metadata.title = `${product.name} | NGO²`;
  metadata.description = product.description.substring(0, 160);

  const relatedProducts = await getRelatedProducts(product.category);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
      <FloatingShareButton product={product} />
      <MerchantContactButton product={product} isFloating={true} />
    </div>
  );
}
