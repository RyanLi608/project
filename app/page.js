export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2563eb', fontSize: '2.5rem', marginBottom: '20px' }}>
        🌍 旅游网站
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>
        欢迎来到我们的旅游网站！
      </p>
      <p style={{ fontSize: '1rem', color: '#888' }}>
        网站正在建设中...
      </p>
      <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '30px' }}>
        版本：极简JavaScript版 - 无SWC依赖
      </p>
      <p style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '15px' }}>
        最后更新：2025-01-27 17:05 (测试部署流程)
      </p>
    </div>
  );
} 
