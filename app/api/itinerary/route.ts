import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/api/deepseek';

// 添加模拟数据生成函数
function generateMockItinerary(destination: string, days: number, preferences: string[], language: string = 'Chinese') {
  const isEnglish = language.toLowerCase().includes('english');
  
  if (isEnglish) {
    return `# ${destination} ${days}-Day Itinerary

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

## Practical Tips
1. It is recommended to book tickets for popular attractions in advance
2. Public transportation in ${destination} is convenient, consider purchasing a transit card
3. Weather can be variable, recommend carrying rain gear
4. Respect local customs and cultural traditions
5. Advance reservations recommended for important attractions and restaurants

Hope you have a memorable journey in ${destination}!`;
  } else {
    return `# ${destination}${days}天行程规划

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

## 实用提示
1. 建议提前预订热门景点门票
2. ${destination}的公共交通便利，可考虑购买交通卡
3. 当地天气多变，建议随身携带雨具
4. 尊重当地习俗和文化传统
5. 重要景点和餐厅建议提前预约

希望您在${destination}度过一段难忘的旅程！`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days, preferences, extraInfo, language } = body;

    if (!destination || !days || !preferences) {
      return NextResponse.json(
        { error: '缺少必要参数：目的地、天数或偏好' },
        { status: 400 }
      );
    }

    try {
      const result = await generateItinerary(
        destination,
        days,
        preferences,
        extraInfo || '',
        language || 'Chinese'
      );
      
      if (result && result.success && result.data) {
        return NextResponse.json({ data: result.data });
      } else {
        // 返回模拟数据
        const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
        return NextResponse.json({ data: mockData });
      }
    } catch (apiError) {
      console.error('API service error:', apiError);
      // 返回模拟数据
      const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
      return NextResponse.json({ data: mockData });
    }
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 