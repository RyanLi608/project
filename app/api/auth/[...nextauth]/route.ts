import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { createClient } from '@supabase/supabase-js'

// 创建 Supabase 客户端（服务端）
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        try {
          // 检查用户是否已存在
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // 创建新用户
            const { error } = await supabase
              .from('users')
              .insert([
                {
                  email: user.email,
                  name: user.name,
                  avatar_url: user.image,
                  provider: account.provider,
                  provider_id: account.providerAccountId,
                  created_at: new Date().toISOString(),
                }
              ])

            if (error) {
              console.error('Error creating user:', error)
              return false
            }
          } else {
            // 更新现有用户信息
            const { error } = await supabase
              .from('users')
              .update({
                name: user.name,
                avatar_url: user.image,
                last_login: new Date().toISOString(),
              })
              .eq('email', user.email)

            if (error) {
              console.error('Error updating user:', error)
            }
          }
        } catch (error) {
          console.error('Database error:', error)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      return session
    },
    async jwt({ token, account, profile }) {
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 