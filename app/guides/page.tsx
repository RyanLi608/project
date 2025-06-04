import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Calendar, User, ChevronRight } from "lucide-react";

const travelGuides = [
  {
    id: "italy-guide",
    title: "Ultimate Guide to Italy's Historical Sites",
    excerpt: "Explore the ancient wonders and Renaissance masterpieces throughout Italy.",
    image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Travel Expert",
    date: "May 15, 2025",
    readTime: "8 min read",
    category: "Europe"
  },
  {
    id: "asia-temples",
    title: "Ancient Temples of Southeast Asia",
    excerpt: "Discover the spiritual and architectural marvels of temples across Southeast Asia.",
    image: "https://images.pexels.com/photos/1482931/pexels-photo-1482931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "History Buff",
    date: "April 3, 2025",
    readTime: "12 min read",
    category: "Asia"
  },
  {
    id: "american-monuments",
    title: "American Monuments and Memorials",
    excerpt: "A journey through the most significant historical monuments in the United States.",
    image: "https://images.pexels.com/photos/1486577/pexels-photo-1486577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Culture Writer",
    date: "March 22, 2025",
    readTime: "10 min read",
    category: "North America"
  },
  {
    id: "africa-wonders",
    title: "Natural and Historical Wonders of Africa",
    excerpt: "From ancient Egyptian temples to the majestic landscapes of the savanna.",
    image: "https://images.pexels.com/photos/60013/desert-dry-dehydrated-dried-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    author: "Safari Guide",
    date: "February 18, 2025",
    readTime: "15 min read",
    category: "Africa"
  },
];

export default function GuidesPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Travel Guides
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                In-depth guides to help you explore destinations with cultural and historical context.
              </p>
            </div>
            <Button>Create Guide</Button>
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="py-12 border-b">
        <div className="container px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <Image 
                src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Featured Guide"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <Badge className="w-fit mb-4">Featured Guide</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  World Heritage Sites: A Complete Journey
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Explore the most fascinating UNESCO World Heritage sites around the globe, with in-depth historical context and practical travel information.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">June 10, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">Heritage Expert</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">20 min read</span>
                  </div>
                </div>
                <Button className="w-fit">
                  Read Full Guide <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-12">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            Browse By Category
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {["All", "Europe", "Asia", "North America", "South America", "Africa", "Oceania", "Architecture", "History", "Natural Wonders"].map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Listings */}
      <section className="py-8">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/guides/${guide.id}`} className="hover:text-primary transition-colors">
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {guide.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {guide.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30 mt-12">
        <div className="container px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter to receive the latest travel guides and updates about new destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-grow" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}