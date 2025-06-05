import { NextRequest, NextResponse } from 'next/server';
import { getCurrentConfig } from '@/lib/api/deepseek';

// 模拟数据
const mockResponses = {
  "Chinese": {
    "great-wall": [
      "长城是中国古代伟大的防御工程，也是世界文化遗产。",
      "长城修建历史可以追溯到春秋战国时期，但现在我们看到的大部分长城是明朝时期修建的。",
      "长城全长超过21,000公里，横跨中国北部多个省份。",
      "八达岭长城是最受游客欢迎的一段，交通便利，设施完善。",
      "长城不仅是军事防御工程，也是古代中国政治、军事、文化的象征。"
    ],
    "eiffel-tower": [
      "埃菲尔铁塔是法国巴黎的标志性建筑，以设计师古斯塔夫·埃菲尔命名。",
      "它于1889年为世界博览会而建，原本计划拆除，但因其在无线电通信中的价值而保留。",
      "铁塔高324米，直到1930年克莱斯勒大厦建成前，它一直是世界上最高的建筑物。",
      "每年有约700万游客参观埃菲尔铁塔，它已成为世界上参观人数最多的收费景点之一。",
      "铁塔每晚都有灯光表演，每小时闪烁5分钟，非常壮观。"
    ],
    "default": [
      "这是一个非常有趣的地方，拥有丰富的历史和文化。",
      "最佳参观时间通常是春季和秋季，天气宜人且游客较少。",
      "建议您参观时带上舒适的鞋子，因为可能需要大量步行。",
      "当地有许多特色美食，非常值得品尝。",
      "这里的日出和日落景色非常壮观，是摄影的绝佳时机。"
    ]
  },
  "English": {
    "great-wall": [
      "The Great Wall is an ancient Chinese defensive project and a World Heritage site.",
      "The construction of the Great Wall dates back to the Spring and Autumn and Warring States periods, but most of what we see today was built during the Ming Dynasty.",
      "The Great Wall spans over 21,000 kilometers across northern China.",
      "Badaling Great Wall is the most popular section among tourists, with convenient transportation and well-established facilities.",
      "The Great Wall is not only a military defensive project but also a symbol of ancient Chinese politics, military, and culture."
    ],
    "eiffel-tower": [
      "The Eiffel Tower is an iconic landmark in Paris, France, named after its designer Gustave Eiffel.",
      "It was built for the 1889 World's Fair and was originally planned to be demolished but was kept for its value in radio communications.",
      "The tower stands 324 meters tall and was the world's tallest structure until the completion of the Chrysler Building in 1930.",
      "About 7 million visitors climb the Eiffel Tower annually, making it one of the most visited paid monuments in the world.",
      "The tower features a spectacular light show every night, sparkling for 5 minutes every hour."
    ],
    "default": [
      "This is a fascinating place with rich history and culture.",
      "The best time to visit is usually spring and autumn when the weather is pleasant and there are fewer tourists.",
      "It's recommended to wear comfortable shoes when visiting as there may be a lot of walking involved.",
      "There are many local specialties worth trying in the area.",
      "The sunrise and sunset views here are spectacular and perfect for photography."
    ]
  }
};

// 获取模拟回复
function getMockResponse(landmark: string, language: string): string {
  const langResponses = language.toLowerCase().includes("chinese") ? mockResponses.Chinese : mockResponses.English;
  
  // 尝试匹配特定地标
  let key: string;
  if (landmark.toLowerCase().includes("great wall") || landmark.includes("长城")) {
    key = "great-wall";
  } else if (landmark.toLowerCase().includes("eiffel") || landmark.includes("埃菲尔")) {
    key = "eiffel-tower";
  } else {
    key = "default";
  }
  
  const responses = langResponses[key as keyof typeof langResponses] || langResponses.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

export async function POST(request: NextRequest) {
  try {
    const { message, landmark, language = 'Chinese', history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '缺少消息内容' },
        { status: 400 }
      );
    }

    const config = getCurrentConfig();
    const useOpenAI = config.apiUrl.includes('openai.com');
    const apiKey = config.apiKey;

    // 检查API密钥是否配置
    if (!apiKey) {
      console.log('API密钥未配置，使用模拟数据');
      const mockResponse = getMockResponse(landmark, language);
      return NextResponse.json({ response: mockResponse });
    }

    // 构建完整聊天历史
    const formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // 构建系统提示
    const systemPrompt = language === 'Chinese' 
      ? `你是一个友好专业的${landmark}AI导游，提供关于这个景点的信息、历史、文化背景、建筑特点和旅行建议。
         回答要简洁、有教育意义且富有信息量。只回答与${landmark}相关的问题。
         如果被问到无关问题，礼貌地将话题引回${landmark}。使用中文回答。`
      : `You are a friendly, professional AI tour guide for ${landmark}, providing information about its history, cultural significance, architecture, and travel tips.
         Your answers should be concise, educational, and informative. Only answer questions related to ${landmark}.
         If asked about unrelated topics, politely bring the conversation back to ${landmark}. Answer in English.`;

    try {
      // 发送请求到DeepSeek或OpenAI API
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...config.defaultConfig,
          messages: [
            { role: 'system', content: systemPrompt },
            ...formattedHistory,
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API错误:', errorData);
        // API错误时使用模拟数据
        const mockResponse = getMockResponse(landmark, language);
        return NextResponse.json({ response: mockResponse });
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return NextResponse.json({ response: aiResponse });
    } catch (error) {
      console.error('API请求失败:', error);
      // 请求失败时使用模拟数据
      const mockResponse = getMockResponse(landmark, language);
      return NextResponse.json({ response: mockResponse });
    }
  } catch (error: any) {
    console.error('Chat API错误:', error);
    return NextResponse.json(
      { error: error.message || '处理聊天请求时出错' },
      { status: 500 }
    );
  }
} 