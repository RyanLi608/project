export const metadata = {
  title: '中国旅游网站',
  description: '探索中国的美丽风景和文化',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
} 