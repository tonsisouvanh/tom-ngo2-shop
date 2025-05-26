import { CartItems } from "@/components/cart-items";
import { CartSummary } from "@/components/cart-summary";

export const metadata = {
  title: "Shopping Cart | NGO²",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-2/3">
          <CartItems />
        </div>

        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
