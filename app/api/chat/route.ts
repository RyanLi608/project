// Simple chat API route
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Return a simple response
    return new Response(JSON.stringify({
      answer: "您好！我是旅游助手，很高兴为您服务。",
      source: "ai"
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
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