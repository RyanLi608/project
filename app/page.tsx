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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background z-10" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="container relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              {t("heroTitle")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {t("heroSubtitle")}
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-card border border-border/50 rounded-full p-1 pl-6 shadow-lg focus-within:ring-2 focus-within:ring-primary/20"
              >
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="sm" className="rounded-full">
                  {t("exploreButton")}
                </Button>
              </form>
              
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4 text-sm text-muted-foreground">
                <span>{language === "en" ? "Popular:" : "热门:"}</span>
                <div className="flex gap-3">
                  {["Great Wall", "Eiffel Tower", "Taj Mahal"].map((term) => (
                    <button
                      key={term}
                      className="hover:text-primary transition-colors"
                      onClick={() => {
                        setSearchQuery(term);
                        // 手动创建一个事件对象
                        const event = { preventDefault: () => {} } as React.FormEvent;
                        handleSearch(event);
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

            {/* Feature 2 (原Feature 3，前移) */}
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