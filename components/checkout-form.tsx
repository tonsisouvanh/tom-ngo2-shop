"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MerchantContactButton } from "@/components/merchant-contact-button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export function CheckoutForm() {
  const router = useRouter();
  const { cartItems, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      // toast({
      //   description: "Please fill in all required fields",
      // });
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      return;
    }

    // Prepare order data
    const orderData = {
      customer: formData,
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };

    // Generate WhatsApp message
    const itemsList = cartItems
      .map(
        (item) =>
          `${item.name} (${item.selectedSize}, ${item.selectedColor}) x${
            item.quantity
          } - $${item.price * item.quantity}`
      )
      .join("%0A");

    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const message = `*New Order*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* $${total.toFixed(
      2
    )}%0A%0A*Customer Details:*%0A${formData.firstName} ${
      formData.lastName
    }%0A${formData.email}%0A${formData.phone}%0A${formData.address}, ${
      formData.city
    }, ${formData.state} ${formData.zipCode}%0A%0A*Notes:*%0A${formData.notes}`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Clear cart and redirect to success page
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <Card className="border-border/40">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border-border/40 focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="border-border/40 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special instructions for your order"
              className="min-h-[100px] border-border/40 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={cartItems.length === 0}
            >
              Complete Order via WhatsApp
            </Button>

            <MerchantContactButton
              variant="secondary"
              className="w-full bg-green-600 hover:bg-green-700 text-white border-none"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
