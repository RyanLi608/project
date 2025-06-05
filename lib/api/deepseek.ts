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

// 通用的请求AI回答函数
async function requestAIResponse(prompt: string, language: string = 'Chinese') {
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
  language: string = 'Chinese'
) {
  try {
    const preferencesText = preferences.join('、');
    const daysText = language === 'Chinese' ? `${days}天` : `${days} days`;
    
    const prompt = language === 'Chinese'
      ? `请为${destination}设计一个${daysText}的详细旅行行程。旅行者偏好：${preferencesText}。
行程应包括每天的景点、活动推荐、用餐建议和交通提示。提供合理的时间安排和实用的旅行建议。`
      : `Please design a detailed ${daysText} travel itinerary for ${destination}. Traveler preferences: ${preferences.join(', ')}.
The itinerary should include daily attractions, activity recommendations, dining suggestions, and transportation tips. Provide reasonable timing and practical travel advice.`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
}

// 获取语音导览内容的函数
export async function getAudioNarration(landmark: string, aspect: string, language: string = 'Chinese') {
  try {
    const prompt = `请专门讲解${landmark}的${aspect}方面的内容，用${language}语言表达，使内容更适合语音导览。
内容应该清晰、生动且富有教育意义，长度适中，易于聆听理解。`;

    return await requestAIResponse(prompt, language);
  } catch (error) {
    const errorMessage = handleApiError(error);
    return {
      success: false,
      error: errorMessage
    };
  }
} 