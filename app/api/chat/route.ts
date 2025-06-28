import { NextRequest, NextResponse } from 'next/server';
import { requestAIResponse } from '@/lib/api/deepseek';

// 移除edge runtime配置
// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message, landmark, language } = await req.json();

    // 构建更智能的提示信息，确保AI理解这是用户的具体问题
    let prompt;
    if (landmark) {
      prompt = `用户询问关于${landmark}的具体问题："${message}"。请直接回答用户的问题，不要提供通用的景点介绍。如果问题涉及时间、地点、建议等具体信息，请给出针对性的回答。`;
      console.log(`收到关于${landmark}的具体问题: ${message}`);
    } else {
      prompt = `用户问题："${message}"。请直接回答用户的问题。`;
      console.log(`收到一般问题: ${message}`);
    }

    // 直接调用DeepSeek API，不使用模拟数据
    console.log('正在调用DeepSeek API...');
    const response = await requestAIResponse(prompt, language);

    // 现在response总是success: true，直接返回数据
    return NextResponse.json({
      message: response.data,
      source: response.source || 'AI API'
    });
  } catch (error) {
    console.error('处理请求时出错:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
}
