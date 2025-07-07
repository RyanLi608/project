'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star, DollarSign } from 'lucide-react'

interface Landmark {
  id: string
  name: string
  city: string
  province: string
  description: string
  image: string
  category: string
  rating: number
  visitTime: string
  ticketPrice: string
  openHours: string
  location: {
    lat: number
    lng: number
  }
}

interface LandmarkGalleryProps {
  limit?: number
  city?: string
  category?: string
}

export function LandmarkGallery({ limit = 6, city, category }: LandmarkGalleryProps) {
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchLandmarks()
  }, [selectedCategory, city, limit])

  const fetchLandmarks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory) params.append('category', selectedCategory)
      if (city) params.append('city', city)
      if (limit) params.append('limit', limit.toString())

      const response = await fetch(`/api/landmark?${params}`)
      const data = await response.json()
      
      setLandmarks(data.landmarks || [])
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch landmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory === selectedCategory ? '' : newCategory)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 分类筛选 */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('')}
          >
            全部
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {/* 地标卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landmarks.map((landmark) => (
          <Card key={landmark.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={landmark.image} 
                alt={landmark.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 right-2">
                {landmark.category}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{landmark.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {landmark.city}, {landmark.province}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">
                {landmark.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{landmark.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{landmark.visitTime}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>{landmark.ticketPrice}</span>
                </div>
                <Button size="sm" variant="outline">
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {landmarks.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">没有找到符合条件的地标景点</p>
        </div>
      )}
    </div>
  )
} 