"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Search } from "lucide-react";
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
      const id = landmarkIds[query] || formatSearchQuery(query);
      
      // 导航到景点页面
      router.push(`/destination/${id}`);
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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-black/40 z-10"
            style={{ mixBlendMode: "normal" }}
          />
          <Image
            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="World landmarks"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            quality={100}
          />
        </div>

        {/* Content */}
        <div className="container relative z-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div 
            className={cn(
              "transition-all duration-700 transform",
              isScrolled ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            )}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>

          <form 
            onSubmit={handleSearch}
            className={cn(
              "max-w-2xl mx-auto transition-all duration-500",
              isScrolled ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            )}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full pl-10 py-6 text-lg rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-6"
              >
                {t("exploreButton")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("featuresTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border/50 hover:border-primary/20 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("multiLanguage")}</h3>
              <p className="text-muted-foreground">
                {t("multiLanguageDesc")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border/50 hover:border-primary/20 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-primary"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("audioNarration")}</h3>
              <p className="text-muted-foreground">
                {t("audioNarrationDesc")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border/50 hover:border-primary/20 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("conversationalGuides")}</h3>
              <p className="text-muted-foreground">
                {t("conversationalGuidesDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-black/60 z-10"
            style={{ mixBlendMode: "normal" }}
          />
          <Image
            src="https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Historical landmark"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        
        <div className="container relative z-20 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {t("ctaTitle")}
            </h2>
            <p className="text-xl text-white/90 mb-10">
              {t("ctaSubtitle")}
            </p>
            <Button size="lg" className="rounded-full px-8 text-lg">
              {t("ctaButton")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}