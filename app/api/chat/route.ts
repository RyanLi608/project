import { NextRequest, NextResponse } from 'next/server';

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

// 判断问题类型
function analyzeMessageType(text: string): string {
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
  
  return 'general';
}

// 生成响应
function generateResponse(message: string, language: string = 'Chinese'): string {
  const isEnglish = language.toLowerCase().includes('english');
  const messageType = analyzeMessageType(message);
  
  // 根据消息类型生成响应
  switch (messageType) {
    case 'greeting':
      if (isEnglish) {
        return `Hello! Welcome to LandmarkAI. How can I help you with your travel plans today?`;
      } else {
        return `你好！欢迎使用LandmarkAI。今天有什么旅行计划我可以帮到您的吗？`;
      }
      
    case 'thanks':
      if (isEnglish) {
        return `You're welcome! If you have any more questions about your travel plans, feel free to ask.`;
      } else {
        return `不客气！如果您对旅行计划还有任何问题，随时可以向我咨询。`;
      }
      
    case 'farewell':
      if (isEnglish) {
        return `Goodbye! Have a wonderful journey!`;
      } else {
        return `再见！祝您旅途愉快！`;
      }
      
    default:
      if (isEnglish) {
        return `I'm here to help with your travel questions. You can ask me about specific landmarks, itinerary planning, or travel tips.`;
      } else {
        return `我可以帮助您解答旅行问题。您可以询问我关于特定地标、行程规划或旅行建议。`;
      }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, language = 'Chinese' } = body;

    if (!message) {
      return new Response(JSON.stringify({
        error: '缺少消息内容'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 生成响应
    const response = generateResponse(message, language);
    
    return new Response(JSON.stringify({
      answer: response,
      source: "ai"
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({
      answer: "处理您的请求时出错，请稍后再试。",
      source: "error"
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
