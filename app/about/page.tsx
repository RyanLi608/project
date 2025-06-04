import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About LandmarkAI
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                We're revolutionizing how people experience and learn about the world's most iconic destinations through AI-powered storytelling and historical context.
              </p>
              <Button size="lg">Our Mission</Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="About LandmarkAI"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At LandmarkAI, we're on a mission to make cultural and historical information about the world's landmarks accessible to everyone, regardless of language barriers or geographical constraints.
              </p>
              <p className="text-muted-foreground">
                We believe that understanding the stories behind landmarks enriches travel experiences and fosters a deeper appreciation for global heritage. By leveraging AI technology, we provide immersive, accurate, and engaging content that brings these stories to life.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-muted-foreground mb-6">
                We envision a world where everyone can access rich, contextual information about any landmark or cultural site instantly, breaking down language barriers and democratizing knowledge.
              </p>
              <p className="text-muted-foreground">
                Through technological innovation and a commitment to accuracy, we're building the most comprehensive and user-friendly global tourism platform that connects people with the world's wonders in meaningful ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How LandmarkAI Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Any Landmark</h3>
              <p className="text-muted-foreground">
                Simply type the name of any landmark or attraction you're interested in learning about.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get AI-Generated Content</h3>
              <p className="text-muted-foreground">
                Our AI generates comprehensive, engaging information about the landmark, including history and key highlights.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Experience Through Audio</h3>
              <p className="text-muted-foreground">
                Listen to the information with our natural-sounding voice narration for an immersive experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The Team Behind LandmarkAI
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-muted mb-4 overflow-hidden relative">
                  <Image
                    src={`https://images.pexels.com/photos/${1000000 + member}/pexels-photo-${1000000 + member}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`}
                    alt={`Team member ${member}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-lg font-semibold">Team Member {member}</h3>
                <p className="text-muted-foreground">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about LandmarkAI? We'd love to hear from you!
          </p>
          <Button size="lg">Contact Us</Button>
        </div>
      </section>
    </div>
  );
}