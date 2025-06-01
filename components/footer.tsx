import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4d gap-6 md:gap-8">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">NGO²</h3>
            <p className="text-muted-foreground hidden text-sm">
              Discover the latest fashion trends and styles for every occasion.
            </p>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/men"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/women"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accessories"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div> */}

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-3 md:mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border/40 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} NGO². All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
