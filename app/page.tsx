"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Search, Globe, Bot, MapPin, Star, Users, Camera } from "lucide-react";
import { PopularDestinations } from "@/components/popular-destinations";
import { Testimonials } from "@/components/testimonials";
import { useLanguage } from "@/lib/language-context";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto relative z-10">
          {/* Top Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8">
            <Globe className="w-4 h-4 mr-2" />
            {language === "en" ? "Discover the world's most amazing landmarks" : "探索世界最令人惊叹的地标"}
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI {language === "en" ? "Travel" : "旅行"}
            </span>
            <br />
            <span className="text-white/90">
              {language === "en" ? "Companion" : "伴侣"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {language === "en" 
              ? "Experience the world's most iconic landmarks with AI-powered insights and personalized recommendations"
              : "通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标"
            }
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 pl-6">
                  <Search className="h-6 w-6 text-white/60 mr-4" />
                  <input
                    type="text"
                    placeholder={language === "en" ? "Search for any landmark..." : "搜索任何地标..."}
                    className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder:text-white/50 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-xl px-8 py-3 font-semibold"
                  >
                    {language === "en" ? "Explore" : "探索"}
                  </Button>
                </div>
              </div>
            </form>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="text-white/60 text-sm">
                {language === "en" ? "Popular:" : "热门:"}
              </span>
              {["Great Wall", "Eiffel Tower", "Taj Mahal", "Machu Picchu"].map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm"
                  onClick={() => {
                    setSearchQuery(term);
                    const event = { preventDefault: () => {} } as React.FormEvent;
                    handleSearch(event);
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/60">{language === "en" ? "Landmarks" : "地标"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60">{language === "en" ? "Countries" : "国家"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">{language === "en" ? "AI Guide" : "AI向导"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-white/60">{language === "en" ? "Possibilities" : "可能性"}</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "en" ? "Why Choose Our AI Guide?" : "为什么选择我们的AI向导？"}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              {language === "en" 
                ? "Experience travel like never before with our intelligent companion"
                : "通过我们的智能伴侣，体验前所未有的旅行"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {language === "en" ? "AI-Powered Insights" : "AI驱动洞察"}
                </h3>
                <p className="text-white/70">
                  {language === "en" 
                    ? "Get personalized recommendations and deep insights about every landmark"
                    : "获得个性化推荐和每个地标的深度洞察"
                  }
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {language === "en" ? "Global Coverage" : "全球覆盖"}
                </h3>
                <p className="text-white/70">
                  {language === "en" 
                    ? "Explore landmarks from every corner of the world with detailed information"
                    : "探索世界各个角落的地标，获得详细信息"
                  }
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {language === "en" ? "Smart Planning" : "智能规划"}
                </h3>
                <p className="text-white/70">
                  {language === "en" 
                    ? "Create perfect itineraries with AI-optimized routes and timing"
                    : "通过AI优化的路线和时间安排创建完美行程"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="relative py-20">
        <div className="container px-4 sm:px-6">
          <PopularDestinations />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-gradient-to-t from-black/20 to-transparent">
        <div className="container px-4 sm:px-6">
          <Testimonials />
        </div>
      </section>
    </div>
  );
}