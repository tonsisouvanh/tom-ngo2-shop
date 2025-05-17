import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllProducts } from "@/lib/data/products";

export const metadata = {
  title: "All Products | StyleHub",
  description: "Browse our collection of clothing and accessories.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>

        {/* Mobile filter button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex md:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <div className="py-4">{/* <ProductFilters /> */}</div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4 hidden md:block">
          {/* <ProductFilters /> */}
        </div>

        <div className="w-full md:w-3/4">
          {/* <ProductGrid products={products} /> */}
        </div>
      </div>
    </div>
  );
}
