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
  Camera,
} from "lucide-react";
import { PopularDestinations } from "@/components/popular-destinations";
import { AIChat } from "@/components/ai-chat";
import { useLandmarkInfo } from "@/hooks/useDeepSeekAPI";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/lib/language-context";
import { destinationTranslations, DestinationKey } from "@/lib/translations";
import { LandmarkGallery, getMockGalleryImages } from "@/components/landmark-gallery";
import { RelatedDestinations } from "@/components/related-destinations";
import { WeatherInfo } from "@/components/weather-info";

interface DestinationPageProps {
  params: {
    id: string;
  };
}

export default function DestinationPage({ params }: DestinationPageProps) {
  const { id } = params;
  const { language, t } = useLanguage();
  const selectedLanguage = language === "en" ? "English" : "Chinese";
  
  // Use custom hooks to fetch data
  const {
    data: landmarkData,
    error: landmarkError,
    isLoading: isLandmarkLoading,
    fetchLandmarkInfo
  } = useLandmarkInfo();
  
  // 辅助函数，用于获取翻译
  const getTranslation = (key: string) => {
    const dt = destinationTranslations[language];
    // 尝试将key转换为DestinationKey类型
    return dt[key as DestinationKey] || key;
  };
  
  // 检查是否是预定义的景点
  const isPredefinedLandmark = ["great-wall", "eiffel-tower", "taj-mahal", "machu-picchu", "pyramids", "colosseum", "statue-of-liberty", "sydney-opera-house"].includes(id);
  
  // Mock data for demonstration
  const destinationData = {
    name: id === "great-wall" ? "Great Wall of China" : 
          id === "eiffel-tower" ? "Eiffel Tower" :
          id === "taj-mahal" ? "Taj Mahal" :
          id === "machu-picchu" ? "Machu Picchu" :
          id === "pyramids" ? "Pyramids of Giza" : 
          // 未预定义景点使用格式化的ID作为名称
          decodeURIComponent(id).replace(/-/g, ' '),
    location: id === "great-wall" ? "China" : 
             id === "eiffel-tower" ? "Paris, France" :
             id === "taj-mahal" ? "Agra, India" :
             id === "machu-picchu" ? "Peru" :
             id === "pyramids" ? "Egypt" : 
             // 未预定义景点的位置
             language === "en" ? "Various locations" : "多个地点",
    image: id === "great-wall" ? "https://images.pexels.com/photos/1131407/pexels-photo-1131407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : 
           id === "eiffel-tower" ? "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "taj-mahal" ? "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "machu-picchu" ? "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" :
           id === "pyramids" ? "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" : 
           // 未预定义景点使用默认图片
           "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920",
    travelInfo: {
      bestTime: id === "great-wall" ? (language === "en" ? "April to June, September to November" : "4月至6月，9月至11月") :
                id === "eiffel-tower" ? (language === "en" ? "May to September" : "5月至9月") :
                id === "taj-mahal" ? (language === "en" ? "October to March" : "10月至3月") :
                id === "machu-picchu" ? (language === "en" ? "May to September" : "5月至9月") :
                id === "pyramids" ? (language === "en" ? "October to April" : "10月至4月") :
                language === "en" ? "Varies by location" : "因地点而异",
      duration: id === "great-wall" ? (language === "en" ? "3-4 hours for most sections" : "大多数段落需要3-4小时") :
                id === "eiffel-tower" ? (language === "en" ? "1-2 hours" : "1-2小时") :
                id === "taj-mahal" ? (language === "en" ? "2-3 hours" : "2-3小时") :
                id === "machu-picchu" ? (language === "en" ? "3-4 hours" : "3-4小时") :
                id === "pyramids" ? (language === "en" ? "2-3 hours" : "2-3小时") :
                language === "en" ? "Depends on specific location" : "取决于具体地点",
      entryFee: id === "great-wall" ? (language === "en" ? "¥40-60 depending on section" : "根据不同段落40-60元") :
                id === "eiffel-tower" ? (language === "en" ? "€17-26" : "17-26欧元") :
                id === "taj-mahal" ? (language === "en" ? "₹1100 for foreigners" : "外国游客1100卢比") :
                id === "machu-picchu" ? (language === "en" ? "$45-65" : "45-65美元") :
                id === "pyramids" ? (language === "en" ? "LE200" : "200埃及镑") :
                language === "en" ? "Varies by location" : "因地点而异",
      openingHours: id === "great-wall" ? (language === "en" ? "7:30 AM - 5:30 PM (varies by section)" : "上午7:30至下午5:30（因段落而异）") :
                    id === "eiffel-tower" ? (language === "en" ? "9:00 AM - 11:45 PM" : "上午9:00至晚上11:45") :
                    id === "taj-mahal" ? (language === "en" ? "Sunrise to sunset (closed on Fridays)" : "日出至日落（周五闭馆）") :
                    id === "machu-picchu" ? (language === "en" ? "6:00 AM - 5:30 PM" : "上午6:00至下午5:30") :
                    id === "pyramids" ? (language === "en" ? "8:00 AM - 5:00 PM" : "上午8:00至下午5:00") :
                    language === "en" ? "Varies by location" : "因地点而异"
    }
  };

  // Add gallery images
  const galleryImages = getMockGalleryImages(id);

  // Fetch data when page loads
  useEffect(() => {
    fetchLandmarkInfo(destinationData.name, selectedLanguage);
  }, [destinationData.name, selectedLanguage]);
  
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

  // 处理API错误，提供重试功能
  const handleRetry = () => {
    if (isLandmarkLoading) return;
    fetchLandmarkInfo(destinationData.name, selectedLanguage);
  };

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
              {!isPredefinedLandmark && (
                <Badge variant="outline" className="mb-4">
                  {language === "en" ? "Custom search" : "自定义搜索"}
                </Badge>
              )}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {isLandmarkLoading ? (language === "en" ? 'Loading...' : '加载中...') : parsedData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {landmarkError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <span>{language === "en" ? "An error occurred. Please try again." : "发生错误，请重试。"}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    {language === "en" ? "Retry" : "重试"}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {isLandmarkLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {!isLandmarkLoading && !landmarkError && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-5 mb-8 w-full">
                    <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                    <TabsTrigger value="gallery">
                      <Camera className="mr-1 h-4 w-4" />
                      {language === "en" ? "Gallery" : "图库"}
                    </TabsTrigger>
                    <TabsTrigger value="history">{t("history")}</TabsTrigger>
                    <TabsTrigger value="highlights">{t("highlights")}</TabsTrigger>
                    <TabsTrigger value="travel-info">{t("travelInfo")}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
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
                  
                  <TabsContent value="gallery" className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">
                      {language === "en" ? "Photo Gallery" : "照片图库"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {language === "en" 
                        ? "Explore visual highlights of this magnificent landmark through our curated photo gallery."
                        : "通过我们精心策划的照片图库，探索这个宏伟地标的视觉亮点。"}
                    </p>
                    
                    <LandmarkGallery images={galleryImages} />
                    
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground">
                        {language === "en" 
                          ? "Photos courtesy of Pexels. All images are freely available for personal and commercial use."
                          : "照片由Pexels提供。所有图片均可免费用于个人和商业用途。"}
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="space-y-6">
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
                  
                  <TabsContent value="highlights" className="space-y-6">
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
                  
                  <TabsContent value="travel-info" className="space-y-6">
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
              </div>
              
              <div className="space-y-8">
                <WeatherInfo location={destinationData.location} />
                
                <RelatedDestinations currentId={id} />
                
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBs-Pc9VeRGg17W6qvNrN7q0jEuV-BLSmw&q=${encodeURIComponent(
                        destinationData.name
                      )}`}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${destinationData.name}`}
                      className="grayscale-[50%] hover:grayscale-0 transition-all duration-300"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Related Destinations */}
      <PopularDestinations />
    </>
  );
}