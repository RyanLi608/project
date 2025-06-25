import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/api/deepseek';

// 移除edge runtime配置
// export const runtime = 'edge'; // 添加运行时配置

// 添加模拟数据生成函数
function generateMockItinerary(destination: string, days: number, preferences: string[], language: string = 'Chinese') {
  const isEnglish = language.toLowerCase().includes('english');
  
  // 北京行程
  if (destination === '北京' || destination.toLowerCase().includes('beijing')) {
    if (isEnglish) {
      return `# Beijing ${days}-Day Cultural History Tour

## Itinerary Overview
This ${days}-day Beijing journey focuses on cultural and historical exploration, taking you through the city's most iconic imperial sites, ancient alleyways, and cultural landmarks. You'll experience the grandeur of the Forbidden City, walk along the majestic Great Wall, and immerse yourself in local life through hutong tours and authentic cuisine. This carefully planned itinerary balances must-see attractions with authentic local experiences, allowing you to truly appreciate Beijing's 3,000-year history.

## Day 1: Imperial Beijing
### Morning (8:00-12:00)
- 8:00-8:30: Hotel breakfast
- 8:30-9:00: Travel to Tiananmen Square by subway Line 1 (Exit A at Tiananmen East Station, ¥3)
- 9:00-10:00: Explore Tiananmen Square, the world's largest public square
  * Don't miss: The daily flag-raising ceremony if you start early (times vary seasonally)
  * Photo opportunity: The Monument to the People's Heroes at the center of the square
- 10:00-12:30: Visit the Forbidden City (entrance fee: ¥60 Apr-Oct, ¥40 Nov-Mar)
  * Must-see: Hall of Supreme Harmony, Palace of Heavenly Purity, Imperial Garden
  * Insider tip: Rent an audio guide (¥40) or download the Palace Museum app for detailed explanations

### Afternoon (12:30-17:00)
- 12:30-14:00: Lunch at Siji Minfu Restaurant near the east gate of the Forbidden City (5 Dengshikou West Street)
  * Recommended dishes: Peking Duck (¥288), Imperial Court dishes (¥88-168), Kung Pao Chicken (¥68)
  * Reservation recommended: +86-10-65259288
- 14:00-14:30: Walk or take a short taxi (about ¥15) to Jingshan Park (¥10 entrance)
- 14:30-16:00: Climb Jingshan Hill for panoramic views of the Forbidden City
  * Best photo spot: The pavilion at the highest point for a complete view of the Forbidden City
- 16:00-17:00: Visit the Drum and Bell Towers (combined ticket: ¥30)
  * Experience: Catch the drum performance at the Drum Tower (performances at 09:30, 10:30, 11:30, 13:30, 14:30, 15:30, 16:30)

### Evening (17:00-21:00)
- 17:00-18:00: Travel to Wangfujing Street by subway Line 1 (¥3)
- 18:00-19:30: Dinner at Donghuamen Night Market or Quanjude Roast Duck Restaurant (Wangfujing Branch)
  * At Quanjude: Signature roast duck (¥298 for whole duck, serves 2-3 people)
  * Duck comes with traditional accompaniments and demonstration of carving technique
- 19:30-21:00: Shopping and exploring Wangfujing Street
  * Visit: Beijing Foreign Languages Bookstore and traditional Chinese goods at Wuyutai Tea Shop
- 21:00: Return to hotel by taxi (approximately ¥30)

## Day 2: The Great Wall and Olympic Park
### Morning (7:30-13:00)
- 7:30-8:00: Hotel breakfast
- 8:00-10:00: Travel to Mutianyu Great Wall by pre-booked private transfer (¥400 round trip) or tour bus (¥150)
  * Booking tip: Ask your hotel concierge to arrange transportation or book through Klook/GetYourGuide
- 10:00-13:00: Explore Mutianyu Great Wall (entrance: ¥45, cable car: ¥100 round trip or ¥80 up + ¥80 toboggan down)
  * Must-visit sections: Watchtowers 14-23 offer the best views and photo opportunities
  * Insider tip: Take the cable car up and toboggan down for a unique experience
  * Difficulty level: Moderate, wear comfortable shoes and bring water

### Afternoon (13:00-17:30)
- 13:00-14:00: Lunch at the Schoolhouse Restaurant near Mutianyu (Huairou District)
  * Recommended: Fresh rainbow trout (¥128), homemade pizza (¥88), and local specialties (¥60-120)
  * Setting: Converted schoolhouse with garden seating and Great Wall views
- 14:00-15:30: Return to Beijing city
- 15:30-17:30: Visit the Olympic Park, see the Bird's Nest (¥80 to enter) and Water Cube (¥30)
  * Photo opportunity: The Olympic Torch and the five Olympic rings
  * Evening light show starts at 19:00 (April-October)

### Evening (17:30-21:00)
- 17:30-18:30: Return to hotel to freshen up (subway Line 8 from Olympic Park to your area, ¥3-5)
- 18:30-20:00: Beijing Kung Fu Show at Red Theater (tickets: ¥180-380)
  * Address: 44 Xingfu Street, Dongcheng District
  * Booking tip: Book 2-3 days in advance through your hotel or online
- 20:00-21:00: Dinner at Dadong Duck Restaurant (Dongsi 10th Alley Branch)
  * Signature dish: Superlean Roast Duck (¥298 per duck)
  * Other specialties: Crispy duck skin with sugar (¥28), duck soup (¥38)
  * Reservation essential: +86-10-65822892

## Day 3: Temple of Heaven and Hutongs
### Morning (8:00-12:00)
- 8:00-8:30: Hotel breakfast
- 8:30-9:00: Travel to Temple of Heaven by subway Line 5 (Tiantandongmen Station, Exit A, ¥3)
- 9:00-11:30: Visit Temple of Heaven Park (entrance: ¥35 for all inclusive ticket)
  * Highlights: Hall of Prayer for Good Harvests, Echo Wall, Imperial Vault of Heaven
  * Morning tai chi with locals in the park (east side, 8:00-9:30)
  * Photography tip: The triple-gabled Hall of Prayer is most photogenic in morning light

### Afternoon (12:00-17:00)
- 12:00-13:30: Lunch at Li Qun Roast Duck Restaurant (11 Beixiangfeng Hutong, Zhengyi Road)
  * A hidden gem with authentic Beijing duck (¥198 per duck)
  * Side dishes: Sweet bean sauce pancakes (¥15), duck liver (¥38)
- 13:30-14:00: Travel to Nanluoguxiang Hutong by subway Line 6 to Nanluoguxiang Station
- 14:00-16:30: Hutong tour in Nanluoguxiang and Houhai area
  * Optional: Rickshaw tour (approximately ¥150 per hour)
  * Visit Prince Gong's Mansion (¥70 entrance)
  * Shopping: Traditional crafts and modern designs in boutique shops
  * Experience: Try traditional snacks like tanghulu (candied fruit, ¥10) and yogurt (¥5)
- 16:30-17:00: Tea ceremony at traditional teahouse (Wuhao Teahouse recommended, ¥100-150 per person)
  * Learn about different Chinese tea varieties and proper brewing techniques

### Evening (17:00-21:00)
- 17:00-18:30: Boat ride on Houhai Lake (¥80 per hour)
  * Best time: Sunset for beautiful lighting on the water
- 18:30-20:00: Farewell dinner at TRB Hutong (23 Songzhusi Temple, Shatan Beijie) or The Orchid restaurant
  * TRB Hutong: Fine dining in a restored temple setting (set menu ¥428-688)
  * The Orchid: Fusion cuisine in boutique hotel (¥200-300 per person)
  * Reservation required 2-3 days in advance
- 20:00-21:00: Evening stroll around the illuminated Houhai area
  * Visit: Houhai Bar Street for live music and lakeside ambiance
- 21:00: Return to hotel by taxi (approximately ¥30-40)

## Accommodation Suggestions
Based on a budget of around ¥600-1000 per night:

1. **Pentahotel Beijing**
   * Price: ¥650-850/night
   * Location: East 2nd Ring Road, near Chongwenmen subway station
   * Features: Modern design, 24-hour gym, games room, restaurant and bar
   * Advantages: Walking distance to Wangfujing, easy subway access to major attractions
   * Website: www.pentahotels.com/beijing

2. **RedWall Garden Hotel**
   * Price: ¥880-1200/night
   * Location: 41 Shijia Hutong, Dongcheng District
   * Features: Traditional courtyard hotel in quiet hutong area, Chinese garden
   * Advantages: Authentic Beijing experience, walking distance to Forbidden City
   * Website: www.redwall-garden-hotel-beijing.com

3. **Novotel Beijing Xin Qiao**
   * Price: ¥550-750/night
   * Location: 1 Chongwenmen West Street
   * Features: International brand hotel, multiple restaurants, business center
   * Advantages: Convenient downtown location, subway access, shopping nearby
   * Website: www.accorhotels.com/beijing-xinqiao

## Practical Information
### Essential Items:
- Comfortable walking shoes (especially for Great Wall and hutong exploration)
- Passport (required for hotel check-in and some attractions)
- Cash (many smaller vendors don't accept foreign credit cards)
- Power adapter (China uses 220V, type A and I plugs)
- VPN service (if you need access to Google, Facebook, etc.)
- Pollution mask (check air quality index before your trip)
- Hand sanitizer and tissues (public restrooms may not provide)

### Transportation:
- Beijing Subway: Purchase a rechargeable Transportation Smart Card (¥20 deposit + amount you add)
- Airport Express: ¥25 from airport to city center (runs 6:30-22:30)
- Taxi from Airport: Approximately ¥100-120 to central Beijing (30-45 minutes)
- DiDi app: China's equivalent to Uber, English version available
- Subway operating hours: 5:00-23:00 (varies by line)

### Major Attractions Opening Hours:
- Forbidden City: 8:30-17:00 (Apr-Oct), 8:30-16:30 (Nov-Mar), closed Mondays
- Great Wall at Mutianyu: 7:30-18:00 (Apr-Oct), 8:00-17:00 (Nov-Mar)
- Temple of Heaven: 6:00-22:00 (park), 8:00-17:30 (historical buildings)
- Prince Gong's Mansion: 8:30-17:00, last entry 16:30

### Booking Tips:
- Book Forbidden City tickets online 10 days in advance through the official website (avoid scalpers)
- Consider hiring an English-speaking guide for the Great Wall visit (¥400-600 per day)
- Beijing opera or acrobatics show tickets can be purchased through your hotel concierge
- Most museums are closed on Mondays for maintenance

### Emergency Information:
- Tourist Police: 110 (English service available)
- Medical Emergency: 120
- International SOS Beijing Clinic: +86-10-64629112 (24-hour service with English-speaking staff)
- Beijing United Family Hospital: +86-10-59277000 (Western-standard medical care)

### Weather Tips:
- Spring (Mar-May): 10-25°C, occasional sandstorms, light jacket recommended
- Summer (Jun-Aug): 25-35°C, humid with afternoon thunderstorms, light clothing and umbrella
- Autumn (Sep-Nov): 15-25°C, clear skies, light layers recommended
- Winter (Dec-Feb): -5-5°C, dry and cold, heavy coat, gloves and hat essential

Enjoy your cultural and historical journey through Beijing!`;
    } else {
      return `# 北京${days}天文化历史之旅

## 行程概述
这个${days}天的北京之旅专注于文化和历史探索，带您游览北京最具标志性的皇家遗址、古老胡同和文化地标。您将体验紫禁城的宏伟，漫步在雄伟的长城上，并通过胡同游览和品尝正宗美食深入体验当地生活。此精心规划的行程平衡了必游景点与地道体验，让您真正领略北京3000年的历史底蕴和现代魅力。

## 第1天：皇家北京
### 上午（8:00-12:00）
- 8:00-8:30：酒店早餐
- 8:30-9:00：乘坐地铁1号线前往天安门广场（天安门东站A出口，票价3元）
- 9:00-10:00：探索天安门广场，世界上最大的公共广场
  * 不容错过：如果您早起，可以观看升旗仪式（时间随季节变化）
  * 摄影点：广场中心的人民英雄纪念碑
- 10:00-12:30：参观紫禁城（门票：4月-10月60元，11月-3月40元）
  * 必看景点：太和殿、乾清宫、御花园
  * 内部提示：租用语音导览器（40元）或下载故宫博物院APP获取详细解说

### 下午（12:30-17:00）
- 12:30-14:00：在紫禁城东门附近的四季民福餐厅午餐（地址：灯市口西街5号）
  * 推荐菜品：北京烤鸭（288元），宫廷菜（88-168元），宫保鸡丁（68元）
  * 建议提前预订：010-65259288
- 14:00-14:30：步行或乘坐短程出租车（约15元）前往景山公园（门票10元）
- 14:30-16:00：登景山俯瞰紫禁城全景
  * 最佳拍摄点：最高处的亭子，可以完整俯瞰紫禁城布局
- 16:00-17:00：参观钟鼓楼（联票：30元）
  * 体验：欣赏鼓楼的击鼓表演（表演时间：09:30、10:30、11:30、13:30、14:30、15:30、16:30）

### 晚上（17:00-21:00）
- 17:00-18:00：乘坐地铁1号线前往王府井大街（票价3元）
- 18:00-19:30：在东华门夜市或全聚德烤鸭店（王府井店）晚餐
  * 全聚德特色：招牌烤鸭（298元/只，可供2-3人享用）
  * 包含传统配菜和现场片鸭表演
- 19:30-21:00：在王府井大街购物和探索
  * 推荐：北京外文书店和吴裕泰茶叶店购买传统中国商品
- 21:00：乘坐出租车返回酒店（约30元）

## 第2天：长城和奥林匹克公园
### 上午（7:30-13:00）
- 7:30-8:00：酒店早餐
- 8:00-10:00：Travel to Mutianyu Great Wall by pre-booked private transfer (¥400 round trip) or tour bus (¥150)
  * Booking tip: Ask your hotel concierge to arrange transportation or book through Klook/GetYourGuide
- 10:00-13:00：Explore Mutianyu Great Wall (entrance: ¥45, cable car: ¥100 round trip or ¥80 up + ¥80 toboggan down)
  * Must-visit sections: Watchtowers 14-23 offer the best views and photo opportunities
  * Insider tip: Take the cable car up and toboggan down for a unique experience
  * Difficulty level: Moderate, wear comfortable shoes and bring water

### Afternoon (13:00-17:30)
- 13:00-14:00：在慕田峪附近的Schoolhouse餐厅午餐（怀柔区）
  * 推荐：新鲜虹鳟鱼（128元），自制披萨（88元），当地特色菜（60-120元）
  * 环境：改建的学校，有花园座位和长城景观
- 14:00-15:30：返回北京市区
- 15:30-17:30：参观奥林匹克公园，鸟巢（进入门票80元）和水立方（30元）
  * 拍照机会：奥运火炬和五环标志
  * 晚间灯光秀从19:00开始（4月-10月）

### Evening (17:30-21:00)
- 17:30-18:30：返回酒店休息（从奥林匹克公园乘坐地铁8号线，票价3-5元）
- 18:30-20:00：在红剧场观看北京功夫表演（票价：180-380元）
  * 地址：东城区幸福街44号
  * 预订提示：提前2-3天通过酒店或在线预订
- 20:00-21:00：在大董烤鸭店（东四十条店）晚餐
  * 招牌菜：超瘦烤鸭（298元/只）
  * 其他特色：香酥鸭皮蘸白糖（28元），鸭汤（38元）
  * 必须预订：010-65822892

## 第3天：天坛和胡同
### 上午（8:00-12:00）
- 8:00-8:30：酒店早餐
- 8:30-9:00：乘坐地铁5号线前往天坛（天坛东门站A出口，票价3元）
- 9:00-11:30：参观天坛公园（门票：35元全包票）
  * 亮点：祈年殿、回音壁、皇穹宇
  * 在公园东侧与当地人一起晨练太极（8:00-9:30）
  * 摄影提示：三重檐的祈年殿在晨光中最为上镜

### Afternoon (12:00-17:00)
- 12:00-13:30：在利群烤鸭店午餐（北翔凤胡同11号，正义路）
  * 地道北京烤鸭老店（198元/只）
  * 配菜：甜面酱饼（15元），鸭肝（38元）
- 13:30-14:00：乘坐地铁6号线到南锣鼓巷站
- 14:00-16:30：南锣鼓巷和后海区域胡同游
  * 可选：人力车游览（约150元/小时）
  * 参观恭王府（门票70元）
  * 购物：在精品店购买传统工艺品和现代设计产品
  * 体验：品尝传统小吃如糖葫芦（10元）和酸奶（5元）
- 16:30-17:00：在传统茶馆体验茶道（推荐吾好茶馆，100-150元/人）
  * 了解不同中国茶叶品种和正确的冲泡技巧

### Evening (17:00-21:00)
- 17:00-18:30：后海泛舟（80元/小时）
  * 最佳时间：日落时分，水面上的光线最美
- 18:30-20:00：在TRB胡同（地址：什刹海前街23号嵩祝寺）或The Orchid餐厅享用告别晚餐
  * TRB胡同：在修复的寺庙环境中享用精致餐点（套餐428-688元）
  * The Orchid：精品酒店中的融合料理（200-300元/人）
  * 需提前2-3天预订
- 20:00-21:00：漫步于灯火通明的后海区域
  * 推荐：后海酒吧街，欣赏现场音乐和湖边氛围
- 21:00：乘出租车返回酒店（约30-40元）

## 住宿建议
基于每晚约600-1000元的预算：

1. **北京五环酒店（Pentahotel Beijing）**
   * 价格：650-850元/晚
   * 位置：东二环路，靠近崇文门地铁站
   * 特点：现代设计，24小时健身房，游戏室，餐厅和酒吧
   * 优势：步行可达王府井，地铁便捷通达主要景点
   * 网站：www.pentahotels.com/beijing

2. **红墙花园酒店（RedWall Garden Hotel）**
   * 价格：880-1200元/晚
   * 位置：东城区史家胡同41号
   * 特点：胡同区域的传统四合院酒店，中式花园
   * 优势：真实北京体验，步行可达故宫
   * 网站：www.redwall-garden-hotel-beijing.com

3. **Novotel Beijing Xin Qiao**
   * Price: ¥550-750/night
   * Location: 1 Chongwenmen West Street
   * Features: International brand hotel, multiple restaurants, business center
   * Advantages: Convenient downtown location, subway access, shopping nearby
   * Website: www.accorhotels.com/beijing-xinqiao

## 实用信息
### 必备物品：
- 舒适的步行鞋（尤其是长城和胡同探索）
- 护照（酒店入住和部分景点需要）
- 现金（许多小商贩不接受外国信用卡）
- 电源适配器（中国使用220V，A型和I型插头）
- VPN服务（如果您需要访问谷歌、脸书等）
- 防霾口罩（出行前查看空气质量指数）
- 洗手液和纸巾（公共卫生间可能不提供）

### 交通：
- Beijing Subway: Purchase a rechargeable Transportation Smart Card (¥20 deposit + amount you add)
- Airport Express: ¥25 from airport to city center (runs 6:30-22:30)
- Taxi from Airport: Approximately ¥100-120 to central Beijing (30-45 minutes)
- DiDi app: China's equivalent to Uber, English version available
- Subway operating hours: 5:00-23:00 (varies by line)

### Major Attractions Opening Hours:
- Forbidden City: 8:30-17:00 (Apr-Oct), 8:30-16:30 (Nov-Mar), closed Mondays
- Great Wall at Mutianyu: 7:30-18:00 (Apr-Oct), 8:00-17:00 (Nov-Mar)
- Temple of Heaven: 6:00-22:00 (park), 8:00-17:30 (historical buildings)
- Prince Gong's Mansion: 8:30-17:00, last entry 16:30

### Booking Tips:
- Book Forbidden City tickets online 10 days in advance through the official website (avoid scalpers)
- Consider hiring an English-speaking guide for the Great Wall visit (¥400-600 per day)
- Beijing opera or acrobatics show tickets can be purchased through your hotel concierge
- Most museums are closed on Mondays for maintenance

### Emergency Information:
- Tourist Police: 110 (English service available)
- Medical Emergency: 120
- International SOS Beijing Clinic: +86-10-64629112 (24-hour service with English-speaking staff)
- Beijing United Family Hospital: +86-10-59277000 (Western-standard medical care)

### Weather Tips:
- Spring (Mar-May): 10-25°C, occasional sandstorms, light jacket recommended
- Summer (Jun-Aug): 25-35°C, humid with afternoon thunderstorms, light clothing and umbrella
- Autumn (Sep-Nov): 15-25°C, clear skies, light layers recommended
- Winter (Dec-Feb): -5-5°C, dry and cold, heavy coat, gloves and hat essential

祝您在北京的文化历史之旅愉快！`;
    }
  } 
  // 曼谷行程
  else if (destination === '曼谷' || destination.toLowerCase().includes('bangkok') || destination.toLowerCase().includes('manggu')) {
    if (isEnglish) {
      return `# Bangkok ${days}-Day Cultural History Tour

## Itinerary Overview
This ${days}-day Bangkok journey focuses on cultural and historical exploration, taking you through the city's most iconic temples, palaces, and cultural landmarks. You'll experience the grandeur of the Grand Palace, explore ancient temples like Wat Pho and Wat Arun, and immerse yourself in local life through markets and authentic cuisine. This carefully planned itinerary balances must-see attractions with authentic local experiences, allowing you to truly appreciate Bangkok's rich cultural heritage.

## Day 1: Historic Bangkok
### Morning (8:00-12:00)
- 8:00-8:30: Hotel breakfast
- 8:30-9:00: Travel to the Grand Palace by taxi or tuk-tuk (approximately 100-150 THB depending on your hotel location)
- 9:00-12:00: Explore the Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha)
  * Entrance fee: 500 THB
  * Must-see: Emerald Buddha, Chakri Maha Prasat Hall, Dusit Maha Prasat Throne Hall
  * Insider tip: Arrive early to avoid crowds and heat; proper dress code required (no shorts, sleeveless shirts)

### Afternoon (12:00-17:00)
- 12:00-13:30: Lunch at Roti-Mataba near Phra Athit Pier
  * Recommended dishes: Mataba (stuffed pancake, 60-80 THB), Thai curries (80-120 THB)
  * Local favorite for over 60 years
- 13:30-14:00: Short walk to Wat Pho (Temple of the Reclining Buddha)
- 14:00-15:30: Visit Wat Pho (entrance fee: 200 THB)
  * Highlight: 46-meter long reclining Buddha covered in gold leaf
  * Don't miss: Traditional Thai massage at the Wat Pho Massage School (400-500 THB for 1 hour)
- 15:30-16:00: Cross the Chao Phraya River by ferry to Wat Arun (ferry cost: 4 THB)
- 16:00-17:00: Explore Wat Arun (Temple of Dawn) (entrance fee: 100 THB)
  * Climb the central prang (tower) for panoramic river views
  * Note the intricate floral mosaics made from Chinese porcelain

### Evening (17:00-21:00)
- 17:00-18:00: Return across the river and travel to Chinatown (Yaowarat)
- 18:00-20:00: Dinner and street food tour in Chinatown
  * Must-try: Seafood at T & K Seafood (300-500 THB per person)
  * Street food options: Oyster omelets (80 THB), grilled squid (100 THB), mango sticky rice (80-100 THB)
- 20:00-21:00: Evening walk through the illuminated streets of Chinatown
- 21:00: Return to hotel by taxi (approximately 100-150 THB)

## Day 2: Cultural Immersion
### Morning (8:00-12:30)
- 8:00-8:30: Hotel breakfast
- 8:30-9:30: Travel to Jim Thompson House by taxi or BTS Skytrain to National Stadium station
- 9:30-11:30: Tour of Jim Thompson House (entrance fee: 200 THB, includes guided tour)
  * Learn about the American businessman who revitalized Thai silk industry
  * Admire his collection of Southeast Asian art and traditional Thai houses
- 11:30-12:30: Visit Bangkok Art and Culture Centre (free admission)
  * Contemporary art exhibitions featuring Thai and international artists
  * Browse the craft shops and art bookstores

### Afternoon (12:30-17:30)
- 12:30-13:30: Lunch at Som Tam Nua in Siam Square
  * Recommended: Papaya salad (80 THB), grilled chicken (120 THB), sticky rice (30 THB)
- 13:30-15:30: Shopping and cultural exploration at Siam Paragon and Siam Discovery
  * Visit Thai Craft Museum on 4th floor of Siam Discovery
  * Shop for high-quality Thai crafts and designer items
- 15:30-17:30: Boat tour through Bangkok's canals (khlongs) (approximately 1,000 THB for a private long-tail boat)
  * Glimpse local life along the waterways
  * Photo opportunities of stilt houses and floating vendors

### Evening (17:30-21:30)
- 17:30-19:00: Return to hotel to freshen up
- 19:00-21:00: Thai cultural performance and dinner at Sala Rim Naam (Mandarin Oriental) or Silom Village
  * Traditional dance performances while enjoying Royal Thai cuisine
  * Price range: 1,500-2,500 THB per person
- 21:00-21:30: Return to hotel

## Day 3: Markets and Local Life
### Morning (7:00-12:00)
- 7:00-8:00: Early breakfast at hotel
- 8:00-9:00: Travel to Damnoen Saduak Floating Market (book a tour or hire a taxi for the day, approximately 2,000-3,000 THB)
- 9:00-11:00: Explore the floating market
  * Take a boat ride through the canals (150-200 THB per person)
  * Shop for souvenirs, fresh fruits, and local snacks
  * Photography tip: Best light and fewer tourists in the early morning
- 11:00-12:00: Return to Bangkok city

### Afternoon (12:00-17:00)
- 12:00-13:30: Lunch at Thipsamai, famous for Pad Thai (100-150 THB)
- 13:30-15:00: Visit the Golden Mount (Wat Saket) (entrance fee: 50 THB)
  * Climb 318 steps for panoramic city views
  * Ring the bells at the top for good luck
- 15:00-17:00: Explore Chatuchak Weekend Market (if visiting on Friday afternoon, Saturday or Sunday)
  * One of the world's largest weekend markets with over 15,000 stalls
  * Shop for clothing, crafts, art, antiques, and souvenirs
  * Alternative (weekdays): Visit MBK Center or Terminal 21 shopping malls

### Evening (17:00-21:00)
- 17:00-18:30: Return to hotel to rest and freshen up
- 18:30-19:00: Travel to Asiatique The Riverfront by taxi or shuttle boat from Sathorn Pier
- 19:00-21:00: Farewell dinner at one of the riverside restaurants
  * Recommended: Baan Khanitha (400-600 THB per person)
  * Try Thai classics like Massaman curry, Tom Yum soup, and mango sticky rice
- 21:00: Optional river cruise or return to hotel

## Accommodation Suggestions
Based on a budget of approximately 2,000-3,000 THB per night:

1. **Centre Point Silom**
   * Price: 2,500-3,000 THB/night
   * Location: Near Chao Phraya River, Saphan Taksin BTS station
   * Features: Rooftop pool, fitness center, spacious rooms with kitchenette
   * Advantages: Easy access to river ferries, BTS Skytrain, and night markets
   * Website: www.centrepoint.com/silom

2. **Shanghai Mansion Bangkok**
   * Price: 2,200-2,800 THB/night
   * Location: Heart of Chinatown (Yaowarat)
   * Features: Boutique hotel with Chinese-inspired decor, jazz bar, spa
   * Advantages: Authentic neighborhood, great for food lovers
   * Website: www.shanghaimansion.com

3. **Amara Bangkok**
   * Price: 2,000-2,500 THB/night
   * Location: Silom business district
   * Features: Rooftop infinity pool, modern design, fitness center
   * Advantages: Walking distance to Patpong Night Market, Silom nightlife
   * Website: www.amarahotels.com/bangkok

## Practical Information
### Essential Items:
- Comfortable, lightweight clothing (Thailand is hot year-round)
- Modest clothing for temple visits (shoulders and knees must be covered)
- Comfortable walking shoes
- Hat, sunglasses, and sunscreen
- Umbrella or raincoat during rainy season (May-October)
- Mosquito repellent
- Small denominations of Thai Baht for street vendors and taxis

### Transportation:
- BTS Skytrain: Fast and convenient for traveling around central Bangkok (20-60 THB per trip)
- MRT Subway: Connects with BTS and reaches areas not served by Skytrain (16-42 THB per trip)
- Taxis: Insist on meter usage (flag fall 35 THB + distance)
- Tuk-tuks: Negotiate price before riding (typically 100-200 THB for short trips)
- Grab app: Thailand's equivalent to Uber, convenient and often cheaper than street taxis
- River boats: Chao Phraya Express Boat (15-40 THB) connects many tourist sites along the river

### Major Attractions Opening Hours:
- Grand Palace and Wat Phra Kaew: 8:30-15:30 daily
- Wat Pho: 8:00-18:30 daily
- Wat Arun: 8:00-18:00 daily
- Jim Thompson House: 9:00-18:00 daily
- Chatuchak Weekend Market: Fri 18:00-24:00, Sat-Sun 9:00-18:00

### Cultural Tips:
- Remove shoes before entering temples and private homes
- Never touch a Thai person's head or point your feet at people or Buddha images
- The Royal Family is highly revered; always show respect when discussing Thai royalty
- Smile and remain calm in all situations - losing your temper is considered very inappropriate
- Tipping is not mandatory but appreciated (10% in restaurants if service charge not included)

### Health and Safety:
- Drink only bottled water
- Use caution with street food - choose busy stalls with high turnover
- Apply mosquito repellent, especially at dawn and dusk
- Tourist Police: 1155 (English-speaking officers)
- Emergency medical service: 1669
- Bumrungrad International Hospital: +66-2-066-8888 (English-speaking staff)

### Weather Information:
- Hot season (March-May): 33-40°C, very humid
- Rainy season (June-October): 25-33°C, afternoon downpours
- Cool season (November-February): 20-32°C, most comfortable time to visit

Enjoy your cultural exploration of Bangkok!`;
    } else {
      return `# 曼谷${days}天文化历史之旅

## 行程概述
这个${days}天的曼谷之旅专注于文化和历史探索，带您游览曼谷最具标志性的寺庙、宫殿和文化地标。您将体验大皇宫的宏伟，探索卧佛寺和黎明寺等古老寺庙，并通过市场和正宗美食深入体验当地生活。此精心规划的行程平衡了必游景点与地道体验，让您真正领略曼谷丰富的文化遗产。

## 第1天：历史曼谷
### 上午（8:00-12:00）
- 8:00-8:30：酒店早餐
- 8:30-9:00：乘坐出租车或嘟嘟车前往大皇宫（根据酒店位置，约100-150泰铢）
- 9:00-12:00：探索大皇宫和玉佛寺（卧佛寺）
  * 门票：500泰铢
  * 必看：玉佛、柴克里玛哈普拉萨宫、都斯特玛哈普拉萨宫
  * 内部提示：早点到达以避开人群和高温；需遵守着装规定（不允许穿短裤、无袖上衣）

### 下午（12:00-17:00）
- 12:00-13:30：在帕亚提码头附近的Roti-Mataba餐厅午餐
  * 推荐菜品：Mataba（馅饼，60-80泰铢），泰式咖喱（80-120泰铢）
  * 当地人喜爱的老店，有60多年历史
- 13:30-14:00：步行前往卧佛寺
- 14:00-15:30：参观卧佛寺（门票：200泰铢）
  * 亮点：46米长的镀金卧佛
  * 不容错过：在卧佛寺按摩学校体验传统泰式按摩（400-500泰铢/小时）
- 15:30-16:00：乘坐渡轮横渡湄南河前往黎明寺（船票：4泰铢）
- 16:00-17:00：探索黎明寺（门票：100泰铢）
  * 攀登中央塔楼，欣赏全景河景
  * 欣赏由中国瓷器制成的精美花卉马赛克

### 晚上（17:00-21:00）
- 17:00-18:00：返回河对岸，前往唐人街（耀华力）
- 18:00-20:00：在唐人街享用晚餐和街头美食之旅
  * 必尝：T & K海鲜餐厅的海鲜（每人300-500泰铢）
  * 街头小吃：蚝煎（80泰铢），烤鱿鱼（100泰铢），芒果糯米饭（80-100泰铢）
- 20:00-21:00：漫步于灯火通明的唐人街
- 21:00：乘出租车返回酒店（约100-150泰铢）

## 第2天：文化沉浸
### 上午（8:00-12:30）
- 8:00-8:30：酒店早餐
- 8:30-9:30：乘出租车或BTS空铁前往吉姆·汤普森之家（National Stadium站）
- 9:30-11:30：参观吉姆·汤普森之家（门票：200泰铢，含导览）
  * 了解这位振兴泰国丝绸产业的美国商人
  * 欣赏他收藏的东南亚艺术品和传统泰式房屋
- 11:30-12:30：参观曼谷艺术文化中心（免费入场）
  * 展示泰国和国际艺术家作品的当代艺术展览
  * 浏览手工艺品商店和艺术书店

### 下午（12:30-17:30）
- 12:30-13:30：在暹罗广场的Som Tam Nua餐厅午餐
  * 推荐：青木瓜沙拉（80泰铢），烤鸡（120泰铢），糯米饭（30泰铢）
- 13:30-15:30：在暹罗百丽宫和暹罗发现中心购物和文化探索
  * 参观暹罗发现中心4楼的泰国工艺博物馆
  * 购买高品质泰国工艺品和设计师商品
- 15:30-17:30：乘船游览曼谷运河（私人长尾船约1,000泰铢）
  * 一瞥水道沿岸的当地生活
  * 高脚屋和水上小贩的拍照机会

### 晚上（17:30-21:30）
- 17:30-19:00：返回酒店休息
- 19:00-21:00：在Sala Rim Naam（文华东方酒店）或Silom Village欣赏泰国文化表演和晚餐
  * 享用皇家泰国美食的同时观看传统舞蹈表演
  * 价格范围：每人1,500-2,500泰铢
- 21:00-21:30：返回酒店

## 第3天：市场和当地生活
### 上午（7:00-12:00）
- 7:00-8:00：酒店早餐
- 8:00-9:00：前往丹嫩沙多水上市场（预订旅游团或包出租车一天，约2,000-3,000泰铢）
- 9:00-11:00：探索水上市场
  * 乘船游览运河（每人150-200泰铢）
  * 购买纪念品、新鲜水果和当地小吃
  * 摄影提示：清晨光线最佳，游客也较少
- 11:00-12:00：返回曼谷市区

### 下午（12:00-17:00）
- 12:00-13:30：在著名的Thipsamai餐厅享用泰式炒河粉午餐（100-150泰铢）
- 13:30-15:00：参观金山寺（Wat Saket）（门票：50泰铢）
  * 攀登318级台阶，欣赏全景城市景观
  * 在顶部敲响铃铛，祈求好运
- 15:00-17:00：探索恰图恰周末市场（如果在周五下午、周六或周日参观）
  * 世界上最大的周末市场之一，拥有15,000多个摊位
  * 购买服装、工艺品、艺术品、古董和纪念品
  * 替代选择（工作日）：参观MBK中心或Terminal 21购物中心

### 晚上（17:00-21:00）
- 17:00-18:30：返回酒店休息
- 18:30-19:00：乘出租车或从沙通码头乘坐接驳船前往Asiatique河滨夜市
- 19:00-21:00：在河畔餐厅享用告别晚餐
  * 推荐：Baan Khanitha（每人400-600泰铢）
  * 尝试泰国经典菜肴，如玛萨曼咖喱、冬阴功汤和芒果糯米饭
- 21:00：可选择夜游湄南河或返回酒店

## 住宿建议
基于每晚约2,000-3,000泰铢的预算：

1. **Centre Point Silom**
   * 价格：2,500-3,000 THB/night
   * 位置：靠近湄南河，Saphan Taksin BTS站
   * 特点：屋顶泳池，健身中心，带小厨房的宽敞客房
   * 优势：方便前往河流渡轮、BTS空铁和夜市
   * 网站：www.centrepoint.com/silom

2. **上海大厦曼谷酒店（Shanghai Mansion Bangkok）**
   * 价格：2,200-2,800泰铢/晚
   * 位置：唐人街（耀华力）中心
   * 特点：中国风格装饰的精品酒店，爵士酒吧，水疗中心
   * 优势：地道的社区氛围，适合美食爱好者
   * 网站：www.shanghaimansion.com

3. **阿玛拉曼谷酒店（Amara Bangkok）**
   * 价格：2,000-2,500泰铢/晚
   * 位置：暹罗商业区
   * 特点：屋顶无边泳池，现代设计，健身中心
   * 优势：步行可达帕蓬夜市，暹罗夜生活区
   * 网站：www.amarahotels.com/bangkok

## 实用信息
### 必备物品：
- 舒适、轻便的衣物（泰国全年炎热）
- 参观寺庙的得体服装（肩膀和膝盖必须遮盖）
- 舒适的步行鞋
- 帽子、太阳镜和防晒霜
- 雨季（5月-10月）期间的雨伞或雨衣
- 驱蚊剂
- 小面额泰铢用于街头小贩和出租车

### 交通：
- BTS空铁：快速便捷的曼谷中心区交通工具（每程20-60泰铢）
- MRT地铁：与BTS连接，到达空铁不覆盖的区域（每程16-42泰铢）
- 出租车：坚持使用计价器（起步价35泰铢+里程费）
- 嘟嘟车：乘坐前协商价格（短途通常100-200泰铢）
- Grab应用：泰国版Uber，方便且通常比街头出租车便宜
- 河船：湄南河快船（15-40泰铢）连接河沿岸的许多旅游景点

### 主要景点开放时间：
- 大皇宫和玉佛寺：每日8:30-15:30
- 卧佛寺：每日8:00-18:30
- 黎明寺：每日8:00-18:00
- 吉姆·汤普森之家：每日9:00-18:00
- 恰图恰周末市场：周五18:00-24:00，周六至周日9:00-18:00

### 文化提示：
- 进入寺庙和私人住宅前脱鞋
- 切勿触摸泰国人的头部或用脚指向人或佛像
- 泰国王室备受尊崇；讨论泰国王室时始终表示尊重
- 在所有情况下保持微笑和冷静 - 发脾气被认为是非常不恰当的
- 小费不是强制性的，但会受到赞赏（如果餐厅未包含服务费，给10%小费）

### 健康与安全：
- 只饮用瓶装水
- 谨慎食用街头小吃 - 选择顾客多、周转率高的摊位
- 使用驱蚊剂，尤其是在黎明和黄昏时分
- 旅游警察：1155（会说英语的警官）
- 紧急医疗服务：1669
- 曼谷国际医院：+66-2-066-8888（英语服务）

### 天气信息：
- 热季（3月-5月）：33-40°C，非常潮湿
- 雨季（6月-10月）：25-33°C，下午暴雨
- 凉季（11月-2月）：20-32°C，最舒适的旅行时间

祝您在曼谷的文化探索之旅愉快！`;
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
### 上午（8:00-12:30）
- 8:00-8:30：酒店早餐
- 8:30-9:30：Travel to Jim Thompson House by taxi or BTS Skytrain to National Stadium station
- 9:30-11:30：Tour of Jim Thompson House (entrance fee: 200 THB, includes guided tour)
  * Learn about the American businessman who revitalized Thai silk industry
  * Admire his collection of Southeast Asian art and traditional Thai houses
- 11:30-12:30: Visit Bangkok Art and Culture Centre (free admission)
  * Contemporary art exhibitions featuring Thai and international artists
  * Browse the craft shops and art bookstores

### Afternoon (12:30-17:30)
- 12:30-13:30: Lunch at Som Tam Nua in Siam Square
  * Recommended: Papaya salad (80 THB), grilled chicken (120 THB), sticky rice (30 THB)
- 13:30-15:30: Shopping and cultural exploration at Siam Paragon and Siam Discovery
  * Visit Thai Craft Museum on 4th floor of Siam Discovery
  * Shop for high-quality Thai crafts and designer items
- 15:30-17:30: Boat tour through Bangkok's canals (khlongs) (approximately 1,000 THB for a private long-tail boat)
  * Glimpse local life along the waterways
  * Photo opportunities of stilt houses and floating vendors

### Evening (17:30-21:30)
- 17:30-19:00: Return to hotel to freshen up
- 19:00-21:00: Thai cultural performance and dinner at Sala Rim Naam (Mandarin Oriental) or Silom Village
  * Traditional dance performances while enjoying Royal Thai cuisine
  * Price range: 1,500-2,500 THB per person
- 21:00-21:30: Return to hotel

## Day 3: Markets and Local Life
### Morning (7:00-12:00)
- 7:00-8:00: Early breakfast at hotel
- 8:00-9:00: Travel to Damnoen Saduak Floating Market (book a tour or hire a taxi for the day, approximately 2,000-3,000 THB)
- 9:00-11:00: Explore the floating market
  * Take a boat ride through the canals (150-200 THB per person)
  * Shop for souvenirs, fresh fruits, and local snacks
  * Photography tip: Best light and fewer tourists in the early morning
- 11:00-12:00: Return to Bangkok city

### Afternoon (12:00-17:00)
- 12:00-13:30：在著名的Thipsamai餐厅享用泰式炒河粉午餐（100-150泰铢）
- 13:30-15:00：参观金山寺（Wat Saket）（门票：50泰铢）
  * 攀登318级台阶，欣赏全景城市景观
  * 在顶部敲响铃铛，祈求好运
- 15:00-17:00：探索恰图恰周末市场（如果在周五下午、周六或周日参观）
  * 世界上最大的周末市场之一，拥有15,000多个摊位
  * 购买服装、工艺品、艺术品、古董和纪念品
  * 替代选择（工作日）：参观MBK中心或Terminal 21购物中心

### Evening (17:00-21:00)
- 17:00-18:30：返回酒店休息
- 18:30-19:00：乘出租车或从沙通码头乘坐接驳船前往Asiatique河滨夜市
- 19:00-21:00：在河畔餐厅享用告别晚餐
  * 推荐：Baan Khanitha（每人400-600泰铢）
  * 尝试泰国经典菜肴，如玛萨曼咖喱、冬阴功汤和芒果糯米饭
- 21:00：可选择夜游湄南河或返回酒店

## 住宿建议
基于每晚约2,000-3,000泰铢的预算：

1. **Centre Point Silom**
   * 价格：2,500-3,000 THB/night
   * 位置：靠近湄南河，Saphan Taksin BTS站
   * 特点：屋顶泳池，健身中心，带小厨房的宽敞客房
   * 优势：方便前往河流渡轮、BTS空铁和夜市
   * 网站：www.centrepoint.com/silom

2. **上海大厦曼谷酒店（Shanghai Mansion Bangkok）**
   * 价格：2,200-2,800泰铢/晚
   * 位置：唐人街（耀华力）中心
   * 特点：中国风格装饰的精品酒店，爵士酒吧，水疗中心
   * 优势：地道的社区氛围，适合美食爱好者
   * 网站：www.shanghaimansion.com

3. **阿玛拉曼谷酒店（Amara Bangkok）**
   * 价格：2,000-2,500泰铢/晚
   * 位置：暹罗商业区
   * 特点：屋顶无边泳池，现代设计，健身中心
   * 优势：步行可达帕蓬夜市，暹罗夜生活区
   * 网站：www.amarahotels.com/bangkok

## 实用信息
### 必备物品：
- 舒适、轻便的衣物（泰国全年炎热）
- 参观寺庙的得体服装（肩膀和膝盖必须遮盖）
- 舒适的步行鞋
- 帽子、太阳镜和防晒霜
- 雨季（5月-10月）期间的雨伞或雨衣
- 驱蚊剂
- 小面额泰铢用于街头小贩和出租车

### 交通：
- BTS空铁：快速便捷的曼谷中心区交通工具（每程20-60泰铢）
- MRT地铁：与BTS连接，到达空铁不覆盖的区域（每程16-42泰铢）
- 出租车：坚持使用计价器（起步价35泰铢+里程费）
- 嘟嘟车：乘坐前协商价格（短途通常100-200泰铢）
- Grab应用：泰国版Uber，方便且通常比街头出租车便宜
- 河船：湄南河快船（15-40泰铢）连接河沿岸的许多旅游景点

### 主要景点开放时间：
- 大皇宫和玉佛寺：每日8:30-15:30
- 卧佛寺：每日8:00-18:30
- 黎明寺：每日8:00-18:00
- 吉姆·汤普森之家：每日9:00-18:00
- 恰图恰周末市场：周五18:00-24:00，周六至周日9:00-18:00

### 文化提示：
- 进入寺庙和私人住宅前脱鞋
- 切勿触摸泰国人的头部或用脚指向人或佛像
- 泰国王室备受尊崇；讨论泰国王室时始终表示尊重
- 在所有情况下保持微笑和冷静 - 发脾气被认为是非常不恰当的
- 小费不是强制性的，但会受到赞赏（如果餐厅未包含服务费，给10%小费）

### 健康与安全：
- 只饮用瓶装水
- 谨慎食用街头小吃 - 选择顾客多、周转率高的摊位
- 使用驱蚊剂，尤其是在黎明和黄昏时分
- 旅游警察：1155（会说英语的警官）
- 紧急医疗服务：1669
- 曼谷国际医院：+66-2-066-8888（英语服务）

### 天气信息：
- 热季（3月-5月）：33-40°C，非常潮湿
- 雨季（6月-10月）：25-33°C，下午暴雨
- 凉季（11月-2月）：20-32°C，最舒适的旅行时间

祝您在曼谷的文化探索之旅愉快！`;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, days, preferences, extraInfo, language } = body;

    console.log('收到行程生成请求:', {
      destination,
      days,
      preferences,
      language,
      extraInfoLength: extraInfo?.length || 0
    });

    if (!destination || !days || !preferences) {
      console.error('请求参数不完整');
      return NextResponse.json(
        { error: '缺少必要参数：目的地、天数或偏好' },
        { status: 400 }
      );
    }

    try {
      console.log('调用generateItinerary函数...');
      const result = await generateItinerary(
        destination,
        days,
        preferences,
        extraInfo || '',
        language || 'Chinese'
      );
      
      console.log('generateItinerary结果:', {
        success: result?.success,
        hasData: !!result?.data,
        error: result?.error
      });
      
      if (result && result.success && result.data) {
        console.log('成功生成行程，返回数据');
        return NextResponse.json({ data: result.data });
      } else {
        // 如果API调用失败，但错误是API密钥相关的，使用模拟数据
        if (result?.error && (result.error.includes('API key') || result.error.includes('401') || result.error.includes('authentication'))) {
          console.log('API密钥错误，使用模拟数据');
          // 使用模拟数据
          const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
          return NextResponse.json({ data: mockData });
        }
        
        // 其他错误直接返回错误信息
        console.error('生成行程失败:', result?.error);
        return NextResponse.json(
          { error: result?.error || '生成行程失败' },
          { status: 500 }
        );
      }
    } catch (apiError: any) {
      console.error('API service error:', apiError);
      
      // 检查是否是API密钥相关错误
      const errorMessage = apiError.message || '';
      if (errorMessage.includes('API key') || errorMessage.includes('401') || errorMessage.includes('authentication')) {
        console.log('API密钥错误，使用模拟数据');
        // 使用模拟数据
        const mockData = generateMockItinerary(destination, days, preferences, language || 'Chinese');
        return NextResponse.json({ data: mockData });
      }
      
      // 其他错误返回错误信息
      return NextResponse.json(
        { error: `生成行程时发生服务错误: ${errorMessage || '未知错误'}` },
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