<script setup lang="ts">
import { useStore } from '@/stores'
import MdViewer from '@/components/MdViewer.vue'
import { onMounted } from 'vue'

const { user } = useStore()

onMounted(() => {
  user.getUserInfo()
})

const data = [
  {
    label: '用户id',
    value: user.loginUser.id
  },
  {
    label: '用户昵称',
    value: user.loginUser.userName
  },
  {
    label: '用户职能',
    value: user.loginUser.userRole
  },
  {
    label: '创建时间',
    value: user.loginUser.createTime
  },
  {
    label: '更新时间',
    value: user.loginUser.updateTime
  }
]
</script>

<template>
  <a-link
    class="avatar"
    href="#"
    :hoverable="false"
    style="margin-bottom: 50px"
  >
    <a-avatar
      :style="{ backgroundColor: '#3370ff' }"
      v-if="!user.loginUser.userAvatar"
      :size="150"
    >
      <IconUser />
    </a-avatar>
    <a-avatar v-else :size="150">
      <img :src="user.loginUser.userAvatar" alt="" />
    </a-avatar>
  </a-link>
  <a-card style="margin-bottom: 50px">
    <a-space direction="vertical" size="large" fill>
      <a-descriptions
        :data="data as any"
        title="基本信息"
        :column="{ xs: 1, md: 3, lg: 4 }"
        size="large"
      >
        <a-descriptions-item
          v-for="item of data"
          :label="item.label"
          :key="item as any"
        >
          <a-tag>{{ item.value }}</a-tag>
        </a-descriptions-item>
      </a-descriptions>
    </a-space>
  </a-card>
  <a-tag size="large" color="#168cff"><strong>个人简介:</strong></a-tag>
  <a-card>
    <md-viewer :value="user.loginUser.userProfile as string" />
  </a-card>
</template>

<style scoped></style>
