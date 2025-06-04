import { useState } from 'react';

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
      
      const res = await fetch(`/api/landmark?${queryParams}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || '获取景点信息失败');
      }
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
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
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || '生成行程失败');
      }
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
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
      
      const res = await fetch(`/api/narration?${queryParams}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || '获取语音导览失败');
      }
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
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