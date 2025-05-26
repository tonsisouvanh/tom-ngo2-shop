import FeaturedProducts from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { NewArrivals } from "@/components/new-arrivals";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      {/* <FashionShowcase /> */}
      {/* <Categories /> */}
      <FeaturedProducts />
      {/* <TrendingSection /> */}
      <NewArrivals />
      {/* <NewsletterSection /> */}
    </main>
  );
}
