"use client";

import { products } from "@/lib/data/products";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/product-card"), {
  ssr: false,
});

export function NewArrivals() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold">New Arrivals</h2>
        </div>
        <p className="text-lg hidden text-muted-foreground max-w-2xl mx-auto">
          Fresh styles just landed. Be among the first to discover our latest
          additions
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
