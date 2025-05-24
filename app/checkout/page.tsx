import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/order-summary";

export const metadata = {
  title: "Checkout | StyleHub",
  description: "Complete your order with shipping information.",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-2/3">
          <CheckoutForm />
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
