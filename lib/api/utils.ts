interface ApiConfig {
  apiKey: string;
  apiUrl: string;
  defaultConfig: any;
}

// 获取OpenAI配置
function getOpenAIConfig(): ApiConfig {
  return {
    apiKey: process.env.OPENAI_API_KEY || '',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    defaultConfig: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000
    }
  };
}

// 获取DeepSeek配置
function getDeepSeekConfig(): ApiConfig {
  return {
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    defaultConfig: {
      model: 'deepseek-chat',
      temperature: 0.7,
      max_tokens: 1000
    }
  };
}

// 获取当前使用的API配置
export function getCurrentConfig(): ApiConfig {
  // 根据环境变量决定使用哪个API
  const useDeepSeek = process.env.USE_DEEPSEEK === 'true';
  return useDeepSeek ? getDeepSeekConfig() : getOpenAIConfig();
}

// 处理API错误
export function handleApiError(error: any): string {
  console.error('API错误:', error);
  
  if (error.response) {
    // API返回的错误
    return `API错误: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
  } else if (error.request) {
    // 请求发送但没有收到响应
    return '网络错误: 没有收到API响应';
  } else {
    // 设置请求时发生错误
    return `错误: ${error.message}`;
  }
} 