import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="mb-8 text-primary">
        <CheckCircle className="h-20 w-20 mx-auto" />
      </div>

      <h1 className="text-3xl font-bold mb-6">Order Placed Successfully!</h1>

      <p className="text-muted-foreground mb-10 max-w-md">
        Thank you for your order. We've received your WhatsApp message and will
        process your order shortly. You will receive a confirmation once your
        order has been processed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="rounded-full px-8">
          <Link href="/products">Continue Shopping</Link>
        </Button>

        <Button variant="outline" asChild className="rounded-full px-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
