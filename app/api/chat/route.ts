export async function POST(request) {
  return new Response(JSON.stringify({
    answer: "聊天功能正在维护中，请稍后再试。",
    source: "maintenance"
  }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}
