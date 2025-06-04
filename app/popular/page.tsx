import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const continents = [
  { name: "All", value: "all" },
  { name: "Asia", value: "asia" },
  { name: "Europe", value: "europe" },
  { name: "North America", value: "north-america" },
  { name: "South America", value: "south-america" },
  { name: "Africa", value: "africa" },
  { name: "Oceania", value: "oceania" },
];

const popularDestinations = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    location: "China",
    continent: "asia",
    image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    location: "Paris, France",
    continent: "europe",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, India",
    continent: "asia",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Peru",
    continent: "south-america",
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "pyramids",
    name: "Pyramids of Giza",
    location: "Egypt",
    continent: "africa",
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "colosseum",
    name: "Colosseum",
    location: "Rome, Italy",
    continent: "europe",
    image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "statue-of-liberty",
    name: "Statue of Liberty",
    location: "New York, USA",
    continent: "north-america",
    image: "https://images.pexels.com/photos/1801485/pexels-photo-1801485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "sydney-opera-house",
    name: "Sydney Opera House",
    location: "Sydney, Australia",
    continent: "oceania",
    image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function PopularPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Popular Destinations
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore some of the world's most iconic landmarks and attractions. Discover their rich histories, cultural significance, and travel information.
          </p>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 border-b">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {continents.map((continent) => (
                <Button 
                  key={continent.value}
                  variant={continent.value === "all" ? "default" : "outline"}
                  size="sm"
                >
                  {continent.name}
                </Button>
              ))}
            </div>
            
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Link 
                key={destination.id}
                href={`/destination/${destination.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {destination.location}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-8 mb-12">
        <div className="container px-4 sm:px-6 text-center">
          <Button variant="outline" size="lg">
            Load More Destinations
          </Button>
        </div>
      </section>
    </div>
  );
}