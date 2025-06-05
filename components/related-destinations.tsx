"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { DestinationKey, destinationTranslations } from "@/lib/translations";

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  relatedTo?: string[];
}

interface RelatedDestinationsProps {
  currentId: string;
  className?: string;
}

export function RelatedDestinations({ currentId, className }: RelatedDestinationsProps) {
  const { language, t } = useLanguage();
  
  // Pre-defined list of destinations with relation data
  const destinations: Destination[] = [
    {
      id: "great-wall",
      name: "Great Wall of China",
      location: "China",
      image: "https://images.pexels.com/photos/1131407/pexels-photo-1131407.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["forbidden-city", "terracotta-army", "summer-palace"]
    },
    {
      id: "eiffel-tower",
      name: "Eiffel Tower",
      location: "Paris, France",
      image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["louvre-museum", "arc-de-triomphe", "notre-dame"]
    },
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      location: "Agra, India",
      image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["red-fort", "agra-fort", "fatehpur-sikri"]
    },
    {
      id: "machu-picchu",
      name: "Machu Picchu",
      location: "Peru",
      image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["sacred-valley", "cusco", "inca-trail"]
    },
    {
      id: "pyramids",
      name: "Pyramids of Giza",
      location: "Egypt",
      image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["sphinx", "valley-of-kings", "karnak-temple"]
    },
    {
      id: "colosseum",
      name: "Colosseum",
      location: "Rome, Italy",
      image: "https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["roman-forum", "vatican-city", "trevi-fountain"]
    },
    {
      id: "statue-of-liberty",
      name: "Statue of Liberty",
      location: "New York, USA",
      image: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["empire-state-building", "central-park", "times-square"]
    },
    {
      id: "sydney-opera-house",
      name: "Sydney Opera House",
      location: "Sydney, Australia",
      image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["sydney-harbour-bridge", "bondi-beach", "blue-mountains"]
    },
    // Additional destinations that might be related but not in main navigation
    {
      id: "forbidden-city",
      name: "Forbidden City",
      location: "Beijing, China",
      image: "https://images.pexels.com/photos/2846001/pexels-photo-2846001.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["great-wall", "summer-palace", "temple-of-heaven"]
    },
    {
      id: "louvre-museum",
      name: "Louvre Museum",
      location: "Paris, France",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["eiffel-tower", "arc-de-triomphe", "notre-dame"]
    },
    {
      id: "red-fort",
      name: "Red Fort",
      location: "Delhi, India",
      image: "https://images.pexels.com/photos/13458294/pexels-photo-13458294.jpeg?auto=compress&cs=tinysrgb&w=800",
      relatedTo: ["taj-mahal", "qutub-minar", "india-gate"]
    }
  ];
  
  // Find the current destination
  const currentDestination = destinations.find(dest => dest.id === currentId);
  
  // Find related destinations
  const getRelatedDestinations = () => {
    // If we have predefined relations for this destination
    if (currentDestination?.relatedTo) {
      return destinations.filter(dest => 
        currentDestination.relatedTo!.includes(dest.id) && dest.id !== currentId
      ).slice(0, 3);
    }
    
    // For unknown destinations, recommend popular ones (first 3)
    return destinations.filter(dest => dest.id !== currentId).slice(0, 3);
  };
  
  const relatedDestinations = getRelatedDestinations();
  
  // Helper to get the translated name of a destination
  const getTranslatedName = (name: string): string => {
    return destinationTranslations[language][name as DestinationKey] || name;
  };
  
  // Helper to get the translated location
  const getTranslatedLocation = (location: string): string => {
    return destinationTranslations[language][location as DestinationKey] || location;
  };
  
  if (relatedDestinations.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-bold">
        {language === "en" ? "Related Destinations" : "相关目的地"}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {relatedDestinations.map((destination) => (
          <Link href={`/destination/${destination.id}`} key={destination.id}>
            <Card className="overflow-hidden h-24 group transition-all hover:shadow-md">
              <CardContent className="p-0 flex items-stretch h-full">
                <div className="relative w-1/3 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={getTranslatedName(destination.name)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-medium line-clamp-1">{getTranslatedName(destination.name)}</h4>
                    <div className="flex items-center mt-1 text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {getTranslatedLocation(destination.location)}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 