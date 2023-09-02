<script setup lang="ts"></script>

<template>
  <div class="global-header">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
        <div class="title-bar">
          <img class="logo" src="../assets/shiro2.png" alt="" />
          <div class="title">Shiro OJ</div>
        </div>
      </a-menu-item>
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
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
</style>
