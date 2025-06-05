"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface LandmarkGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function LandmarkGallery({ images, className }: LandmarkGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { t } = useLanguage();
  
  const totalImages = images.length;
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalImages - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
  };
  
  const openPreview = () => {
    setIsPreviewOpen(true);
  };
  
  const closePreview = () => {
    setIsPreviewOpen(false);
  };
  
  if (totalImages === 0) {
    return null;
  }
  
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      {/* Main Gallery */}
      <Card className="relative">
        <CardContent className="p-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover transition-all hover:scale-105 duration-500"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={openPreview}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm md:text-base font-medium drop-shadow-md">
                {images[currentIndex].caption}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Controls */}
      <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Thumbnails */}
      <div className="mt-2 flex gap-2 overflow-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={cn(
              "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md",
              currentIndex === index && "ring-2 ring-primary"
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Fullscreen Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closePreview}>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1200}
              height={800}
              className="max-h-[90vh] object-contain"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={closePreview}
            >
              <ChevronLeft className="h-4 w-4 -rotate-45" />
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 p-4 rounded-md">
            <p className="text-white text-center">{images[currentIndex].caption}</p>
            <p className="text-white/70 text-sm text-center mt-1">
              {currentIndex + 1} / {totalImages}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create mock gallery data for a landmark
export function getMockGalleryImages(landmarkId: string): GalleryImage[] {
  // Default fallback images
  const defaultImages = [
    {
      id: "default-1",
      src: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Beautiful landscape",
      caption: "A scenic view of mountains and nature"
    },
    {
      id: "default-2",
      src: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "City skyline",
      caption: "Modern architecture in an urban setting"
    },
    {
      id: "default-3",
      src: "https://images.pexels.com/photos/2091697/pexels-photo-2091697.jpeg?auto=compress&cs=tinysrgb&w=1600",
      alt: "Beach sunset",
      caption: "Golden sunset over a tropical beach"
    }
  ];
  
  // Landmark-specific image collections
  const landmarkImages: Record<string, GalleryImage[]> = {
    "great-wall": [
      {
        id: "great-wall-1",
        src: "https://images.pexels.com/photos/2412606/pexels-photo-2412606.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Great Wall of China",
        caption: "The Great Wall winding through mountains, one of the world's most impressive architectural feats"
      },
      {
        id: "great-wall-2",
        src: "https://images.pexels.com/photos/2819082/pexels-photo-2819082.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Great Wall sunset",
        caption: "Sunset view of the Great Wall, showcasing its magnificent stretch across the landscape"
      },
      {
        id: "great-wall-3",
        src: "https://images.pexels.com/photos/2837908/pexels-photo-2837908.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Great Wall watchtower",
        caption: "Ancient watchtower on the Great Wall, used for military surveillance"
      },
      {
        id: "great-wall-4",
        src: "https://images.pexels.com/photos/6006074/pexels-photo-6006074.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Great Wall in winter",
        caption: "The Great Wall covered in snow, offering a breathtaking winter landscape"
      }
    ],
    "eiffel-tower": [
      {
        id: "eiffel-1",
        src: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Eiffel Tower",
        caption: "The iconic Eiffel Tower standing tall in Paris"
      },
      {
        id: "eiffel-2",
        src: "https://images.pexels.com/photos/2344/cars-france-landmark-lights.jpg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Eiffel Tower at night",
        caption: "The Eiffel Tower illuminated at night, showcasing Paris as the City of Lights"
      },
      {
        id: "eiffel-3",
        src: "https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Eiffel Tower from below",
        caption: "Looking up at the Eiffel Tower's impressive iron lattice structure"
      },
      {
        id: "eiffel-4",
        src: "https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Eiffel Tower with flowers",
        caption: "Spring in Paris with the Eiffel Tower framed by cherry blossoms"
      }
    ],
    "taj-mahal": [
      {
        id: "taj-1",
        src: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Taj Mahal",
        caption: "The magnificent Taj Mahal, a symbol of eternal love"
      },
      {
        id: "taj-2",
        src: "https://images.pexels.com/photos/3879059/pexels-photo-3879059.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Taj Mahal reflection",
        caption: "Taj Mahal reflected in the water of its surrounding gardens"
      },
      {
        id: "taj-3",
        src: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600",
        alt: "Taj Mahal archway",
        caption: "Intricate marble inlay work and Islamic calligraphy adorn the Taj Mahal"
      }
    ]
  };
  
  // Return landmark-specific images if available, otherwise default images
  return landmarkImages[landmarkId] || defaultImages;
} 