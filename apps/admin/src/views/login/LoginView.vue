<template>
  <div class="login-container">
    <div class="login-left">
      <div class="brand-content">
        <h1 class="brand-title">管理系统</h1>
        <p class="brand-description">现代化的后台管理系统模板</p>
        <div class="brand-features">
          <div class="feature-item">
            <t-icon name="check-circle" class="feature-icon" />
            <span>响应式设计</span>
          </div>
          <div class="feature-item">
            <t-icon name="check-circle" class="feature-icon" />
            <span>组件丰富</span>
          </div>
          <div class="feature-item">
            <t-icon name="check-circle" class="feature-icon" />
            <span>易于扩展</span>
          </div>
        </div>
      </div>
    </div>

    <div class="login-right">
      <div class="login-form-container">
        <!-- TDesign 表单组件 -->
        <t-form
          ref="formRef"
          :model="formData"
          label-width="0px"
          class="login-form"
          @submit="handleSubmit"
        >
          <h2 class="login-title">用户登录</h2>
          <p class="login-subtitle">请输入您的账户信息</p>

          <!-- 用户名输入框 -->
          <t-form-item name="username">
            <t-input v-model="formData.username" placeholder="用户名" clearable size="large">
              <template #prefix-icon>
                <t-icon name="user" />
              </template>
            </t-input>
          </t-form-item>

          <!-- 密码输入框 -->
          <t-form-item name="password">
            <t-input
              v-model="formData.password"
              type="password"
              placeholder="密码"
              clearable
              size="large"
            >
              <template #prefix-icon>
                <t-icon name="lock-on" />
              </template>
            </t-input>
          </t-form-item>

          <!-- 记住我复选框和忘记密码 -->
          <div class="form-options">
            <t-checkbox v-model="formData.remember">记住我</t-checkbox>
            <a href="javascript:void(0)" class="forgot-password">忘记密码?</a>
          </div>

          <!-- 登录按钮 -->
          <t-form-item>
            <t-button theme="primary" type="submit" block size="large">登录</t-button>
          </t-form-item>

          <div class="form-footer">
            <p>还没有账户? <a href="javascript:void(0)" class="register-link">立即注册</a></p>
          </div>
        </t-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-vue-next'
// 表单数据
const formData = ref({
  username: '',
  password: '',
  remember: false,
})

// 表单引用
const formRef = ref()

// 路由实例
const router = useRouter()

// 提交登录
const handleSubmit = async () => {
  const result = await formRef.value.validate()
  if (result === true) {
    try {
      // 模拟登录请求
      MessagePlugin.success('登录成功')
      // 跳转到首页
      router.push('/')
    } catch {
      MessagePlugin.error('登录失败')
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  top: -100px;
  left: -100px;
}

.login-left::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  bottom: -80px;
  right: -80px;
}

.brand-content {
  color: white;
  text-align: center;
  z-index: 1;
  max-width: 500px;
}

.brand-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.brand-description {
  font-size: 20px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.brand-features {
  text-align: left;
  margin-top: 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
}

.feature-icon {
  margin-right: 12px;
  font-size: 20px;
  color: #4facfe;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  padding: 40px;
}

.login-form-container {
  width: 100%;
  max-width: 420px;
}

.login-title {
  text-align: center;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
}

.login-subtitle {
  text-align: center;
  color: #7b8793;
  font-size: 16px;
  margin-bottom: 32px;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

:deep(.t-form__controls) {
  margin-top: 8px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
}

.forgot-password {
  color: #4facfe;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.form-footer {
  text-align: center;
  margin-top: 24px;
  color: #7b8793;
  font-size: 14px;
}

.register-link {
  color: #4facfe;
  text-decoration: none;
  font-weight: 500;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 992px) {
  .login-left {
    display: none;
  }

  .login-right {
    flex: 1;
  }
}
</style>
