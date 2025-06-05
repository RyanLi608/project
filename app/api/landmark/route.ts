import { NextRequest, NextResponse } from 'next/server';
import { getLandmarkInfo } from '@/lib/api/deepseek';

// 模拟数据
const mockData = {
  "Great Wall of China": {
    "Chinese": `中国长城是人类历史上最令人印象深刻的建筑成就之一。它由多个中国朝代修建，主要是在明朝（1368-1644年）期间。

1. 历史背景：长城的修建最早可追溯到公元前7世纪，不同的国家修建了各种墙壁。今天保存最完好的部分来自明朝。它主要是为了防御来自北方的游牧部落。

2. 文化意义：长城象征着中国的耐力和历史韧性。它代表着中国的统一，并已成为国际上最具辨识度的中国文化象征。

3. 建筑特点：长城横跨中国北部约21,196公里（13,171英里）。它包括了烽火台、驻军站和瞭望塔。墙的高度通常在5-8米之间，底部宽度为4-5米。

4. 最佳参观时间：春季（4-5月）和秋季（9-10月）提供最舒适的温度和美丽的风景。避开国家假日，因为那时会非常拥挤。

5. 有趣的事实：与普遍的看法相反，长城从太空中用肉眼是看不见的。一些部分使用的砂浆中包含糯米，这有助于其耐久性。长城横跨九个省份和直辖市。`,
    "English": `The Great Wall of China is one of the most impressive architectural feats in human history. Built over centuries by various Chinese dynasties, primarily during the Ming Dynasty (1368-1644).

1. Historical Background: Construction began as early as the 7th century BC, with various walls being built by different states. The most well-preserved sections today date from the Ming Dynasty. It was built primarily for defense against nomadic tribes from the north.

2. Cultural Significance: The Great Wall symbolizes China's endurance and historical resilience. It represents the unification of China and has become the country's most recognizable cultural symbol internationally.

3. Architectural Features: The wall stretches approximately 13,171 miles (21,196 kilometers) across northern China. It includes watchtowers, garrison stations, and beacon towers. The wall's height typically ranges from 5-8 meters, with a width of 4-5 meters at the base.

4. Best Time to Visit: Spring (April-May) and autumn (September-October) offer the most comfortable temperatures and beautiful scenery. Avoid national holidays when it becomes extremely crowded.

5. Interesting Facts: Contrary to popular belief, the Great Wall is not visible from space with the naked eye. The mortar used in some sections included sticky rice, which contributed to its durability. The wall crosses nine provinces and municipalities.`
  }
};

// 获取模拟数据
function getMockData(name: string, language: string): string | null {
  // 标准化名称处理
  const normalizedName = name.toLowerCase();
  
  if (normalizedName.includes("great wall") || normalizedName.includes("长城")) {
    const lang = language.toLowerCase().includes("english") ? "English" : "Chinese";
    return mockData["Great Wall of China"][lang];
  }
  
  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  const language = searchParams.get('language') || 'Chinese';

  if (!name) {
    return NextResponse.json(
      { error: '缺少景点名称参数' },
      { status: 400 }
    );
  }

  try {
    // 先尝试获取模拟数据
    const mockResponse = getMockData(name, language as string);
    if (mockResponse) {
      console.log(`使用模拟数据: ${name}, ${language}`);
      return NextResponse.json({ data: mockResponse });
    }
    
    // 否则通过API获取数据
    const result = await getLandmarkInfo(name, language as string);
    
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
    console.error('API route error:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时出错' },
      { status: 500 }
    );
  }
} 