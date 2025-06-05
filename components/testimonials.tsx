"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

// 用户好评数据
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    nameCn: "莎拉·约翰逊",
    location: "New York, USA",
    locationCn: "美国纽约",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    testimonial: "LandmarkAI transformed my trip to Paris! The historical insights about the Eiffel Tower were fascinating and helped me appreciate the landmark in a whole new light.",
    testimonialCn: "LandmarkAI让我的巴黎之旅焕然一新！关于埃菲尔铁塔的历史见解非常吸引人，帮助我以全新的视角欣赏这个地标。"
  },
  {
    id: 2,
    name: "Michael Chen",
    nameCn: "陈明",
    location: "Beijing, China",
    locationCn: "中国北京",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    testimonial: "Being able to listen to the history of landmarks in my native language made traveling so much more enjoyable. The audio narrations are clear and informative.",
    testimonialCn: "能够用我的母语聆听地标的历史让旅行变得更加愉快。语音讲解清晰且信息丰富。"
  },
  {
    id: 3,
    name: "Elena Rodríguez",
    nameCn: "埃琳娜·罗德里格斯",
    location: "Madrid, Spain",
    locationCn: "西班牙马德里",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 4,
    testimonial: "The trip planner feature is incredible! It helped me create the perfect 5-day itinerary for Rome with a great balance of historical sites and local experiences.",
    testimonialCn: "行程规划功能非常棒！它帮助我为罗马创建了完美的5天行程，在历史遗迹和当地体验之间取得了很好的平衡。"
  },
  {
    id: 4,
    name: "James Wilson",
    nameCn: "詹姆斯·威尔逊",
    location: "Sydney, Australia",
    locationCn: "澳大利亚悉尼",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    testimonial: "I love how this app makes history come alive. The detailed stories behind each landmark really enhanced my visit to the Great Wall of China.",
    testimonialCn: "我喜欢这个应用如何让历史栩栩如生。每个地标背后的详细故事真正提升了我游览中国长城的体验。"
  }
];

export function Testimonials() {
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "What Our Users Say" : "用户评价"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Discover how LandmarkAI has enhanced travel experiences for people around the world."
              : "了解LandmarkAI如何为世界各地的人们提升旅行体验。"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-card rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={testimonial.avatar}
                    alt={language === "en" ? testimonial.name : testimonial.nameCn}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h4 className="font-medium">
                    {language === "en" ? testimonial.name : testimonial.nameCn}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? testimonial.location : testimonial.locationCn}
                  </p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-500" : "text-gray-300"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={i < testimonial.rating ? 0 : 2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>

              <p className="text-sm">
                {language === "en" ? testimonial.testimonial : testimonial.testimonialCn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 