"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Search, Globe, Bot, MapPin, Star, Users, Camera, Calendar, Shield, Award, Compass } from "lucide-react";
import { PopularDestinations } from "@/components/popular-destinations";
import { Testimonials } from "@/components/testimonials";
import { useLanguage } from "@/lib/language-context";
import { destinationTranslations, DestinationKey } from "@/lib/translations";

// 预定义的景点ID映射，用于更精确的搜索
const landmarkIds: Record<string, string> = {
  // 英文景点名称 -> ID
  "great wall of china": "great-wall",
  "great wall": "great-wall",
  "eiffel tower": "eiffel-tower",
  "taj mahal": "taj-mahal",
  "machu picchu": "machu-picchu",
  "pyramids of giza": "pyramids",
  "pyramids": "pyramids",
  "colosseum": "colosseum",
  "statue of liberty": "statue-of-liberty",
  "sydney opera house": "sydney-opera-house",
  
  // 中文景点名称 -> ID
  "中国长城": "great-wall",
  "长城": "great-wall",
  "埃菲尔铁塔": "eiffel-tower",
  "泰姬陵": "taj-mahal",
  "马丘比丘": "machu-picchu",
  "吉萨金字塔": "pyramids",
  "金字塔": "pyramids",
  "罗马斗兽场": "colosseum",
  "自由女神像": "statue-of-liberty",
  "悉尼歌剧院": "sydney-opera-house",
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();
  const dt = destinationTranslations[language];
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 将搜索查询转换为小写以便匹配
      const query = searchQuery.trim().toLowerCase();
      
      // 尝试匹配预定义的景点ID
      const id = landmarkIds[query];
      
      if (id) {
        // 找到预定义景点，导航到其页面
        router.push(`/destination/${id}`);
      } else {
        // 未找到预定义景点，使用格式化的查询作为ID
        const formattedQuery = formatSearchQuery(query);
        router.push(`/destination/${formattedQuery}`);
        
        // 这里可以添加逻辑，如记录未找到的查询，以便后续添加到预定义列表中
        console.log(`未预定义的景点查询: ${query}`);
      }
    }
  };
  
  // 将搜索查询转换为URL友好的格式
  const formatSearchQuery = (query: string): string => {
    return query
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - TripAdvisor Style */}
      <section className="relative bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "en" ? "去哪里?" : "去哪里?"}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === "en" 
              ? "通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标"
              : "通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标"
            }
          </p>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/20 backdrop-blur-sm rounded-full p-1">
              <button className="px-6 py-3 rounded-full bg-white text-teal-600 font-semibold text-sm flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {language === "en" ? "搜索全部" : "搜索全部"}
              </button>
              <button className="px-6 py-3 text-white font-semibold text-sm flex items-center hover:bg-white/10 rounded-full transition-colors">
                <Calendar className="w-4 h-4 mr-2" />
                {language === "en" ? "酒店" : "酒店"}
              </button>
              <button className="px-6 py-3 text-white font-semibold text-sm flex items-center hover:bg-white/10 rounded-full transition-colors">
                <Camera className="w-4 h-4 mr-2" />
                {language === "en" ? "景点玩乐" : "景点玩乐"}
              </button>
              <button className="px-6 py-3 text-white font-semibold text-sm flex items-center hover:bg-white/10 rounded-full transition-colors">
                <Users className="w-4 h-4 mr-2" />
                {language === "en" ? "美食" : "美食"}
              </button>
              <button className="px-6 py-3 text-white font-semibold text-sm flex items-center hover:bg-white/10 rounded-full transition-colors">
                <Compass className="w-4 h-4 mr-2" />
                {language === "en" ? "机票" : "机票"}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="bg-white rounded-full shadow-2xl p-2 flex items-center">
                <div className="flex-1 flex items-center pl-6">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "景点玩乐、酒店..." : "景点玩乐、酒店..."}
                    className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent border-0 focus:outline-none text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  {language === "en" ? "查询" : "查询"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white">
            <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Popular Quick Tags */}
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-3 items-center">
              <span className="text-gray-600 font-medium">
                {language === "en" ? "热门:" : "热门:"}
              </span>
              {[
                { key: "Great Wall of China", search: "Great Wall" },
                { key: "Eiffel Tower", search: "Eiffel Tower" },
                { key: "Taj Mahal", search: "Taj Mahal" },
                { key: "Machu Picchu", search: "Machu Picchu" }
              ].map((item) => (
                <button
                  key={item.key}
                  className="px-6 py-3 bg-gray-100 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 rounded-full text-gray-700 hover:text-teal-600 transition-all duration-300 font-medium"
                  onClick={() => {
                    setSearchQuery(item.search);
                    const event = { preventDefault: () => {} } as React.FormEvent;
                    handleSearch(event);
                  }}
                >
                  {dt[item.key as DestinationKey] || item.search}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === "en" ? "预订旅行史的精彩部分" : "预订旅行史的精彩部分"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "en" 
                  ? "在此浏览令人难忘的景点玩乐。"
                  : "在此浏览令人难忘的景点玩乐。"
                }
              </p>
              <Button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 py-2">
                {language === "en" ? "寻找景点玩乐" : "寻找景点玩乐"}
              </Button>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === "en" ? "AI 旅行伴侣" : "AI 旅行伴侣"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "en" 
                  ? "获得个性化的AI驱动旅行建议和实时导游服务。"
                  : "获得个性化的AI驱动旅行建议和实时导游服务。"
                }
              </p>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2">
                {language === "en" ? "开始对话" : "开始对话"}
              </Button>
            </div>

            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === "en" ? "专业旅行规划" : "专业旅行规划"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {language === "en" 
                  ? "制定完美的行程规划，包含最佳路线和时间安排。"
                  : "制定完美的行程规划，包含最佳路线和时间安排。"
                }
              </p>
              <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2">
                {language === "en" ? "规划行程" : "规划行程"}
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">1000+</div>
                <div className="text-gray-600 font-medium">{language === "en" ? "地标" : "地标"}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 font-medium">{language === "en" ? "国家" : "国家"}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 font-medium">{language === "en" ? "AI向导" : "AI向导"}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">100K+</div>
                <div className="text-gray-600 font-medium">{language === "en" ? "用户" : "用户"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "en" ? "热门景点" : "热门景点"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en" 
                ? "探索世界各地最受欢迎的旅游目的地和文化地标"
                : "探索世界各地最受欢迎的旅游目的地和文化地标"
              }
            </p>
          </div>
          <PopularDestinations />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === "en" ? "用户评价" : "用户评价"}
            </h2>
            <p className="text-xl text-gray-600">
              {language === "en" 
                ? "看看其他旅行者的真实体验"
                : "看看其他旅行者的真实体验"
              }
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === "en" ? "开始你的旅程" : "开始你的旅程"}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === "en" 
              ? "立即体验AI驱动的旅行规划，发现世界上最令人惊叹的地标。"
              : "立即体验AI驱动的旅行规划，发现世界上最令人惊叹的地标。"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-teal-600 hover:bg-gray-100 font-semibold rounded-full px-8 py-4"
              onClick={() => router.push('/itinerary')}
            >
              {language === "en" ? "规划行程" : "规划行程"}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-teal-600 font-semibold rounded-full px-8 py-4"
              onClick={() => router.push('/popular')}
            >
              {language === "en" ? "浏览景点" : "浏览景点"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}