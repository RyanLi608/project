const axios = require('axios');

async function testChatAPI() {
  console.log('测试聊天API端点...');
  
  const testData = {
    message: "几点去长城最好",
    landmark: "长城",
    language: "Chinese"
  };
  
  try {
    console.log('发送请求数据:', testData);
    
    const response = await axios.post('http://localhost:3000/api/chat', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('\n✅ API调用成功!');
    console.log('响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
    // 检查回答是否是针对具体问题的
    const answer = response.data.message || response.data.answer;
    if (answer && answer.includes('几点')) {
      console.log('\n🎯 AI正确回答了具体问题!');
    } else if (answer && answer.includes('历史背景')) {
      console.log('\n⚠️  AI返回了模板信息，而不是回答具体问题');
    }
    
  } catch (error) {
    console.log('\n❌ API调用失败:');
    if (error.response) {
      console.log('状态码:', error.response.status);
      console.log('错误信息:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('网络错误 - 没有收到响应');
      console.log('请确保开发服务器正在运行: npm run dev');
    } else {
      console.log('请求配置错误:', error.message);
    }
  }
}

testChatAPI(); 