import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative w-full bg-gradient-to-r from-background to-muted">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Elevate Your Style</h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
          Discover our new collection of trendy and comfortable clothing for every occasion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-full px-8">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
