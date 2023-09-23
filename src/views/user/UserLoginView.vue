<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import type { UserLoginDTO } from '@/api'
import { UserService } from '@/api'

const router = useRouter()
const route = useRoute()

const form = ref({
  userAccount: '',
  userPassword: ''
} as UserLoginDTO)

const handleSubmit = async () => {
  const res = await UserService.userLogin(form.value)
  if (res.code === 0) {
    Message.success('登入成功')
    const { user } = useStore()
    user.token = res.data
    await user.getUserInfo()
    if (route.query.redirect) {
      await router.push(route.query.redirect as string)
    } else {
      await router.push('/')
    }
  } else {
    Message.error('登入失败,' + res.message)
  }
}
</script>

<template>
  <div class="form">
    <div class="title-bar">
      <img src='../../assets/shiro.png' alt="" class="logo" />
      <div class="title">Shiro OJ</div>
    </div>
    <a-form :model="form" auto-label-width @submit="handleSubmit" size="large">
      <a-form-item field="userAccount" tooltip="账号长度不少于5位" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        label="密码"
        tooltip="密码长度不少于6位"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
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
            <icon-user></icon-user>
          </template>
          <template #default> 登录 </template>
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
