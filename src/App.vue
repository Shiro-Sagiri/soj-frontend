<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import router from '@/router'
import { useStore } from '@/stores'
import { onMounted } from 'vue'

const doInit = () => {
  //TODO 初始化
  console.log('init')
}
onMounted(() => {
  doInit()
})

const { user } = useStore()
router.beforeEach((to, from, next) => {
  if (to.meta?.access === ACCESS_ENUM.ADMIN) {
    if (user.loginUser?.userRole !== ACCESS_ENUM.ADMIN) {
      next('/noAuth')
      return
    }
  }
  next()
})
</script>

<template>
  <div class="app">
    <BaseLayout></BaseLayout>
  </div>
</template>

<style scoped></style>
