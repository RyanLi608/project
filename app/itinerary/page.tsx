"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CalendarIcon, MapPin, Clock, X } from "lucide-react";
import { useItineraryGenerator } from "@/hooks/useDeepSeekAPI";
import { useLanguage } from "@/lib/language-context";

export default function ItineraryPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  
  const { isLoading, error, generateItinerary } = useItineraryGenerator();
  const { language, t } = useLanguage();
  
  const preferences = [
    { id: "culture", label: t("culturalHistorical") },
    { id: "nature", label: t("natureScenery") },
    { id: "food", label: t("foodDining") },
    { id: "shopping", label: t("shopping") },
    { id: "relaxation", label: t("relaxation") },
    { id: "adventure", label: t("adventure") },
    { id: "photography", label: t("photography") },
    { id: "architecture", label: t("architecture") },
  ];
  
  const handlePreferenceChange = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || selectedPreferences.length === 0) {
      alert("Please enter a destination and select at least one preference");
      return;
    }
    
    // Convert preference IDs to label text
    const preferenceLabels = selectedPreferences.map(
      prefId => preferences.find(p => p.id === prefId)?.label || prefId
    );
    
    const result = await generateItinerary(destination, days, preferenceLabels);
    if (result) {
      setGeneratedItinerary(result);
    }
  };
  
  const clearForm = () => {
    setDestination("");
    setDays(3);
    setSelectedPreferences([]);
    setGeneratedItinerary(null);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("plannerTitle")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("plannerSubtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Itinerary Generation Form */}
            <Card className={`${generatedItinerary ? 'md:col-span-4' : 'md:col-span-8 md:col-start-3'} h-fit`}>
              <CardHeader>
                <CardTitle>{t("createItinerary")}</CardTitle>
                <CardDescription>
                  {t("formDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="destination">{t("destination")}</Label>
                    <Input
                      id="destination"
                      placeholder={t("destinationPlaceholder")}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="days">{t("tripDuration")}: {days} {t("days")}</Label>
                      <span className="text-muted-foreground text-sm">{days} {t("days")}</span>
                    </div>
                    <Slider
                      id="days"
                      min={1}
                      max={14}
                      step={1}
                      value={[days]}
                      onValueChange={(values) => setDays(values[0])}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label>{t("travelPreferences")}</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {preferences.map((preference) => (
                        <div key={preference.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={preference.id}
                            checked={selectedPreferences.includes(preference.id)}
                            onCheckedChange={() => handlePreferenceChange(preference.id)}
                          />
                          <Label htmlFor={preference.id} className="text-sm font-normal">
                            {preference.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 space-x-2 flex">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isLoading || !destination || selectedPreferences.length === 0}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          {t("generating")}
                        </>
                      ) : (
                        t("generateItinerary")
                      )}
                    </Button>
                    
                    {(destination || selectedPreferences.length > 0 || days !== 3) && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={clearForm}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
              
              <CardFooter className="flex-col items-start border-t px-6 py-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedPreferences.map((prefId) => (
                    <Badge key={prefId} variant="secondary">
                      {preferences.find(p => p.id === prefId)?.label}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {t("poweredBy")}
                </p>
              </CardFooter>
            </Card>
            
            {/* Generated Itinerary */}
            {generatedItinerary && (
              <Card className="md:col-span-8 overflow-auto max-h-[800px]">
                <CardHeader className="sticky top-0 bg-card z-10 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" /> 
                        {destination} {t("itinerary")}
                      </CardTitle>
                      <CardDescription>
                        <Clock className="h-4 w-4 inline mr-1" /> {days} {t("dayTripPlan")}
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t("print")}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t("save")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="py-6">
                  <div className="prose dark:prose-invert max-w-none">
                    {generatedItinerary.split('\n').map((line, i) => {
                      // Detect heading lines
                      if (line.match(/^#|^Day \d+|^\d+\./)) {
                        return <h3 key={i} className="mt-6 mb-2 text-xl font-bold">{line}</h3>;
                      } 
                      // Detect list items
                      else if (line.match(/^[-*]\s/)) {
                        return <li key={i} className="ml-4">{line.replace(/^[-*]\s/, '')}</li>;
                      }
                      // Empty lines become spacing
                      else if (line.trim() === '') {
                        return <div key={i} className="h-2"></div>;
                      }
                      // Everything else is a paragraph
                      else {
                        return <p key={i}>{line}</p>;
                      }
                    })}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    {t("itineraryDisclaimer")}
                  </p>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-md">
              <p>{t("errorGenerating")} {error}</p>
              <p className="text-sm mt-1">{t("tryAgain")}</p>
            </div>
          )}
          
          {/* Tips Section */}
          {!generatedItinerary && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">{t("travelTips")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("researchTip")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("researchDesc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("balanceTip")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("balanceDesc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("transportTip")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("transportDesc")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 