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
      <a href="https://github.com/Shiro-Sagiri" target="_blank"> soj by Shiro </a>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.content {
  background: linear-gradient(to right, #eee, #fff);
  padding: 20px;
}

.footer {
  background-color: #efefef;
  padding: 16px;
  position: absolute;
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
