import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/api/deepseek';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days, preferences, language } = body;

    if (!destination || !days || !preferences) {
      return NextResponse.json(
        { error: '缺少必要参数：目的地、天数或偏好' },
        { status: 400 }
      );
    }

    const result = await generateItinerary(
      destination,
      days,
      preferences,
      language || 'Chinese'
    );
    
    if (result.success) {
      return NextResponse.json({ data: result.data });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 