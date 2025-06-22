import axios from 'axios';

// API配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const DEEPSEEK_MODEL = 'Qwen/QwQ-32B';

// 默认使用OpenAI API，如果设置USE_DEEPSEEK=true则使用DeepSeek API
const USE_DEEPSEEK = process.env.USE_DEEPSEEK === 'true';

// 始终使用模拟数据（无论API密钥是否配置）
const USE_MOCK_DATA = true; // 修改为强制使用模拟数据

// 获取当前配置
export const getCurrentConfig = () => {
  if (USE_DEEPSEEK) {
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
  } else {
    return {
      apiKey: OPENAI_API_KEY,
      apiUrl: OPENAI_API_URL,
      model: OPENAI_MODEL,
      // OpenAI特定配置
      defaultConfig: {
        model: OPENAI_MODEL,
        temperature: 0.7,
        max_tokens: 512,
        top_p: 0.7,
        frequency_penalty: 0.5,
        n: 1
      }
    };
  }
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
const generateMockData = (landmarkName: string, language: string = 'Chinese') => {
  console.log('使用模拟数据，因为API密钥未配置');
  
  const isEnglish = language.toLowerCase().includes('english');
  
  // 基于地标名生成一致的模拟数据
  if (landmarkName.toLowerCase().includes('great wall') || landmarkName.includes('长城')) {
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
};

// 通用的请求AI回答函数
async function requestAIResponse(prompt: string, language: string = 'Chinese') {
  // 如果API密钥未配置，使用模拟数据
  if (USE_MOCK_DATA) {
    return {
      success: true,
      data: generateMockData(prompt, language)
    };
  }
  
  const config = getCurrentConfig();
  
  try {
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

    return {
      success: true,
      data: response.data.choices[0].message.content
    };
  } catch (error) {
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
   - 每个景点的具体游览时间（例如：9:00-11:30）
   - 景点之间的具体交通方式（如地铁2号线、出租车、步行10分钟等）
   - 具体餐厅推荐（包括餐厅名称和特色菜品）
   - 详细的活动描述，而不是简单的"自由活动"
   - 合理安排每天的行程，考虑景点之间的距离和游览时间

3. 住宿建议：
   - 根据预算提供2-3个具体的酒店或住宿区域推荐
   - 说明酒店的大致价格区间和特点

4. 实用信息：
   - 必备物品清单
   - 交通卡/景点通票等信息
   - 重要景点的开放时间和门票价格
   - 当地特色体验活动的预订建议

请确保行程安排合理可行，节奏适中，既能充分体验${destination}的特色，又不会过于紧凑疲惫。针对${preferencesText}的偏好，请特别突出相关的景点和体验。`
      : `Please design a detailed ${daysText} travel itinerary for ${destination}. Traveler preferences: ${preferences.join(', ')}.
${extraInfo ? extraInfo + '\n' : ''}
Please provide the following with clear formatting and specific, practical content:

1. Itinerary Overview: Briefly describe the highlights and features of this trip (about 100 words)

2. Detailed Daily Schedule:
   - Specify exact attraction names, not just general "visit attractions"
   - Concrete visiting times for each site (e.g., 9:00-11:30)
   - Specific transportation methods between attractions (subway line 2, taxi, 10-minute walk, etc.)
   - Specific restaurant recommendations (including restaurant names and signature dishes)
   - Detailed activity descriptions, not just "free time"
   - Arrange each day's itinerary reasonably, considering distances between attractions and visiting times

3. Accommodation Suggestions:
   - Provide 2-3 specific hotel recommendations or areas based on budget
   - Indicate approximate price ranges and features of hotels

4. Practical Information:
   - Essential items checklist
   - Information on transportation cards/attraction passes
   - Opening hours and ticket prices for major attractions
   - Booking recommendations for local experience activities

Please ensure the itinerary is reasonable and feasible, with a moderate pace that allows thoroughly experiencing ${destination}'s features without being too hectic or tiring. For the preferences of ${preferences.join(', ')}, please particularly highlight relevant attractions and experiences.`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
} 