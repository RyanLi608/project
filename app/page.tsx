'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, MapPin, Heart } from 'lucide-react';
import { MultiSignInButton } from "@/components/auth/multi-signin-button";
import { useSession } from "next-auth/react";
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session } = useSession();

  const popularTags = [
    'Great Wall',
    'Eiffel Tower', 
    'Taj Mahal',
    'Machu Picchu',
    'Colosseum',
    'Statue of Liberty'
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/destination/${encodeURIComponent(searchQuery.toLowerCase().replace(/\s+/g, '-'))}`;
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    window.location.href = `/destination/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold font-playfair">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LandmarkAI
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="hover:text-purple-200 transition-colors">关于我们</Link>
          <Link href="/popular" className="hover:text-purple-200 transition-colors">热门景点</Link>
          <Link href="/itinerary" className="hover:text-purple-200 transition-colors">行程规划</Link>
          <Link href="/guides" className="hover:text-purple-200 transition-colors">旅行指南</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Globe className="w-4 h-4 mr-2" />
            中文
          </Button>
          <MultiSignInButton variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-8">
            <Globe className="w-5 h-5 mr-2" />
            <span>探索世界最令人敬畏的地标</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 font-playfair">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI 旅行
            </span>
            <br />
            <span className="text-white/90">伴侣</span>
          </h1>
          
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标
          </p>

          {/* User Welcome */}
          {session?.user && (
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg max-w-md mx-auto border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                {session.user.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="text-purple-200 font-medium">
                    欢迎回来, {session.user.name || session.user.email}！
                  </p>
                  <p className="text-sm text-purple-300">
                    准备开始您的AI旅行探索之旅吧！
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 pl-6">
                <Search className="h-6 w-6 text-white/60 mr-4" />
                <Input
                  type="text"
                  placeholder="搜索任何地标..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-0 focus:outline-none text-white placeholder:text-white/50 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 rounded-xl px-8 py-3 font-semibold"
                >
                  探索
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="text-white/60 text-sm">热门:</span>
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/60">地标</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60">国家</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60">AI向导</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-white/60">可能性</div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">AI驱动洞察</h3>
                <p className="text-white/70">
                  获得个性化推荐和每个地标的深度洞察
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">全球覆盖</h3>
                <p className="text-white/70">
                  探索来自世界各个角落的地标，获取详细信息
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">智能规划</h3>
                <p className="text-white/70">
                  使用AI优化的路线和时间创建完美的行程
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
} 