<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from '@/stores'
import { checkAccess } from '@/access/checkAccess'

const router = useRouter()
const { user } = useStore()

//TODO 直接访问页面,即使没有权限也会显示内容
const hidedRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false
    }
    return checkAccess(user.loginUser, item.meta?.access as string)
  })
})

const doMenuClick = (key: string) => {
  router.push({
    path: key
  })
}

const selectedKeys = ref(['/'])

router.afterEach((to) => {
  selectedKeys.value = [to.path]
})
</script>

<template>
  <a-row id="global-header" align="center" :wrap="false">
    <a-col flex="auto">
      <div>
        <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
          <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
            <div class="title-bar">
              <img class="logo" src="../assets/shiro2.png" alt="" />
              <div class="title">Shiro OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in hidedRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div class="username">{{ user.loginUser.username ? user.loginUser.username : '未登录' }}</div>
    </a-col>
  </a-row>
</template>

<style scoped>
.logo {
  height: 40px;
}
.title-bar {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
}
.username {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #7eb953ff;
  border-radius: 4px;
  padding: 8px 16px;
  margin-right: 24px;
  width: 50px;
}
</style>
