"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2024",
    subtitle: "Discover the latest trends",
    description:
      "Embrace the season with our curated selection of summer essentials",
    image:
      "https://images.unsplash.com/flagged/photo-1570733117311-d990c3816c47?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Shop Summer",
    ctaLink: "/products?category=summer",
    theme: "light",
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    subtitle: "Style with purpose",
    description: "Eco-friendly materials meet contemporary design",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=3172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Explore Eco Line",
    ctaLink: "/products?category=sustainable",
    theme: "dark",
  },
  {
    id: 3,
    title: "Urban Streetwear",
    subtitle: "Express your individuality",
    description: "Bold designs for the modern trendsetter",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: "Shop Streetwear",
    ctaLink: "/products?category=streetwear",
    theme: "light",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={heroSlides[currentSlide].image || "/placeholder.svg"}
              alt={heroSlides[currentSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${
                heroSlides[currentSlide].theme === "dark"
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-transparent"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-transparent"
              }`}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className={
                      heroSlides[currentSlide].theme === "dark"
                        ? "text-white"
                        : "text-gray-900"
                    }
                  >
                    <p className="text-sm md:text-base font-medium mb-2 tracking-wider uppercase opacity-80">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
                      {heroSlides[currentSlide].description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                      >
                        <Link href={heroSlides[currentSlide].ctaLink}>
                          {heroSlides[currentSlide].cta}
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className={`rounded-full px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 ${
                          heroSlides[currentSlide].theme === "dark"
                            ? "border-white text-white hover:bg-white hover:text-black"
                            : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                        }`}
                        asChild
                      >
                        <Link href="/products">
                          <Play className="h-5 w-5 mr-2" />
                          Watch Lookbook
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">Auto</span>
          </div>
        </div>
      )}
    </section>
  );
}

// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export function Hero() {
//   return (
//     <div className="relative w-full bg-gradient-to-r from-background to-muted">
//       <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
//         <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">Elevate Your Style</h1>
//         <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 md:mb-8 max-w-2xl">
//           Discover our new collection of trendy and comfortable clothing for every occasion.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button asChild size="lg" className="rounded-full px-8">
//             <Link href="/products">Shop Now</Link>
//           </Button>
//           <Button variant="outline" size="lg" asChild className="rounded-full px-8">
//             <Link href="/categories">Browse Categories</Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
