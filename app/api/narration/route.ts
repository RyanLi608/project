import { NextRequest, NextResponse } from 'next/server';
import { getLandmarkInfo } from '@/lib/api/deepseek';

export const runtime = 'edge';

// 简化版的API路由，先确保它能正常工作
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

    // 调用API获取地标信息
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
          `I'm sorry, I couldn't find specific information about ${landmarkName} at the moment.` :
          `抱歉，我目前无法找到关于${landmarkName}的具体信息。`;
        
        return NextResponse.json({ 
          data: errorMessage,
          source: 'error'
        });
      }
    } catch (apiError) {
      console.error('API service error:', apiError);
      
      // 返回友好的错误消息
      const errorMessage = language.toLowerCase().includes('english') ? 
        `I'm sorry, there was an error processing your request about ${landmarkName}.` :
        `抱歉，处理您关于${landmarkName}的请求时出错。`;
      
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