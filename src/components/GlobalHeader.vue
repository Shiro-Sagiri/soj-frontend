<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from '@/stores'
import { checkAccess } from '@/access/checkAccess'

const router = useRouter()
const { user } = useStore()
const openSelect = ref(false)

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
const handleSelect = (key: { to: string }) => {
  router.push(key.to)
  openSelect.value = false
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
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src='../assets/shiro.png' alt="" />
              <div class="title">Shiro OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in hidedRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="200px">
      <div class="user">
        <div class="avatar">
          <a-link href="/user/profile" :hoverable="false">
            <a-avatar
              v-if="!user.loginUser.userName || !user.loginUser.userAvatar"
              :style="{ backgroundColor: '#3370ff' }"
            >
              <icon-user></icon-user>
            </a-avatar>
            <a-avatar
              v-else-if="user.loginUser.userAvatar"
              :imageUrl="user.loginUser.userAvatar"
            >
            </a-avatar>
          </a-link>
        </div>
        <a-link
          @click="() => (openSelect = !openSelect)"
          v-show="user.loginUser.userName"
          style="
            margin-right: 20px;
            margin-left: 20px;
            font-size: 20px;
            width: 100px;
            margin-top: 5px;
          "
          :hoverable="false"
        >
          <template #icon>
            <icon-user size="large" />
          </template>
          {{ user.loginUser.userName }}
        </a-link>
        <a-dropdown @select="handleSelect" :popup-visible="openSelect">
          <a-button
            v-show="user.loginUser.userName"
            @click="() => (openSelect = !openSelect)"
            type="outline"
            size="mini"
            shape="round"
            style="margin-top: 8px; margin-right: 20px"
          >
            <icon-caret-down />
          </a-button>
          <template #content>
            <a-doption :value="{ to: '/user/profile' }">个人中心</a-doption>
            <a-doption :value="{ to: '/user/profile/myQuestion' }"
              >我的提交
            </a-doption>
            <a-doption :value="{ to: '/user/login' }">退出登录</a-doption>
          </template>
        </a-dropdown>
        <a-link
          href="/user/login"
          v-show="!user.loginUser.userName"
          style="margin-left: 10px"
          >登录
        </a-link>
        <a-link
          href="/user/register"
          v-show="!user.loginUser.userName"
          style="margin-left: 20px; margin-right: 20px"
          >注册
        </a-link>
      </div>
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

.user {
  display: flex;
  justify-content: center;
}

.user .avatar {
  margin-right: 16px;
}
</style>
