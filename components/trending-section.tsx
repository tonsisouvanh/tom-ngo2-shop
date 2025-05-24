"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Heart, Share2 } from "lucide-react";

const trendingItems = [
  {
    id: 1,
    name: "Oversized Blazer",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=500&width=400&text=Trending+1",
    trend: "Hot",
    likes: 234,
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Vintage Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg?height=500&width=400&text=Trending+2",
    trend: "Rising",
    likes: 189,
    category: "Jackets",
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 199.99,
    image: "/placeholder.svg?height=500&width=400&text=Trending+3",
    trend: "New",
    likes: 156,
    category: "Dresses",
  },
];

export function TrendingSection() {
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what's hot in fashion right now. These pieces are flying
            off our virtual shelves!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border/40">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Trending badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge
                      variant={
                        item.trend === "Hot"
                          ? "destructive"
                          : item.trend === "Rising"
                          ? "default"
                          : "secondary"
                      }
                      className="font-semibold"
                    >
                      🔥 {item.trend}
                    </Badge>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                      onClick={() => toggleLike(item.id)}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          likedItems.has(item.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-80">
                      {item.category}
                    </span>
                    <div className="flex items-center text-sm">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{item.likes}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm line-through opacity-60">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      size="sm"
                      className="rounded-full bg-white text-black hover:bg-white/90 transform hover:scale-105 transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View All Trending Items
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
