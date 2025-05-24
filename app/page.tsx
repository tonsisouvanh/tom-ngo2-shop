import { Hero } from "@/components/hero";
import { FashionShowcase } from "@/components/fashion-showcase";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";
import { NewArrivals } from "@/components/new-arrivals";
import { TrendingSection } from "@/components/trending-section";
import { NewsletterSection } from "@/components/news-letter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <FashionShowcase />
      {/* <Categories /> */}
      <FeaturedProducts />
      <TrendingSection />
      {/* <NewArrivals /> */}
      <NewsletterSection />
    </main>
  );
}
