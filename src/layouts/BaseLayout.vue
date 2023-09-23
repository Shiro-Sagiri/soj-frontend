<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <global-header></global-header>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">
      <a href="https://github.com/Shiro-Sagiri" target="_blank">
        soj by Shiro
      </a>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.content {
  padding: 20px;
  text-align: center;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)
    0 0 / 100% 100%;
  height: 100vh;
}

.footer {
  background-color: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.footer a {
  color: #7eb953ff;
  text-decoration: none;
}
</style>
