const axios = require('axios');

// 测试API调用
async function testAPI() {
  console.log('开始测试API调用...');
  
  const API_KEY = 'sk-uerrmhpdmxdkuxseupboivzlmdqziryoqjcngvrvwemvugei';
  const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
  const MODEL = 'Qwen/QwQ-32B';
  
  const testMessage = '关于埃菲尔铁塔的问题: 你觉得埃菲尔铁塔好玩吗？';
  
  try {
    console.log('API配置:');
    console.log('- URL:', API_URL);
    console.log('- Model:', MODEL);
    console.log('- API Key exists:', !!API_KEY);
    console.log('- 测试消息:', testMessage);
    console.log('\n正在发送请求...');
    
    const response = await axios.post(
      API_URL,
      {
        model: MODEL,
        stream: false,
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        messages: [
          {
            role: "user",
            content: testMessage
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('\n✅ API调用成功!');
    console.log('响应状态:', response.status);
    console.log('AI回答:', response.data.choices[0].message.content);
    
  } catch (error) {
    console.log('\n❌ API调用失败:');
    if (error.response) {
      console.log('状态码:', error.response.status);
      console.log('错误信息:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('网络错误 - 没有收到响应');
    } else {
      console.log('请求配置错误:', error.message);
    }
  }
}

testAPI(); 