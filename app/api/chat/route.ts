import { NextRequest, NextResponse } from 'next/server';
import { getCurrentConfig } from '@/lib/api/deepseek';

// 定义类型
interface QuestionAnswers {
  [key: string]: string;
}

interface LandmarkQA {
  "great-wall": QuestionAnswers;
  "eiffel-tower": QuestionAnswers;
  "default": QuestionAnswers;
}

interface LanguageQA {
  Chinese: LandmarkQA;
  English: LandmarkQA;
}

// 模拟数据库：常见问题及其答案
const qaDatabase: LanguageQA = {
  "Chinese": {
    "great-wall": {
      "哪里打卡比较好": "八达岭长城是最受欢迎的景点，设施完善且交通便利；慕田峪长城风景优美，人相对较少；金山岭长城保存完好，风景壮观；司马台长城有夜游项目，可以欣赏夜景。根据您的体力和时间，建议选择八达岭或慕田峪。",
      "长城多长": "长城全长超过21,000公里，横跨中国北部多个省份，包括北京、河北、天津、山西、陕西、内蒙古、甘肃、宁夏、辽宁、吉林等地。它是世界上最长的人工建筑物。",
      "历史": "长城的历史可以追溯到公元前7世纪的春秋战国时期，当时各国为了防御外敌入侵修建了各自的城墙。秦朝统一中国后，秦始皇连接并加固了北方的城墙，形成了第一版统一的长城。现在我们看到的大部分长城是明朝时期（1368-1644年）修建的，目的是防御北方游牧民族的入侵。",
      "建筑特点": "长城的建筑特点包括城墙、敌楼、烽火台和关隘等多种防御设施。墙体宽度通常在4-5米之间，高度为5-8米，由石块、砖块和夯土构成。长城因地制宜，根据地形特点采用不同的建筑方法，有的依山而建，有的跨越峡谷。砖石结构与当地自然环境完美融合，展示了古代建筑师的智慧。",
      "最佳时间": "参观长城的最佳时间是春季（4-5月）和秋季（9-10月），这时候天气宜人，风景优美。春季可以看到山花烂漫，秋季则有红叶点缀。夏季（6-8月）气温较高且游客众多，冬季（11-2月）则寒冷但有雪景。建议避开中国的法定假日如国庆节、春节等，那时游客特别多。",
      "好玩": "长城绝对值得一游！作为世界七大奇迹之一，它不仅有着壮观的历史和建筑价值，还能让您领略到令人惊叹的自然风景。登上长城，远眺连绵起伏的山脉和蜿蜒曲折的城墙，那种感受是无与伦比的。虽然爬长城可能会有些体力消耗，但当您到达高处欣赏到那壮丽的全景时，所有的疲惫都会烟消云散。每个季节的长城都有不同的美，春季有野花盛开，秋季有红叶满山，冬季则有银装素裹的壮观景象。无论是摄影爱好者还是历史文化爱好者，长城都能带给您难忘的体验。"
    },
    "eiffel-tower": {
      "票价": "埃菲尔铁塔的票价根据参观层数和上塔方式不同而异：步行至二层票价约为11欧元，电梯至二层约为17欧元，电梯至顶层约为26欧元。儿童、青少年和残障人士有优惠票价。建议提前在官网购票以避免排队。",
      "历史": "埃菲尔铁塔由工程师古斯塔夫·埃菲尔设计，于1887年开始建造，1889年完工，作为1889年世界博览会的入口拱门，同时庆祝法国大革命100周年。铁塔最初只是临时建筑，计划存在20年后拆除，但因其对无线电通信的价值而得以保留。在建造时，许多艺术家和知识分子抗议这座'怪物'会破坏巴黎的美感，而如今它已成为巴黎的象征。",
      "最佳参观时间": "参观埃菲尔铁塔的最佳时间是春季（4-6月）和秋季（9-10月），这时游客相对较少，天气也比较宜人。晚上参观可以欣赏到巴黎的夜景和铁塔每小时的灯光秀。如果想避开人群，建议早上开门时或晚上9点后前往。周末和夏季是最繁忙的时段。",
      "高度": "埃菲尔铁塔高324米（包括天线），是巴黎最高的建筑物。它有三层对游客开放：第一层在57米高处，第二层在115米高处，顶层在276米高处。1889年建成时，它是世界上最高的建筑物，直到1930年纽约的克莱斯勒大厦建成才失去这一称号。"
    },
    "default": {
      "天气": "目前没有实时天气数据，但一般来说，参观景点最好查看当地的天气预报，并做好相应准备。春秋季节通常天气较为宜人，夏季可能较热，冬季则可能较冷。建议携带适合季节的衣物和防晒、防雨装备。",
      "交通": "关于交通方式，通常有公共交通（地铁、公交车）、出租车、租车或参加旅游团等选择。建议根据您的具体行程和预算选择合适的交通方式。提前规划路线可以节省时间和精力。",
      "门票": "不同景点的门票价格和购买方式各不相同。一般来说，许多热门景点都支持在线预订门票，这样可以避免排队并可能获得折扣。学生、老年人和儿童通常有优惠票价。建议在官方网站查询最新的门票信息。",
      "住宿": "住宿选择多样，从经济型旅馆到豪华酒店不等。建议根据预算、位置和个人喜好选择合适的住宿。旅游旺季最好提前预订。靠近主要景点的住宿通常价格较高但交通便利。",
      "美食": "各地都有其特色美食，品尝当地美食是了解文化的重要部分。建议尝试当地特色菜肴，可以通过旅游指南、在线评论或向当地人询问获得推荐。注意食品安全和个人饮食习惯。"
    }
  },
  "English": {
    "great-wall": {
      "best section": "Badaling is the most popular section with excellent facilities and easy access; Mutianyu has beautiful scenery with fewer crowds; Jinshanling is well-preserved with spectacular views; Simatai offers night tours to enjoy evening views. Depending on your fitness level and time, Badaling or Mutianyu are recommended for first-time visitors.",
      "length": "The Great Wall stretches over 21,000 kilometers (13,000 miles) across northern China, spanning provinces including Beijing, Hebei, Tianjin, Shanxi, Shaanxi, Inner Mongolia, Gansu, Ningxia, Liaoning, and Jilin. It is the longest man-made structure in the world.",
      "history": "The history of the Great Wall dates back to the 7th century BC during the Spring and Autumn and Warring States periods, when various states built walls for defense. After unifying China, Emperor Qin Shi Huang connected and strengthened northern walls, forming the first unified Great Wall. Most of what we see today was built during the Ming Dynasty (1368-1644) to defend against northern nomadic tribes.",
      "architecture": "The architectural features of the Great Wall include various defensive facilities such as wall structures, enemy towers, beacon towers, and passes. The wall typically measures 4-5 meters in width and 5-8 meters in height, constructed with stones, bricks, and rammed earth. The Great Wall adapts to local conditions, using different construction methods based on terrain features - some sections follow mountain ridges while others cross valleys.",
      "best time": "The best time to visit the Great Wall is during spring (April-May) and autumn (September-October) when the weather is pleasant and the scenery is beautiful. Spring offers blooming flowers while autumn provides colorful foliage. Summer (June-August) can be hot with more tourists, and winter (November-February) is cold but offers snow views. Avoid Chinese national holidays like National Day and Spring Festival when it gets extremely crowded.",
      "worth visiting": "The Great Wall is absolutely worth visiting! As one of the Seven Wonders of the World, it offers not only impressive historical and architectural value but also breathtaking natural scenery. Standing on the Great Wall and looking out at the undulating mountains and winding wall is an incomparable experience. While climbing the Wall may require some physical effort, when you reach the higher sections and take in the magnificent panorama, all fatigue disappears. The Great Wall has different beauty in each season - wildflowers in spring, red leaves covering the mountains in autumn, and snow-covered spectacular views in winter. Whether you're a photography enthusiast or a history and culture lover, the Great Wall will give you an unforgettable experience."
    },
    "eiffel-tower": {
      "ticket price": "Eiffel Tower ticket prices vary depending on the level you wish to visit and how you ascend: walking to the 2nd floor costs about €11, taking the elevator to the 2nd floor costs about €17, and going to the top by elevator costs about €26. Discounted rates are available for children, youth, and people with disabilities. It's recommended to purchase tickets online in advance to avoid queues.",
      "history": "The Eiffel Tower was designed by engineer Gustave Eiffel and was constructed between 1887 and 1889. It served as the entrance arch for the 1889 World's Fair and celebrated the centennial of the French Revolution. Initially meant as a temporary structure to be dismantled after 20 years, it was kept due to its value for radio communications. During its construction, many artists and intellectuals protested that this 'monster' would ruin Paris's aesthetics, yet today it has become the symbol of the city.",
      "best time to visit": "The best time to visit the Eiffel Tower is during spring (April-June) and fall (September-October) when there are fewer tourists and the weather is pleasant. Visiting at night allows you to enjoy Paris's evening views and the tower's hourly light show. To avoid crowds, it's best to go early in the morning when it opens or after 9 PM. Weekends and summer are the busiest periods.",
      "height": "The Eiffel Tower stands 324 meters (1,063 feet) tall, including its antenna, making it the tallest structure in Paris. It has three levels open to visitors: the first floor at 57 meters (187 feet), the second floor at 115 meters (377 feet), and the top floor at 276 meters (906 feet). When completed in 1889, it was the tallest building in the world until the Chrysler Building in New York took that title in 1930."
    },
    "default": {
      "weather": "There is no real-time weather data available, but generally, it's best to check the local weather forecast before visiting attractions and prepare accordingly. Spring and autumn usually offer pleasant weather, summer can be hot, and winter might be cold. It's advisable to bring season-appropriate clothing and sun/rain protection.",
      "transportation": "For transportation, options typically include public transit (subway, buses), taxis, car rentals, or joining tour groups. It's recommended to choose suitable transportation based on your specific itinerary and budget. Planning routes in advance can save time and energy.",
      "tickets": "Ticket prices and purchasing methods vary for different attractions. Generally, many popular sites support online ticket booking, which can help avoid queues and possibly get discounts. Students, seniors, and children usually have preferential ticket prices. It's advisable to check the latest ticket information on official websites.",
      "accommodation": "Accommodation options range from budget hostels to luxury hotels. It's recommended to choose suitable accommodation based on budget, location, and personal preferences. Booking in advance is advisable during peak tourist seasons. Accommodations close to major attractions are usually more expensive but offer convenient transportation.",
      "food": "Each place has its unique cuisine, and tasting local food is an important part of understanding the culture. It's recommended to try local specialties, which can be found through travel guides, online reviews, or by asking locals. Pay attention to food safety and personal dietary habits."
    }
  }
};

// 模拟数据
const mockResponses = {
  "Chinese": {
    "great-wall": [
      "长城是中国古代伟大的防御工程，也是世界文化遗产。",
      "长城修建历史可以追溯到春秋战国时期，但现在我们看到的大部分长城是明朝时期修建的。",
      "长城全长超过21,000公里，横跨中国北部多个省份。",
      "八达岭长城是最受游客欢迎的一段，交通便利，设施完善。",
      "长城不仅是军事防御工程，也是古代中国政治、军事、文化的象征。"
    ],
    "eiffel-tower": [
      "埃菲尔铁塔是法国巴黎的标志性建筑，以设计师古斯塔夫·埃菲尔命名。",
      "它于1889年为世界博览会而建，原本计划拆除，但因其在无线电通信中的价值而保留。",
      "铁塔高324米，直到1930年克莱斯勒大厦建成前，它一直是世界上最高的建筑物。",
      "每年有约700万游客参观埃菲尔铁塔，它已成为世界上参观人数最多的收费景点之一。",
      "铁塔每晚都有灯光表演，每小时闪烁5分钟，非常壮观。"
    ],
    "default": [
      "这是一个非常有趣的地方，拥有丰富的历史和文化。",
      "最佳参观时间通常是春季和秋季，天气宜人且游客较少。",
      "建议您参观时带上舒适的鞋子，因为可能需要大量步行。",
      "当地有许多特色美食，非常值得品尝。",
      "这里的日出和日落景色非常壮观，是摄影的绝佳时机。"
    ]
  },
  "English": {
    "great-wall": [
      "The Great Wall is an ancient Chinese defensive project and a World Heritage site.",
      "The construction of the Great Wall dates back to the Spring and Autumn and Warring States periods, but most of what we see today was built during the Ming Dynasty.",
      "The Great Wall spans over 21,000 kilometers across northern China.",
      "Badaling Great Wall is the most popular section among tourists, with convenient transportation and well-established facilities.",
      "The Great Wall is not only a military defensive project but also a symbol of ancient Chinese politics, military, and culture."
    ],
    "eiffel-tower": [
      "The Eiffel Tower is an iconic landmark in Paris, France, named after its designer Gustave Eiffel.",
      "It was built for the 1889 World's Fair and was originally planned to be demolished but was kept for its value in radio communications.",
      "The tower stands 324 meters tall and was the world's tallest structure until the completion of the Chrysler Building in 1930.",
      "About 7 million visitors climb the Eiffel Tower annually, making it one of the most visited paid monuments in the world.",
      "The tower features a spectacular light show every night, sparkling for 5 minutes every hour."
    ],
    "default": [
      "This is a fascinating place with rich history and culture.",
      "The best time to visit is usually spring and autumn when the weather is pleasant and there are fewer tourists.",
      "It's recommended to wear comfortable shoes when visiting as there may be a lot of walking involved.",
      "There are many local specialties worth trying in the area.",
      "The sunrise and sunset views here are spectacular and perfect for photography."
    ]
  }
};

// 检查是否匹配常见问题
function matchQuestion(message: string, landmark: string, language: string): string | null {
  const lang = language.toLowerCase().includes("chinese") ? "Chinese" : "English";
  
  // 确定使用哪个地标的问答数据库
  let landmarkKey: "great-wall" | "eiffel-tower" | "default" = "default";
  if (landmark.toLowerCase().includes("great wall") || landmark.toLowerCase().includes("长城")) {
    landmarkKey = "great-wall";
  } else if (landmark.toLowerCase().includes("eiffel") || landmark.toLowerCase().includes("埃菲尔")) {
    landmarkKey = "eiffel-tower";
  }
  
  // 获取该地标和语言的问答库
  const qa = qaDatabase[lang][landmarkKey];
  
  // 获取所有问题关键词
  const questions = Object.keys(qa);
  
  // 特殊处理评价类问题（如"好玩不"、"值得去吗"等）
  if (lang === "Chinese") {
    if (message.includes("好玩") || message.includes("值得去") || message.includes("推荐") || 
        message.includes("怎么样") || message.includes("如何") || message.includes("体验")) {
      return qa["好玩"] || null;
    }
  } else {
    if (message.toLowerCase().includes("worth") || message.toLowerCase().includes("recommend") || 
        message.toLowerCase().includes("good") || message.toLowerCase().includes("experience") || 
        message.toLowerCase().includes("should i visit") || message.toLowerCase().includes("how is")) {
      return qa["worth visiting"] || null;
    }
  }
  
  // 查找匹配的问题
  for (const question of questions) {
    // 对于中文，直接检查包含关系
    if (lang === "Chinese" && message.includes(question)) {
      return qa[question];
    }
    
    // 对于英文，将问题和消息转换为小写进行比较
    if (lang === "English" && message.toLowerCase().includes(question.toLowerCase())) {
      return qa[question];
    }
  }
  
  // 如果没有找到匹配的问题，返回null
  return null;
}

// 获取模拟回复
function getMockResponse(landmark: string, language: string, message: string, history: any[] = []): string {
  // 检查是否是后续提问
  const isFollowUpQuestion = isFollowUp(message, language);
  
  // 如果是后续提问且有历史记录，尝试生成连贯的回答
  if (isFollowUpQuestion && history.length > 0) {
    // 获取上下文信息
    const context = getContextFromHistory(history, language);
    
    // 生成连贯的回答
    const followUpResponse = generateFollowUpResponse(context, message, landmark, language);
    if (followUpResponse) {
      return followUpResponse;
    }
  }
  
  // 首先尝试匹配问答数据库
  const qaMatch = matchQuestion(message, landmark, language);
  if (qaMatch) return qaMatch;
  
  // 如果没有匹配到具体问题，返回随机回复
  const langResponses = language.toLowerCase().includes("chinese") ? mockResponses.Chinese : mockResponses.English;
  
  // 尝试匹配特定地标
  let key: string;
  if (landmark.toLowerCase().includes("great wall") || landmark.includes("长城")) {
    key = "great-wall";
  } else if (landmark.toLowerCase().includes("eiffel") || landmark.includes("埃菲尔")) {
    key = "eiffel-tower";
  } else {
    key = "default";
  }
  
  const responses = langResponses[key as keyof typeof langResponses] || langResponses.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// 检查是否是后续提问
function isFollowUp(message: string, language: string): boolean {
  const chineseFollowUpPhrases = ["然后呢", "接着呢", "继续", "还有呢", "详细点", "告诉我更多", "再说一些"];
  const englishFollowUpPhrases = ["and then", "continue", "tell me more", "what else", "more details", "go on", "furthermore"];
  
  if (language.toLowerCase().includes("chinese")) {
    return chineseFollowUpPhrases.some(phrase => message.includes(phrase));
  } else {
    return englishFollowUpPhrases.some(phrase => message.toLowerCase().includes(phrase));
  }
}

// 从历史记录中获取上下文
function getContextFromHistory(history: any[], language: string): string {
  // 获取最近的助手回复作为上下文
  const recentResponses = history
    .filter(msg => msg.role === "assistant")
    .slice(-2)
    .map(msg => msg.content);
  
  if (recentResponses.length === 0) {
    return language.toLowerCase().includes("chinese") 
      ? "这是一个有关景点的对话" 
      : "This is a conversation about a landmark";
  }
  
  return recentResponses.join(" ");
}

// 生成后续回答
function generateFollowUpResponse(context: string, message: string, landmark: string, language: string): string | null {
  // 根据当前上下文生成后续回答
  if (language.toLowerCase().includes("chinese")) {
    if (context.includes("长城")) {
      if (landmark.toLowerCase().includes("great wall") || landmark.includes("长城")) {
        if (context.includes("八达岭")) {
          return "除了八达岭，慕田峪长城也很受欢迎，那里人相对较少，风景同样壮观。长城各段有不同特色，比如金山岭长城保存完好，司马台长城可以夜游。您对哪一段更感兴趣？";
        }
        if (context.includes("历史")) {
          return "长城的建造工艺非常先进，使用了因地制宜的材料和技术。例如，在某些地区使用了糯米汁混合石灰，增强了墙体的坚固性。长城还有复杂的信号系统，通过烽火台可以快速传递军事情报。";
        }
        return "长城还有许多鲜为人知的事实，比如它并不是一道连续的墙，而是由多段墙壁、塔楼和自然屏障组成的防御系统。长城的建造耗费了大量人力物力，是古代中国工程技术的杰出代表。";
      }
    }
    
    if (landmark.toLowerCase().includes("eiffel") || landmark.includes("埃菲尔")) {
      return "关于埃菲尔铁塔，还有一个有趣的事实是它每七年需要重新粉刷一次，大约需要60吨油漆。铁塔的设计考虑了风力阻力，在强风中可以摆动15厘米左右。铁塔顶层有香槟吧，可以一边品尝香槟一边欣赏巴黎全景。";
    }
    
    return "这个景点还有很多值得探索的方面，包括当地的文化传统、美食特色以及周边的其他景点。您想了解哪方面的信息呢？";
  } else {
    if (context.includes("Wall")) {
      if (landmark.toLowerCase().includes("great wall")) {
        if (context.includes("Badaling")) {
          return "Besides Badaling, the Mutianyu section is also popular with fewer crowds but equally stunning views. Each section of the Great Wall has different characteristics - Jinshanling is well-preserved while Simatai offers night tours. Which section interests you more?";
        }
        if (context.includes("history")) {
          return "The construction techniques of the Wall were very advanced, using materials and methods adapted to local conditions. For example, in some areas, sticky rice juice was mixed with lime to strengthen the wall. The Wall also had a sophisticated signaling system with beacon towers for rapid military communication.";
        }
        return "There are many lesser-known facts about the Great Wall, such as it's not actually a continuous wall but a defense system made of multiple wall sections, towers, and natural barriers. Building the Wall required enormous human and material resources, representing outstanding engineering achievements of ancient China.";
      }
    }
    
    if (landmark.toLowerCase().includes("eiffel")) {
      return "Regarding the Eiffel Tower, another interesting fact is that it needs to be repainted every seven years, requiring about 60 tons of paint. The tower's design accounts for wind resistance and can sway up to 15 centimeters in strong winds. There's a champagne bar at the top where you can enjoy a glass while taking in the panoramic views of Paris.";
    }
    
    return "There are many more aspects of this landmark worth exploring, including local cultural traditions, culinary specialties, and other nearby attractions. What aspects would you like to know more about?";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, landmark, language = 'Chinese', history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '缺少消息内容' },
        { status: 400 }
      );
    }
    
    console.log('接收到聊天请求:', { message, landmark, language, historyLength: history.length });

    const config = getCurrentConfig();
    const useOpenAI = config.apiUrl.includes('openai.com');
    const apiKey = config.apiKey;

    // 检查API密钥是否配置
    if (!apiKey) {
      console.log('API密钥未配置，使用模拟数据');
      const mockResponse = getMockResponse(landmark, language, message, history);
      return NextResponse.json({ response: mockResponse });
    }

    // 构建完整聊天历史
    const formattedHistory = history.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // 构建系统提示
    const systemPrompt = language === 'Chinese' 
      ? `你是一个友好专业的${landmark}AI导游，提供关于这个景点的信息、历史、文化背景、建筑特点和旅行建议。
         回答要简洁、有教育意义且富有信息量。只回答与${landmark}相关的问题。
         如果被问到无关问题，礼貌地将话题引回${landmark}。使用中文回答。
         一定要关注对话历史，提供连贯的回答，特别是对"然后呢"、"继续"等后续提问。`
      : `You are a friendly, professional AI tour guide for ${landmark}, providing information about its history, cultural significance, architecture, and travel tips.
         Your answers should be concise, educational, and informative. Only answer questions related to ${landmark}.
         If asked about unrelated topics, politely bring the conversation back to ${landmark}. Answer in English.
         Pay close attention to conversation history and provide coherent responses, especially to follow-up questions like "and then?", "continue", etc.`;

    try {
      // 首先检查是否有匹配的问答数据
      const qaMatch = matchQuestion(message, landmark, language);
      if (qaMatch && !isFollowUp(message, language)) {
        console.log('找到匹配的问答数据');
        return NextResponse.json({ response: qaMatch });
      }
      
      // 检查是否是后续提问
      if (isFollowUp(message, language) && formattedHistory.length > 0) {
        console.log('检测到后续提问，尝试生成连贯回答');
        const context = getContextFromHistory(formattedHistory, language);
        const followUpResponse = generateFollowUpResponse(context, message, landmark, language);
        
        if (followUpResponse) {
          return NextResponse.json({ response: followUpResponse });
        }
      }
      
      // 发送请求到DeepSeek或OpenAI API
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...config.defaultConfig,
          messages: [
            { role: 'system', content: systemPrompt },
            ...formattedHistory,
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API错误:', errorData);
        // API错误时使用模拟数据
        const mockResponse = getMockResponse(landmark, language, message, history);
        return NextResponse.json({ response: mockResponse });
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return NextResponse.json({ response: aiResponse });
    } catch (error) {
      console.error('API请求失败:', error);
      // 请求失败时使用模拟数据
      const mockResponse = getMockResponse(landmark, language, message, history);
      return NextResponse.json({ response: mockResponse });
    }
  } catch (error: any) {
    console.error('Chat API错误:', error);
    return NextResponse.json(
      { error: error.message || '处理聊天请求时出错' },
      { status: 500 }
    );
  }
} 