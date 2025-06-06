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
    try {
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
      } else {
        // 如果没有返回结果，创建一个基本的模拟数据
        console.error('没有返回行程数据');
        const mockItinerary = createBasicMockItinerary(destination, days, preferenceLabels);
        setGeneratedItinerary(mockItinerary);
        
        setTimeout(() => {
          window.scrollTo({
            top: document.getElementById('itinerary-result')?.offsetTop || 0,
            behavior: 'smooth',
          });
        }, 100);
      }
    } catch (error) {
      console.error('行程生成错误:', error);
      // 创建基本的模拟行程数据
      const mockItinerary = createBasicMockItinerary(destination, days, preferenceLabels);
      setGeneratedItinerary(mockItinerary);
      
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('itinerary-result')?.offsetTop || 0,
          behavior: 'smooth',
        });
      }, 100);
    }
  };
  
  // 创建基本的模拟行程
  const createBasicMockItinerary = (destination: string, days: number, preferences: string[]) => {
    if (language === "en") {
      return `# ${destination} ${days}-Day Itinerary

## Overview
This is an exciting ${days}-day travel plan for ${destination}, focusing on ${preferences.join(', ')}. This journey will take you through the most charming attractions and experiences in ${destination}.

## Day 1
### Morning
- Arrive in ${destination}, check into hotel and rest
- Enjoy breakfast at a local restaurant near your hotel
- Visit the most famous landmark in ${destination} (30 minutes walking tour)

### Afternoon
- Lunch at a local specialty restaurant (1 hour)
- Explore the historical and cultural district (2 hours)
- Free time for shopping and relaxation (1.5 hours)

### Evening
- Taste local specialty dinner (1.5 hours)
- Enjoy night views or attend a local cultural performance (2 hours)
- Return to hotel

## Day 2
### Morning
- Breakfast at hotel
- Visit natural scenic area to enjoy natural beauty (3 hours)

### Afternoon
- Lunch at a restaurant near the scenic area (1 hour)
- Continue touring or participate in outdoor activities (2-3 hours)
- Return to city center

### Evening
- Enjoy dinner
- Stroll through night market or local characteristic streets (2 hours)
- Return to hotel

${days > 2 ? `## Day 3
### Morning
- Breakfast at hotel
- Visit museum or art gallery (2 hours)

### Afternoon
- Enjoy lunch
- Participate in local experience activities or workshops (2-3 hours)
- Free activity time

### Evening
- Dinner at specialty restaurant
- Night activities or rest
- Return to hotel` : ''}

## Practical Tips
1. It is recommended to book tickets for popular attractions in advance
2. Public transportation in ${destination} is convenient, consider purchasing a transit card
3. Weather can be variable, recommend carrying rain gear
4. Respect local customs and cultural traditions
5. Advance reservations recommended for important attractions and restaurants

Hope you have a memorable journey in ${destination}!`;
    } else {
      return `# ${destination}${days}天行程规划

## 行程概述
这是一个为${destination}设计的${days}天精彩旅行计划，特别关注${preferences.join('、')}。这次旅行将带您领略${destination}最迷人的景点和体验。

## 第1天
### 上午
- 抵达${destination}，入住酒店休息调整
- 在酒店附近的当地餐厅享用早餐，体验当地美食
- 参观${destination}最著名的地标景点（步行30分钟）

### 下午
- 在当地特色餐厅享用午餐（1小时）
- 游览历史文化区，了解当地文化历史（2小时）
- 自由购物和休息时间（1.5小时）

### 晚上
- 品尝当地特色晚餐（1.5小时）
- 欣赏夜景或参加当地文化演出（2小时）
- 返回酒店休息

## 第2天
### 上午
- 酒店早餐
- 前往自然风景区，欣赏自然美景（3小时）

### 下午
- 在景区附近的餐厅享用午餐（1小时）
- 继续游览或参加户外活动（2-3小时）
- 返回市区

### 晚上
- 享用晚餐
- 夜市或当地特色街区漫步（2小时）
- 返回酒店休息

${days > 2 ? `## 第3天
### 上午
- 酒店早餐
- 参观博物馆或艺术馆（2小时）

### 下午
- 享用午餐
- 参加当地体验活动或工作坊（2-3小时）
- 自由活动时间

### 晚上
- 享用特色餐厅晚餐
- 夜间活动或休息
- 返回酒店` : ''}

## 实用提示
1. 建议提前预订热门景点门票
2. ${destination}的公共交通便利，可考虑购买交通卡
3. 当地天气多变，建议随身携带雨具
4. 尊重当地习俗和文化传统
5. 重要景点和餐厅建议提前预约

希望您在${destination}度过一段难忘的旅程！`;
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
                        <Button variant="outline" role="combobox" className="w-full justify-between" type="button">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {destination ? 
                              <span>{destination}</span> : 
                              <span className="text-muted-foreground">{t("destinationPlaceholder")}</span>
                            }
                          </div>
                          <CalendarIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-full min-w-[240px]" align="start" side="bottom" sideOffset={5}>
                        <Command>
                          <CommandInput 
                            placeholder={language === "en" ? "Search destinations..." : "搜索目的地..."}
                            value={destination}
                            onValueChange={setDestination}
                            className="h-9"
                          />
                          <CommandEmpty>
                            {language === "en" ? "No destinations found." : "未找到目的地。"}
                          </CommandEmpty>
                          <CommandGroup className="max-h-[200px] overflow-auto">
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