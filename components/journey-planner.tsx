
// Fixed journey-planner.tsx
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
      }
    ]
  };
  
  // Rest of the component implementation...
  return <div>Journey Planner Component</div>;
}

