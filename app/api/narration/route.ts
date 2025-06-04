import { NextRequest, NextResponse } from 'next/server';
import { getAudioNarration } from '@/lib/api/deepseek';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const landmark = searchParams.get('landmark');
  const aspect = searchParams.get('aspect') || '历史';
  const language = searchParams.get('language') || 'Chinese';

  if (!landmark) {
    return NextResponse.json(
      { error: '缺少景点名称参数' },
      { status: 400 }
    );
  }

  try {
    const result = await getAudioNarration(landmark, aspect, language);
    
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