"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, ShoppingCart, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { useCartStore } from "@/store/cart-store";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/products", icon: Search },
  // { name: "Cart", href: "/cart", icon: ShoppingCart },
  //   { name: "Account", href: "/account", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItemsData = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Search },
    { name: "About", href: "/about", icon: User },
    // { name: "Contact", href: "/contact", icon: Menu },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t border-border/40">
        <div className="flex items-center justify-between px-5 h-16">
          {/* Navigation items */}
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors relative",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.name === "Cart" && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}

          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>

        {/* Safe area padding for devices with home indicator */}
        <div className="h-safe-area-inset-bottom bg-background/95" />
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItemsData}
      />
    </>
  );
}
