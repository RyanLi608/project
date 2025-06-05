import { useState } from 'react';
import axios from 'axios';
import { handleApiError } from '@/lib/api/utils';

interface APIResponse<T> {
  data?: T;
  error?: string;
  isLoading: boolean;
}

// 默认模拟数据
const mockData = {
  landmarks: {
    "Great Wall of China": {
      "Chinese": `中国长城是人类历史上最令人印象深刻的建筑成就之一。它由多个中国朝代修建，主要是在明朝（1368-1644年）期间。

1. 历史背景：长城的修建最早可追溯到公元前7世纪，不同的国家修建了各种墙壁。今天保存最完好的部分来自明朝。它主要是为了防御来自北方的游牧部落。

2. 文化意义：长城象征着中国的耐力和历史韧性。它代表着中国的统一，并已成为国际上最具辨识度的中国文化象征。

3. 建筑特点：长城横跨中国北部约21,196公里（13,171英里）。它包括了烽火台、驻军站和瞭望塔。墙的高度通常在5-8米之间，底部宽度为4-5米。

4. 最佳参观时间：春季（4-5月）和秋季（9-10月）提供最舒适的温度和美丽的风景。避开国家假日，因为那时会非常拥挤。

5. 有趣的事实：与普遍的看法相反，长城从太空中用肉眼是看不见的。一些部分使用的砂浆中包含糯米，这有助于其耐久性。长城横跨九个省份和直辖市。`,
      "English": `The Great Wall of China is one of the most impressive architectural feats in human history. Built over centuries by various Chinese dynasties, primarily during the Ming Dynasty (1368-1644).

1. Historical Background: Construction began as early as the 7th century BC, with various walls being built by different states. The most well-preserved sections today date from the Ming Dynasty. It was built primarily for defense against nomadic tribes from the north.

2. Cultural Significance: The Great Wall symbolizes China's endurance and historical resilience. It represents the unification of China and has become the country's most recognizable cultural symbol internationally.

3. Architectural Features: The wall stretches approximately 13,171 miles (21,196 kilometers) across northern China. It includes watchtowers, garrison stations, and beacon towers. The wall's height typically ranges from 5-8 meters, with a width of 4-5 meters at the base.

4. Best Time to Visit: Spring (April-May) and autumn (September-October) offer the most comfortable temperatures and beautiful scenery. Avoid national holidays when it becomes extremely crowded.

5. Interesting Facts: Contrary to popular belief, the Great Wall is not visible from space with the naked eye. The mortar used in some sections included sticky rice, which contributed to its durability. The wall crosses nine provinces and municipalities.`
    },
    "Eiffel Tower": {
      "Chinese": `埃菲尔铁塔是法国巴黎的标志性建筑，是世界上最知名的建筑结构之一。

1. 历史背景：埃菲尔铁塔由古斯塔夫·埃菲尔设计，为1889年世界博览会而建造，纪念法国大革命100周年。它原本计划拆除，但因其在无线电通信中的价值而得以保留。

2. 文化意义：铁塔已成为巴黎和法国的全球象征，代表着浪漫、艺术和工程创新。它每年吸引约700万游客，是世界上参观人数最多的收费景点之一。

3. 建筑特点：铁塔高324米，由18,038块金属部件和250万个铆钉组成，总重量约10,100吨。它有三个可供游客参观的楼层，顶层提供巴黎的全景视图。

4. 最佳参观时间：春季（4-6月）和秋季（9-10月）游客较少，天气宜人。晚上参观可以欣赏到铁塔的灯光秀，每小时闪烁5分钟。

5. 有趣的事实：埃菲尔铁塔每七年重漆一次，需要60吨油漆。夏季高温会使铁塔膨胀，高度可增加约15厘米。铁塔原本是红棕色的，后来改为"埃菲尔铁塔棕色"。`,
      "English": `The Eiffel Tower is an iconic landmark in Paris, France, and one of the most recognizable structures in the world.

1. Historical Background: Designed by Gustave Eiffel and built for the 1889 World's Fair to commemorate the centennial of the French Revolution. It was initially meant to be temporary but was kept for its value in radio communications.

2. Cultural Significance: The tower has become a global symbol of Paris and France, representing romance, art, and engineering innovation. It attracts about 7 million visitors annually, making it one of the most visited paid monuments in the world.

3. Architectural Features: Standing 324 meters tall, the tower is made of 18,038 metallic parts held together by 2.5 million rivets, weighing approximately 10,100 tonnes. It has three levels open to visitors, with the top offering panoramic views of Paris.

4. Best Time to Visit: Spring (April-June) and fall (September-October) have fewer crowds and pleasant weather. Evening visits allow you to see the tower's light show, which sparkles for five minutes every hour.

5. Interesting Facts: The Eiffel Tower is repainted every seven years, requiring 60 tonnes of paint. It can expand by up to 15 cm during hot summer days. The tower was originally a reddish-brown color before being changed to "Eiffel Tower Brown."`
    },
    "default": {
      "Chinese": `这个地标是一个拥有丰富历史和文化意义的迷人景点。

1. 历史背景：这个地标有着悠久的历史，经历了多个不同的历史时期，每个时期都为其增添了独特的特性和故事。

2. 文化意义：作为重要的文化遗产，这个地标代表着当地人民的精神和价值观，同时也吸引着来自世界各地的游客。

3. 建筑特点：这座建筑展示了其建造时期的典型建筑风格和技术，其独特的设计和结构使其在众多建筑中脱颖而出。

4. 最佳参观时间：通常春季和秋季是参观的最佳时间，天气宜人且游客相对较少。建议在工作日早晨参观以避开人流。

5. 有趣的事实：这个地标曾经历过多次修复和改建，每次都为其增添了新的特点。它也出现在众多文学作品和电影中，成为文化中的重要象征。`,
      "English": `This landmark is a fascinating site with rich history and cultural significance.

1. Historical Background: This landmark has a long history spanning multiple historical periods, each adding unique characteristics and stories to its legacy.

2. Cultural Significance: As an important cultural heritage site, this landmark represents the spirit and values of the local people while attracting visitors from around the world.

3. Architectural Features: The structure showcases typical architectural styles and techniques from the period of its construction, with unique designs and structures that make it stand out among many buildings.

4. Best Time to Visit: Spring and autumn are generally the best times to visit, with pleasant weather and relatively fewer tourists. It's recommended to visit on weekday mornings to avoid crowds.

5. Interesting Facts: This landmark has undergone several restorations and modifications, each adding new features. It has also appeared in numerous literary works and films, becoming an important symbol in culture.`
    }
  }
};

type LandmarkKey = "Great Wall of China" | "Eiffel Tower" | "default";
type LanguageKey = "Chinese" | "English";

// 根据名称获取模拟数据
function getLandmarkMockData(name: string, language: string): string {
  // 标准化名称处理
  const normalizedName = name.toLowerCase();
  let key: LandmarkKey = "default";
  
  if (normalizedName.includes("great wall") || normalizedName.includes("长城")) {
    key = "Great Wall of China";
  } else if (normalizedName.includes("eiffel") || normalizedName.includes("埃菲尔")) {
    key = "Eiffel Tower";
  }
  
  const langKey: LanguageKey = language.toLowerCase().includes("english") ? "English" : "Chinese";
  return mockData.landmarks[key][langKey];
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
        console.error('API错误:', errorData);
        
        // 返回模拟数据
        const mockLandmarkData = getLandmarkMockData(name, language);
        setResponse({
          data: mockLandmarkData,
          isLoading: false
        });
        
        return mockLandmarkData;
      }
      
      const data = await res.json();
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
      console.error('Landmark API Error:', error);
      
      // 在发生错误时使用模拟数据
      const mockLandmarkData = getLandmarkMockData(name, language);
      setResponse({
        data: mockLandmarkData,
        error: error.message,
        isLoading: false
      });
      
      return mockLandmarkData;
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
        console.error('API错误:', errorData);
        
        // 返回模拟数据
        const mockData = getLandmarkMockData(landmark, language);
        setResponse({
          data: mockData,
          isLoading: false
        });
        
        return mockData;
      }
      
      const data = await res.json();
      
      setResponse({
        data: data.data,
        isLoading: false
      });
      
      return data.data;
    } catch (error: any) {
      console.error('Narration API Error:', error);
      
      // 在发生错误时使用模拟数据
      const mockData = getLandmarkMockData(landmark, language);
      setResponse({
        data: mockData,
        error: error.message,
        isLoading: false
      });
      
      return mockData;
    }
  };

  return {
    ...response,
    fetchAudioNarration
  };
} 