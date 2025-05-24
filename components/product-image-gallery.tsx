"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Handle image navigation
  const goToImage = (index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  // Handle zoom functionality
  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
    if (isZoomed) {
      setZoomPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Limit the values to keep the image within bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current || !touchStart) return;

    const touch = e.touches[0];
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;

    // Limit the values to keep the image within bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    // If it's a small movement, treat it as a tap (for toggling zoom)
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      if (isFullscreen) {
        toggleZoom();
      }
    } else if (!isZoomed) {
      // If it's a swipe and not zoomed, navigate between images
      if (deltaX > 50) {
        prevImage();
      } else if (deltaX < -50) {
        nextImage();
      }
    }

    setTouchStart(null);
  };

  // Handle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    if (isZoomed) {
      setIsZoomed(false);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        switch (e.key) {
          case "ArrowLeft":
            prevImage();
            break;
          case "ArrowRight":
            nextImage();
            break;
          case "Escape":
            setIsFullscreen(false);
            setIsZoomed(false);
            break;
          case " ":
            toggleZoom();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, isZoomed]);

  // // Reset loading state when active image changes
  // useEffect(() => {
  //   setIsLoading(true);
  // }, [activeIndex]);

  // Prevent body scroll when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <div className="space-y-4">
      {/* Main image container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border/40 transition-all duration-300",
          isFullscreen
            ? "fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 md:p-8"
            : "aspect-square"
        )}
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={isFullscreen && !isMobile ? toggleZoom : undefined}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        )}

        {/* Main image */}
        <div
          className={cn(
            "relative h-full w-full transition-all duration-300",
            isZoomed ? "cursor-zoom-out scale-150" : "cursor-zoom-in"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : {}
          }
        >
          <Image
            src={images[activeIndex] || "/placeholder.svg"}
            alt={`${productName} - Image ${activeIndex + 1}`}
            fill
            className={cn(
              "object-contain transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
            sizes={isFullscreen ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={activeIndex === 0}
          />
        </div>

        {/* Navigation arrows - larger on mobile */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 z-10 h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 z-10 h-8 w-8 md:h-10 md:w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </>
        )}

        {/* Zoom and fullscreen controls */}
        <div className="absolute bottom-2 right-2 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleZoom();
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? (
              <ZoomOut className="h-4 w-4" />
            ) : (
              <ZoomIn className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? (
              <X className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 z-10 rounded-full bg-background/80 px-2 py-1 text-xs backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail navigation - scrollable on mobile */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-x-visible md:pb-0">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative aspect-square min-w-[60px] max-w-[80px] overflow-hidden rounded-md border transition-all md:min-w-0 md:max-w-none",
                activeIndex === index
                  ? "ring-2 ring-primary border-primary"
                  : "border-border/40 hover:border-border"
              )}
              onClick={() => goToImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60px, 100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
