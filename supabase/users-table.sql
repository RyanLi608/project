-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  provider VARCHAR(50),
  provider_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider_id);

-- 启用 RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看自己的数据
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.email() = email);

-- 创建策略：允许插入新用户（通过服务端）
CREATE POLICY "Enable insert for service role" ON users
  FOR INSERT WITH CHECK (true);

-- 创建策略：用户可以更新自己的数据
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.email() = email);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据（可选，用于测试）
-- INSERT INTO users (email, name, provider) VALUES 
-- ('test@example.com', 'Test User', 'google'); 