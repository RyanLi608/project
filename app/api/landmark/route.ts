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
  },
  
  "Eiffel Tower": {
    // ... existing code ...
  },
  
  "Taj Mahal": {
    "Chinese": `泰姬陵是印度最著名的建筑，也是世界上最美丽的陵墓之一。

1. 历史背景：泰姬陵由莫卧儿帝国第五代皇帝沙贾汗于1631年至1653年间建造，目的是纪念他挚爱的第三任妻子慕塔兹·玛哈尔，她在生产第14个孩子时去世。这座建筑耗时22年，动用了20,000名工匠。沙贾汗对妻子的挚爱使泰姬陵成为了爱情的象征。

2. 文化意义：泰姬陵被认为是莫卧儿建筑艺术的顶峰，也是伊斯兰艺术在印度的完美融合。它被联合国教科文组织列为世界文化遗产，并在2007年被评为世界新七大奇迹之一。泰姬陵不仅是印度最重要的文化象征之一，也代表着爱情、忠诚和永恒的主题。

3. 建筑特点：泰姬陵由白色大理石建造，主体建筑位于一个方形平台上，四角各有一座尖塔。中央的穹顶高达73米，呈洋葱形，是印度-伊斯兰建筑的特色。整个建筑严格对称，只有沙贾汗和慕塔兹的陵墓位置略有不同。大理石表面镶嵌着来自各地的宝石，形成复杂的花卉和几何图案。前方的长方形水池反射出泰姬陵的倒影，使其美感倍增。

4. 最佳参观时间：参观泰姬陵的最佳时间是10月至3月，此时天气凉爽干燥。日出时分（约6点）是最理想的参观时间，此时游客较少，且清晨的光线使白色大理石呈现出变幻的色彩，从粉红色到金色再到耀眼的白色。满月之夜的泰姬陵也非常壮观，但需要特别预订。避开星期五参观，因为这天泰姬陵关闭（仅对穆斯林祈祷者开放）。

5. 有趣的事实：泰姬陵的建筑材料来自印度和亚洲各地，包括从中国、阿富汗和斯里兰卡运来的宝石。据说沙贾汗计划在亚穆纳河对岸建造一座与泰姬陵相对的黑色大理石陵墓作为自己的陵寝，但他晚年被儿子囚禁，这个计划未能实现。由于环境污染，泰姬陵的白色大理石正在慢慢变黄，印度政府正在采取措施保护这一珍贵的建筑遗产。泰姬陵内部最精美的装饰是围绕两座陵墓的大理石屏风，上面镶嵌着精美的半宝石花朵图案。`,

    "English": `The Taj Mahal is India's most famous monument and one of the most beautiful mausoleums in the world.

1. Historical Background: The Taj Mahal was built between 1631 and 1653 by the fifth Mughal Emperor Shah Jahan to commemorate his beloved third wife, Mumtaz Mahal, who died while giving birth to their 14th child. The construction took 22 years and employed 20,000 artisans. Shah Jahan's deep love for his wife has made the Taj Mahal a symbol of love.

2. Cultural Significance: The Taj Mahal is considered the pinnacle of Mughal architectural art and the perfect blend of Islamic art in India. It is recognized as a UNESCO World Heritage Site and was named one of the New Seven Wonders of the World in 2007. The Taj Mahal is not only one of India's most important cultural symbols but also represents themes of love, devotion, and eternity.

3. Architectural Features: The Taj Mahal is built of white marble, with the main structure situated on a square platform with minarets at each corner. The central dome reaches a height of 73 meters and has an onion shape, characteristic of Indo-Islamic architecture. The entire building is strictly symmetrical, with only the positions of Shah Jahan's and Mumtaz's tombs being slightly different. The marble surfaces are inlaid with gems from various regions, forming complex floral and geometric patterns. The rectangular pool in front reflects the image of the Taj Mahal, enhancing its beauty.

4. Best Time to Visit: The best time to visit the Taj Mahal is from October to March when the weather is cool and dry. Sunrise (around 6 AM) is the ideal time to visit, as there are fewer tourists then, and the morning light causes the white marble to display changing colors, from pink to gold to brilliant white. The Taj Mahal is also spectacular on full moon nights, but special bookings are required. Avoid visiting on Fridays when the Taj Mahal is closed (open only to Muslim worshippers).

5. Interesting Facts: The building materials for the Taj Mahal came from all over India and Asia, including gems transported from China, Afghanistan, and Sri Lanka. It is said that Shah Jahan planned to build a black marble mausoleum across the Yamuna River from the Taj Mahal as his own tomb, but he was imprisoned by his son in his later years, and this plan was never realized. Due to environmental pollution, the white marble of the Taj Mahal is slowly turning yellow, and the Indian government is taking measures to protect this precious architectural heritage. The most exquisite decoration inside the Taj Mahal is the marble screen surrounding the two tombs, inlaid with beautiful semi-precious stone floral patterns.`
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