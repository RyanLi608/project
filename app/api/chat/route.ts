import { NextRequest, NextResponse } from 'next/server';
import { requestAIResponse } from '@/lib/api/deepseek';

// 移除edge runtime配置
// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message, landmark, language } = await req.json();

    // 构建提示信息，确保包含地标信息
    let prompt = message;
    if (landmark) {
      prompt = `关于${landmark}的问题: ${message}`;
      console.log(`收到关于${landmark}的问题: ${message}`);
    } else {
      console.log(`收到一般问题: ${message}`);
    }

    // 直接调用DeepSeek API，不使用模拟数据
    console.log('正在调用DeepSeek API...');
    const response = await requestAIResponse(prompt, language);

    if (response.success) {
      return NextResponse.json({
        message: response.data,
        source: 'DeepSeek API'
      });
    } else {
      console.error('API调用失败:', response.error);
      return NextResponse.json(
        { error: `无法获取回答: ${response.error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('处理请求时出错:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
}
