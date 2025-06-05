"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/language-context";
import { RefreshCw, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Thermometer } from "lucide-react";

interface WeatherInfoProps {
  location: string;
  className?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
  localTime: string;
}

export function WeatherInfo({ location, className }: WeatherInfoProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  
  // Helper to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <CloudLightning className="h-8 w-8 text-purple-500" />;
    } else if (lowerCondition.includes('wind')) {
      return <Wind className="h-8 w-8 text-gray-400" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };
  
  // Fetch weather data
  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, this would call a weather API
      // For demo purposes, we'll simulate a network request and return mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random but somewhat realistic weather data based on location
      let temp, condition, icon;
      const currentMonth = new Date().getMonth(); // 0-11
      
      // Adjust temperature based on location and season
      if (location.includes('China')) {
        temp = currentMonth >= 4 && currentMonth <= 8 ? 
          Math.round(20 + Math.random() * 10) : // Summer
          Math.round(0 + Math.random() * 15);   // Winter
        condition = Math.random() > 0.5 ? 'Partly cloudy' : 'Clear';
      } else if (location.includes('Egypt') || location.includes('India')) {
        temp = Math.round(25 + Math.random() * 15);
        condition = 'Sunny';
      } else if (location.includes('Peru')) {
        temp = Math.round(15 + Math.random() * 10);
        condition = Math.random() > 0.6 ? 'Cloudy' : 'Light rain';
      } else if (location.includes('Australia')) {
        temp = currentMonth >= 10 || currentMonth <= 2 ? 
          Math.round(20 + Math.random() * 15) : // Summer (Southern hemisphere)
          Math.round(10 + Math.random() * 15);  // Winter
        condition = 'Partly cloudy';
      } else if (location.includes('France')) {
        temp = currentMonth >= 4 && currentMonth <= 8 ? 
          Math.round(15 + Math.random() * 15) : // Summer
          Math.round(0 + Math.random() * 10);   // Winter
        condition = Math.random() > 0.5 ? 'Light rain' : 'Cloudy';
      } else {
        // Default for other locations
        temp = Math.round(10 + Math.random() * 20);
        condition = ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain'][Math.floor(Math.random() * 4)];
      }
      
      // Translate weather condition if needed
      if (language === 'zh') {
        condition = {
          'Sunny': '晴天',
          'Clear': '晴朗',
          'Partly cloudy': '多云',
          'Cloudy': '阴天',
          'Light rain': '小雨',
          'Rain': '雨',
          'Heavy rain': '大雨',
          'Snow': '雪',
          'Thunderstorm': '雷雨'
        }[condition] || condition;
      }
      
      icon = getWeatherIcon(condition);
      
      // Create local time string
      const now = new Date();
      const localTime = now.toLocaleTimeString(language === 'zh' ? 'zh-CN' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      setWeather({
        temperature: temp,
        condition: condition,
        humidity: Math.round(50 + Math.random() * 40),
        windSpeed: Math.round(5 + Math.random() * 20),
        icon: icon,
        localTime: localTime
      });
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(language === 'zh' ? '获取天气数据时出错' : 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch weather on component mount and when location changes
  useEffect(() => {
    fetchWeather();
  }, [location, language]);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {language === 'zh' ? '当地天气' : 'Local Weather'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchWeather}
            disabled={loading}
            className="h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center py-2 text-muted-foreground">
            {error}
          </div>
        ) : loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ) : weather ? (
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-muted/50 p-2 rounded-full">
                {weather.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {weather.temperature}°C
                </div>
                <div className="text-muted-foreground">
                  {weather.condition}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <div className="bg-muted/30 p-1 rounded">
                  <CloudRain className="h-3 w-3" />
                </div>
                {language === 'zh' ? '湿度' : 'Humidity'}: {weather.humidity}%
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <div className="bg-muted/30 p-1 rounded">
                  <Wind className="h-3 w-3" />
                </div>
                {language === 'zh' ? '风速' : 'Wind'}: {weather.windSpeed} km/h
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>
                  {language === 'zh' ? '模拟数据（仅供演示）' : 'Simulated data (for demo only)'}
                </span>
                <span>{weather.localTime}</span>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
} 