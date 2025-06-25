import axios from 'axios';

// API配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || 'sk-d0c2f1c4d8ef4f0e8c9a8d8ef4f0e8c9a';  // 使用默认密钥确保API调用
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';  // 使用正确的DeepSeek API URL
const DEEPSEEK_MODEL = 'deepseek-chat';  // 使用正确的模型名称

// 强制使用DeepSeek API
const USE_DEEPSEEK = true;

// 禁用模拟数据
const USE_MOCK_DATA = false;

// 获取当前配置
export const getCurrentConfig = () => {
  // 添加调试日志
  console.log('Environment Variables Status:');
  console.log('OPENAI_API_KEY:', OPENAI_API_KEY ? '已设置' : '未设置');
  console.log('DEEPSEEK_API_KEY:', DEEPSEEK_API_KEY ? '已设置' : '未设置');
  console.log('USE_DEEPSEEK:', USE_DEEPSEEK);
  console.log('USE_MOCK_DATA:', USE_MOCK_DATA);
  
  // 强制使用DeepSeek配置
  return {
    apiKey: DEEPSEEK_API_KEY,
    apiUrl: DEEPSEEK_API_URL,
    model: DEEPSEEK_MODEL,
    // DeepSeek特定配置
    defaultConfig: {
      model: DEEPSEEK_MODEL,
      stream: false,
      max_tokens: 512,
      enable_thinking: false,
      thinking_budget: 4096,
      min_p: 0.05,
      stop: null,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1,
      response_format: {
        type: "text"
      }
    }
  };
};

// 错误处理函数
export const handleApiError = (error: any) => {
  const apiName = USE_DEEPSEEK ? 'DeepSeek' : 'OpenAI';
  console.error(`${apiName} API Error:`, error);
  
  if (error.response) {
    // API返回了错误响应
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    return `API错误: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
  } else if (error.request) {
    // 请求已发出，但没有收到响应
    console.error('No response received:', error.request);
    return '服务器未响应，请稍后再试';
  } else {
    // 设置请求时发生了错误
    console.error('Request error:', error.message);
    return `请求错误: ${error.message}`;
  }
};

// 生成模拟数据
export function generateMockLandmarkInfo(landmarkName: string, language: string = 'Chinese') {
  console.log('使用模拟数据生成景点信息:', landmarkName);
  
  const isEnglish = language.toLowerCase().includes('english');
  const lowerName = landmarkName.toLowerCase();
  
  // 长城
  if (lowerName.includes('great wall') || lowerName.includes('长城')) {
    return isEnglish 
      ? `The Great Wall of China is one of the most impressive architectural feats in human history. Built over centuries by various Chinese dynasties, primarily during the Ming Dynasty (1368-1644).

1. Historical Background: Construction began as early as the 7th century BC, with various walls being built by different states. The most well-preserved sections today date from the Ming Dynasty. It was built primarily for defense against nomadic tribes from the north.

2. Cultural Significance: The Great Wall symbolizes China's endurance and historical resilience. It represents the unification of China and has become the country's most recognizable cultural symbol internationally.

3. Architectural Features: The wall stretches approximately 13,171 miles (21,196 kilometers) across northern China. It includes watchtowers, garrison stations, and beacon towers. The wall's height typically ranges from 5-8 meters, with a width of 4-5 meters at the base.

4. Best Time to Visit: Spring (April-May) and autumn (September-October) offer the most comfortable temperatures and beautiful scenery. Avoid national holidays when it becomes extremely crowded.

5. Interesting Facts: Contrary to popular belief, the Great Wall is not visible from space with the naked eye. The mortar used in some sections included sticky rice, which contributed to its durability. The wall crosses nine provinces and municipalities.`
      : `中国长城是人类历史上最令人印象深刻的建筑成就之一。它由多个中国朝代修建，主要是在明朝（1368-1644年）期间。

1. 历史背景：长城的修建最早可追溯到公元前7世纪，不同的国家修建了各种墙壁。今天保存最完好的部分来自明朝。它主要是为了防御来自北方的游牧部落。

2. 文化意义：长城象征着中国的耐力和历史韧性。它代表着中国的统一，并已成为国际上最具辨识度的中国文化象征。

3. 建筑特点：长城横跨中国北部约21,196公里（13,171英里）。它包括了烽火台、驻军站和瞭望塔。墙的高度通常在5-8米之间，底部宽度为4-5米。

4. 最佳参观时间：春季（4-5月）和秋季（9-10月）提供最舒适的温度和美丽的风景。避开国家假日，因为那时会非常拥挤。

5. 有趣的事实：与普遍的看法相反，长城从太空中用肉眼是看不见的。一些部分使用的砂浆中包含糯米，这有助于其耐久性。长城横跨九个省份和直辖市。`;
  }
  
  // 埃菲尔铁塔
  if (lowerName.includes('eiffel') || lowerName.includes('埃菲尔')) {
    return isEnglish 
      ? `The Eiffel Tower is an iconic iron lattice tower located on the Champ de Mars in Paris, France. It has become a global cultural symbol of France and one of the most recognizable structures in the world.

1. Historical Background: The tower was built by Gustave Eiffel for the 1889 World's Fair, which celebrated the centennial of the French Revolution. Initially criticized by some of France's leading artists and intellectuals, it was meant to be a temporary exhibit but became a permanent fixture due to its popularity and utility for communication purposes.

2. Cultural Significance: The Eiffel Tower has become the most-visited paid monument in the world and an enduring symbol of Paris and French culture. It appears in countless films, artworks, and photographs, and has inspired replicas around the world.

3. Architectural Features: Standing at 324 meters (1,063 feet) tall, it was the tallest man-made structure in the world until the completion of the Chrysler Building in New York in 1930. The tower has three levels for visitors, with restaurants on the first and second levels. The top level's upper platform is 276 meters (906 feet) above the ground, offering panoramic views of Paris.

4. Best Time to Visit: Spring (April-May) and fall (September-October) offer pleasant weather and fewer crowds. Early morning or evening visits provide the best experience with shorter lines. The tower is especially magical at night when it sparkles with 20,000 lights for five minutes every hour.

5. Interesting Facts: The Eiffel Tower was originally painted red when it was built, and has been repainted 19 times since then, requiring 60 tons of paint. Gustave Eiffel included a small apartment for himself at the top of the tower. The tower actually grows in summer due to thermal expansion of the metal, making it up to 15 cm (6 inches) taller.`
      : `埃菲尔铁塔是位于法国巴黎战神广场上的标志性铁格构塔。它已成为法国的全球文化象征，也是世界上最具辨识度的建筑之一。

1. 历史背景：这座塔由古斯塔夫·埃菲尔为1889年世界博览会而建，该博览会庆祝法国大革命百年纪念。最初受到法国一些领先艺术家和知识分子的批评，它原本只是一个临时展览，但由于其受欢迎程度和通信用途的实用性，它成为了永久性建筑。

2. 文化意义：埃菲尔铁塔已成为世界上参观人数最多的付费纪念碑，也是巴黎和法国文化的持久象征。它出现在无数电影、艺术作品和照片中，并在世界各地激发了复制品的建造。

3. 建筑特点：塔高324米（1,063英尺），直到1930年纽约克莱斯勒大厦建成前，它一直是世界上最高的人造结构。该塔有三个对游客开放的层级，第一层和第二层设有餐厅。顶层的上部平台距地面276米（906英尺），提供巴黎的全景视图。

4. 最佳参观时间：春季（4-5月）和秋季（9-10月）天气宜人，游客较少。清晨或傍晚参观能获得最佳体验，排队时间更短。夜晚的铁塔特别神奇，每小时闪烁5分钟，共有20,000盏灯。

5. 有趣的事实：埃菲尔铁塔建成时最初被涂成红色，此后已重新粉刷19次，需要60吨油漆。古斯塔夫·埃菲尔在塔顶为自己设置了一个小公寓。由于金属的热膨胀，该塔在夏季实际上会增高，最多可增高15厘米（6英寸）。`;
  }
  
  // 马拉喀什
  if (lowerName.includes('marrakech') || lowerName.includes('马拉喀什')) {
    return isEnglish 
      ? `Marrakech is a major city in Morocco, located at the foothills of the Atlas Mountains. Known as the "Red City" for its buildings and walls of beaten clay, it's a vibrant cultural hub with a rich history.

1. Historical Background: Founded in 1062 by Abu Bakr ibn Umar, Marrakech became a significant cultural, religious, and trading center for the Maghreb and sub-Saharan Africa. It served as the capital of various Moroccan dynasties, including the Almoravids, Almohads, and Saadians, each leaving their architectural and cultural imprint on the city.

2. Cultural Significance: Marrakech represents the blend of Berber, Arab, and African cultural influences that define Morocco. Its medina (old city) is a UNESCO World Heritage site, and its famous square, Jemaa el-Fnaa, is recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity for its traditional storytellers, musicians, and performers.

3. Architectural Features: The city is known for its distinctive red sandstone walls, the 12th-century Koutoubia Mosque with its 77-meter minaret, lavish palaces like Bahia Palace and El Badi Palace, and the intricate Saadian Tombs. The medina is a maze of narrow streets filled with souks (markets), riads (traditional houses with interior gardens), and hammams (bathhouses).

4. Best Time to Visit: Spring (March-May) and fall (September-November) offer the most pleasant temperatures. Summer can be extremely hot, with temperatures often exceeding 100°F (38°C). Winter evenings can be cool, but daytime temperatures remain comfortable for sightseeing.

5. Interesting Facts: Marrakech's tanneries have been operating using the same traditional methods for over 900 years. The city is home to Majorelle Garden, created by French painter Jacques Majorelle and later owned by fashion designer Yves Saint Laurent. Marrakech has been nicknamed "the Paris of the Sahara" and has inspired countless artists, writers, and designers with its colors, sounds, and scents.`
      : `马拉喀什是摩洛哥的一个主要城市，位于阿特拉斯山脚下。因其建筑和夯土墙壁呈红色而被称为"红色之城"，它是一个充满活力的文化中心，拥有丰富的历史。

1. 历史背景：马拉喀什于1062年由阿布·巴克尔·伊本·乌马尔创建，成为马格里布和撒哈拉以南非洲地区重要的文化、宗教和贸易中心。它曾是多个摩洛哥王朝的首都，包括穆拉比特王朝、穆瓦希德王朝和萨阿德王朝，每个王朝都在城市中留下了他们的建筑和文化印记。

2. 文化意义：马拉喀什代表了定义摩洛哥的柏柏尔、阿拉伯和非洲文化影响的融合。其麦地那（老城区）是联合国教科文组织世界遗产，其著名的广场杰马·艾尔-夫纳因其传统讲故事人、音乐家和表演者被联合国教科文组织认定为人类口头和非物质遗产杰作。

3. 建筑特点：该城市以其独特的红砂岩墙壁、12世纪的库图比亚清真寺及其77米高的宣礼塔、豪华的宫殿如巴伊亚宫和巴迪宫，以及复杂的萨阿德陵墓而闻名。麦地那是一个狭窄街道的迷宫，充满了苏克（市场）、里亚德（带有内部花园的传统房屋）和哈曼（浴室）。

4. 最佳参观时间：春季（3-5月）和秋季（9-11月）提供最宜人的温度。夏季可能非常炎热，温度经常超过38°C（100°F）。冬季的夜晚可能较凉，但白天的温度仍适合观光。

5. 有趣的事实：马拉喀什的制革厂已经使用相同的传统方法运营了900多年。该城市拥有马约雷尔花园，由法国画家雅克·马约雷尔创建，后来由时装设计师伊夫·圣洛朗拥有。马拉喀什被昵称为"撒哈拉的巴黎"，其色彩、声音和气味启发了无数艺术家、作家和设计师。`;
  }
  
  // 金字塔
  if (lowerName.includes('pyramid') || lowerName.includes('金字塔')) {
    return isEnglish 
      ? `The Pyramids of Giza are ancient monumental structures located on the outskirts of Cairo, Egypt. They are the most iconic symbols of Ancient Egyptian civilization and the only surviving wonder of the ancient world.

1. Historical Background: The Pyramids of Giza were built during the Fourth Dynasty of Egypt's Old Kingdom, approximately 4,500 years ago (c. 2560–2540 BC). The Great Pyramid was built for Pharaoh Khufu, the second pyramid for his son Khafre, and the smallest for his grandson Menkaure. They were constructed as elaborate tombs to house the bodies of the pharaohs after death, preparing them for the afterlife according to ancient Egyptian religious beliefs.

2. Cultural Significance: The pyramids represent the pinnacle of ancient Egyptian architectural, engineering, and organizational achievements. They demonstrate the immense power and wealth of the pharaohs, as well as the spiritual importance of preparing for the afterlife in ancient Egyptian culture. Today, they remain Egypt's most important tourist attraction and a symbol of national pride.

3. Architectural Features: The Great Pyramid of Khufu originally stood 146.5 meters (481 feet) tall and contained about 2.3 million stone blocks weighing an average of 2.5 tons each. The precision of the pyramid's construction is remarkable—its base is level to within just 2.1 cm, and its sides are aligned to the cardinal directions with an accuracy of up to 0.05 degrees. The pyramids were originally covered with polished limestone casing stones that would have made them shine brilliantly in the sun.

4. Best Time to Visit: October to April offers the most comfortable temperatures for visiting the pyramids. Early morning or late afternoon visits provide better lighting for photography and fewer crowds. The site opens at 8:00 AM and closes at 5:00 PM, with last entry at 4:00 PM.

5. Interesting Facts: Despite popular belief, historical evidence indicates that the pyramids were built by skilled workers, not slaves. The Great Pyramid was the tallest man-made structure in the world for over 3,800 years until the completion of Lincoln Cathedral in England in 1311 AD. The alignment of the three pyramids mirrors the alignment of the three stars in Orion's Belt. Inside the Great Pyramid, the temperature remains constant at about 20°C (68°F), regardless of the outside temperature.`
      : `吉萨金字塔是位于埃及开罗郊外的古代纪念性建筑。它们是古埃及文明最具标志性的象征，也是古代世界七大奇迹中唯一幸存的奇迹。

1. 历史背景：吉萨金字塔建于埃及古王国第四王朝时期，约4,500年前（公元前2560-2540年）。大金字塔是为法老胡夫建造的，第二座金字塔为其儿子哈夫拉建造，最小的一座为其孙子门卡乌拉建造。根据古埃及宗教信仰，它们被建造为精心设计的陵墓，用于在法老死后安置其遗体，为他们的来世做准备。

2. 文化意义：金字塔代表了古埃及建筑、工程和组织成就的巅峰。它们展示了法老的巨大权力和财富，以及在古埃及文化中为来世做准备的精神重要性。如今，它们仍然是埃及最重要的旅游景点和民族自豪感的象征。

3. 建筑特点：胡夫大金字塔最初高146.5米（481英尺），包含约230万块石块，每块平均重2.5吨。金字塔建造的精确度非常惊人——其基座水平误差仅为2.1厘米，其各边与基本方向的对准精度高达0.05度。金字塔最初覆盖有抛光的石灰石外壳石，这使得它们在阳光下闪闪发光。

4. 最佳参观时间：10月至4月提供最舒适的温度参观金字塔。清晨或傍晚参观提供更好的摄影光线和较少的人群。景点从上午8:00开放至下午5:00，最后入场时间为下午4:00。

5. 有趣的事实：尽管普遍认为，历史证据表明金字塔是由技术熟练的工人而非奴隶建造的。大金字塔是世界上最高的人造结构，保持了超过3,800年的记录，直到1311年英国林肯大教堂建成。三座金字塔的排列反映了猎户座腰带中三颗恒星的排列。在大金字塔内部，无论外部温度如何，温度始终保持在约20°C（68°F）。`;
  }
  
  // 默认模拟数据
  return isEnglish 
    ? `${landmarkName} is a fascinating landmark with rich history and cultural significance.

1. Historical Background: This landmark has a history dating back several centuries, with influences from various historical periods and cultural movements.

2. Cultural Significance: It represents an important symbol in local and global cultural heritage, attracting visitors from around the world.

3. Architectural Features: The structure showcases unique design elements characteristic of its period, with notable features including its distinctive silhouette and intricate details.

4. Best Time to Visit: Spring and fall months typically offer the most pleasant weather conditions and smaller crowds. Early morning visits provide the best lighting for photography.

5. Interesting Facts: The landmark has been featured in numerous films and literary works. It underwent several major renovations throughout history, each adding to its unique character.`
    : `${landmarkName}是一个拥有丰富历史和文化意义的迷人地标。

1. 历史背景：这个地标有着数世纪的历史，受到各个历史时期和文化运动的影响。

2. 文化意义：它在当地和全球文化遗产中代表着重要的象征，吸引着来自世界各地的游客。

3. 建筑特点：该建筑展示了其时期特有的独特设计元素，其显著特点包括其独特的轮廓和复杂的细节。

4. 最佳参观时间：春季和秋季通常提供最宜人的天气条件和较少的人群。清晨参观提供了最佳的摄影光线。

5. 有趣的事实：这个地标在众多电影和文学作品中都有所展示。它在历史上经历了几次重大翻修，每次都为其独特的特性增添了色彩。`;
}

// 通用的请求AI回答函数
export async function requestAIResponse(prompt: string, language: string = 'Chinese') {
  // 强制使用API，不使用模拟数据
  const config = getCurrentConfig();
  console.log('API配置:', {
    apiUrl: config.apiUrl,
    model: config.model,
    apiKeyExists: !!config.apiKey,
  });
  
  try {
    console.log('正在调用DeepSeek API...', config.apiUrl);
    const response = await axios.post(
      config.apiUrl,
      {
        ...config.defaultConfig,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('API调用成功');
    return {
      success: true,
      data: response.data.choices[0].message.content
    };
  } catch (error: any) {
    console.log('API调用失败:', error);
    const errorMessage = handleApiError(error);
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 获取景点信息的函数
export async function getLandmarkInfo(landmarkName: string, language: string = 'Chinese') {
  try {
    const prompt = `请提供关于${landmarkName}的以下信息:
1. 历史背景
2. 文化意义
3. 建筑特点
4. 最佳参观时间
5. 有趣的事实
请用${language}语言回答，并保持信息的准确性和教育意义。`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 获取旅行建议的函数
export async function getTravelRecommendations(destination: string, interests: string[], language: string = 'Chinese') {
  try {
    const interestsText = interests.join('、');
    const prompt = `我计划去${destination}旅行，我对${interestsText}特别感兴趣。
请推荐:
1. 值得参观的地点
2. 当地特色美食
3. 最佳旅行季节
4. 文化礼仪提示
5. 必备物品
请用${language}语言回答，保持建议的实用性和针对性。`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 生成行程规划的函数
export async function generateItinerary(
  destination: string,
  days: number,
  preferences: string[],
  extraInfo: string = '',
  language: string = 'Chinese'
) {
  try {
    const preferencesText = preferences.join('、');
    const daysText = language === 'Chinese' ? `${days}天` : `${days} days`;
    
    // 构建更加详细的提示词，包含额外信息和更多行程细节
    const prompt = language === 'Chinese'
      ? `请为${destination}设计一个${daysText}的详细旅行行程。旅行者偏好：${preferencesText}。
${extraInfo ? extraInfo + '\n' : ''}
请提供以下内容，格式要清晰，内容要具体实用：

1. 行程概述：简要描述此次旅行的亮点和特色（100字左右）

2. 每天的详细安排：
   - 明确具体的景点名称，而不是笼统的"参观景点"
   - 每个景点的具体游览时间（例如：9:00-11:30）和门票价格
   - 景点之间的具体交通方式（如地铁2号线、出租车、步行10分钟等）
   - 具体餐厅推荐（包括餐厅名称、位置、特色菜品及价格）
   - 详细的活动描述，而不是简单的"自由活动"
   - 合理安排每天的行程，考虑景点之间的距离和游览时间
   - 对于每个景点，提供1-2个不容错过的特色或体验

3. 住宿建议：
   - 根据预算提供2-3个具体的酒店或住宿区域推荐
   - 说明酒店的大致价格区间、特点和位置优势
   - 提供酒店的网站或预订方式

4. 实用信息：
   - 必备物品清单（针对${destination}的特点）
   - 交通卡/景点通票等信息和价格
   - 重要景点的开放时间和门票价格
   - 当地特色体验活动的预订建议
   - 紧急联系方式或医疗设施信息
   - 天气提示和最佳穿着建议

请确保行程安排合理可行，节奏适中，既能充分体验${destination}的特色，又不会过于紧凑疲惫。针对${preferencesText}的偏好，请特别突出相关的景点和体验。提供的信息要尽可能准确，包括实际的餐厅名称、景点门票、交通方式和费用等。`
      : `Please design a detailed ${daysText} travel itinerary for ${destination}. Traveler preferences: ${preferences.join(', ')}.
${extraInfo ? extraInfo + '\n' : ''}
Please provide the following with clear formatting and specific, practical content:

1. Itinerary Overview: Briefly describe the highlights and features of this trip (about 100 words)

2. Detailed Daily Schedule:
   - Specify exact attraction names, not just general "visit attractions"
   - Concrete visiting times for each site (e.g., 9:00-11:30) and entrance fees
   - Specific transportation methods between attractions (subway line 2, taxi, 10-minute walk, etc.)
   - Specific restaurant recommendations (including restaurant names, locations, signature dishes and prices)
   - Detailed activity descriptions, not just "free time"
   - Arrange each day's itinerary reasonably, considering distances between attractions and visiting times
   - For each attraction, provide 1-2 must-see features or experiences

3. Accommodation Suggestions:
   - Provide 2-3 specific hotel recommendations or areas based on budget
   - Indicate approximate price ranges, features, and location advantages of hotels
   - Provide hotel websites or booking methods

4. Practical Information:
   - Essential items checklist (specific to ${destination})
   - Information on transportation cards/attraction passes and their prices
   - Opening hours and ticket prices for major attractions
   - Booking recommendations for local experience activities
   - Emergency contact information or medical facilities
   - Weather tips and best clothing suggestions

Please ensure the itinerary is reasonable and feasible, with a moderate pace that allows thoroughly experiencing ${destination}'s features without being too hectic or tiring. For the preferences of ${preferences.join(', ')}, please particularly highlight relevant attractions and experiences. Provide information that is as accurate as possible, including actual restaurant names, attraction tickets, transportation methods and costs.`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
} 