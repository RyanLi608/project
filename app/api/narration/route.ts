import { NextRequest, NextResponse } from 'next/server';
import { getLandmarkInfo } from '@/lib/api/deepseek';

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
    // 这里我们使用同样的方法获取信息，但增加了特定方面的提示
    // 在实际应用中，可能需要一个专门的语音导览API
    const prompt = `请专门讲解${landmark}的${aspect}方面的内容，用${language}语言表达，使内容更适合语音导览。`;
    
    const result = await getLandmarkInfo(prompt, language as string);
    
    if (result.success) {
      return NextResponse.json({ data: result.data });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Narration API error:', error);
    return NextResponse.json(
      { error: error.message || '处理语音导览请求时出错' },
      { status: 500 }
    );
  }
} 