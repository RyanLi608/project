import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // 检查环境变量
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { 
          error: 'Supabase 环境变量未配置',
          success: false,
          message: '请检查 .env.local 文件中的 Supabase 配置'
        },
        { status: 500 }
      )
    }

    const supabase = createServerSupabaseClient()
    
    // 简单的连接测试，不依赖特定表
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json(
        { 
          error: error.message, 
          success: false,
          message: '数据库连接失败，可能是表不存在或权限问题'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase 服务端连接成功',
      data: {
        userCount: data,
        timestamp: new Date().toISOString(),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
      }
    })

  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '未知错误',
        success: false 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createServerSupabaseClient()
    
    // 示例：创建新用户记录
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: body.email,
          name: body.name,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '用户创建成功',
      data: data
    })

  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '未知错误',
        success: false 
      },
      { status: 500 }
    )
  }
} 