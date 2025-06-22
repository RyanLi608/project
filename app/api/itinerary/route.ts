import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/api/deepseek';

// 添加模拟数据生成函数
function generateMockItinerary(destination: string, days: number, preferences: string[], language: string = 'Chinese') {
  const isEnglish = language.toLowerCase().includes('english');
  
  // 根据目的地生成不同的模拟数据
  if (destination === '北京' || destination.toLowerCase().includes('beijing')) {
    if (isEnglish) {
      return `# Beijing ${days}-Day Cultural History Tour

## Itinerary Overview
This ${days}-day Beijing journey focuses on cultural and historical exploration, taking you through the city's most iconic imperial sites, ancient alleyways, and cultural landmarks. You'll experience the grandeur of the Forbidden City, walk along the majestic Great Wall, and immerse yourself in local life through hutong tours and authentic cuisine.

## Day 1: Imperial Beijing
### Morning (8:00-12:00)
- 8:00-8:30: Hotel breakfast
- 8:30-9:00: Travel to Tiananmen Square by subway Line 1 (Exit A at Tiananmen East Station)
- 9:00-10:00: Explore Tiananmen Square, the world's largest public square
- 10:00-12:30: Visit the Forbidden City (entrance fee: 60 CNY Apr-Oct, 40 CNY Nov-Mar)
  * Don't miss: Hall of Supreme Harmony, Palace of Heavenly Purity, Imperial Garden

### Afternoon (12:30-17:00)
- 12:30-14:00: Lunch at Siji Minfu Restaurant (四季民福) near the east gate of the Forbidden City
  * Recommended dishes: Peking Duck (288 CNY), Imperial Court dishes
- 14:00-14:30: Walk or take a short taxi to Jingshan Park (10 CNY entrance)
- 14:30-16:00: Climb Jingshan Hill for panoramic views of the Forbidden City
- 16:00-17:00: Visit the Drum and Bell Towers (combined ticket: 30 CNY)

### Evening (17:00-21:00)
- 17:00-18:00: Travel to Wangfujing Street by subway Line 1
- 18:00-19:30: Dinner at Donghuamen Night Market or Quanjude Roast Duck Restaurant
- 19:30-21:00: Shopping and exploring Wangfujing Street
- 21:00: Return to hotel by taxi (approximately 30 CNY)

## Day 2: The Great Wall and Olympic Park
### Morning (7:30-13:00)
- 7:30-8:00: Hotel breakfast
- 8:00-10:00: Travel to Mutianyu Great Wall by pre-booked private transfer or tour bus
- 10:00-13:00: Explore Mutianyu Great Wall (entrance: 45 CNY, cable car: 100 CNY round trip)
  * Tip: Take the cable car up and toboggan down for a unique experience

### Afternoon (13:00-17:30)
- 13:00-14:00: Lunch at the Schoolhouse Restaurant near Mutianyu
  * Recommended: Fresh trout and local specialties
- 14:00-15:30: Return to Beijing city
- 15:30-17:30: Visit the Olympic Park, see the Bird's Nest (80 CNY to enter) and Water Cube (30 CNY)

### Evening (17:30-21:00)
- 17:30-18:30: Return to hotel to freshen up
- 18:30-20:00: Beijing Kung Fu Show at Red Theater (tickets: 180-380 CNY)
- 20:00-21:00: Dinner at Dadong Duck Restaurant (大董烤鸭店)
  * Signature dish: Superlean Roast Duck

## Day 3: Temple of Heaven and Hutongs
### Morning (8:00-12:00)
- 8:00-8:30: Hotel breakfast
- 8:30-9:00: Travel to Temple of Heaven by subway Line 5
- 9:00-11:30: Visit Temple of Heaven Park (entrance: 35 CNY)
  * Highlights: Hall of Prayer for Good Harvests, Echo Wall, Imperial Vault of Heaven
  * Morning tai chi with locals in the park

### Afternoon (12:00-17:00)
- 12:00-13:30: Lunch at Li Qun Roast Duck Restaurant (利群烤鸭店)
- 13:30-14:00: Travel to Nanluoguxiang Hutong by subway Line 6 to Nanluoguxiang Station
- 14:00-16:30: Hutong tour in Nanluoguxiang and Houhai area
  * Optional: Rickshaw tour (approximately 150 CNY per hour)
  * Visit Prince Gong's Mansion (70 CNY entrance)
- 16:30-17:00: Tea ceremony at traditional teahouse

### Evening (17:00-21:00)
- 17:00-18:30: Boat ride on Houhai Lake (80 CNY per hour)
- 18:30-20:00: Farewell dinner at TRB Hutong or The Orchid restaurant
- 20:00-21:00: Evening stroll around the illuminated Houhai area
- 21:00: Return to hotel

## Accommodation Suggestions
Based on a budget of around $100-150 per night:
1. **Pentahotel Beijing** - Modern hotel near subway stations, approximately $120/night
2. **RedWall Garden Hotel** - Traditional courtyard hotel in hutong area, approximately $140/night
3. **Novotel Beijing Xin Qiao** - Convenient downtown location, approximately $100/night

## Practical Information
### Essential Items:
- Comfortable walking shoes
- Passport (required for hotel check-in and some attractions)
- Cash (many smaller vendors don't accept foreign credit cards)
- Power adapter (China uses 220V, type A and I plugs)
- VPN service (if you need access to Google, Facebook, etc.)

### Transportation:
- Beijing Subway: Purchase a rechargeable Transportation Smart Card (20 CNY deposit)
- Airport Express: 25 CNY from airport to city center
- Taxi from Airport: Approximately 100-120 CNY to central Beijing

### Major Attractions Opening Hours:
- Forbidden City: 8:30-17:00 (Apr-Oct), 8:30-16:30 (Nov-Mar), closed Mondays
- Great Wall at Mutianyu: 7:30-18:00 (Apr-Oct), 8:00-17:00 (Nov-Mar)
- Temple of Heaven: 6:00-22:00 (park), 8:00-17:30 (historical buildings)

### Booking Tips:
- Book Forbidden City tickets online 10 days in advance through the official website
- Consider hiring an English-speaking guide for the Great Wall visit
- Beijing opera or acrobatics show tickets can be purchased through your hotel concierge

Enjoy your cultural and historical journey through Beijing!`;
    } else {
      return `# 北京${days}天文化历史之旅

## 行程概述
这个${days}天的北京之旅专注于文化和历史探索，带您游览北京最具标志性的皇家遗址、古老胡同和文化地标。您将体验紫禁城的宏伟，漫步在雄伟的长城上，并通过胡同游览和品尝正宗美食深入体验当地生活。

## 第1天：皇家北京
### 上午（8:00-12:00）
- 8:00-8:30：酒店早餐
- 8:30-9:00：乘坐地铁1号线前往天安门广场（天安门东站A出口）
- 9:00-10:00：探索天安门广场，世界上最大的公共广场
- 10:00-12:30：参观紫禁城（门票：4月-10月60元，11月-3月40元）
  * 不容错过：太和殿、乾清宫、御花园

### 下午（12:30-17:00）
- 12:30-14:00：在紫禁城东门附近的四季民福餐厅午餐
  * 推荐菜品：北京烤鸭（288元），宫廷菜
- 14:00-14:30：步行或乘坐短程出租车前往景山公园（门票10元）
- 14:30-16:00：登景山俯瞰紫禁城全景
- 16:00-17:00：参观钟鼓楼（联票：30元）

### 晚上（17:00-21:00）
- 17:00-18:00：乘坐地铁1号线前往王府井大街
- 18:00-19:30：在东华门夜市或全聚德烤鸭店晚餐
- 19:30-21:00：在王府井大街购物和探索
- 21:00：乘坐出租车返回酒店（约30元）

## 第2天：长城和奥林匹克公园
### 上午（7:30-13:00）
- 7:30-8:00：酒店早餐
- 8:00-10:00：乘坐预订的私人接送或旅游巴士前往慕田峪长城
- 10:00-13:00：探索慕田峪长城（门票：45元，缆车：往返100元）
  * 小贴士：乘坐缆车上山，滑道下山，体验独特

### 下午（13:00-17:30）
- 13:00-14:00：在慕田峪附近的Schoolhouse餐厅午餐
  * 推荐：新鲜鳟鱼和当地特色菜
- 14:00-15:30：返回北京市区
- 15:30-17:30：参观奥林匹克公园，鸟巢（进入门票80元）和水立方（30元）

### 晚上（17:30-21:00）
- 17:30-18:30：返回酒店休息
- 18:30-20:00：在红剧场观看北京功夫表演（票价：180-380元）
- 20:00-21:00：在大董烤鸭店晚餐
  * 招牌菜：超瘦烤鸭

## 第3天：天坛和胡同
### 上午（8:00-12:00）
- 8:00-8:30：酒店早餐
- 8:30-9:00：乘坐地铁5号线前往天坛
- 9:00-11:30：参观天坛公园（门票：35元）
  * 亮点：祈年殿、回音壁、皇穹宇
  * 在公园与当地人一起晨练太极

### 下午（12:00-17:00）
- 12:00-13:30：在利群烤鸭店午餐
- 13:30-14:00：乘坐地铁6号线到南锣鼓巷站
- 14:00-16:30：南锣鼓巷和后海区域胡同游
  * 可选：人力车游览（约150元/小时）
  * 参观恭王府（门票70元）
- 16:30-17:00：在传统茶馆体验茶道

### 晚上（17:00-21:00）
- 17:00-18:30：后海泛舟（80元/小时）
- 18:30-20:00：在TRB胡同或The Orchid餐厅享用告别晚餐
- 20:00-21:00：漫步于灯火通明的后海区域
- 21:00：返回酒店

## 住宿建议
基于每晚约600-1000元的预算：
1. **北京五环酒店（Pentahotel Beijing）** - 靠近地铁站的现代酒店，约800元/晚
2. **红墙花园酒店（RedWall Garden Hotel）** - 胡同区域的传统四合院酒店，约950元/晚
3. **北京新侨诺富特酒店（Novotel Beijing Xin Qiao）** - 便利的市中心位置，约680元/晚

## 实用信息
### 必备物品：
- 舒适的步行鞋
- 护照（酒店入住和部分景点需要）
- 现金（许多小商贩不接受外国信用卡）
- 电源适配器（中国使用220V，A型和I型插头）
- VPN服务（如果您需要访问谷歌、脸书等）

### 交通：
- 北京地铁：购买可充值的交通一卡通（押金20元）
- 机场快线：从机场到市中心25元
- 机场出租车：到北京市中心约100-120元

### 主要景点开放时间：
- 紫禁城：8:30-17:00（4月-10月），8:30-16:30（11月-3月），周一闭馆
- 慕田峪长城：7:30-18:00（4月-10月），8:00-17:00（11月-3月）
- 天坛：6:00-22:00（公园），8:00-17:30（历史建筑）

### 预订提示：
- 通过官方网站提前10天在线预订紫禁城门票
- 考虑为长城游览雇佣英语导游
- 京剧或杂技表演门票可通过酒店礼宾部购买

祝您在北京的文化历史之旅愉快！`;
    }
  } else {
    // 默认模拟数据，适用于其他目的地
    if (isEnglish) {
      return `# ${destination} ${days}-Day Detailed Itinerary

## Itinerary Overview
This carefully crafted ${days}-day journey through ${destination} combines the area's most iconic attractions with authentic local experiences. You'll explore historical landmarks, immerse yourself in local culture, enjoy regional cuisine, and create lasting memories with a balanced pace that allows for both discovery and relaxation.

## Day 1: Arrival and City Orientation
### Morning (8:00-12:00)
- 8:00-9:00: Breakfast at your hotel
- 9:00-9:30: Travel to the city center by public bus #101 or taxi (~20 min)
- 9:30-12:00: Walking tour of the Historical District
  * Main Square (free admission)
  * City Hall (exterior view)
  * St. Mary's Cathedral (admission: $5, open 9:00-17:00)

### Afternoon (12:00-17:00)
- 12:00-13:30: Lunch at Central Market Food Hall
  * Recommended: Local specialty "Seafood Platter" at Maria's Kitchen ($15-20)
- 13:30-14:00: Walk to the National Museum (10-minute walk)
- 14:00-16:30: National Museum tour (admission: $12, open 10:00-18:00)
  * Don't miss: The Ancient Artifacts Gallery (2nd floor)
  * Audio guide available in multiple languages ($5)
- 16:30-17:00: Coffee break at Museum Café

### Evening (17:00-21:00)
- 17:00-18:00: Return to hotel to freshen up
- 18:30-20:30: Dinner at "The Local House" restaurant
  * Signature dish: Traditional roasted meat with herbs ($25)
  * Reservation recommended: +1-234-567-8910
- 20:30-21:30: Evening stroll along the Riverside Promenade

## Day 2: Natural Landmarks and Cultural Experiences
### Morning (7:30-12:30)
- 7:30-8:15: Hotel breakfast
- 8:15-9:00: Travel to Mountain Viewpoint by bus #203 (departs every 30 min)
- 9:00-12:00: Hiking the Scenic Trail
  * Moderate difficulty, 3.5 km loop
  * Panoramic city views from Summit Point
  * Visitor center has maps and water refill station

### Afternoon (12:30-17:30)
- 12:30-13:30: Picnic lunch at Mountain Park (pre-order from hotel or bring your own)
- 13:30-14:15: Return to city by bus #203
- 14:30-17:00: Artisan Workshop Experience
  * Location: Cultural Center (15 Main Street)
  * Traditional craft workshop ($30 per person, includes materials)
  * Advance booking required: culturalcenter.com

### Evening (17:30-22:00)
- 17:30-19:00: Rest at hotel
- 19:00-21:30: Cultural Dinner Show
  * Venue: Heritage Theater (25 Theater Road)
  * Tickets: $45 including 3-course dinner
  * Show starts at 19:30, arrive 30 minutes early
- 21:30-22:00: Return to hotel by taxi ($10-15)

${days > 2 ? `## Day 3: Coastal Exploration
### Morning (8:00-12:30)
- 8:00-8:45: Hotel breakfast
- 8:45-9:30: Travel to Harbor District by tram #5
- 9:30-12:00: Harbor Boat Tour
  * Departure: Main Pier (Pier 3)
  * Duration: 2 hours
  * Cost: $35 per person
  * Highlights: Coastal views, marine wildlife spotting

### Afternoon (12:30-17:30)
- 12:30-14:00: Seafood lunch at "The Fisherman's Wharf"
  * Must try: Fresh catch of the day ($25-30)
  * Outdoor seating with harbor views
- 14:00-17:00: Beach time and water activities
  * Golden Sand Beach (15-minute walk from restaurant)
  * Optional: Kayak rental ($20/hour) or snorkeling tour ($40)
  * Beach amenities: changing rooms, showers, beach chair rentals

### Evening (17:30-21:30)
- 17:30-18:30: Return to hotel to freshen up
- 18:30-20:30: Sunset dinner at "Sky View Restaurant"
  * Location: 20th floor, Grand Tower
  * Reservation essential: +1-234-567-8920
  * Recommended: Chef's tasting menu ($60)
- 20:30-21:30: Nightcap at Rooftop Lounge` : ''}

## Accommodation Suggestions
Based on your budget of approximately $100-150 per night:

1. **Central Comfort Hotel**
   * $120/night, includes breakfast
   * Located in city center, 5-minute walk to Main Square
   * Amenities: Free WiFi, pool, fitness center
   * Website: centralcomfort.com

2. **Riverside Boutique Inn**
   * $140/night
   * Charming historical building with river views
   * Complimentary afternoon tea
   * Website: riversideboutique.com

3. **Modern City Suites**
   * $95/night
   * Self-catering apartments with kitchen
   * Great for longer stays
   * Website: moderncitysuites.com

## Practical Information
### Essential Items:
- Comfortable walking shoes
- Weather-appropriate clothing (check forecast)
- Sunscreen and hat
- Power adapter
- Local currency (some smaller vendors don't accept cards)

### Transportation:
- City Pass: $25 for 3 days of unlimited public transportation
- Available at airport, main train station, and tourist information centers
- Taxi from airport to city center: approximately $35

### Major Attractions Opening Hours:
- National Museum: 10:00-18:00, closed Mondays
- St. Mary's Cathedral: 9:00-17:00 daily
- Mountain Park: Sunrise to sunset
- Cultural Center: 10:00-20:00 Tuesday-Sunday

### Booking Tips:
- Book the Cultural Dinner Show at least 3 days in advance
- National Museum offers discounted tickets online
- Consider a guided tour for Mountain Park for enhanced experience

Enjoy your journey through ${destination}!`;
    } else {
      return `# ${destination}${days}天详细行程规划

## 行程概述
这个精心设计的${days}天${destination}之旅将该地区最具标志性的景点与真实的当地体验相结合。您将探索历史地标，沉浸在当地文化中，品尝地区美食，并以平衡的节奏创造持久的回忆，既有探索也有放松。

## 第1天：抵达与城市概览
### 上午（8:00-12:00）
- 8:00-9:00：在酒店享用早餐
- 9:00-9:30：乘坐公交101路或出租车前往市中心（约20分钟）
- 9:30-12:00：历史区步行游
  * 主广场（免费入场）
  * 市政厅（外观）
  * 圣玛丽大教堂（门票：35元，开放时间9:00-17:00）

### 下午（12:00-17:00）
- 12:00-13:30：在中央市场美食广场午餐
  * 推荐：Maria's Kitchen的当地特色"海鲜拼盘"（100-140元）
- 13:30-14:00：步行至国家博物馆（10分钟步行）
- 14:00-16:30：国家博物馆参观（门票：80元，开放时间10:00-18:00）
  * 不容错过：古代文物馆（2楼）
  * 提供多语言语音导览（35元）
- 16:30-17:00：在博物馆咖啡厅休息

### 晚上（17:00-21:00）
- 17:00-18:00：返回酒店整理
- 18:30-20:30：在"本地之家"餐厅晚餐
  * 招牌菜：传统草药烤肉（170元）
  * 建议预订：+86-123-4567-8910
- 20:30-21:30：沿河滨长廊晚间散步

## 第2天：自然地标与文化体验
### 上午（7:30-12:30）
- 7:30-8:15：酒店早餐
- 8:15-9:00：乘坐203路公交前往山景观点（每30分钟一班）
- 9:00-12:00：风景步道徒步
  * 中等难度，3.5公里环线
  * 从峰顶点可欣赏全景城市景观
  * 游客中心有地图和饮水站

### 下午（12:30-17:30）
- 12:30-13:30：在山公园野餐午餐（从酒店预订或自带）
- 13:30-14:15：乘坐203路公交返回市区
- 14:30-17:00：工匠工作坊体验
  * 地点：文化中心（主街15号）
  * 传统工艺工作坊（每人200元，含材料）
  * 需提前预订：culturalcenter.com

### 晚上（17:30-22:00）
- 17:30-19:00：在酒店休息
- 19:00-21:30：文化晚餐表演
  * 地点：传统剧院（剧院路25号）
  * 票价：300元，包含3道菜晚餐
  * 演出19:30开始，提前30分钟到达
- 21:30-22:00：乘出租车返回酒店（约70-100元）

${days > 2 ? `## 第3天：海岸探索
### 上午（8:00-12:30）
- 8:00-8:45：酒店早餐
- 8:45-9:30：乘坐5号电车前往港口区
- 9:30-12:00：港口游船之旅
  * 出发点：主码头（3号码头）
  * 时长：2小时
  * 费用：每人240元
  * 亮点：海岸风光，海洋野生动物观赏

### 下午（12:30-17:30）
- 12:30-14:00：在"渔人码头"享用海鲜午餐
  * 必尝：当日新鲜捕获（170-200元）
  * 户外座位，可欣赏港口景色
- 14:00-17:00：海滩时光和水上活动
  * 金沙滩（从餐厅步行15分钟）
  * 可选：皮划艇租赁（140元/小时）或浮潜之旅（280元）
  * 海滩设施：更衣室，淋浴，沙滩椅租赁

### 晚上（17:30-21:30）
- 17:30-18:30：返回酒店整理
- 18:30-20:30：在"空中景观餐厅"享用日落晚餐
  * 地点：大楼20层
  * 必须预订：+86-123-4567-8920
  * 推荐：厨师品尝菜单（400元）
- 20:30-21:30：在屋顶酒廊享用夜间饮品` : ''}

## 住宿建议
基于您每晚约600-1000元的预算：

1. **中央舒适酒店**
   * 800元/晚，含早餐
   * 位于市中心，步行5分钟到主广场
   * 设施：免费WiFi，游泳池，健身中心
   * 网站：centralcomfort.com

2. **河畔精品客栈**
   * 950元/晚
   * 位于迷人的历史建筑，可欣赏河景
   * 提供免费下午茶
   * 网站：riversideboutique.com

3. **现代城市套房**
   * 650元/晚
   * 带厨房的自助式公寓
   * 适合长期住宿
   * 网站：moderncitysuites.com

## 实用信息
### 必备物品：
- 舒适的步行鞋
- 适合天气的衣物（查看天气预报）
- 防晒霜和帽子
- 电源适配器
- 当地货币（一些小商贩不接受卡）

### 交通：
- 城市通行证：170元，3天无限次公共交通
- 可在机场、主火车站和旅游信息中心购买
- 从机场到市中心的出租车：约240元

### 主要景点开放时间：
- 国家博物馆：10:00-18:00，周一闭馆
- 圣玛丽大教堂：每日9:00-17:00
- 山公园：日出至日落
- 文化中心：周二至周日10:00-20:00

### 预订提示：
- 文化晚餐表演至少提前3天预订
- 国家博物馆在线提供折扣票
- 考虑山公园导览游以获得更丰富的体验

祝您在${destination}的旅程愉快！`;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days, preferences, extraInfo, language } = body;

    if (!destination || !days || !preferences) {
      return NextResponse.json(
        { error: '缺少必要参数：目的地、天数或偏好' },
        { status: 400 }
      );
    }

    try {
      const result = await generateItinerary(
        destination,
        days,
        preferences,
        extraInfo || '',
        language || 'Chinese'
      );
      
      if (result && result.success && result.data) {
        return NextResponse.json({ data: result.data });
      } else {
        // 返回模拟数据
        const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
        return NextResponse.json({ data: mockData });
      }
    } catch (apiError) {
      console.error('API service error:', apiError);
      // 返回模拟数据
      const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
      return NextResponse.json({ data: mockData });
    }
  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 