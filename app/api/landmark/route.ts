import { NextRequest, NextResponse } from 'next/server'

interface Landmark {
  id: string
  name: string
  city: string
  province: string
  description: string
  image: string
  category: string
  rating: number
  visitTime: string
  ticketPrice: string
  openHours: string
  location: {
    lat: number
    lng: number
  }
}

const landmarks: Landmark[] = [
  {
    id: '1',
    name: '万里长城',
    city: '北京',
    province: '北京市',
    description: '万里长城是中国古代的军事防御工程，是世界文化遗产，被誉为世界七大奇迹之一。',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
    category: '历史古迹',
    rating: 4.8,
    visitTime: '3-4小时',
    ticketPrice: '45元',
    openHours: '06:30-19:30',
    location: { lat: 40.4319, lng: 116.5704 }
  },
  {
    id: '2',
    name: '紫禁城（故宫）',
    city: '北京',
    province: '北京市',
    description: '紫禁城是中国明清两朝的皇家宫殿，现称故宫博物院，是世界上现存规模最大的木质结构古建筑群。',
    image: 'https://images.unsplash.com/photo-1549557652-6e396bcf00f1?w=800&h=600&fit=crop',
    category: '历史古迹',
    rating: 4.9,
    visitTime: '半天',
    ticketPrice: '60元',
    openHours: '08:30-17:00',
    location: { lat: 39.9163, lng: 116.3972 }
  },
  {
    id: '3',
    name: '兵马俑',
    city: '西安',
    province: '陕西省',
    description: '秦始皇兵马俑博物馆是世界最大的地下军事博物馆，被誉为"世界第八大奇迹"。',
    image: 'https://images.unsplash.com/photo-1570889036575-a6478c4ea0b9?w=800&h=600&fit=crop',
    category: '历史古迹',
    rating: 4.7,
    visitTime: '2-3小时',
    ticketPrice: '120元',
    openHours: '08:30-18:00',
    location: { lat: 34.3848, lng: 109.2734 }
  },
  {
    id: '4',
    name: '西湖',
    city: '杭州',
    province: '浙江省',
    description: '西湖是中国主要的观赏性淡水湖泊，有"天下西湖三十六，就中最美是杭州"的美誉。',
    image: 'https://images.unsplash.com/photo-1609401092780-62b8b1e8f83d?w=800&h=600&fit=crop',
    category: '自然风光',
    rating: 4.6,
    visitTime: '半天-1天',
    ticketPrice: '免费',
    openHours: '全天开放',
    location: { lat: 30.2594, lng: 120.1685 }
  },
  {
    id: '5',
    name: '外滩',
    city: '上海',
    province: '上海市',
    description: '外滩是上海的风景线，展现了上海的历史文化和现代化建设成就。',
    image: 'https://images.unsplash.com/photo-1545901087-6c0e30a65c8a?w=800&h=600&fit=crop',
    category: '城市景观',
    rating: 4.5,
    visitTime: '2-3小时',
    ticketPrice: '免费',
    openHours: '全天开放',
    location: { lat: 31.2408, lng: 121.4901 }
  },
  {
    id: '6',
    name: '大熊猫基地',
    city: '成都',
    province: '四川省',
    description: '成都大熊猫繁育研究基地是中国政府实施大熊猫等濒危野生动物迁地保护工程的主要研究基地。',
    image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&h=600&fit=crop',
    category: '动物园区',
    rating: 4.8,
    visitTime: '3-4小时',
    ticketPrice: '55元',
    openHours: '07:30-18:00',
    location: { lat: 30.7318, lng: 104.1505 }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredLandmarks = landmarks

    if (city) {
      filteredLandmarks = filteredLandmarks.filter(
        landmark => landmark.city.toLowerCase().includes(city.toLowerCase())
      )
    }

    if (category) {
      filteredLandmarks = filteredLandmarks.filter(
        landmark => landmark.category === category
      )
    }

    // 限制返回数量
    filteredLandmarks = filteredLandmarks.slice(0, limit)

    return NextResponse.json({
      landmarks: filteredLandmarks,
      total: filteredLandmarks.length,
      cities: [...new Set(landmarks.map(l => l.city))],
      categories: [...new Set(landmarks.map(l => l.category))]
    })

  } catch (error) {
    console.error('Landmark API Error:', error)
    return NextResponse.json(
      { error: '获取地标信息失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description } = await request.json()

    // 模拟AI地标识别和介绍
    const response = `根据您提供的信息"${name}"，我来为您介绍这个地标：

${description || '这是一个著名的中国旅游景点。'}

📍 **位置信息**：具体位置需要进一步确认
🎫 **门票信息**：建议查询官方最新价格
⏰ **开放时间**：请咨询当地旅游部门
🌟 **推荐指数**：⭐⭐⭐⭐⭐

**旅游建议**：
• 建议提前预订门票，避免排队等候
• 最佳拍照时间是日出日落时分
• 推荐游览时长2-3小时
• 请注意保护环境，文明旅游

如需更详细的信息，我可以为您查询具体的交通路线、周边景点和美食推荐。`

    return NextResponse.json({ 
      response,
      landmark: name,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Landmark POST API Error:', error)
    return NextResponse.json(
      { error: '处理地标信息失败' },
      { status: 500 }
    )
  }
} 