import { NextRequest, NextResponse } from 'next/server';

// 不使用edge runtime，改用默认的nodejs runtime
// export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Narration API is working"
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      data: "API正常工作",
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "处理请求时出错" },
      { status: 500 }
    );
  }
} 