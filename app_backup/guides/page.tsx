"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Calendar, User, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function GuidesPage() {
  const { t, language } = useLanguage();
  
  // 动态旅行指南数据，根据当前语言显示不同内容
  const travelGuides = [
    {
      id: "italy-guide",
      title: language === 'zh' ? "意大利历史遗迹终极指南" : "Ultimate Guide to Italy's Historical Sites",
      excerpt: language === 'zh' ? "探索意大利各地的古代奇观和文艺复兴杰作。" : "Explore the ancient wonders and Renaissance masterpieces throughout Italy.",
      image: "https://images.pexels.com/photos/1797158/pexels-photo-1797158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: language === 'zh' ? "旅行专家" : "Travel Expert",
      date: "May 15, 2025",
      readTime: language === 'zh' ? "8 分钟阅读" : "8 min read",
      category: language === 'zh' ? "欧洲" : "Europe"
    },
    {
      id: "asia-temples",
      title: language === 'zh' ? "东南亚古庙" : "Ancient Temples of Southeast Asia",
      excerpt: language === 'zh' ? "探索东南亚寺庙的精神和建筑奇观。" : "Discover the spiritual and architectural marvels of temples across Southeast Asia.",
      image: "https://images.pexels.com/photos/1482931/pexels-photo-1482931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: language === 'zh' ? "历史爱好者" : "History Buff",
      date: "April 3, 2025",
      readTime: language === 'zh' ? "12 分钟阅读" : "12 min read",
      category: language === 'zh' ? "亚洲" : "Asia"
    },
    {
      id: "american-monuments",
      title: language === 'zh' ? "美国纪念碑与纪念馆" : "American Monuments and Memorials",
      excerpt: language === 'zh' ? "一次穿越美国最重要历史纪念碑的旅程。" : "A journey through the most significant historical monuments in the United States.",
      image: "https://images.pexels.com/photos/1486577/pexels-photo-1486577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: language === 'zh' ? "文化作家" : "Culture Writer",
      date: "March 22, 2025",
      readTime: language === 'zh' ? "10 分钟阅读" : "10 min read",
      category: language === 'zh' ? "北美洲" : "North America"
    },
    {
      id: "africa-wonders",
      title: language === 'zh' ? "非洲自然与历史奇观" : "Natural and Historical Wonders of Africa",
      excerpt: language === 'zh' ? "从古埃及神庙到壮丽的草原景观。" : "From ancient Egyptian temples to the majestic landscapes of the savanna.",
      image: "https://images.pexels.com/photos/60013/desert-dry-dehydrated-dried-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      author: language === 'zh' ? "狩猎向导" : "Safari Guide",
      date: "February 18, 2025",
      readTime: language === 'zh' ? "15 分钟阅读" : "15 min read",
      category: language === 'zh' ? "非洲" : "Africa"
    },
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t("travelGuides")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                {t("guidesDescription")}
              </p>
            </div>
            <Button>{t("createGuide")}</Button>
          </div>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="py-12 border-b">
        <div className="container px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <Image 
                src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt={t("featuredGuide")}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <Badge className="w-fit mb-4">{t("featuredGuide")}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("worldHeritageSites")}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  {t("worldHeritageDesc")}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">June 10, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">{language === 'zh' ? "遗产专家" : "Heritage Expert"}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{language === 'zh' ? "20 分钟阅读" : "20 min read"}</span>
                  </div>
                </div>
                <Button className="w-fit">
                  {t("readFullGuide")} <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="py-12">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {t("browseByCategory")}
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { key: "all", label: t("all") },
              { key: "europe", label: t("europe") },
              { key: "asia", label: t("asia") },
              { key: "northAmerica", label: t("northAmerica") },
              { key: "southAmerica", label: t("southAmerica") },
              { key: "africa", label: t("africa") },
              { key: "oceania", label: t("oceania") },
              { key: "architecture", label: t("architecture") },
              { key: "history", label: t("history") },
              { key: "naturalWonders", label: t("naturalWonders") }
            ].map((category) => (
              <Button
                key={category.key}
                variant={category.key === "all" ? "default" : "outline"}
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Listings */}
      <section className="py-8">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">
                      {guide.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/guides/${guide.id}`} className="hover:text-primary transition-colors">
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {guide.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {guide.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              {t("loadMoreGuides")}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30 mt-12">
        <div className="container px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              {t("stayUpdated")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("newsletterDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder={t("enterEmail")} className="flex-grow" />
              <Button>{t("subscribe")}</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}