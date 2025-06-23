import { NextRequest, NextResponse } from 'next/server';
import { getLandmarkInfo } from '@/lib/api/deepseek';

// 问候语识别
const GREETINGS = [
  'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 
  '你好', '早上好', '下午好', '晚上好', '嗨', '哈喽'
];

// 感谢语识别
const THANKS = [
  'thank you', 'thanks', 'appreciate it', 'thank', 
  '谢谢', '感谢', '多谢', '非常感谢'
];

// 告别语识别
const FAREWELLS = [
  'goodbye', 'bye', 'see you', 'farewell', 'see you later',
  '再见', '拜拜', '回头见', '下次见'
];

// 地标类型关键词
const LANDMARK_TYPES = {
  'temple': ['temple', 'shrine', 'monastery', '寺', '寺庙', '寺院', '神社', '庙宇'],
  'palace': ['palace', 'castle', 'mansion', '宫', '宫殿', '城堡', '府邸'],
  'museum': ['museum', 'gallery', 'exhibition', '博物馆', '美术馆', '展览馆', '纪念馆'],
  'mountain': ['mountain', 'hill', 'peak', 'mount', '山', '峰', '岭', '丘'],
  'lake': ['lake', 'pond', 'reservoir', '湖', '湖泊', '池', '水库'],
  'garden': ['garden', 'park', 'forest', '园', '花园', '公园', '森林']
};

// 提取问题中的关键词
function extractKeywords(text: string): string[] {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+|[,.?!;:，。？！；：]/);
  return words.filter(word => word.length > 1);
}

// 判断问题类型
function analyzeQuestionType(text: string): string {
  const lowerText = text.toLowerCase();
  
  // 检查是否是问候语
  if (GREETINGS.some(greeting => lowerText.includes(greeting))) {
    return 'greeting';
  }
  
  // 检查是否是感谢语
  if (THANKS.some(thank => lowerText.includes(thank))) {
    return 'thanks';
  }
  
  // 检查是否是告别语
  if (FAREWELLS.some(farewell => lowerText.includes(farewell))) {
    return 'farewell';
  }
  
  // 检查问题类型
  if (lowerText.includes('历史') || lowerText.includes('history')) {
    return 'history';
  }
  
  if (lowerText.includes('建筑') || lowerText.includes('architecture')) {
    return 'architecture';
  }
  
  if (lowerText.includes('文化') || lowerText.includes('culture')) {
    return 'culture';
  }
  
  if (lowerText.includes('参观') || lowerText.includes('visit') || 
      lowerText.includes('门票') || lowerText.includes('ticket')) {
    return 'visit';
  }
  
  if (lowerText.includes('交通') || lowerText.includes('transport') || 
      lowerText.includes('怎么去') || lowerText.includes('how to get')) {
    return 'transport';
  }
  
  // 检查地标类型
  for (const [type, keywords] of Object.entries(LANDMARK_TYPES)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return `landmark_${type}`;
    }
  }
  
  return 'general';
}

// 生成响应
function generateResponse(question: string, landmarkName: string, language: string): string {
  const isEnglish = language.toLowerCase().includes('english');
  const questionType = analyzeQuestionType(question);
  
  // 根据问题类型生成响应
  switch (questionType) {
    case 'greeting':
      if (isEnglish) {
        return `Hello! Welcome to the ${landmarkName} guide. How can I help you today?`;
      } else {
        return `你好！欢迎使用${landmarkName}导览。今天有什么可以帮到您的吗？`;
      }
      
    case 'thanks':
      if (isEnglish) {
        return `You're welcome! If you have any more questions about ${landmarkName}, feel free to ask.`;
      } else {
        return `不客气！如果您对${landmarkName}还有任何问题，随时可以向我咨询。`;
      }
      
    case 'farewell':
      if (isEnglish) {
        return `Goodbye! Enjoy your visit to ${landmarkName}!`;
      } else {
        return `再见！祝您在${landmarkName}游玩愉快！`;
      }
      
    default:
      // 对于其他问题类型，我们将通过API获取详细信息
      return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, landmarkName, language = 'Chinese' } = body;

    if (!question || !landmarkName) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 首先尝试生成基于问题类型的简单响应
    const simpleResponse = generateResponse(question, landmarkName, language);
    if (simpleResponse) {
      return NextResponse.json({ 
        data: simpleResponse,
        source: 'local'
      });
    }
    
    // 如果需要更详细的回答，则调用API
    try {
      const result = await getLandmarkInfo(landmarkName, language);
      
      if (result && result.success && result.data) {
        return NextResponse.json({ 
          data: result.data,
          source: 'api'
        });
      } else {
        // 如果API调用失败，返回一个友好的错误消息
        const errorMessage = language.toLowerCase().includes('english') ? 
          `I'm sorry, I couldn't find specific information about ${landmarkName} at the moment. Please try again later.` :
          `抱歉，我目前无法找到关于${landmarkName}的具体信息。请稍后再试。`;
        
        return NextResponse.json({ 
          data: errorMessage,
          source: 'error'
        });
      }
    } catch (apiError) {
      console.error('API service error:', apiError);
      
      // 返回友好的错误消息
      const errorMessage = language.toLowerCase().includes('english') ? 
        `I'm sorry, there was an error processing your request about ${landmarkName}. Please try again later.` :
        `抱歉，处理您关于${landmarkName}的请求时出错。请稍后再试。`;
      
      return NextResponse.json({ 
        data: errorMessage,
        source: 'error'
      });
    }
  } catch (error: any) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 