import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    location: "China",
    image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    location: "Paris, France",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, India",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Peru",
    image: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "pyramids",
    name: "Pyramids of Giza",
    location: "Egypt",
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export function PopularDestinations() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore some of the world's most iconic landmarks and attractions.
            </p>
          </div>
          <Link 
            href="/popular"
            className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0"
          >
            View all destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination}
              className={index === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  className?: string;
}

function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <Link 
      href={`/destination/${destination.id}`}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md h-80 block",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10" />
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        style={{ 
          objectFit: "cover", 
          objectPosition: "center" 
        }}
        className="transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-xl font-semibold text-white mb-1">{destination.name}</h3>
        <p className="text-white/80 text-sm">{destination.location}</p>
      </div>
    </Link>
  );
}