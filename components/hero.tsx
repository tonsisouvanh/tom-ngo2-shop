"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const heroSlides = [
  // {
  //   id: 1,
  //   title: "Dump Life Style",
  //   subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
  //   description:
  //     "Not just a shirt, it's a statement. For those who live the 'dump life' but are far from broke",
  //   image: "/assets/images/banner_a.jpg",
  //   cta: "Shop Now",
  //   ctaLink: "/products?category=summer",
  //   theme: "dark",
  // },
  {
    id: 1,
    title: "Dump Life Style",
    subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
    description: "",
    image: "/assets/images/banner_a.jpg",
    cta: "Shop Now",
    ctaLink: "/products?category=summer",
    theme: "dark",
  },
  {
    id: 2,
    title: "Dump Life Style",
    subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
    description: "",
    image:
      "https://res.cloudinary.com/devton/image/upload/v1748692164/ngo2/IMG-20250531-WA0009_clayfj.jpg",
    cta: "Shop Now",
    ctaLink: "/products?category=summer",
    theme: "dark",
  },
  {
    id: 3,
    title: "Dump Life Style",
    subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
    description: "",
    image:
      "https://res.cloudinary.com/devton/image/upload/v1748692291/ngo2/IMG-20250531-WA0007_djfvqa.jpg",
    cta: "Shop Now",
    ctaLink: "/products?category=summer",
    theme: "dark",
  },
  {
    id: 4,
    title: "Dump Life Style",
    subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
    description: "",
    image:
      "https://res.cloudinary.com/devton/image/upload/v1748692253/ngo2/IMG-20250531-WA0047_rizv1p.jpg",
    cta: "Shop Now",
    ctaLink: "/products?category=summer",
    theme: "dark",
  },
  {
    id: 5,
    title: "Dump Life Style",
    subtitle: "Live the 'Dump Life' (and Look Good Doing It)",
    description: "",
    image:
      "https://res.cloudinary.com/devton/image/upload/v1748692286/ngo2/IMG-20250531-WA0004_gup4jm.jpg",
    cta: "Shop Now",
    ctaLink: "/products?category=summer",
    theme: "dark",
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
    <section className="relative h-screen max-sm:h-[400px] overflow-hidden">
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
              className="object-contain max-sm:object-cover"
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
                    <p className="text-sm md:text-base max-sm:text-xs font-medium mb-2 tracking-wider uppercase opacity-80">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-sm:text-sm opacity-90 max-w-lg">
                      {heroSlides[currentSlide].description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-full max-sm:hidden px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
                      >
                        <Link href={heroSlides[currentSlide].ctaLink}>
                          {/* {heroSlides[currentSlide].cta} */}
                          Shop Now
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className={`rounded-full hidden px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 ${
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all max-sm:hidden duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all max-sm:hidden duration-300 group"
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
