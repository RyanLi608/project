import { NextRequest, NextResponse } from 'next/server';
import { getLandmarkInfo } from '@/lib/api/deepseek';

// 定义类型
type AspectKey = "历史" | "文化" | "建筑" | "Historical" | "Cultural" | "Architectural";
type LanguageKey = "Chinese" | "English";
type LandmarkKey = "Great Wall of China" | "Eiffel Tower" | "Taj Mahal" | "default";

interface LandmarkData {
  [landmark: string]: {
    [language: string]: {
      [aspect: string]: string;
    };
  };
}

// 模拟数据
const mockData: LandmarkData = {
  "Great Wall of China": {
    "Chinese": {
      "历史": "中国长城的历史可以追溯到公元前7世纪，当时各国开始修建防御工事。现在我们看到的大部分长城是明朝修建的，目的是防御北方游牧民族的入侵。长城全长超过21,000公里，横跨中国北部多个省份，是世界上最伟大的人工建筑之一。长城不仅是军事防御工程，也体现了古代中国的工程技术和智慧。",
      "文化": "长城是中国古代文明的重要象征，体现了中华民族的坚韧精神和团结意志。它已成为中国的国家象征，代表着中华文明的延续与发展。长城的建造汇集了全国的人力和物力，展示了中国古代社会的组织能力。每年有数百万游客前来参观，它已经成为连接中国与世界的文化桥梁。",
      "建筑": "长城的建筑特点包括城墙、敌楼、烽火台和关隘等多种防御设施。墙体宽度通常在4-5米之间，高度为5-8米，由石块、砖块和夯土构成。长城因地制宜，根据地形特点采用不同的建筑方法，有的依山而建，有的跨越峡谷。砖石结构与当地自然环境完美融合，展示了古代建筑师的智慧。"
    },
    "English": {
      "Historical": "The history of the Great Wall of China dates back to the 7th century BC when various states began building defensive structures. Most of what we see today was built during the Ming Dynasty to defend against northern nomadic tribes. Spanning over 21,000 kilometers across northern China, it is one of the greatest man-made structures in the world. The Great Wall is not just a military defense project but also embodies the engineering technology and wisdom of ancient China.",
      "Cultural": "The Great Wall is an important symbol of ancient Chinese civilization, reflecting the tenacity and unity of the Chinese nation. It has become a national symbol of China, representing the continuity and development of Chinese civilization. The construction of the Great Wall gathered manpower and resources from across the country, demonstrating the organizational ability of ancient Chinese society. Millions of tourists visit each year, making it a cultural bridge connecting China with the world.",
      "Architectural": "The architectural features of the Great Wall include various defensive facilities such as wall structures, enemy towers, beacon towers, and passes. The wall typically measures 4-5 meters in width and 5-8 meters in height, constructed with stones, bricks, and rammed earth. The Great Wall adapts to local conditions, using different construction methods based on terrain features - some sections follow mountain ridges while others cross valleys. The brick and stone structures blend perfectly with the natural environment, showcasing the wisdom of ancient architects."
    }
  },
  "Eiffel Tower": {
    "Chinese": {
      "历史": "埃菲尔铁塔由工程师古斯塔夫·埃菲尔设计，于1887年开始建造，1889年完工，作为1889年世界博览会的入口拱门，同时庆祝法国大革命100周年。铁塔最初只是临时建筑，计划存在20年后拆除，但因其对无线电通信的价值而得以保留。在建造时，许多艺术家和知识分子抗议这座'怪物'会破坏巴黎的美感，而如今它已成为巴黎的象征。",
      "文化": "埃菲尔铁塔已成为法国文化的重要象征，代表着浪漫、艺术和工程创新。它出现在无数电影、绘画和文学作品中，成为全球文化中的标志性形象。铁塔每年吸引约700万游客，是世界上参观人数最多的收费景点之一。夜晚的灯光表演使铁塔成为'光之城'巴黎的璀璨明珠，每小时闪烁五分钟，为城市增添魅力。",
      "建筑": "埃菲尔铁塔高324米，由18,038块金属部件和250万个铆钉组成，总重量约10,100吨。它的设计充分考虑了风力阻力，使用开放式结构减少风阻。铁塔分为三层对公众开放：第一层和第二层有餐厅，顶层有观景台提供巴黎全景。铁塔使用普德尔钢材料，每七年重漆一次以防锈蚀。夏季高温时，铁塔会因热膨胀而增高约15厘米。"
    },
    "English": {
      "Historical": "The Eiffel Tower was designed by engineer Gustave Eiffel, construction began in 1887 and was completed in 1889, serving as the entrance arch for the 1889 World's Fair and celebrating the centennial of the French Revolution. Initially, the tower was only a temporary structure planned to be dismantled after 20 years but was preserved for its value in radio communications. During construction, many artists and intellectuals protested that this 'monster' would ruin the aesthetics of Paris, yet today it has become the symbol of the city.",
      "Cultural": "The Eiffel Tower has become an important symbol of French culture, representing romance, art, and engineering innovation. It appears in countless films, paintings, and literary works, becoming an iconic image in global culture. The tower attracts about 7 million visitors annually, making it one of the most visited paid monuments in the world. The nightly light show makes the tower a dazzling jewel in Paris, 'the City of Light,' sparkling for five minutes every hour and adding charm to the city.",
      "Architectural": "Standing 324 meters tall, the Eiffel Tower is made of 18,038 metallic parts held together by 2.5 million rivets, weighing approximately 10,100 tonnes. Its design fully considers wind resistance, using an open structure to reduce wind loads. The tower has three levels open to the public: restaurants on the first and second levels, and an observation deck offering panoramic views of Paris at the top. It is made of puddled iron and is repainted every seven years to prevent rust. During hot summer days, the tower can expand by about 15 centimeters due to thermal expansion."
    }
  },
  "Taj Mahal": {
    "Chinese": {
      "历史": "泰姬陵是印度著名的象牙白大理石陵墓，位于北印度的阿格拉市。它由莫卧儿帝国的第五位皇帝沙贾汗于1631年至1653年间建造，是为了纪念他深爱的第三任妻子慕塔兹·玛哈尔（在生产第14个孩子时去世）。泰姬陵是世界文化遗产，也是世界新七大奇迹之一，被公认为是莫卧儿建筑的杰作，融合了波斯、土耳其、印度和伊斯兰建筑风格。",
      "文化": "泰姬陵不仅是印度最重要的文化象征之一，也是永恒爱情的全球性象征。它代表了莫卧儿时期艺术和建筑的巅峰，展示了伊斯兰艺术在印度次大陆的融合与发展。泰姬陵每年吸引数百万游客，是印度旅游业的重要支柱。在印度文化中，它象征着纯洁、美丽和永恒的爱情，常常出现在文学、电影和音乐作品中。对于穆斯林信徒来说，它也是一个重要的朝圣地和祈祷场所。",
      "建筑": "泰姬陵是一座由白色大理石建造的陵墓，坐落在四分之一平方公里的园林之中。建筑主体是一个对称的建筑，中央有一个巨大的圆顶（高约73米），四角各有一座小尖塔。整个建筑物矗立在一个高台上，前方是一个反映泰姬陵倒影的长方形水池。大理石表面镶嵌有数千颗宝石，形成精美的花卉和几何图案。建筑内部有精细的雕刻和镶嵌工艺，展示了当时最高水平的工艺技术。泰姬陵的设计遵循了完美的对称性，除了沙贾汗和慕塔兹的陵墓位置略有不同外，整个建筑从任何角度看都是对称的。"
    },
    "English": {
      "Historical": "The Taj Mahal is an ivory-white marble mausoleum located in Agra, northern India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal, who died during childbirth. Construction was completed around 1653. The Taj Mahal is recognized as a UNESCO World Heritage Site and one of the New Seven Wonders of the World. It represents the peak of Mughal architecture, combining elements from Persian, Turkish, Indian, and Islamic architectural styles.",
      "Cultural": "The Taj Mahal is not only India's most iconic cultural symbol but also a universal emblem of eternal love. It represents the pinnacle of art and architecture during the Mughal period, showcasing the integration and development of Islamic art in the Indian subcontinent. Attracting millions of visitors annually, it's a vital pillar of India's tourism industry. In Indian culture, it symbolizes purity, beauty, and everlasting love, frequently appearing in literature, film, and music. For Muslim devotees, it's also an important pilgrimage site and place of prayer.",
      "Architectural": "The Taj Mahal is a white marble mausoleum situated within a 42-acre garden complex. The main structure features a symmetrical building with a large central dome (about 73 meters tall) and four smaller minarets at each corner. The entire structure stands on a raised platform, with a rectangular reflecting pool in front that mirrors the Taj's image. The marble surfaces are inlaid with thousands of semi-precious stones forming intricate floral and geometric patterns. The interior showcases delicate carvings and pietra dura work, demonstrating the highest level of craftsmanship of the time. The design follows perfect symmetry, with only the positions of Shah Jahan's and Mumtaz's tombs slightly differing, while the rest of the structure appears symmetrical from any angle."
    }
  },
  "default": {
    "Chinese": {
      "历史": "这个景点拥有丰富的历史背景，经历了多个时代的变迁和发展。它见证了当地的重要历史事件，并在不同时期发挥了重要作用。随着时间的推移，这个地方逐渐形成了独特的历史文化内涵，吸引着来自世界各地的游客前来探索和了解。",
      "文化": "这个地方拥有独特的文化魅力，反映了当地人民的生活方式、价值观和艺术表达。作为文化遗产，它保存了珍贵的传统习俗和艺术形式，同时也融合了现代元素，形成了独特的文化体验。这里的文化活动丰富多彩，为游客提供了深入了解当地文化的机会。",
      "建筑": "这座建筑展示了精湛的设计和工艺，其建筑风格反映了特定历史时期的审美和技术水平。建筑结构经过精心设计，既考虑了实用性，也注重美观性。从细节处可以看出建筑师的匠心独运，每一个装饰元素都有其特定的含义和价值。这座建筑是建筑艺术的杰出代表，值得细细品味。"
    },
    "English": {
      "Historical": "This landmark has a rich historical background, having gone through transitions and developments across multiple eras. It has witnessed important historical events in the area and played significant roles during different periods. Over time, this place has gradually formed unique historical and cultural connotations, attracting tourists from around the world to explore and understand its legacy.",
      "Cultural": "This place possesses unique cultural charm, reflecting the lifestyle, values, and artistic expressions of the local people. As a cultural heritage, it preserves precious traditional customs and art forms while integrating modern elements to create a unique cultural experience. The rich and diverse cultural activities here provide visitors with opportunities to deeply understand the local culture.",
      "Architectural": "This building showcases exquisite design and craftsmanship, with an architectural style reflecting the aesthetics and technical levels of a specific historical period. The structure is carefully designed, considering both practicality and aesthetics. The architect's ingenuity can be seen in the details, with each decorative element having its specific meaning and value. This building is an outstanding representative of architectural art, worthy of careful appreciation."
    }
  }
};

// 获取模拟数据
function getMockData(landmark: string, aspect: string, language: string): string | null {
  // 标准化名称处理
  const normalizedName = landmark.toLowerCase();
  const normalizedAspect = aspect.toLowerCase();
  
  let key: LandmarkKey = "default";
  if (normalizedName.includes("great wall") || normalizedName.includes("长城")) {
    key = "Great Wall of China";
  } else if (normalizedName.includes("eiffel") || normalizedName.includes("埃菲尔")) {
    key = "Eiffel Tower";
  } else if (normalizedName.includes("taj mahal") || normalizedName.includes("泰姬陵")) {
    key = "Taj Mahal";
  }
  
  const langKey: LanguageKey = language.toLowerCase().includes("english") ? "English" : "Chinese";
  
  // 映射方面关键词到数据键
  let aspectKey: AspectKey = "历史";
  if (langKey === "English") {
    aspectKey = "Historical";
    
    if (normalizedAspect.includes("cultur") || normalizedAspect.includes("art")) {
      aspectKey = "Cultural";
    } else if (normalizedAspect.includes("architect") || normalizedAspect.includes("structure") || normalizedAspect.includes("build")) {
      aspectKey = "Architectural";
    }
  } else {
    if (normalizedAspect.includes("文化") || normalizedAspect.includes("艺术")) {
      aspectKey = "文化";
    } else if (normalizedAspect.includes("建筑") || normalizedAspect.includes("结构")) {
      aspectKey = "建筑";
    }
  }
  
  try {
    return mockData[key][langKey][aspectKey];
  } catch (error) {
    console.error("模拟数据获取错误:", error);
    return null;
  }
}

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
    // 先尝试获取模拟数据
    const mockResponse = getMockData(landmark, aspect, language);
    if (mockResponse) {
      console.log(`使用模拟数据: ${landmark}, ${aspect}, ${language}`);
      return NextResponse.json({ data: mockResponse });
    }
    
    // 否则通过API获取数据
    // 这里我们使用同样的方法获取信息，但增加了特定方面的提示
    // 在实际应用中，可能需要一个专门的语音导览API
    const prompt = `请专门讲解${landmark}的${aspect}方面的内容，用${language}语言表达，使内容更适合语音导览。`;
    
    const result = await getLandmarkInfo(prompt, language as string);
    
    if (result.success) {
      return NextResponse.json({ data: result.data });
    } else {
      console.error('API请求失败:', result.error);
      // 如果API请求失败，尝试使用hooks中的模拟数据（通过客户端处理）
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