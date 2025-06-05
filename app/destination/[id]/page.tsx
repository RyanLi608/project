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
import { AIChat } from "@/components/ai-chat";
import { useLandmarkInfo, useAudioNarration } from "@/hooks/useDeepSeekAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/lib/language-context";
import { destinationTranslations, DestinationKey } from "@/lib/translations";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const { id } = params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const { language, t } = useLanguage();
  const selectedLanguage = language === "en" ? "English" : "Chinese";
  
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
  
  // 辅助函数，用于获取翻译
  const getTranslation = (key: string) => {
    const dt = destinationTranslations[language];
    // 尝试将key转换为DestinationKey类型
    return dt[key as DestinationKey] || key;
  };
  
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
        await fetchAudioNarration(destinationData.name, language === "en" ? 'Historical Background' : '历史背景', selectedLanguage);
      }
      
      // Use text-to-speech API (simple TTS simulation here)
      const utterance = new SpeechSynthesisUtterance(narrationData || (language === "en" ? 'Sorry, no audio data available' : '抱歉，没有可用的音频数据'));
      utterance.lang = language === "en" ? 'en-US' : 'zh-CN';
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
      description: language === "en" ? 'Loading...' : '加载中...',
      history: language === "en" ? 'Loading...' : '加载中...',
      highlights: []
    };
    
    // Simple processing of returned data, might need more complex parsing in real scenarios
    const sections = landmarkData.split(/\d+\.\s/).filter(Boolean);
    
    return {
      description: sections[0] || (language === "en" ? 'No description available' : '没有可用的描述'),
      history: sections[1] || (language === "en" ? 'No historical information available' : '没有可用的历史信息'),
      highlights: [
        sections[2] || (language === "en" ? 'Cultural significance' : '文化意义'),
        sections[3] || (language === "en" ? 'Architectural features' : '建筑特点'),
        sections[4] || (language === "en" ? 'Interesting facts' : '有趣的事实')
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
            alt={getTranslation(destinationData.name)}
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
            {getTranslation(destinationData.location)}
          </Badge>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {getTranslation(destinationData.name)}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {isLandmarkLoading ? (language === "en" ? 'Loading...' : '加载中...') : parsedData.description}
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
                  <Loader2 className="h-5 w-5 animate-spin" /> {language === "en" ? 'Loading...' : '加载中...'}
                </>
              ) : isPlaying ? (
                <>
                  <VolumeX className="h-5 w-5" /> {t("stopNarration")}
                </>
              ) : (
                <>
                  <Volume2 className="h-5 w-5" /> {t("listen")}
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
                {t("errorFetching")} {landmarkError}
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
                <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                <TabsTrigger value="history">{t("history")}</TabsTrigger>
                <TabsTrigger value="highlights">{t("highlights")}</TabsTrigger>
                <TabsTrigger value="travel">{t("travelInfo")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Info className="h-5 w-5 mr-2" /> {t("about")} {getTranslation(destinationData.name)}
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
                      <h3 className="text-xl font-semibold mb-4">{t("quickFacts")}</h3>
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm text-muted-foreground">{t("location")}</dt>
                          <dd className="font-medium">{getTranslation(destinationData.location)}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">{t("bestTime")}</dt>
                          <dd className="font-medium">{destinationData.travelInfo.bestTime}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">{t("duration")}</dt>
                          <dd className="font-medium">{destinationData.travelInfo.duration}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">{t("entryFee")}</dt>
                          <dd className="font-medium">{destinationData.travelInfo.entryFee}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                  
                  {/* AI Chat */}
                  <Card className="md:col-span-3">
                    <CardContent className="p-6">
                      <AIChat landmarkName={getTranslation(destinationData.name)} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{t("historicalBackground")}</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {parsedData.history.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="text-muted-foreground mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="highlights">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{t("mustSeeHighlights")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {parsedData.highlights.map((highlight, idx) => (
                        <div key={idx} className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 text-primary" />
                            {t("highlight")} {idx + 1}
                          </h3>
                          <p className="text-muted-foreground">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="travel">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{t("travelInfo")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">{t("openingHours")}</h3>
                        <p className="mb-2">{destinationData.travelInfo.openingHours}</p>
                        <p className="text-sm text-muted-foreground">{t("arriveEarly")}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">{t("entryInformation")}</h3>
                        <p className="mb-2">{t("entryFee")}: {destinationData.travelInfo.entryFee}</p>
                        <p className="text-sm text-muted-foreground">{t("bookAdvance")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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