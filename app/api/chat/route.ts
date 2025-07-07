import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json()

    // 模拟AI回复逻辑 - 后续可以集成真实的AI API
    const travelResponses = {
      '北京': '北京是中国的首都，有很多著名景点如天安门、故宫、长城等。最佳旅游时间是春秋两季。',
      '上海': '上海是中国的经济中心，现代化程度很高。外滩、东方明珠、南京路都是必去景点。',
      '西安': '西安是十三朝古都，兵马俑、大雁塔、古城墙是代表性景点。推荐停留3-4天。',
      '成都': '成都是天府之国，以美食和熊猫闻名。宽窄巷子、锦里、都江堰值得一游。',
      '杭州': '杭州有西湖美景，是人间天堂。灵隐寺、雷峰塔、三潭印月都很有名。',
      '天气': '我可以为您查询任何城市的天气情况，请告诉我您想了解哪个城市的天气。',
      '行程': '我可以为您规划个性化的旅游行程，请告诉我您的出发地、目的地和旅游天数。',
      '景点': '中国有众多世界级景点，包括长城、故宫、兵马俑、九寨沟等，您想了解哪个地区的景点？'
    }

    let response = '您好！我是您的专属旅游助手。我可以为您介绍中国的各个旅游城市、推荐景点、规划行程路线，还可以提供实时天气信息。请告诉我您想了解什么？'

    // 简单的关键词匹配
    const messageContent = message.toLowerCase()
    for (const [keyword, reply] of Object.entries(travelResponses)) {
      if (messageContent.includes(keyword.toLowerCase())) {
        response = reply
        break
      }
    }

    // 添加一些智能回复逻辑
    if (messageContent.includes('推荐') || messageContent.includes('建议')) {
      response = '根据您的需求，我推荐以下几个热门目的地：\n\n🏛️ 北京 - 历史文化深厚\n🌃 上海 - 现代都市风情\n🏮 西安 - 古都风韵\n🐼 成都 - 休闲美食\n🌊 杭州 - 江南水乡\n\n您对哪个城市感兴趣呢？'
    } else if (messageContent.includes('计划') || messageContent.includes('几天')) {
      response = '我可以为您制定详细的旅游计划！请告诉我：\n\n📍 您想去哪个城市？\n📅 计划游玩几天？\n💰 大概的预算范围？\n🎯 特别想体验什么（美食、历史、自然风光等）？\n\n这样我就能为您推荐最合适的行程了！'
    }

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    )
  }
} 