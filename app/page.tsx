

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 text-white">
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            LandmarkAI
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI 旅行
            </span>
            <br />
            <span className="text-white/90">伴侣</span>
          </h1>
          
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            通过AI驱动的洞察和个性化推荐，体验世界最具标志性的地标
          </p>
        </div>
      </main>
    </div>
  )
} 