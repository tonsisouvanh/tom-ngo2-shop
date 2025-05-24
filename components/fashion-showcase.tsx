"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import Link from "next/link";

const showcaseItems = [
  {
    id: 1,
    type: "image",
    src: "/placeholder.svg?height=600&width=400&text=Fashion+1",
    title: "Minimalist Elegance",
    description: "Clean lines meet sophisticated design",
    category: "Formal Wear",
  },
  {
    id: 2,
    type: "video",
    src: "/placeholder.svg?height=600&width=400&text=Video+Preview",
    title: "Street Style Revolution",
    description: "Bold statements for urban explorers",
    category: "Streetwear",
  },
  {
    id: 3,
    type: "image",
    src: "/placeholder.svg?height=600&width=400&text=Fashion+2",
    title: "Sustainable Luxury",
    description: "Eco-conscious fashion without compromise",
    category: "Eco Collection",
  },
  {
    id: 4,
    type: "image",
    src: "/placeholder.svg?height=600&width=400&text=Fashion+3",
    title: "Casual Comfort",
    description: "Effortless style for everyday moments",
    category: "Casual Wear",
  },
];

export function FashionShowcase() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Fashion <span className="text-primary">Redefined</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections that blend contemporary style with
            timeless elegance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/40"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Video play button */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 transform group-hover:scale-110"
                      onClick={() =>
                        setPlayingVideo(
                          playingVideo === item.id ? null : item.id
                        )
                      }
                    >
                      {playingVideo === item.id ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-sm font-medium opacity-80 mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{item.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Explore Collection
                  </Button>
                </div>
              </div>

              {/* Zoom indicator */}
              <div
                className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  hoveredItem === item.id ? "scale-110 bg-white/30" : ""
                }`}
              >
                <div className="w-3 h-3 border border-white rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/products">View All Collections</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
