"use client";

import React from "react";
import { JourneyPlanner } from "@/components/journey-planner";
import { useLanguage } from "@/lib/language-context";

export default function JourneysPage() {
  const { language } = useLanguage();
  
  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-5xl mx-auto mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Travel Journeys" : "旅行路线"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Discover curated multi-destination journeys for unforgettable travel experiences"
              : "探索精心策划的多目的地旅程，获得难忘的旅行体验"}
          </p>
        </div>
        
        <JourneyPlanner />
        
        <div className="max-w-3xl mx-auto mt-20 text-center bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            {language === "en" ? "Need a Custom Journey?" : "需要定制旅程？"}
          </h2>
          <p className="text-lg mb-6">
            {language === "en"
              ? "Let our AI travel planner create a personalized journey based on your preferences."
              : "让我们的AI旅行规划师根据您的喜好创建个性化旅程。"}
          </p>
          <div className="flex justify-center">
            <a 
              href="/itinerary" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
            >
              {language === "en" ? "Create Custom Itinerary" : "创建定制行程"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 