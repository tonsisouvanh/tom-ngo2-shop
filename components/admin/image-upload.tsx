"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X, Edit, ImageIcon, type File } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  images: any[];
  onImagesChange: (images: any[]) => void;
  maxImages?: number;
  acceptedTypes?: string[];
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 10,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFiles = useCallback(
    async (files: File[]) => {
      if (images.length + files.length > maxImages) {
        // toast({
        //   title: "Too many files",
        //   description: `You can only upload up to ${maxImages} images`,
        //   variant: "destructive",
        // });
        return;
      }

      setIsUploading(true);

      try {
        const newImages = await Promise.all(
          files.map(async (file) => {
            // Validate file type
            if (!acceptedTypes.includes(file.type)) {
              throw new Error(`${file.name} is not a supported file type`);
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
              throw new Error(`${file.name} is too large. Maximum size is 5MB`);
            }

            // Create preview URL
            const url = URL.createObjectURL(file);

            // Simulate upload delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              id: Date.now() + Math.random(),
              filename: file.name,
              originalName: file.name,
              url,
              thumbnailUrl: url,
              size: file.size,
              mimeType: file.type,
              alt: "",
              caption: "",
              uploadedAt: new Date().toISOString(),
              uploadedBy: "current-user",
            };
          })
        );

        onImagesChange([...images, ...newImages]);

        // toast({
        //   title: "Images uploaded",
        //   description: `${newImages.length} image(s) uploaded successfully`,
        // })
      } catch (error) {
        // toast({
        //   title: "Upload failed",
        //   description: error instanceof Error ? error.message : "Failed to upload images",
        //   variant: "destructive",
        // })
      } finally {
        setIsUploading(false);
      }
    },
    [acceptedTypes, images, maxImages, onImagesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    },
    [handleFiles]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const removeImage = (imageId: string) => {
    onImagesChange(images.filter((img) => img.id !== imageId));
  };

  const updateImage = (imageId: string, updates: any) => {
    onImagesChange(
      images.map((img) => (img.id === imageId ? { ...img, ...updates } : img))
    );
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border/40 hover:border-border"
        }`}
      >
        <CardContent className="p-8">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="text-center"
          >
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-muted-foreground" />
              )}
            </div>

            <h3 className="text-lg font-medium mb-2">
              {isUploading ? "Uploading..." : "Upload Images"}
            </h3>

            <p className="text-muted-foreground mb-4">
              Drag and drop images here, or click to browse
            </p>

            <input
              type="file"
              multiple
              accept={acceptedTypes.join(",")}
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
              disabled={isUploading}
            />

            <Button asChild variant="outline" disabled={isUploading}>
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </Button>

            <p className="text-xs text-muted-foreground mt-2">
              Supports JPEG, PNG, WebP, GIF up to 5MB each. Maximum {maxImages}{" "}
              images.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      width={500}
                      height={500}
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt || image.filename}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => setEditingImage(image)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Primary badge */}
                    {index === 0 && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {image.filename}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(image.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Image Editor Dialog */}
      {editingImage && (
        <Dialog open={true} onOpenChange={() => setEditingImage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Image</DialogTitle>
              <DialogDescription>
                Update image details and metadata
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                <Image
                  width={500}
                  height={500}
                  src={editingImage.url || "/placeholder.svg"}
                  alt={editingImage.alt || editingImage.filename}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input
                    id="alt"
                    value={editingImage.alt || ""}
                    onChange={(e) =>
                      setEditingImage({
                        ...editingImage,
                        alt: e.target.value,
                      })
                    }
                    placeholder="Describe the image"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    value={editingImage.caption || ""}
                    onChange={(e) =>
                      setEditingImage({
                        ...editingImage,
                        caption: e.target.value,
                      })
                    }
                    placeholder="Image caption"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingImage(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    updateImage(editingImage.id, {
                      alt: editingImage.alt,
                      caption: editingImage.caption,
                    });
                    setEditingImage(null);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
