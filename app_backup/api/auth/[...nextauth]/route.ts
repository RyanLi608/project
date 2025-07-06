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
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // 检查用户是否已存在
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching user:', fetchError)
          return true // 允许登录，即使数据库操作失败
        }

        // 如果用户不存在，创建新用户
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              email: user.email,
              name: user.name,
              avatar_url: user.image,
              provider: account?.provider,
              provider_id: account?.providerAccountId,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (insertError) {
            console.error('Error creating user:', insertError)
          } else {
            console.log('New user created:', user.email)
          }
        } else {
          // 更新现有用户信息
          const { error: updateError } = await supabase
            .from('users')
            .update({
              name: user.name,
              avatar_url: user.image,
              updated_at: new Date().toISOString()
            })
            .eq('email', user.email)

          if (updateError) {
            console.error('Error updating user:', updateError)
          } else {
            console.log('User updated:', user.email)
          }
        }

        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        return true // 允许登录，即使数据库操作失败
      }
    },
    async session({ session, token }) {
      // 在session中添加用户ID和数据库信息
      if (session.user && token.sub) {
        session.user.id = token.sub
        
        // 从 Supabase 获取用户的完整信息
        try {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', session.user.email)
            .single()

          if (!error && userData) {
            session.user.dbId = userData.id
            session.user.createdAt = userData.created_at
          }
        } catch (error) {
          console.error('Error fetching user data in session:', error)
        }
      }
      return session
    },
    async jwt({ token, account, profile }) {
      // 在JWT token中保存账户信息
      if (account) {
        token.accessToken = account.access_token
        token.provider = account.provider
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async signOut({ token }) {
      // 用户登出时的处理（可选）
      console.log('User signed out:', token.email)
    }
  }
})

export { handler as GET, handler as POST } 