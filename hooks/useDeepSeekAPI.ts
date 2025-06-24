import { useState, useCallback } from 'react';
import axios from 'axios';
import { handleApiError } from '@/lib/api/utils';
import { useLanguage } from '@/lib/language-context';

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
    "Taj Mahal": {
      "Chinese": `泰姬陵是印度最著名的建筑，也是世界上最美丽的陵墓之一。

1. 历史背景：泰姬陵由莫卧儿帝国第五代皇帝沙贾汗于1631年至1653年间建造，目的是纪念他挚爱的第三任妻子慕塔兹·玛哈尔，她在生产第14个孩子时去世。这座建筑耗时22年，动用了20,000名工匠。沙贾汗对妻子的挚爱使泰姬陵成为了爱情的象征。

2. 文化意义：泰姬陵被认为是莫卧儿建筑艺术的顶峰，也是伊斯兰艺术在印度的完美融合。它被联合国教科文组织列为世界文化遗产，并在2007年被评为世界新七大奇迹之一。泰姬陵不仅是印度最重要的文化象征之一，也代表着爱情、忠诚和永恒的主题。

3. 建筑特点：泰姬陵由白色大理石建造，主体建筑位于一个方形平台上，四角各有一座尖塔。中央的穹顶高达73米，呈洋葱形，是印度-伊斯兰建筑的特色。整个建筑严格对称，只有沙贾汗和慕塔兹的陵墓位置略有不同。大理石表面镶嵌着来自各地的宝石，形成复杂的花卉和几何图案。前方的长方形水池反射出泰姬陵的倒影，使其美感倍增。

4. 最佳参观时间：参观泰姬陵的最佳时间是10月至3月，此时天气凉爽干燥。日出时分（约6点）是最理想的参观时间，此时游客较少，且清晨的光线使白色大理石呈现出变幻的色彩，从粉红色到金色再到耀眼的白色。满月之夜的泰姬陵也非常壮观，但需要特别预订。避开星期五参观，因为这天泰姬陵关闭（仅对穆斯林祈祷者开放）。

5. 有趣的事实：泰姬陵的建筑材料来自印度和亚洲各地，包括从中国、阿富汗和斯里兰卡运来的宝石。据说沙贾汗计划在亚穆纳河对岸建造一座与泰姬陵相对的黑色大理石陵墓作为自己的陵寝，但他晚年被儿子囚禁，这个计划未能实现。由于环境污染，泰姬陵的白色大理石正在慢慢变黄，印度政府正在采取措施保护这一珍贵的建筑遗产。泰姬陵内部最精美的装饰是围绕两座陵墓的大理石屏风，上面镶嵌着精美的半宝石花朵图案。`,
      "English": `The Taj Mahal is India's most famous monument and one of the most beautiful mausoleums in the world.

1. Historical Background: The Taj Mahal was built between 1631 and 1653 by the fifth Mughal Emperor Shah Jahan to commemorate his beloved third wife, Mumtaz Mahal, who died while giving birth to their 14th child. The construction took 22 years and employed 20,000 artisans. Shah Jahan's deep love for his wife has made the Taj Mahal a symbol of love.

2. Cultural Significance: The Taj Mahal is considered the pinnacle of Mughal architectural art and the perfect blend of Islamic art in India. It is recognized as a UNESCO World Heritage Site and was named one of the New Seven Wonders of the World in 2007. The Taj Mahal is not only one of India's most important cultural symbols but also represents themes of love, devotion, and eternity.

3. Architectural Features: The Taj Mahal is built of white marble, with the main structure situated on a square platform with minarets at each corner. The central dome reaches a height of 73 meters and has an onion shape, characteristic of Indo-Islamic architecture. The entire building is strictly symmetrical, with only the positions of Shah Jahan's and Mumtaz's tombs being slightly different. The marble surfaces are inlaid with gems from various regions, forming complex floral and geometric patterns. The rectangular pool in front reflects the image of the Taj Mahal, enhancing its beauty.

4. Best Time to Visit: The best time to visit the Taj Mahal is from October to March when the weather is cool and dry. Sunrise (around 6 AM) is the ideal time to visit, as there are fewer tourists then, and the morning light causes the white marble to display changing colors, from pink to gold to brilliant white. The Taj Mahal is also spectacular on full moon nights, but special bookings are required. Avoid visiting on Fridays when the Taj Mahal is closed (open only to Muslim worshippers).

5. Interesting Facts: The building materials for the Taj Mahal came from all over India and Asia, including gems transported from China, Afghanistan, and Sri Lanka. It is said that Shah Jahan planned to build a black marble mausoleum across the Yamuna River from the Taj Mahal as his own tomb, but he was imprisoned by his son in his later years, and this plan was never realized. Due to environmental pollution, the white marble of the Taj Mahal is slowly turning yellow, and the Indian government is taking measures to protect this precious architectural heritage. The most exquisite decoration inside the Taj Mahal is the marble screen surrounding the two tombs, inlaid with beautiful semi-precious stone floral patterns.`
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
  },
  itinerary: {
    "Chinese": (destination: string, days: number, preferences: string[]) => `# ${destination}${days}天行程规划

## 行程概述
这是一个为${destination}设计的${days}天精彩旅行计划，特别关注${preferences.join('、')}。这次旅行将带您领略${destination}最迷人的景点和体验。

## 第1天
### 上午
- 抵达${destination}，入住酒店休息调整
- 在酒店附近的当地餐厅享用早餐，体验当地美食
- 参观${destination}最著名的地标景点（步行30分钟）

### 下午
- 在当地特色餐厅享用午餐（1小时）
- 游览历史文化区，了解当地文化历史（2小时）
- 自由购物和休息时间（1.5小时）

### 晚上
- 品尝当地特色晚餐（1.5小时）
- 欣赏夜景或参加当地文化演出（2小时）
- 返回酒店休息

## 第2天
### 上午
- 酒店早餐
- 前往自然风景区，欣赏自然美景（3小时）

### 下午
- 在景区附近的餐厅享用午餐（1小时）
- 继续游览或参加户外活动（2-3小时）
- 返回市区

### 晚上
- 享用晚餐
- 夜市或当地特色街区漫步（2小时）
- 返回酒店休息

${days > 2 ? `## 第3天
### 上午
- 酒店早餐
- 参观博物馆或艺术馆（2小时）

### 下午
- 享用午餐
- 参加当地体验活动或工作坊（2-3小时）
- 自由活动时间

### 晚上
- 享用特色餐厅晚餐
- 夜间活动或休息
- 返回酒店` : ''}

${days > 3 ? `## 第4天
### 上午
- 酒店早餐
- 前往周边小镇或景点一日游（全天行程）

### 下午
- 继续一日游行程
- 在当地享用午餐

### 晚上
- 返回主要城市
- 享用晚餐
- 酒店休息` : ''}

## 实用提示
1. 建议提前预订热门景点门票
2. ${destination}的公共交通便利，可考虑购买交通卡
3. 当地天气多变，建议随身携带雨具
4. 尊重当地习俗和文化传统
5. 重要景点和餐厅建议提前预约

希望您在${destination}度过一段难忘的旅程！`,
    
    "English": (destination: string, days: number, preferences: string[]) => `# ${destination} ${days}-Day Itinerary

## Overview
This is an exciting ${days}-day travel plan for ${destination}, focusing on ${preferences.join(', ')}. This journey will take you through the most charming attractions and experiences in ${destination}.

## Day 1
### Morning
- Arrive in ${destination}, check into hotel and rest
- Enjoy breakfast at a local restaurant near your hotel
- Visit the most famous landmark in ${destination} (30 minutes walking tour)

### Afternoon
- Lunch at a local specialty restaurant (1 hour)
- Explore the historical and cultural district (2 hours)
- Free time for shopping and relaxation (1.5 hours)

### Evening
- Taste local specialty dinner (1.5 hours)
- Enjoy night views or attend a local cultural performance (2 hours)
- Return to hotel

## Day 2
### Morning
- Breakfast at hotel
- Visit natural scenic area to enjoy natural beauty (3 hours)

### Afternoon
- Lunch at a restaurant near the scenic area (1 hour)
- Continue touring or participate in outdoor activities (2-3 hours)
- Return to city center

### Evening
- Enjoy dinner
- Stroll through night market or local characteristic streets (2 hours)
- Return to hotel

${days > 2 ? `## Day 3
### Morning
- Breakfast at hotel
- Visit museum or art gallery (2 hours)

### Afternoon
- Enjoy lunch
- Participate in local experience activities or workshops (2-3 hours)
- Free activity time

### Evening
- Dinner at specialty restaurant
- Night activities or rest
- Return to hotel` : ''}

${days > 3 ? `## Day 4
### Morning
- Breakfast at hotel
- Day trip to nearby town or attraction (full day itinerary)

### Afternoon
- Continue day trip itinerary
- Enjoy lunch locally

### Evening
- Return to main city
- Enjoy dinner
- Rest at hotel` : ''}

## Practical Tips
1. It is recommended to book tickets for popular attractions in advance
2. Public transportation in ${destination} is convenient, consider purchasing a transit card
3. Weather can be variable, recommend carrying rain gear
4. Respect local customs and cultural traditions
5. Advance reservations recommended for important attractions and restaurants

Hope you have a memorable journey in ${destination}!`
  }
};

type LandmarkKey = "Great Wall of China" | "Eiffel Tower" | "Taj Mahal" | "default";
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
  } else if (normalizedName.includes("taj mahal") || normalizedName.includes("泰姬陵")) {
    key = "Taj Mahal";
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

// 行程规划生成器
export function useItineraryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const generateItinerary = useCallback(
    async (
      destination: string, 
      days: number, 
      preferences: string[],
      extraInfo: string = '',
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination,
            days,
            preferences,
            extraInfo,
            language: language === 'en' ? 'English' : 'Chinese',
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || '生成行程时出错');
        }

        setIsLoading(false);
        return data.data;
      } catch (error: any) {
        console.error('行程生成错误:', error);
        setError(error.message || '生成行程时出错');
        setIsLoading(false);
        
        // 不再返回模拟数据，而是抛出错误让调用者处理
        throw error;
      }
    },
    [language]
  );

  return { isLoading, error, generateItinerary };
} 