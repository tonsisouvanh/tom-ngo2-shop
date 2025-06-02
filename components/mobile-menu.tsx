"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, Sun, Moon, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { event as gaEvent } from "@/lib/gtag"; // Import your GA event function, aliased to avoid conflict if 'event' is used elsewhere

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { name: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const handleNavLinkClick = (itemName: string, itemHref: string) => {
    // Send a custom GA event
    gaEvent({
      action: "navigation_click", // Descriptive action name
      category: "Navigation", // Category for grouping events
      label: `Nav Link: ${itemName} (${itemHref})`, // Specific label with item name and href
      // value: 1, // Optional: You can add a value if relevant
    });
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 h-full flex flex-col">
        {/* Header with close button on the right */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold" onClick={onClose}>
            NGO²
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
              onClick={onClose}
              className="h-10 w-10"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </div>

        {/* Navigation items - larger touch targets */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block text-lg font-medium transition-colors hover:text-primary py-4 px-4 rounded-lg border border-transparent hover:border-border/40",
                pathname === item.href
                  ? "text-primary bg-primary/5 border-primary/20"
                  : "text-muted-foreground"
              )}
              onClick={() => {
                onClose();
                handleNavLinkClick(item.name, item.href);
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom action area - optimized for thumb reach */}
        <div className="mt-auto space-y-4 pb-safe">
          {/* Quick actions in thumb-friendly zone */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="h-14 text-base font-medium"
              asChild
            >
              <Link href="/cart" onClick={onClose}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 text-base font-medium"
              asChild
            >
              <Link href="/products" onClick={onClose}>
                <Search className="h-5 w-5 mr-2" />
                Search
              </Link>
            </Button>
          </div>

          {/* Primary CTA */}
          <Button
            size="lg"
            className="w-full h-14 text-base font-medium rounded-xl"
            asChild
          >
            <Link href="/products" onClick={onClose}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
