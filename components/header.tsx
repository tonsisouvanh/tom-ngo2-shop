"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Search, User, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/cart-store";

import React from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCartStore();
  const { theme, setTheme } = useTheme();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    // { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    // { name: "Contact", href: "/contact" },
  ];

  // Add scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur-md"
          : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - moved to left for brand recognition */}
          <Link href="/" className="text-xl md:text-2xl font-bold">
            NGO²
          </Link>

          {/* Desktop navigation - unchanged */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile actions - optimized for right-hand use */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Desktop-only actions */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:inline-flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flexd"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flexd"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>

            {/* Cart - accessible for both mobile and desktop */}
            <Link className="hidden" href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Mobile menu button - moved to the right for easier right-hand access */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hiddend hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;
