<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const collapsed = ref(false)
const router = useRouter()

const onClickMenuItem = (key: string) => {
  router.push(key)
}
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider
      hide-trigger
      collapsible
      :collapsed="collapsed"
      style="text-align: center"
    >
      <div class="logo" style="text-align: center" />
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['/user/profile/info']"
        :style="{ width: '100%' }"
        @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="/user/profile/info">
          <IconHome />
          基本信息
        </a-menu-item>
        <a-menu-item key="/user/profile/myQuestion">
          <icon-list />
          我的题库
        </a-menu-item>
        <a-menu-item key="/user/profile/changeInfo">
          <icon-edit />
          修改信息
        </a-menu-item>
        <a-menu-item key="/user/profile/changePwd">
          <icon-edit />
          修改密码
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px; text-align: left">
        <a-button shape="round" @click="collapsed = !collapsed">
          <IconCaretRight v-if="collapsed" />
          <IconCaretLeft v-else />
        </a-button>
      </a-layout-header>
      <a-layout-content style="padding: 0 24px">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  height: 736px;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout :deep(.arco-layout-sider-light) .logo {
  background: var(--color-fill-2);
}

.layout :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout :deep(.arco-layout-footer),
.layout :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>
