import axios from 'axios';

// API配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const DEEPSEEK_MODEL = 'Qwen/QwQ-32B';

// 默认使用OpenAI API，如果设置USE_DEEPSEEK=true则使用DeepSeek API
const USE_DEEPSEEK = false; // 可以根据需要修改此处或通过环境变量设置

// 获取当前配置
const getCurrentConfig = () => {
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
const handleApiError = (error: any) => {
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

// 获取景点信息的函数
export async function getLandmarkInfo(landmarkName: string, language: string = 'Chinese') {
  const config = getCurrentConfig();
  
  try {
    const prompt = `请提供关于${landmarkName}的以下信息:
1. 历史背景
2. 文化意义
3. 建筑特点
4. 最佳参观时间
5. 有趣的事实
请用${language}语言回答，并保持信息的准确性和教育意义。`;

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

// 获取旅行建议的函数
export async function getTravelRecommendations(destination: string, interests: string[], language: string = 'Chinese') {
  const config = getCurrentConfig();
  
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

// 生成旅游行程的函数
export async function generateItinerary(destination: string, days: number, preferences: string[], language: string = 'Chinese') {
  const config = getCurrentConfig();
  
  try {
    const preferencesText = preferences.join('、');
    const prompt = `请为我生成一个${days}天的${destination}旅行行程。
我的偏好是${preferencesText}。
请包括:
1. 每天的行程安排（上午、下午、晚上）
2. 推荐的景点和活动
3. 餐饮建议
4. 交通方式
5. 时间管理提示
请用${language}语言回答，并考虑到景点之间的距离和合理安排。`;

    // 创建配置的深拷贝并修改token限制
    const requestConfig = JSON.parse(JSON.stringify(config.defaultConfig));
    requestConfig.max_tokens = 1024; // 增加token上限以获取更完整的行程

    const response = await axios.post(
      config.apiUrl,
      {
        ...requestConfig,
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

// 获取语音讲解的文本
export async function getAudioNarration(landmark: string, aspect: string, language: string = 'Chinese') {
  const config = getCurrentConfig();
  
  try {
    const prompt = `请为游客提供一段关于${landmark}的${aspect}的语音导览脚本。
脚本应该:
1. 简洁明了（约200-300字）
2. 生动有趣
3. 包含关键信息和有趣事实
4. 适合口语朗读
请用${language}语言回答，确保语调友好且易于理解。`;

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