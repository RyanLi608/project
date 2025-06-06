"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Loader2, 
  CalendarIcon, 
  MapPin, 
  Clock, 
  X, 
  CreditCard, 
  Calendar,
  Plane,
  Hotel
} from "lucide-react";
import { useItineraryGenerator } from "@/hooks/useDeepSeekAPI";
import { useLanguage } from "@/lib/language-context";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

export default function ItineraryPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  const [budgetRange, setBudgetRange] = useState([2000]); // 默认预算2000
  const [openSuggestions, setOpenSuggestions] = useState(false);
  
  const { isLoading, error, generateItinerary } = useItineraryGenerator();
  const { language, t } = useLanguage();
  
  // 热门目的地建议
  const popularDestinations = [
    { value: "北京", label: "北京 Beijing" },
    { value: "上海", label: "上海 Shanghai" },
    { value: "东京", label: "东京 Tokyo" },
    { value: "巴黎", label: "巴黎 Paris" },
    { value: "纽约", label: "纽约 New York" },
    { value: "伦敦", label: "伦敦 London" },
    { value: "罗马", label: "罗马 Rome" },
    { value: "巴厘岛", label: "巴厘岛 Bali" },
    { value: "曼谷", label: "曼谷 Bangkok" },
    { value: "新加坡", label: "新加坡 Singapore" },
  ];
  
  const preferences = [
    { id: "culture", label: t("culturalHistorical") },
    { id: "nature", label: t("natureScenery") },
    { id: "food", label: t("foodDining") },
    { id: "shopping", label: t("shopping") },
    { id: "relaxation", label: t("relaxation") },
    { id: "adventure", label: t("adventure") },
    { id: "photography", label: t("photography") },
    { id: "architecture", label: t("architecture") },
    { id: "nightlife", label: language === "en" ? "Nightlife" : "夜生活" },
    { id: "family", label: language === "en" ? "Family friendly" : "亲子活动" },
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
      alert(language === "en" ? "Please enter a destination and select at least one preference" : "请输入目的地并至少选择一个偏好");
      return;
    }
    
    // 准备更详细的旅行规划信息
    const preferenceLabels = selectedPreferences.map(
      prefId => preferences.find(p => p.id === prefId)?.label || prefId
    );
    
    // 准备预算信息
    const budgetInfo = language === "en" 
      ? `Budget: approximately ${budgetRange[0]} per person` 
      : `预算: 约每人${budgetRange[0]}元`;
    
    // 准备出发日期信息
    const dateInfo = date 
      ? (language === "en" 
          ? `Starting date: ${format(date, 'PPP')}` 
          : `出发日期: ${format(date, 'yyyy年MM月dd日')}`)
      : '';
    
    // 生成行程
    const extraInfo = [budgetInfo, dateInfo].filter(Boolean).join('. ');
    const result = await generateItinerary(destination, days, preferenceLabels, extraInfo);
    
    if (result) {
      setGeneratedItinerary(result);
      // 滚动到结果区域
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('itinerary-result')?.offsetTop || 0,
          behavior: 'smooth',
        });
      }, 100);
    }
  };
  
  const clearForm = () => {
    setDestination("");
    setDays(3);
    setSelectedPreferences([]);
    setGeneratedItinerary(null);
    setDate(undefined);
    setBudgetRange([2000]);
  };

  // 格式化预算显示
  const formatBudget = (value: number) => {
    return language === "en" 
      ? `$${value}` 
      : `¥${value}`;
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
          
          <div id="itinerary-form" className="grid grid-cols-1 md:grid-cols-12 gap-8">
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
                    <Popover open={openSuggestions} onOpenChange={setOpenSuggestions}>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            id="destination"
                            placeholder={t("destinationPlaceholder")}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full pr-10"
                            required
                            onFocus={() => setOpenSuggestions(true)}
                          />
                          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start" side="bottom" sideOffset={5} alignOffset={-5}>
                        <Command>
                          <CommandInput 
                            placeholder={language === "en" ? "Search destinations..." : "搜索目的地..."}
                            value={destination}
                            onValueChange={setDestination}
                          />
                          <CommandEmpty>
                            {language === "en" ? "No destinations found." : "未找到目的地。"}
                          </CommandEmpty>
                          <CommandGroup>
                            {popularDestinations.map((dest) => (
                              <CommandItem
                                key={dest.value}
                                value={dest.value}
                                onSelect={(value) => {
                                  setDestination(value);
                                  setOpenSuggestions(false);
                                }}
                              >
                                <MapPin className="mr-2 h-4 w-4" />
                                {dest.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{language === "en" ? "Departure Date" : "出发日期"}</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : language === "en" ? "Pick a date" : "选择日期"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="days">{t("tripDuration")}</Label>
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
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="budget">
                        {language === "en" ? "Budget per Person" : "每人预算"}
                      </Label>
                      <span className="text-muted-foreground text-sm">
                        {formatBudget(budgetRange[0])}
                      </span>
                    </div>
                    <Slider
                      id="budget"
                      min={500}
                      max={10000}
                      step={500}
                      value={budgetRange}
                      onValueChange={setBudgetRange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>{formatBudget(500)}</span>
                      <span>{formatBudget(10000)}</span>
                    </div>
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
                    
                    {(destination || selectedPreferences.length > 0 || days !== 3 || date || budgetRange[0] !== 2000) && (
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
              <Card id="itinerary-result" className="md:col-span-8 overflow-auto max-h-[800px]">
                <CardHeader className="sticky top-0 bg-card z-10 border-b">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" /> 
                        {destination} {t("itinerary")}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> {days} {t("dayTripPlan")}
                        </span>
                        {date && (
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" /> {format(date, "PPP")}
                          </span>
                        )}
                        <span className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-1" /> {formatBudget(budgetRange[0])} {language === "en" ? "per person" : "每人"}
                        </span>
                      </CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => window.print()}>
                        {t("print")}
                      </Button>
                      <Button variant="outline" size="sm" 
                        onClick={() => {
                          // 创建可下载文本
                          const element = document.createElement("a");
                          const file = new Blob([`${destination} ${t("itinerary")}\n\n${generatedItinerary}`], {type: 'text/plain'});
                          element.href = URL.createObjectURL(file);
                          element.download = `${destination}_${t("itinerary")}.txt`;
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);
                        }}
                      >
                        {t("save")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="py-6">
                  <div className="prose dark:prose-invert max-w-none">
                    {generatedItinerary.split('\n').map((line, i) => {
                      // Detect heading lines (Day X or numerical headings)
                      if (line.match(/^#|^Day \d+|^\d+\.|^第\d+天/i)) {
                        return <h3 key={i} className="mt-6 mb-2 text-xl font-bold">{line}</h3>;
                      } 
                      // Detect subheadings (morning, afternoon, evening)
                      else if (line.match(/^(Morning|Afternoon|Evening|上午|下午|晚上|早上|早餐|午餐|晚餐)/i)) {
                        return <h4 key={i} className="mt-4 mb-2 text-lg font-semibold">{line}</h4>;
                      }
                      // Detect list items
                      else if (line.match(/^[-*•]\s/)) {
                        return <li key={i} className="ml-4">{line.replace(/^[-*•]\s/, '')}</li>;
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
                  <div className="w-full">
                    <p className="text-sm text-muted-foreground mb-4">
                      {t("itineraryDisclaimer")}
                    </p>
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => {
                          document.getElementById('itinerary-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {language === "en" ? "Modify Search" : "修改搜索"}
                      </Button>
                    </div>
                  </div>
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
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{t("researchTip")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("researchDesc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{t("balanceTip")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t("balanceDesc")}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Hotel className="h-5 w-5 text-primary" />
                    </div>
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