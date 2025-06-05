import { useState } from 'react';
import axios from 'axios';
import { handleApiError } from '@/lib/api/utils';

interface APIResponse<T> {
  data?: T;
  error?: string;
  isLoading: boolean;
}

// 获取景点信息的Hook
export function useLandmarkInfo() {
  const [response, setResponse] = useState<APIResponse<string>>({
    isLoading: false
  });

  const fetchLandmarkInfo = async (name: string, language: string = 'Chinese') => {
    try {
      setResponse({ isLoading: true });
      
      const queryParams = new URLSearchParams({
        name,
        language
      }).toString();
      
      const res = await fetch(`/api/landmark?${queryParams}`, {
        // 添加缓存控制，确保获取最新数据
        cache: 'no-store'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '获取景点信息失败');
      }
      
      const data = await res.json();
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
      console.error('Landmark API Error:', error);
      setResponse({
        error: error.message,
        isLoading: false
      });
      return null;
    }
  };

  return {
    ...response,
    fetchLandmarkInfo
  };
}

// 生成行程的Hook
export function useItineraryGenerator() {
  const [response, setResponse] = useState<APIResponse<string>>({
    isLoading: false
  });

  const generateItinerary = async (
    destination: string,
    days: number,
    preferences: string[],
    language: string = 'Chinese'
  ) => {
    try {
      setResponse({ isLoading: true });
      
      const res = await fetch('/api/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destination,
          days,
          preferences,
          language
        }),
        cache: 'no-store'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '生成行程失败');
      }
      
      const data = await res.json();
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
      console.error('Itinerary API Error:', error);
      setResponse({
        error: error.message,
        isLoading: false
      });
      return null;
    }
  };

  return {
    ...response,
    generateItinerary
  };
}

// 获取语音导览的Hook
export function useAudioNarration() {
  const [response, setResponse] = useState<APIResponse<string>>({
    isLoading: false
  });

  const fetchAudioNarration = async (
    landmark: string,
    aspect: string = '历史',
    language: string = 'Chinese'
  ) => {
    try {
      setResponse({ isLoading: true });
      
      const queryParams = new URLSearchParams({
        landmark,
        aspect,
        language
      }).toString();
      
      const res = await fetch(`/api/narration?${queryParams}`, {
        cache: 'no-store'
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '获取语音导览失败');
      }
      
      const data = await res.json();
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
      console.error('Narration API Error:', error);
      setResponse({
        error: error.message,
        isLoading: false
      });
      return null;
    }
  };

  return {
    ...response,
    fetchAudioNarration
  };
} 