import { NextRequest, NextResponse } from 'next/server';
import { getCurrentConfig } from '@/lib/api/utils';

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
      throw new Error(errorData.error?.message || 'API请求失败');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error('Chat API错误:', error);
    return NextResponse.json(
      { error: error.message || '处理聊天请求时出错' },
      { status: 500 }
    );
  }
} 