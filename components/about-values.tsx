"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Sparkles, Leaf, Heart } from "lucide-react"

interface Value {
  icon: React.ReactNode
  title: string
  description: string
}

export function AboutValues() {
  const values: Value[] = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Quality Craftsmanship",
      description: "Every piece is carefully selected for exceptional quality and design.",
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Sustainable Fashion",
      description: "We're committed to ethical practices and sustainable materials.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer Obsessed",
      description: "Your satisfaction is our priority in every interaction.",
    },
  ]

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
