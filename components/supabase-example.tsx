"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  email: string
  created_at: string
}

export function SupabaseExample() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 获取用户数据示例
  const fetchUsers = async () => {
    if (!supabase) {
      setError('Supabase 客户端未初始化，请检查环境变量配置')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase
        .from('users') // 假设有一个 users 表
        .select('*')
        .limit(10)

      if (error) throw error
      setUsers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  // 测试连接
  const testConnection = async () => {
    if (!supabase) {
      setError('Supabase 客户端未初始化，请检查环境变量配置')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true })

      if (error) throw error
      setError(`连接成功！数据库中有 ${data} 条记录`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '连接失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Supabase 连接测试</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? '测试中...' : '测试连接'}
          </Button>
          
          <Button 
            onClick={fetchUsers} 
            disabled={loading}
            variant="outline"
          >
            {loading ? '加载中...' : '获取用户数据'}
          </Button>
        </div>

        {error && (
          <div className={`p-3 rounded ${
            error.includes('成功') 
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {error}
          </div>
        )}

        {users.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">用户数据：</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="p-2 bg-gray-50 rounded">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>邮箱:</strong> {user.email}</p>
                  <p><strong>创建时间:</strong> {new Date(user.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border-l-4 border-blue-400">
        <h4 className="font-semibold text-blue-800">配置信息：</h4>
        <p className="text-sm text-blue-600">
          Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
        </p>
        <p className="text-sm text-blue-600">
          匿名密钥已配置: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}
        </p>
      </div>
    </div>
  )
} 