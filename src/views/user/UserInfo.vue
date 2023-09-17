<script setup lang="ts">
import { useStore } from '@/stores'

const { user } = useStore()
const keys = Object.keys(user.loginUser)
const values = Object.values(user.loginUser)

const data = []
for (let i = 0; i < keys.length; i++) {
  data.push({
    key: keys[i],
    value: values[i]
  })
}
</script>

<template>
  <a-link class="avatar" href="/user/profile/changeInfo">
    <a-avatar
      :style="{ backgroundColor: '#3370ff' }"
      v-if="!user.loginUser.userAvatar"
    >
      <IconUser />
    </a-avatar>
    <a-avatar v-else>
      <img :src="user.loginUser.userAvatar" alt="" />
    </a-avatar>
  </a-link>
  <a-descriptions
    style="margin-top: 20px"
    :data="data"
    size="large"
    title="基本信息"
    :column="1"
  >
    <a-descriptions-item v-for="item of data" :key="item" :label="item.key">
      <a-tag>{{ item.value }}</a-tag>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped></style>
