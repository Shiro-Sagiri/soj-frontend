<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '@/stores'
import MdEditor from '@/components/MdEditor.vue'
import { Message } from '@arco-design/web-vue'
import { UserService, UserUpdateDTO } from '@/api'
import { useRouter } from 'vue-router'

const { user } = useStore()
const router = useRouter()

const form = ref<UserUpdateDTO>({})
onMounted(() => {
  form.value = { ...user.loginUser }
})
const submit = async () => {
  const res = await UserService.updateUserInfo(form.value)
  if (res.code === 0) {
    await user.getUserInfo()
    Message.success('用户信息修改成功')
    await router.push('/user/profile/info')
  } else {
    Message.error('修改失败,' + res.message)
  }
}
</script>

<template>
  <div id="userChangeInfo">
    <a-card>
      <a-space direction="vertical" size="large" :style="{ width: '600px' }">
        <a-form :model="form" layout="vertical">
          <a-form-item field="userName" label="用户昵称:">
            <a-input v-model="form.userName" placeholder="用户昵称" />
          </a-form-item>
          <a-form-item field="userProfile" label="用户简介:">
            <md-editor
              :value="form.userProfile"
              :handle-change="(v: string) => (form.userProfile = v)"
              style="text-align: left"
            />
          </a-form-item>
          <a-form-item>
            <a-button long size="large" type="primary" @click="submit"
              >修改信息
            </a-button>
          </a-form-item>
        </a-form>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped></style>
