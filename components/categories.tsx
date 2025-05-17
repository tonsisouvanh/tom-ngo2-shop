import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "men",
    name: "Men",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/men",
  },
  {
    id: "women",
    name: "Women",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/women",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categories/accessories",
  },
]

export function Categories() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-primary/5 group border-border/40">
              <div className="aspect-square relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <CardContent className="p-4 md:p-6 w-full">
                    <h3 className="text-lg md:text-xl font-semibold text-center">{category.name}</h3>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
