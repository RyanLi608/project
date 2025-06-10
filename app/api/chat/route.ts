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

// 增强版的智能回复系统
function generateSmartResponse(message: string, landmark: string, language: string): string | null {
  const isChineseUI = language.toLowerCase().includes("chinese");
  
  // 提取关键词和分析问题类型
  const keywords = extractKeywords(message, isChineseUI);
  const questionType = analyzeQuestionType(message, isChineseUI);
  
  // 生成针对性回答
  const specificAnswer = generateSpecificAnswer(keywords, questionType, landmark, isChineseUI);
  if (specificAnswer) return specificAnswer;
  
  // 尝试生成分层回答
  const hierarchicalAnswer = generateHierarchicalResponse(message, landmark, language, keywords, questionType);
  if (hierarchicalAnswer) return hierarchicalAnswer;
  
  // 如果无法生成针对性回答，使用原有的模拟数据
  return null;
}

// 提取消息中的关键词
function extractKeywords(message: string, isChineseUI: boolean): string[] {
  // 通用关键词（中英文都会处理）
  const generalKeywords = ["旅游", "tour", "visit", "价格", "price", "费用", "cost", "历史", "history", 
                          "文化", "culture", "建筑", "architecture", "交通", "transport", "吃", "food", 
                          "餐厅", "restaurant", "住", "accommodation", "酒店", "hotel", "门票", "ticket", 
                          "开放", "opening", "时间", "time", "best", "最佳", "特色", "特点", "feature", 
                          "建议", "推荐", "recommend", "天气", "weather", "拍照", "photo", "摄影", "photography", 
                          "安全", "safety", "语言", "language", "贵", "expensive", "便宜", "cheap", 
                          "budget", "预算", "礼仪", "etiquette", "禁忌", "taboo", "tips", "攻略", 
                          "活动", "activity", "events", "景点", "attraction", "儿童", "kids", "老人", "elderly", 
                          "残障", "disability", "visa", "签证", "currency", "货币", "exchange", "兑换"];
  
  // 将消息转为小写并分词
  const lowerMessage = message.toLowerCase();
  const words = isChineseUI 
    ? Array.from(lowerMessage).join(' ').split(/\s+/) // 中文按字符分割
    : lowerMessage.split(/\s+/);  // 英文按空格分割
  
  // 提取匹配的关键词
  return generalKeywords.filter(keyword => lowerMessage.includes(keyword.toLowerCase()));
}

// 分析问题类型
function analyzeQuestionType(message: string, isChineseUI: boolean): string {
  // 问题类型检测规则
  const questionPatterns = {
    "howto": isChineseUI 
      ? /(怎么|如何|怎样|哪里|哪个).+(去|到达|游览|参观|玩|购买|买)/
      : /(how|where).+(go|visit|get|buy|play|tour)/i,
    "what": isChineseUI 
      ? /(什么|有什么|是什么|有哪些).+(特色|特点|看点|亮点|活动|景点)/
      : /(what).+(special|unique|highlight|activity|attraction)/i,
    "when": isChineseUI 
      ? /(什么时候|何时|几点|哪个月|哪个季节).+(去|开放|关闭|参观)/
      : /(when|what time|which month|season).+(go|open|close|visit)/i,
    "why": isChineseUI 
      ? /(为什么|为何|为啥).+(有名|著名|知名|重要)/
      : /(why).+(famous|important|known)/i,
    "recommendation": isChineseUI 
      ? /(推荐|建议|值得).+(景点|餐厅|酒店|路线|行程)/
      : /(recommend|suggest|worth).+(attraction|restaurant|hotel|route|itinerary)/i,
    "opinion": isChineseUI 
      ? /(好玩|有趣|美|漂亮|值得).+(吗|吧|么|不)/
      : /(good|fun|beautiful|worth|should).+(visit|see|go)/i,
    "comparison": isChineseUI 
      ? /(对比|比较|和|跟|与).+(哪个更|哪个好|区别|差异)/
      : /(compare|comparison|versus|vs|difference).+(which|better)/i,
    "safety": isChineseUI
      ? /(安全|危险|注意|小心).+(问题|事项|情况)/
      : /(safe|dangerous|caution|careful).+(issue|situation|concern)/i,
    "budget": isChineseUI
      ? /(预算|花费|消费|开销).+(多少|大概|约)/
      : /(budget|cost|expense|spend).+(how much|about|approximately)/i,
    "family": isChineseUI
      ? /(孩子|儿童|老人|家庭).+(适合|友好|推荐)/
      : /(kids|children|elderly|family).+(suitable|friendly|recommend)/i,
    "food": isChineseUI
      ? /(吃|美食|餐厅|小吃|特色菜).+(推荐|有名|好吃)/
      : /(eat|food|restaurant|snack|cuisine).+(recommend|famous|delicious)/i,
    "culture": isChineseUI
      ? /(文化|习俗|传统|礼仪|禁忌).+(了解|注意|避免)/
      : /(culture|custom|tradition|etiquette|taboo).+(understand|note|avoid)/i,
  };
  
  // 检查问题是否匹配任一类型
  for (const [type, pattern] of Object.entries(questionPatterns)) {
    if (pattern.test(message)) {
      return type;
    }
  }
  
  // 默认问题类型
  return "general";
}

// 生成分层响应
function generateHierarchicalResponse(message: string, landmark: string, language: string, keywords: string[], questionType: string): string | null {
  const isChineseUI = language.toLowerCase().includes("chinese");
  
  // 特定地标识别
  const landmarkType = identifyLandmarkType(landmark);
  
  // 如果能识别地标类型，生成特定类型地标的通用回答
  if (landmarkType) {
    const categoryAnswer = generateCategoryResponse(landmarkType, keywords, questionType, isChineseUI);
    if (categoryAnswer) return categoryAnswer;
  }
  
  // 通用旅游问题处理
  if (questionType === "safety") {
    return isChineseUI
      ? "旅游安全是最重要的。建议您：1) 随身携带贵重物品并保管好；2) 在公共场所保持警惕，特别是在拥挤区域；3) 将重要文件复印件与原件分开存放；4) 记下紧急联系电话，包括当地警察和您国家的大使馆；5) 购买旅游保险；6) 注意天气变化并准备适当的装备；7) 尊重当地文化和规定；8) 避免单独前往偏远或危险区域。"
      : "Travel safety is paramount. Recommendations: 1) Keep valuables with you and secure; 2) Stay vigilant in public places, especially crowded areas; 3) Keep copies of important documents separate from originals; 4) Note emergency contact numbers including local police and your country's embassy; 5) Purchase travel insurance; 6) Be aware of weather changes and prepare appropriate gear; 7) Respect local cultures and regulations; 8) Avoid going alone to remote or dangerous areas.";
  }
  
  if (questionType === "budget") {
    return isChineseUI
      ? "旅行预算因个人偏好和旅行风格而异。一般来说，住宿占预算的最大部分，选择经济型酒店或青旅可以节省开支。其次是交通费用，提前预订机票和使用公共交通可以降低成本。餐饮方面，尝试当地小吃和在非旅游区的餐厅用餐更经济。门票方面，许多景点提供套票或特定日期的折扣。建议您在出发前研究目的地的消费水平，并为意外开支预留额外资金。"
      : "Travel budgets vary by personal preference and travel style. Generally, accommodation takes the largest portion; choosing budget hotels or hostels can save expenses. Transportation is next; booking flights in advance and using public transit reduces costs. For dining, try local street food and restaurants outside tourist areas for better value. For attractions, many sites offer package deals or discounts on specific days. Research the cost of living at your destination before departure and reserve extra funds for unexpected expenses.";
  }
  
  if (hasAnyKeyword(keywords, ["禁忌", "礼仪", "taboo", "etiquette", "respect", "尊重"])) {
    return isChineseUI
      ? "在旅行中尊重当地文化和礼仪非常重要。一般建议：1) 了解基本的当地问候语和感谢词；2) 参观宗教场所时着装得体，通常需要覆盖肩膀和膝盖；3) 在拍摄当地人照片前征得他们的同意；4) 了解当地的用餐礼仪，如使用餐具、小费习惯等；5) 熟悉常见手势的不同文化含义，避免无意冒犯；6) 遵守当地法律法规；7) 保持开放的心态和尊重的态度，即使遇到与自己文化差异较大的习俗。"
      : "Respecting local cultures and etiquette is essential when traveling. General recommendations: 1) Learn basic local greetings and thank-you phrases; 2) Dress appropriately when visiting religious sites, typically covering shoulders and knees; 3) Ask permission before photographing local people; 4) Understand local dining etiquette such as utensil use and tipping customs; 5) Be aware of different cultural meanings for common gestures to avoid unintentional offense; 6) Obey local laws and regulations; 7) Maintain an open mind and respectful attitude, even when encountering customs significantly different from your own.";
  }
  
  // 如果无法生成分层回答，返回null
  return null;
}

// 识别地标类型
function identifyLandmarkType(landmark: string): string | null {
  const landmarkLower = landmark.toLowerCase();
  
  // 地标分类
  if (landmarkLower.includes("great wall") || landmarkLower.includes("长城")) {
    return "wall";
  }
  if (landmarkLower.includes("eiffel") || landmarkLower.includes("埃菲尔")) {
    return "tower";
  }
  if (landmarkLower.includes("palace") || landmarkLower.includes("故宫") || landmarkLower.includes("宫殿")) {
    return "palace";
  }
  if (landmarkLower.includes("temple") || landmarkLower.includes("寺") || landmarkLower.includes("庙")) {
    return "temple";
  }
  if (landmarkLower.includes("museum") || landmarkLower.includes("博物馆")) {
    return "museum";
  }
  if (landmarkLower.includes("mountain") || landmarkLower.includes("山")) {
    return "mountain";
  }
  if (landmarkLower.includes("lake") || landmarkLower.includes("湖")) {
    return "lake";
  }
  if (landmarkLower.includes("garden") || landmarkLower.includes("园") || landmarkLower.includes("公园")) {
    return "garden";
  }
  
  return null;
}

// 根据地标类别生成回答
function generateCategoryResponse(category: string, keywords: string[], questionType: string, isChineseUI: boolean): string | null {
  // 根据不同类型地标生成特定回答
  switch (category) {
    case "temple":
      if (questionType === "howto" || hasAnyKeyword(keywords, ["参观", "visit", "礼仪", "etiquette"])) {
        return isChineseUI
          ? "参观寺庙时，请注意以下几点：1) 着装应保持得体，避免暴露的服装，通常应覆盖肩膀和膝盖；2) 进入主要殿堂前可能需要脱鞋；3) 保持安静，尊重正在祈祷的信徒；4) 有些寺庙不允许拍照，特别是室内，请先确认；5) 在佛像前不要指指点点或背对佛像拍照；6) 如有捐款箱，可随喜布施；7) 顺时针方向绕行佛塔或祈祷设施。"
          : "When visiting temples, please note the following: 1) Dress modestly, avoiding revealing clothing; generally cover shoulders and knees; 2) You may need to remove shoes before entering main halls; 3) Keep quiet and respect worshippers; 4) Some temples prohibit photography, especially indoors - check before taking pictures; 5) Avoid pointing at or taking photos with your back to Buddha statues; 6) Donations are welcome but not required; 7) Walk clockwise around stupas or prayer facilities.";
      }
      
      if (questionType === "when" || hasAnyKeyword(keywords, ["时间", "time", "开放", "open"])) {
        return isChineseUI
          ? "寺庙通常在早上开放，大多数从早上6点或8点开始，到下午5点或6点结束。一些寺庙在特定的宗教节日可能会有特殊的开放时间。参观寺庙的最佳时间是早上，此时通常比较安静，有更多的机会体验寺庙的宁静氛围。避免在主要宗教仪式或节日期间参观，除非您特别想体验这些活动。"
          : "Temples typically open in the morning, most from 6 AM or 8 AM until 5 PM or 6 PM. Some temples may have special opening hours during specific religious festivals. The best time to visit temples is in the morning when they are usually quieter, offering more opportunity to experience the temple's peaceful atmosphere. Avoid visiting during major religious ceremonies or festivals unless you specifically want to experience these events.";
      }
      break;
    
    case "museum":
      if (questionType === "howto" || hasAnyKeyword(keywords, ["参观", "visit", "技巧", "tips"])) {
        return isChineseUI
          ? "参观博物馆的建议：1) 提前查看博物馆官网，了解开放时间、门票价格及特别展览；2) 许多博物馆在特定日期或时段有免费或折扣入场；3) 考虑租用导览器或参加导览团，深入了解展品背景；4) 根据兴趣规划路线，不必强求看完所有展品；5) 避开周末和假日高峰时段；6) 遵守摄影规定，有些展品可能禁止拍照；7) 穿着舒适的鞋子，大型博物馆参观会有大量步行；8) 利用博物馆APP或地图规划参观路线。"
          : "Museum visiting tips: 1) Check the official website in advance for opening hours, ticket prices, and special exhibitions; 2) Many museums offer free or discounted entry on specific dates or times; 3) Consider renting an audio guide or joining a guided tour for deeper insight; 4) Plan your route based on interests - you don't need to see everything; 5) Avoid peak times on weekends and holidays; 6) Follow photography rules as some exhibits may prohibit photos; 7) Wear comfortable shoes as large museums involve significant walking; 8) Use museum apps or maps to plan your visit route.";
      }
      
      if (questionType === "when" || hasAnyKeyword(keywords, ["时间", "time", "开放", "open"])) {
        return isChineseUI
          ? "大多数博物馆在上午9点或10点开放，下午5点或6点关闭，每周一或周二通常是闭馆日。参观博物馆的最佳时间是工作日的上午，游客较少。许多博物馆在每月的特定日期或晚上提供免费入场。为了最佳体验，建议在开馆后不久或午餐时间参观，这时人流相对较少。"
          : "Most museums open around 9 AM or 10 AM and close at 5 PM or 6 PM, with Monday or Tuesday typically being closure days. The best time to visit museums is weekday mornings when there are fewer visitors. Many museums offer free entry on specific dates each month or during evening hours. For the best experience, it's recommended to visit shortly after opening or during lunch hours when crowds are relatively smaller.";
      }
      break;
    
    case "palace":
      if (questionType === "howto" || hasAnyKeyword(keywords, ["参观", "visit", "技巧", "tips"])) {
        return isChineseUI
          ? "参观宫殿的建议：1) 提前购买门票，避免长时间排队；2) 考虑聘请专业导游解说宫殿的历史和故事；3) 参观早晨或傍晚时段，避开中午人流高峰和炎热天气；4) 穿舒适的鞋子，宫殿面积通常很大；5) 阅读展示牌或使用导览器了解每个区域的历史意义；6) 注意保护古建筑，不要触摸文物或在墙壁上涂鸦；7) 拍照时注意是否有限制；8) 参观前了解宫殿布局，有针对性地游览。"
          : "Recommendations for palace visits: 1) Purchase tickets in advance to avoid long queues; 2) Consider hiring a professional guide to explain the palace's history and stories; 3) Visit during morning or evening hours to avoid midday crowds and heat; 4) Wear comfortable shoes as palaces typically cover large areas; 5) Read display boards or use audio guides to understand the historical significance of each area; 6) Help preserve ancient architecture by not touching artifacts or writing on walls; 7) Be aware of photography restrictions; 8) Familiarize yourself with the palace layout before visiting for a more targeted tour.";
      }
      
      if (hasAnyKeyword(keywords, ["历史", "history", "故事", "story"])) {
        return isChineseUI
          ? "宫殿通常承载着丰富的历史，是国家政治、文化和艺术的中心。这些宏伟建筑往往反映了当时的社会结构、权力分配和审美观念。宫殿的每个部分，从门厅到内室，从花园到仪式空间，都有其特定的功能和象征意义。历史上的宫殿不仅是统治者的居所，也是政府运作的场所，重要的国家仪式和外交活动也在此举行。宫殿建筑艺术通常代表了该时期的最高工艺水平，汇集了最优秀的工匠和艺术家的作品。"
          : "Palaces typically carry rich histories, serving as centers of national politics, culture, and art. These magnificent structures often reflect the social structures, power distribution, and aesthetic concepts of their time. Each part of a palace, from entrance halls to inner chambers, gardens to ceremonial spaces, has specific functions and symbolic significance. Historically, palaces were not only residences for rulers but also venues for government operations, important state ceremonies, and diplomatic activities. Palace architecture usually represents the highest level of craftsmanship of its period, gathering works from the most skilled artisans and artists.";
      }
      break;
       
    case "mountain":
      if (questionType === "howto" || hasAnyKeyword(keywords, ["爬山", "hiking", "climbing", "安全", "safety"])) {
        return isChineseUI
          ? "登山安全建议：1) 提前查看天气预报，避开恶劣天气；2) 穿着合适的登山鞋和分层衣物，以应对温度变化；3) 携带足够的水和高能量食物；4) 带上急救包、手电筒、地图和指南针；5) 告知他人您的行程计划；6) 沿着标记的小径行走，不要冒险走捷径；7) 了解自己的体能极限，不要过度疲劳；8) 携带手机，但不要依赖手机信号；9) 尊重自然环境，带走您的垃圾；10) 早出发早返回，避免在日落后仍在山上。"
          : "Mountain safety recommendations: 1) Check weather forecasts in advance and avoid adverse conditions; 2) Wear appropriate hiking shoes and layered clothing to adapt to temperature changes; 3) Carry sufficient water and high-energy foods; 4) Pack a first aid kit, flashlight, map, and compass; 5) Inform others of your itinerary; 6) Stay on marked trails and avoid shortcuts; 7) Know your physical limits and avoid excessive fatigue; 8) Carry a mobile phone but don't rely on signal coverage; 9) Respect the natural environment and take your trash with you; 10) Start early and return early to avoid being on the mountain after sunset.";
      }
      
      if (questionType === "when" || hasAnyKeyword(keywords, ["季节", "season", "最佳", "best", "时间", "time"])) {
        return isChineseUI
          ? "登山的最佳季节通常是春季和秋季，此时温度适中，降水较少。春季可以欣赏到山花盛开的美景，秋季则可以欣赏到红叶等秋色。夏季登山要注意防暑和防雷，冬季则需要特别注意保暖和冰雪路面带来的安全风险。每座山的最佳游览时间可能因地理位置和气候条件而异，建议在出发前查询特定山峰的最佳登山季节。一天中的最佳登山时间是清晨，可以避开午后的高温和突发性雷雨。"
          : "The best seasons for mountain hiking are typically spring and autumn when temperatures are moderate and precipitation is less frequent. Spring offers views of blooming mountain flowers, while autumn provides beautiful fall foliage. For summer hiking, be cautious of heat and lightning; in winter, pay special attention to staying warm and the safety risks posed by icy conditions. The optimal visiting time for each mountain may vary depending on geographical location and climate conditions - research the best hiking season for your specific mountain before departing. The best time of day for hiking is early morning to avoid afternoon heat and sudden thunderstorms.";
      }
      break;
      
    case "lake":
      if (hasAnyKeyword(keywords, ["活动", "activity", "可以做什么", "what to do"])) {
        return isChineseUI
          ? "湖泊通常提供多种休闲活动：1) 划船：包括划艇、皮划艇、帆船等；2) 钓鱼：许多湖泊拥有丰富的鱼类资源；3) 游泳：在允许的区域，夏季是理想的游泳时机；4) 徒步：环湖步道通常风景优美；5) 野餐：湖边是享用餐点的理想场所；6) 观鸟：湖泊吸引多种鸟类，是观鸟爱好者的天堂；7) 摄影：湖面倒映的景色和日出日落都是绝佳的摄影题材；8) 冬季活动：在寒冷地区，结冰的湖面可提供滑冰和冰钓机会。请务必遵守当地规定，有些活动可能需要特别许可或仅限于特定区域。"
          : "Lakes typically offer various leisure activities: 1) Boating: including rowing, kayaking, sailing, etc.; 2) Fishing: many lakes have abundant fish resources; 3) Swimming: in permitted areas, summer is ideal for swimming; 4) Hiking: lakeside trails usually offer scenic views; 5) Picnicking: lakeshores are ideal spots for meals; 6) Bird watching: lakes attract various bird species, making them a paradise for bird enthusiasts; 7) Photography: lake reflections and sunrise/sunset scenes make excellent photographic subjects; 8) Winter activities: in cold regions, frozen lakes provide opportunities for ice skating and ice fishing. Always follow local regulations, as some activities may require special permits or are limited to specific areas.";
      }
      
      if (questionType === "when" || hasAnyKeyword(keywords, ["季节", "season", "最佳", "best", "时间", "time"])) {
        return isChineseUI
          ? "参观湖泊的最佳时间取决于您想进行的活动和当地气候。一般而言，春季和秋季的温度适中，风景优美，是游览的理想季节。夏季适合游泳、划船等水上活动，但可能游客较多。冬季在某些地区，结冰的湖面提供独特的景观和活动，如冰钓和滑冰。早晨和傍晚是摄影的黄金时段，湖面常出现薄雾和绚丽的光线。避开雨季和极端天气是确保安全和舒适体验的关键。"
          : "The best time to visit lakes depends on your desired activities and the local climate. Generally, spring and autumn offer moderate temperatures and beautiful scenery, making them ideal for sightseeing. Summer is suitable for swimming, boating, and other water activities, though it may be more crowded. In winter in some regions, frozen lakes provide unique landscapes and activities such as ice fishing and skating. Early morning and evening are golden hours for photography, when lakes often feature mist and spectacular lighting. Avoiding rainy seasons and extreme weather is key to ensuring a safe and comfortable experience.";
      }
      break;
      
    case "garden":
      if (questionType === "when" || hasAnyKeyword(keywords, ["季节", "season", "最佳", "best", "时间", "time"])) {
        return isChineseUI
          ? "参观花园的最佳时间通常是春季(3-5月)和秋季(9-10月)，此时大多数植物处于最佳观赏状态。春季可以欣赏到各种花卉盛开的景象，而秋季则有美丽的秋叶和果实。不同花园可能有不同的特色季节，例如某些花园在樱花季或枫叶季特别出名。一天中的最佳参观时间是早上或傍晚，此时光线柔和，温度适宜，游客也相对较少。雨后参观也有独特的美感，花草更显鲜艳，空气清新。"
          : "The best time to visit gardens is typically spring (March-May) and autumn (September-October) when most plants are in their prime viewing condition. Spring offers views of various flowers in bloom, while autumn features beautiful fall foliage and fruits. Different gardens may have different featured seasons - some are particularly famous during cherry blossom or maple leaf seasons. The best time of day to visit is morning or evening when the light is soft, temperatures are pleasant, and there are fewer visitors. Visiting after rain also offers a unique beauty with more vibrant plants and fresh air.";
      }
      
      if (hasAnyKeyword(keywords, ["拍照", "摄影", "photo", "photography"])) {
        return isChineseUI
          ? "在花园拍摄的摄影技巧：1) 早晨和傍晚的'黄金时段'光线柔和，特别适合拍摄；2) 阴天也是拍花的好时机，柔和的光线减少了强烈的阴影；3) 使用宏观模式捕捉花朵的细节；4) 寻找有趣的构图，如通过拱门或树枝框架拍摄；5) 尝试不同的角度，包括低角度和高角度；6) 使用适当的景深突出主体；7) 寻找有趣的对比，如古老建筑与现代花卉；8) 带上三脚架以便在光线不足时稳定拍摄；9) 考虑季节性元素，如春季的花朵或秋季的落叶；10) 雨后拍摄可以捕捉到水珠点缀的花朵，效果特别动人。"
          : "Photography tips for gardens: 1) The 'golden hours' of early morning and evening offer soft light that's perfect for shooting; 2) Overcast days are also good for flower photography as the soft light reduces harsh shadows; 3) Use macro mode to capture flower details; 4) Look for interesting compositions, such as shooting through archways or framing with branches; 5) Try different angles, including low and high perspectives; 6) Use appropriate depth of field to highlight your subject; 7) Look for interesting contrasts, like ancient architecture with modern flowers; 8) Bring a tripod for stability in low light; 9) Consider seasonal elements like spring blossoms or autumn leaves; 10) Shooting after rain can capture flowers adorned with water droplets, creating particularly moving effects.";
      }
      break;
      
    case "tower":
      if (hasAnyKeyword(keywords, ["拍照", "摄影", "photo", "photography", "最佳", "best", "地点", "location"])) {
        return isChineseUI
          ? "拍摄塔楼的最佳位置包括：1) Trocadéro广场，提供塔的经典正面视角；2) 香榭丽舍大街远端，可以将塔与城市天际线一起构图；3) 塞纳河上的游船，可以拍摄到塔与河水的倒影；4) 蒙帕纳斯塔顶部，可以俯瞰整个巴黎与埃菲尔铁塔；5) 先贤祠附近，可以获得不同角度的视野；6) 夜晚拍摄时，铁塔每小时整点有五分钟闪烁灯光秀，是拍摄的绝佳时机；7) 日出和日落时分，光线柔和，适合捕捉塔的轮廓与天空的色彩变化。使用三脚架可以在弱光条件下获得稳定的照片。"
          : "The best locations for photographing towers include: 1) Trocadéro Plaza, offering a classic frontal view of the tower; 2) The far end of the Champs-Élysées, allowing composition with the tower and city skyline together; 3) Seine River cruises, capturing the tower with its reflection in the water; 4) Top of Montparnasse Tower, providing an aerial view of Paris with the Eiffel Tower; 5) Near the Panthéon, offering different perspective views; 6) At night, the Eiffel Tower features a five-minute sparkling light show every hour on the hour, which is an excellent time for photography; 7) During sunrise and sunset, when soft light is ideal for capturing the tower's silhouette against changing sky colors. Using a tripod can help obtain stable photos in low light conditions.";
      }
      
      if (questionType === "howto" && hasAnyKeyword(keywords, ["avoid", "queue", "line", "crowd", "避免", "排队", "人群", "拥挤"])) {
        return isChineseUI
          ? "避免埃菲尔铁塔排队的技巧：1) 提前在官网购买指定时间的电子门票；2) 考虑参加导览团，通常有专用入口；3) 选择较少人的日子，如工作日和非旅游旺季；4) 在开门时间或晚上8点后到达，这些时段通常人流较少；5) 如果没有预订票，可以考虑步行上到第二层而不是乘电梯，这个队伍通常较短；6) 从南塔柱(Pilier Sud)入口进入，而不是东塔柱(Pilier Est)，后者是团队入口，通常更拥挤；7) 使用巴黎通票(Paris Pass)或类似通票可以优先入场；8) 在铁塔的58号餐厅或Jules Verne餐厅预订餐位，可以使用专用电梯并避开主要排队区域。"
          : "Tips to avoid queues at the Eiffel Tower: 1) Purchase timed e-tickets in advance on the official website; 2) Consider joining guided tours, which often have dedicated entrances; 3) Choose less crowded days such as weekdays and outside peak tourist seasons; 4) Arrive at opening time or after 8 PM, when crowds are typically smaller; 5) If tickets aren't pre-booked, consider walking up to the second floor rather than taking the elevator, as this queue is usually shorter; 6) Enter from the South Pillar (Pilier Sud) entrance rather than the East Pillar (Pilier Est), which is the group entrance and typically more crowded; 7) Use the Paris Pass or similar passes that offer priority access; 8) Book a table at the Tower's restaurant 58 Tour Eiffel or Jules Verne, which allows use of a dedicated elevator and bypasses the main queuing areas.";
      }
      break;
      
    case "wall":
      if (hasAnyKeyword(keywords, ["家庭", "儿童", "老人", "适合", "family", "children", "elderly", "suitable"])) {
        return isChineseUI
          ? "带家庭参观长城的建议：1) 八达岭段最适合家庭，设施完善，地势相对平缓；2) 慕田峪段也很适合，有缆车可直达城墙，减少爬坡的体力消耗；3) 避开金山岭、箭扣等段落，这些地方较为陡峭，不适合老人和幼童；4) 带足防晒用品、水和零食，特别是夏季；5) 为孩子讲解长城的历史和故事，增加参观乐趣；6) 准备舒适的步行鞋，避免穿新鞋；7) 考虑使用儿童背带或轻便婴儿车，但注意某些台阶区域可能需要抱起孩子；8) 计划充足的休息时间，不要试图一次看太多；9) 早上出发，避开正午的高温和人流高峰；10) 考虑雇用导游，减轻规划负担并获得更丰富的解说。"
          : "Recommendations for families visiting the Great Wall: 1) The Badaling section is most suitable for families with complete facilities and relatively gentle terrain; 2) The Mutianyu section is also appropriate, with cable cars directly to the wall, reducing climbing effort; 3) Avoid sections like Jinshanling and Jiankou, which are steeper and unsuitable for elderly people and young children; 4) Bring sufficient sun protection, water, and snacks, especially in summer; 5) Share the history and stories of the Great Wall with children to enhance their interest; 6) Prepare comfortable walking shoes and avoid new shoes; 7) Consider using a child carrier or lightweight stroller, but be aware that some stepped areas may require carrying children; 8) Plan for ample rest time and don't try to see too much in one visit; 9) Start in the morning to avoid midday heat and peak crowds; 10) Consider hiring a guide to reduce planning burden and get richer commentary.";
      }
      
      if (hasAnyKeyword(keywords, ["保护", "修复", "环保", "保存", "conservation", "restoration", "preservation"])) {
        return isChineseUI
          ? "长城是世界文化遗产，但面临自然侵蚀、气候变化和过度旅游等保护挑战。中国政府和多个组织正在实施保护措施，包括：1) 建立监测系统，追踪长城的状况变化；2) 使用传统材料和技术进行修复，保持历史真实性；3) 限制游客数量，特别是在脆弱段落；4) 开展公众教育项目，提高保护意识；5) 招募长城保护志愿者；6) 制定严格的管理条例，防止不当开发和破坏行为。作为游客，您可以通过遵循指定路径、不在城墙上刻字或涂鸦、不带走砖石或文物、举报破坏行为等方式支持长城保护工作。"
          : "The Great Wall, a World Heritage site, faces conservation challenges including natural erosion, climate change, and overtourism. The Chinese government and various organizations are implementing protection measures, including: 1) Establishing monitoring systems to track the Wall's changing conditions; 2) Using traditional materials and techniques for restoration to maintain historical authenticity; 3) Limiting visitor numbers, especially in vulnerable sections; 4) Conducting public education programs to raise awareness about conservation; 5) Recruiting Great Wall protection volunteers; 6) Developing strict management regulations to prevent inappropriate development and destructive behaviors. As a visitor, you can support conservation efforts by following designated paths, not carving or drawing graffiti on the wall, not taking bricks or artifacts, and reporting any destructive behavior.";
      }
      break;
  }
  
  return null;
}

// 根据关键词和问题类型生成针对性回答
function generateSpecificAnswer(keywords: string[], questionType: string, landmark: string, isChineseUI: boolean): string | null {
  // 对于不同地标的特殊处理
  const isGreatWall = landmark.toLowerCase().includes("great wall") || landmark.toLowerCase().includes("长城");
  const isEiffelTower = landmark.toLowerCase().includes("eiffel") || landmark.toLowerCase().includes("埃菲尔");
  
  // 根据问题类型和关键词组合生成回答
  if (isGreatWall) {
    // 长城特定问题处理
    if (questionType === "howto" && hasAnyKeyword(keywords, ["去", "到达", "交通", "transport", "怎么去"])) {
      return isChineseUI 
        ? "前往长城有多种交通方式。去八达岭长城可以乘坐877路公交车、S2线火车或参加旅行团。去慕田峪长城可以乘坐916路公交车然后转乘旅游专线车。私家车或出租车是最方便但也是最贵的选择。建议提前规划路线，特别是在旺季，因为交通可能会很拥挤。"
        : "There are several ways to reach the Great Wall. For Badaling section, you can take Bus 877, S2 train, or join a tour group. For Mutianyu section, take Bus 916 and then transfer to a tourist shuttle bus. Private car or taxi is the most convenient but also the most expensive option. It's recommended to plan your route in advance, especially during peak season as transportation can be crowded.";
    }
    
    if (questionType === "when" && hasAnyKeyword(keywords, ["time", "时间", "季节", "season", "最佳", "best"])) {
      return isChineseUI 
        ? "参观长城的最佳时间是春季（4-5月）和秋季（9-10月），这时候天气宜人，风景优美。春季可以看到山花烂漫，秋季则有红叶点缀。夏季（6-8月）气温较高且游客众多，冬季（11-2月）则寒冷但有壮观的雪景。建议避开中国的法定假日如国庆节、春节等，那时游客特别多。长城的开放时间通常是早上8点到下午5点，但具体时间因季节和不同段落而异。"
        : "The best time to visit the Great Wall is during spring (April-May) and autumn (September-October) when the weather is pleasant and the scenery is beautiful. Spring offers blooming wildflowers, while autumn provides colorful foliage. Summer (June-August) can be hot with more tourists, and winter (November-February) is cold but offers spectacular snow views. Avoid Chinese national holidays like National Day and Spring Festival when it gets extremely crowded. Opening hours are typically from 8am to 5pm, but exact times vary by season and section.";
    }
    
    if (questionType === "opinion" || (questionType === "general" && hasAnyKeyword(keywords, ["好玩", "worth", "值得", "should"]))) {
      return isChineseUI 
        ? "长城绝对值得一游！作为世界文化遗产和人类历史上最伟大的建筑之一，它不仅有着壮观的历史和建筑价值，还能让您领略到令人惊叹的自然风景。登上长城，远眺连绵起伏的山脉和蜿蜒曲折的城墙，那种感受是无与伦比的。虽然爬长城可能会有些体力消耗，但当您到达高处欣赏到那壮丽的全景时，所有的疲惫都会烟消云散。无论是摄影爱好者还是历史文化爱好者，长城都能带给您难忘的体验。"
        : "The Great Wall is absolutely worth visiting! As a UNESCO World Heritage Site and one of the greatest architectural achievements in human history, it offers not only impressive historical and architectural value but also breathtaking natural scenery. Standing on the Wall and looking out at the undulating mountains and winding fortifications is an incomparable experience. While climbing may require some physical effort, when you reach the higher sections and take in the magnificent panorama, all fatigue disappears. Whether you're a photography enthusiast or a history and culture lover, the Great Wall will give you an unforgettable experience.";
    }
    
    if (hasAnyKeyword(keywords, ["哪里", "section", "段", "which", "best", "最好"])) {
      return isChineseUI 
        ? "长城有多个不同特色的段落可供参观：八达岭是最受欢迎的段落，设施完善，交通便利，但游客较多；慕田峪保存完好，景色优美，有缆车可乘坐，游客相对较少；金山岭风景壮观，是摄影爱好者的天堂；司马台可以夜游，有独特的体验；箭扣长城则是徒步爱好者的挑战，风景原始但难度较大。根据您的体力、时间和偏好，八达岭和慕田峪是首次游客的最佳选择。"
        : "The Great Wall has several distinctive sections for visitors: Badaling is the most popular with excellent facilities and easy access, but it's often crowded; Mutianyu is well-preserved with beautiful scenery, cable car access, and fewer tourists; Jinshanling offers spectacular views and is a paradise for photographers; Simatai provides night tours for a unique experience; Jiankou is challenging for hiking enthusiasts with pristine views but higher difficulty. Depending on your fitness level, time, and preferences, Badaling and Mutianyu are the best choices for first-time visitors.";
    }
  }
  
  if (isEiffelTower) {
    // 埃菲尔铁塔特定问题处理
    if (questionType === "howto" && hasAnyKeyword(keywords, ["去", "到达", "交通", "transport", "怎么去"])) {
      return isChineseUI 
        ? "到达埃菲尔铁塔最方便的方式是乘坐巴黎地铁。您可以在Bir-Hakeim站(6号线)、Trocadéro站(6号和9号线)或Champ de Mars-Tour Eiffel站(RER C线)下车，然后步行几分钟即可到达。巴黎市内也有多条公交线路经过铁塔附近。如果您喜欢步行，从塞纳河畔或香榭丽舍大街散步到铁塔也是一种享受。"
        : "The most convenient way to reach the Eiffel Tower is by Paris Metro. You can get off at Bir-Hakeim station (Line 6), Trocadéro station (Lines 6 and 9), or Champ de Mars-Tour Eiffel station (RER Line C), then walk a few minutes to reach the tower. There are also several bus lines that pass near the tower within Paris. If you enjoy walking, strolling to the tower from the Seine riverbank or Champs-Élysées is also a pleasant experience.";
    }
    
    if (hasAnyKeyword(keywords, ["票", "价格", "费用", "price", "ticket", "cost"])) {
      return isChineseUI 
        ? "埃菲尔铁塔的票价根据您想要上到的楼层和选择的上行方式而不同。步行到二层的票价约为11欧元，乘电梯到二层约为17欧元，乘电梯到顶层约为26欧元。儿童、青少年和残障人士有优惠票价。强烈建议提前在官网购票，这样可以避免长时间排队等候，特别是在旅游旺季。网站上也提供'免排队'选项，虽然价格稍高但可以节省大量时间。"
        : "Eiffel Tower ticket prices vary depending on how high you want to go and how you choose to ascend. Walking to the 2nd floor costs about €11, taking the elevator to the 2nd floor costs about €17, and going to the top by elevator costs about €26. Discounted rates are available for children, youth, and people with disabilities. It's strongly recommended to purchase tickets in advance on the official website to avoid long waiting times, especially during peak tourist season. 'Skip the line' options are also available online, which cost a bit more but can save you considerable time.";
    }
    
    if (questionType === "when" && hasAnyKeyword(keywords, ["time", "时间", "季节", "season", "最佳", "best"])) {
      return isChineseUI 
        ? "参观埃菲尔铁塔的最佳时间是春季(4-6月)和秋季(9-10月)，此时天气宜人且游客相对较少。铁塔的开放时间通常是早上9:30至晚上11:45，但夏季会延长至午夜12:45。要想避开人群，建议在开门时或晚上9点后前往。日落时分是最受欢迎的时段，可以欣赏巴黎的黄昏美景和铁塔亮灯。每个整点，铁塔会有五分钟的闪烁灯光秀，非常壮观，尤其是在夜晚。"
        : "The best time to visit the Eiffel Tower is during spring (April-June) and fall (September-October) when the weather is pleasant and there are fewer tourists. The tower is typically open from 9:30 AM to 11:45 PM, with extended hours until 12:45 AM in summer. To avoid crowds, it's best to go right when it opens or after 9 PM. Sunset is the most popular time as you can enjoy Paris's twilight views and see the tower illumination. Every hour on the hour after sunset, the tower features a five-minute sparkling light show that is spectacular, especially at night.";
    }
  }
  
  // 通用问题处理
  if (questionType === "recommendation" || hasAnyKeyword(keywords, ["recommend", "suggestion", "推荐", "建议"])) {
    if (isGreatWall) {
      return isChineseUI
        ? "对于长城游览，我建议您：1) 穿着舒适的鞋子和轻便的衣物，因为会有大量的步行和攀爬；2) 带足够的水和一些小零食，特别是在炎热的天气；3) 提前购买门票，避免排队；4) 考虑雇用当地导游，了解更多历史背景；5) 尽量避开周末和节假日，选择工作日参观；6) 在慕田峪或八达岭段落开始您的长城之旅，这些地方设施完善且交通便利；7) 为相机准备足够的存储空间，您一定会拍摄很多照片。"
        : "For visiting the Great Wall, I recommend: 1) Wear comfortable shoes and light clothing as there will be lots of walking and climbing; 2) Bring plenty of water and some snacks, especially in hot weather; 3) Purchase tickets in advance to avoid queues; 4) Consider hiring a local guide to learn more about the historical background; 5) Try to avoid weekends and holidays, opt for weekdays instead; 6) Start your Great Wall journey at Mutianyu or Badaling sections, which have good facilities and are easily accessible; 7) Prepare sufficient storage space for your camera as you'll definitely take many photos.";
    }
    
    if (isEiffelTower) {
      return isChineseUI
        ? "参观埃菲尔铁塔的建议：1) 提前在官网购买门票，选择指定入场时间以避免长队；2) 考虑在非高峰时段参观，如早上开放时或晚上9点后；3) 如果体力允许，步行上二层可以节省等待电梯的时间，并欣赏不同的视角；4) 铁塔二层和顶层都有餐厅，但需要提前预订；5) 从Trocadéro广场观赏铁塔全景是拍照的最佳地点；6) 在日落时分参观，可以欣赏日落美景并看到铁塔亮灯；7) 带上双筒望远镜，从顶层可以看到更远的巴黎景色。"
        : "Recommendations for visiting the Eiffel Tower: 1) Purchase tickets in advance on the official website, choosing a specific entry time to avoid long queues; 2) Consider visiting during off-peak hours, such as early opening or after 9 PM; 3) If physically able, walking up to the 2nd floor can save time waiting for elevators and offers different perspectives; 4) There are restaurants on the 2nd floor and top level, but reservations are required; 5) Trocadéro Plaza offers the best vantage point for photographing the entire tower; 6) Visit during sunset to enjoy the beautiful twilight views and see the tower illumination; 7) Bring binoculars to see further Paris landmarks from the top level.";
    }
  }
  
  // 未能匹配到具体问题类型和关键词
  return null;
}

// 检查关键词列表中是否包含任一指定关键词
function hasAnyKeyword(keywords: string[], targetKeywords: string[]): boolean {
  return keywords.some(keyword => 
    targetKeywords.some(target => 
      keyword.toLowerCase().includes(target.toLowerCase()) || 
      target.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, landmark, language, history } = body;
    
    // 如果没有提供消息或地标名称，返回错误
    if (!message || !landmark) {
      return NextResponse.json(
        { error: '请提供消息和地标名称' },
        { status: 400 }
      );
    }
    
    // 智能处理流程
    let answer = null;
    let responseSource = "unknown";
    
    // 首先尝试使用智能回复系统生成答案
    const smartAnswer = generateSmartResponse(message, landmark, language || 'Chinese');
    if (smartAnswer) {
      answer = smartAnswer;
      responseSource = "smart";
    } else {
      // 如果智能回复系统未能生成答案，尝试匹配问答数据库
      const qaMatch = matchQuestion(message, landmark, language || 'Chinese');
      if (qaMatch) {
        answer = qaMatch;
        responseSource = "qa";
      } else {
        // 使用模拟数据和后续对话处理
        answer = getMockResponse(landmark, language || 'Chinese', message, history);
        responseSource = "mock";
      }
    }
    
    // 日志记录，便于分析和改进系统（生产环境可以发送到分析系统）
    console.log(`Query: "${message.substring(0, 50)}..." | Landmark: ${landmark} | Source: ${responseSource}`);
    
    return NextResponse.json({ 
      answer,
      source: responseSource
    });
  } catch (error: any) {
    console.error('处理请求错误:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 