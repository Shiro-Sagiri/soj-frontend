<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { UserUpdateDTO } from '@/api'
import { useRouter } from 'vue-router'
import { UserService } from '@/api'
import { Message } from '@arco-design/web-vue'
import { useStore } from '@/stores'

const { user } = useStore()
const form = ref<UserUpdateDTO>({})
const router = useRouter()

onMounted(() => {
  form.value = { ...user.loginUser }
})

const submit = async () => {
  const res = await UserService.updateUserInfo(form.value)
  if (res.code === 0) {
    Message.success('修改密码成功')
    await router.push('/user/login')
  } else {
    Message.error('修改密码失败,' + res.message)
  }
}
</script>

<template>
  <div id="userChangePassword">
    <a-card>
      <a-space direction="vertical" size="large" :style="{ width: '600px' }">
        <a-form :model="form" layout="vertical">
          <a-form-item field="userPassword" label="原密码:">
            <a-input
              v-model="form.userPassword"
              placeholder="原密码"
              type="password"
            />
          </a-form-item>
          <a-form-item field="userNewPassword" label="新密码:">
            <a-input
              v-model="form.userNewPassword"
              placeholder="新密码"
              type="password"
            />
          </a-form-item>
          <a-form-item field="checkPassword" label="确认密码:">
            <a-input
              v-model="form.checkPassword"
              placeholder="确认密码"
              type="password"
            />
          </a-form-item>
          <a-form-item>
            <a-button long size="large" type="primary" @click="submit"
              >修改密码
            </a-button>
          </a-form-item>
        </a-form>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped></style>
