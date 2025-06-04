"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Calendar,
  Info,
  Sparkles,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { PopularDestinations } from "@/components/popular-destinations";
import { useLandmarkInfo, useAudioNarration } from "@/hooks/useDeepSeekAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const { id } = params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  // Use custom hooks to fetch data
  const {
    data: landmarkData,
    error: landmarkError,
    isLoading: isLandmarkLoading,
    fetchLandmarkInfo
  } = useLandmarkInfo();
  
  const {
    data: narrationData,
    error: narrationError,
    isLoading: isNarrationLoading,
    fetchAudioNarration
  } = useAudioNarration();
  
  // Mock data for demonstration
  const destinationData = {
    name: id === "great-wall" ? "Great Wall of China" : 
          id === "eiffel-tower" ? "Eiffel Tower" :
          id === "taj-mahal" ? "Taj Mahal" :
          id === "machu-picchu" ? "Machu Picchu" :
          id === "pyramids" ? "Pyramids of Giza" : 
          decodeURIComponent(id).replace(/-/g, ' '),
    location: id === "great-wall" ? "China" : 
             id === "eiffel-tower" ? "Paris, France" :
             id === "taj-mahal" ? "Agra, India" :
             id === "machu-picchu" ? "Peru" :
             id === "pyramids" ? "Egypt" : "Location",
    image: id === "great-wall" ? "https://images.pexels.com/photos/1131407/pexels-photo-1131407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : 
           id === "eiffel-tower" ? "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "taj-mahal" ? "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "machu-picchu" ? "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "pyramids" ? "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : 
           "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920",
    travelInfo: {
      bestTime: "April to June, September to November",
      duration: "3-4 hours for most sections",
      entryFee: "¥40-60 depending on section",
      openingHours: "7:30 AM - 5:30 PM (varies by section)"
    }
  };

  // Fetch data when page loads
  useEffect(() => {
    fetchLandmarkInfo(destinationData.name, selectedLanguage);
  }, [destinationData.name, selectedLanguage]);
  
  // Handle audio playback
  const toggleAudio = async () => {
    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
      return;
    }
    
    try {
      // Fetch narration data if not available
      if (!narrationData) {
        await fetchAudioNarration(destinationData.name, 'Historical Background', selectedLanguage);
      }
      
      // Use text-to-speech API (simple TTS simulation here)
      const utterance = new SpeechSynthesisUtterance(narrationData || 'Sorry, no audio data available');
      utterance.lang = selectedLanguage === 'Chinese' ? 'zh-CN' : 'en-US';
      speechSynthesis.speak(utterance);
      
      setIsPlaying(true);
      
      // Listen for end of speech event
      utterance.onend = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlaying(false);
    }
  };

  // Parse and format API response data
  const parseApiData = () => {
    if (!landmarkData) return {
      description: 'Loading...',
      history: 'Loading...',
      highlights: []
    };
    
    // Simple processing of returned data, might need more complex parsing in real scenarios
    const sections = landmarkData.split(/\d+\.\s/).filter(Boolean);
    
    return {
      description: sections[0] || 'No description available',
      history: sections[1] || 'No historical information available',
      highlights: [
        sections[2] || 'Cultural significance',
        sections[3] || 'Architectural features',
        sections[4] || 'Interesting facts'
      ]
    };
  };
  
  const parsedData = parseApiData();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 h-[60vh] md:h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={destinationData.image}
            alt={destinationData.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 pb-10">
          <Badge className="mb-4">
            <MapPin className="h-3 w-3 mr-1" />
            {destinationData.location}
          </Badge>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {destinationData.name}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {isLandmarkLoading ? 'Loading...' : parsedData.description}
              </p>
            </div>
            <Button
              size="lg"
              onClick={toggleAudio}
              variant={isPlaying ? "secondary" : "default"}
              className="rounded-full flex gap-2 items-center"
              disabled={isNarrationLoading}
            >
              {isNarrationLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX className="h-5 w-5" /> Stop Narration
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" /> Listen to Guide
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {landmarkError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Error fetching data: {landmarkError}
              </AlertDescription>
            </Alert>
          )}
          
          {isLandmarkLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {!isLandmarkLoading && !landmarkError && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="travel">Travel Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Info className="h-5 w-5 mr-2" /> About {destinationData.name}
                      </h2>
                      <div className="prose dark:prose-invert max-w-none">
                        {parsedData.description.split('\n').map((paragraph, idx) => (
                          <p key={idx} className="text-muted-foreground mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">Location</dt>
                          <dd className="font-medium">{destinationData.location}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Best Time to Visit</dt>
                          <dd className="font-medium">{destinationData.travelInfo.bestTime}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Typical Duration</dt>
                          <dd className="font-medium">{destinationData.travelInfo.duration}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Entry Fee</dt>
                          <dd className="font-medium">{destinationData.travelInfo.entryFee}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Historical Background
                </h2>
                <div className="prose max-w-none dark:prose-invert">
                  {parsedData.history.split('\n').map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="highlights" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" /> Must-See Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {parsedData.highlights.map((highlight, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">Highlight {index + 1}</h3>
                        <p className="text-muted-foreground">
                          {highlight}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="travel" className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" /> Travel Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                      <p className="text-muted-foreground">
                        {destinationData.travelInfo.bestTime}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        These months offer pleasant weather and fewer crowds, making your visit more enjoyable.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        {destinationData.travelInfo.openingHours}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        It's recommended to arrive early to avoid crowds.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">Entry Information</h3>
                      <p className="text-muted-foreground">
                        {destinationData.travelInfo.entryFee}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Consider booking tickets in advance to avoid waiting in line.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* Related Destinations */}
      <PopularDestinations />
    </>
  );
}