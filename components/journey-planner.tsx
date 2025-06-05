"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import { Calendar, Clock, Globe, Map, MapPin, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyDestination {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  days: number;
}

interface Journey {
  id: string;
  title: string;
  destinations: JourneyDestination[];
  duration: number;
  description: string;
  difficulty: "easy" | "moderate" | "challenging";
  tags: string[];
}

export function JourneyPlanner({ className }: { className?: string }) {
  const { language, t } = useLanguage();
  
  // Predefined journeys by theme
  const journeys: Record<string, Journey[]> = {
    "historical": [
      {
        id: "ancient-wonders",
        title: language === "en" ? "Ancient Wonders of the World" : "世界古代奇迹之旅",
        destinations: [
          {
            id: "pyramids",
            name: language === "en" ? "Pyramids of Giza" : "吉萨金字塔",
            location: language === "en" ? "Egypt" : "埃及",
            image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Explore the last remaining wonder of the ancient world" : "探索古代世界仅存的奇迹",
            days: 3
          },
          {
            id: "colosseum",
            name: language === "en" ? "Colosseum" : "罗马斗兽场",
            location: language === "en" ? "Rome, Italy" : "意大利，罗马",
            image: "https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Visit the iconic amphitheater of ancient Rome" : "参观古罗马的标志性圆形剧场",
            days: 2
          },
          {
            id: "acropolis",
            name: language === "en" ? "Acropolis" : "雅典卫城",
            location: language === "en" ? "Athens, Greece" : "希腊，雅典",
            image: "https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Discover the ancient citadel overlooking Athens" : "探索俯瞰雅典的古代城堡",
            days: 2
          }
        ],
        duration: 10,
        description: language === "en" 
          ? "Journey through time to explore the most magnificent ancient structures that have stood the test of time."
          : "穿越时空，探索经受住时间考验的最宏伟古代建筑。",
        difficulty: "moderate",
        tags: language === "en" ? ["History", "Architecture", "Culture"] : ["历史", "建筑", "文化"]
      },
      {
        id: "asian-heritage",
        title: language === "en" ? "Asian Heritage Trail" : "亚洲文化遗产之旅",
        destinations: [
          {
            id: "great-wall",
            name: language === "en" ? "Great Wall of China" : "中国长城",
            location: language === "en" ? "China" : "中国",
            image: "https://images.pexels.com/photos/1131407/pexels-photo-1131407.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Walk along one of the most impressive structures ever built" : "漫步于有史以来最令人印象深刻的建筑之一",
            days: 3
          },
          {
            id: "taj-mahal",
            name: language === "en" ? "Taj Mahal" : "泰姬陵",
            location: language === "en" ? "Agra, India" : "印度，阿格拉",
            image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Marvel at this monument to eternal love" : "欣赏这座永恒爱情的纪念碑",
            days: 2
          },
          {
            id: "angkor-wat",
            name: language === "en" ? "Angkor Wat" : "吴哥窟",
            location: language === "en" ? "Cambodia" : "柬埔寨",
            image: "https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Explore the largest religious monument in the world" : "探索世界上最大的宗教建筑",
            days: 3
          }
        ],
        duration: 12,
        description: language === "en"
          ? "Discover the rich cultural heritage of Asia through its most iconic historical sites."
          : "通过亚洲最具标志性的历史遗址，探索丰富的文化遗产。",
        difficulty: "moderate",
        tags: language === "en" ? ["History", "Culture", "Architecture"] : ["历史", "文化", "建筑"]
      }
    ],
    "natural": [
      {
        id: "natural-wonders",
        title: language === "en" ? "Natural Wonders Expedition" : "自然奇观探险",
        destinations: [
          {
            id: "grand-canyon",
            name: language === "en" ? "Grand Canyon" : "大峡谷",
            location: language === "en" ? "Arizona, USA" : "美国，亚利桑那州",
            image: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Witness the majesty of this enormous canyon carved by the Colorado River" : "见证科罗拉多河雕刻的这个巨大峡谷的壮丽",
            days: 3
          },
          {
            id: "northern-lights",
            name: language === "en" ? "Northern Lights" : "北极光",
            location: language === "en" ? "Iceland" : "冰岛",
            image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Experience the magical aurora borealis dancing across the night sky" : "体验魔幻的北极光在夜空中舞动",
            days: 4
          },
          {
            id: "amazon",
            name: language === "en" ? "Amazon Rainforest" : "亚马逊雨林",
            location: language === "en" ? "Brazil" : "巴西",
            image: "https://images.pexels.com/photos/814836/pexels-photo-814836.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Explore the world's largest rainforest and most biodiverse place on Earth" : "探索世界上最大的雨林和地球上生物多样性最丰富的地方",
            days: 5
          }
        ],
        duration: 15,
        description: language === "en"
          ? "Embark on an adventure to witness Earth's most spectacular natural phenomena and landscapes."
          : "踏上冒险之旅，见证地球上最壮观的自然现象和景观。",
        difficulty: "challenging",
        tags: language === "en" ? ["Nature", "Adventure", "Photography"] : ["自然", "冒险", "摄影"]
      },
      {
        id: "island-paradise",
        title: language === "en" ? "Island Paradise Hopping" : "岛屿天堂跳跃之旅",
        destinations: [
          {
            id: "santorini",
            name: language === "en" ? "Santorini" : "圣托里尼",
            location: language === "en" ? "Greece" : "希腊",
            image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Relax on the iconic white and blue island of the Mediterranean" : "在地中海标志性的蓝白岛屿上放松",
            days: 3
          },
          {
            id: "bali",
            name: language === "en" ? "Bali" : "巴厘岛",
            location: language === "en" ? "Indonesia" : "印度尼西亚",
            image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Experience the perfect blend of beaches, culture, and spirituality" : "体验海滩、文化和灵性的完美融合",
            days: 4
          },
          {
            id: "maldives",
            name: language === "en" ? "Maldives" : "马尔代夫",
            location: language === "en" ? "Maldives" : "马尔代夫",
            image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Unwind in overwater bungalows surrounded by crystal clear waters" : "在被清澈海水环绕的水上平房中放松身心",
            days: 5
          }
        ],
        duration: 14,
        description: language === "en"
          ? "Island hop through some of the world's most beautiful tropical paradises and pristine beaches."
          : "穿越世界上最美丽的热带天堂和原始海滩，进行岛屿跳跃。",
        difficulty: "easy",
        tags: language === "en" ? ["Beaches", "Relaxation", "Culture"] : ["海滩", "放松", "文化"]
      }
    ],
    "cultural": [
      {
        id: "culinary-tour",
        title: language === "en" ? "Global Culinary Tour" : "全球美食之旅",
        destinations: [
          {
            id: "tokyo",
            name: language === "en" ? "Tokyo" : "东京",
            location: language === "en" ? "Japan" : "日本",
            image: "https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Savor the world's best sushi and experience Japanese cuisine" : "品尝世界上最好的寿司，体验日本料理",
            days: 4
          },
          {
            id: "marrakech",
            name: language === "en" ? "Marrakech" : "马拉喀什",
            location: language === "en" ? "Morocco" : "摩洛哥",
            image: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Explore the vibrant spice markets and traditional Moroccan tagines" : "探索充满活力的香料市场和传统的摩洛哥塔吉锅",
            days: 3
          },
          {
            id: "bologna",
            name: language === "en" ? "Bologna" : "博洛尼亚",
            location: language === "en" ? "Italy" : "意大利",
            image: "https://images.pexels.com/photos/15484118/pexels-photo-15484118/free-photo-of-asinelli-tower-in-bologna-italy.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Discover authentic Italian pasta and cuisine in Italy's food capital" : "在意大利美食之都发现正宗的意大利面和美食",
            days: 3
          }
        ],
        duration: 12,
        description: language === "en"
          ? "Embark on a mouth-watering journey to experience the world's most delicious cuisines and food cultures."
          : "踏上令人垂涎的旅程，体验世界上最美味的料理和食物文化。",
        difficulty: "easy",
        tags: language === "en" ? ["Food", "Culture", "Urban"] : ["美食", "文化", "城市"]
      },
      {
        id: "artistic-capitals",
        title: language === "en" ? "Artistic Capitals of Europe" : "欧洲艺术之都",
        destinations: [
          {
            id: "paris",
            name: language === "en" ? "Paris" : "巴黎",
            location: language === "en" ? "France" : "法国",
            image: "https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Visit the Louvre and immerse yourself in French art and culture" : "参观卢浮宫，沉浸在法国艺术和文化中",
            days: 4
          },
          {
            id: "florence",
            name: language === "en" ? "Florence" : "佛罗伦萨",
            location: language === "en" ? "Italy" : "意大利",
            image: "https://images.pexels.com/photos/6894460/pexels-photo-6894460.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Discover Renaissance masterpieces in the birthplace of the movement" : "在文艺复兴运动的发源地发现文艺复兴杰作",
            days: 3
          },
          {
            id: "vienna",
            name: language === "en" ? "Vienna" : "维也纳",
            location: language === "en" ? "Austria" : "奥地利",
            image: "https://images.pexels.com/photos/164422/pexels-photo-164422.jpeg?auto=compress&cs=tinysrgb&w=800",
            description: language === "en" ? "Experience the classical music heritage and artistic splendor" : "体验古典音乐遗产和艺术辉煌",
            days: 3
          }
        ],
        duration: 12,
        description: language === "en"
          ? "Tour Europe's most culturally significant cities and immerse yourself in centuries of artistic heritage."
          : "游览欧洲文化最重要的城市，沉浸在几个世纪的艺术遗产中。",
        difficulty: "easy",
        tags: language === "en" ? ["Art", "History", "Urban"] : ["艺术", "历史", "城市"]
      }
    ]
  };
  
  const [selectedTab, setSelectedTab] = useState<string>("historical");
  
  // Helper function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "challenging":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Helper function to get translated difficulty text
  const getTranslatedDifficulty = (difficulty: string) => {
    if (language === "en") {
      return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
    
    const translations: Record<string, string> = {
      "easy": "简单",
      "moderate": "中等",
      "challenging": "挑战性"
    };
    
    return translations[difficulty] || difficulty;
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">
          {language === "en" ? "Multi-Destination Journeys" : "多目的地旅程"}
        </h2>
        <p className="text-muted-foreground">
          {language === "en" 
            ? "Curated travel journeys combining complementary destinations for unforgettable experiences." 
            : "精心策划的旅行路线，组合互补的目的地，带来难忘的体验。"}
        </p>
      </div>
      
      <Tabs defaultValue="historical" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="historical">
            {language === "en" ? "Historical" : "历史"}
          </TabsTrigger>
          <TabsTrigger value="natural">
            {language === "en" ? "Natural" : "自然"}
          </TabsTrigger>
          <TabsTrigger value="cultural">
            {language === "en" ? "Cultural" : "文化"}
          </TabsTrigger>
        </TabsList>
        
        {Object.entries(journeys).map(([category, journeyList]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            {journeyList.map((journey) => (
              <Card key={journey.id} className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{journey.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {journey.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={cn("ml-2 whitespace-nowrap", getDifficultyColor(journey.difficulty))}
                    >
                      {getTranslatedDifficulty(journey.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {journey.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{journey.duration} {language === "en" ? "days" : "天"}</span>
                    <span className="mx-2">•</span>
                    <Globe className="h-4 w-4" />
                    <span>{journey.destinations.length} {language === "en" ? "destinations" : "个目的地"}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {journey.destinations.map((destination, index) => (
                      <Link 
                        href={`/destination/${destination.id}`} 
                        key={destination.id}
                        className="group"
                      >
                        <div className="relative rounded-md overflow-hidden">
                          <div className="aspect-[4/3] relative">
                            <Image 
                              src={destination.image} 
                              alt={destination.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <div className="flex items-center text-white gap-1 mb-1">
                              <div className="bg-white/20 backdrop-blur-sm p-1 rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <div className="text-sm bg-black/30 px-2 py-0.5 rounded-full">
                                {destination.days} {language === "en" ? "days" : "天"}
                              </div>
                            </div>
                            <h3 className="font-medium text-white">
                              {destination.name}
                            </h3>
                            <div className="flex items-center text-white/80 text-sm">
                              <MapPin className="h-3 w-3 mr-1" />
                              {destination.location}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" variant="outline">
                    <Map className="mr-2 h-4 w-4" />
                    {language === "en" ? "View Full Itinerary" : "查看完整行程"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 