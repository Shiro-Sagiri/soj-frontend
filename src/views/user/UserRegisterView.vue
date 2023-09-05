<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { UserRegisterDTO, UserService } from '@/api'

const router = useRouter()

const form = ref({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
} as UserRegisterDTO)

const handleSubmit = async () => {
  const res = await UserService.userRegister(form.value)
  if (res.code === 0) {
    Message.success('注册成功')
    await router.push('/user/login')
  } else {
    Message.error('注册失败,' + res.message)
  }
}
</script>

<template>
  <div class="form">
    <div class="title-bar">
      <img src="@/assets/shiro2.png" alt="" class="logo" />
      <div class="title">Shiro OJ</div>
    </div>
    <a-form :model="form" auto-label-width @submit="handleSubmit" size="large">
      <a-form-item
        field="userAccount"
        tooltip="账号长度不少于5位"
        label="账号"
        feedback
        :rules="[
          { required: true, message: '账号不为空' },
          { minLength: 5, message: '账号长度不少于5位' },
          { maxLength: 16, message: '账号长度最多16位' },
          { match: /^[a-zA-Z0-9]{5,16}$/, message: '账号只能为字母，数字' }
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        tooltip="密码长度不少于6位"
        :rules="[
          { required: true, message: '密码不为空' },
          { minLength: 6, message: '密码长度不少于6位' },
          { maxLength: 16, message: '密码长度最多16位' },
          { match: /^[a-zA-Z0-9]{6,16}$/, message: '密码只能为字母，数字' }
        ]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="确认密码"
        tooltip="两次密码输入必须相同"
        :rules="[
          {
            validator: (value, callback) => {
              if (value !== form.userPassword) {
                callback('两次密码输入不一致')
              } else {
                callback()
              }
            },
            required: true
          }
        ]"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          size="large"
          style="width: 120px; margin-left: 140px; margin-top: 20px"
        >
          <template #icon>
            <icon-user-add />
          </template>
          <template #default> 注册</template>
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.form {
  width: 500px;
  display: inline-block;
  margin-top: 100px;
}

.logo {
  width: 200px;
}

.title {
  font-size: 40px;
  font-weight: bold;
  margin-left: 20px;
  color: #7eb953ff;
}

.title-bar {
  margin-bottom: 50px;
}
</style>
