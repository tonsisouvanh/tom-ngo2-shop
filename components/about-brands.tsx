"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutBrands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  // Placeholder brand logos
  const brands = ["Ngo2"];

  return (
    <section className="py-16 md:py-24 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Brands We Carry
        </h2>

        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="aspect-square flex items-center justify-center rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-muted-foreground">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
