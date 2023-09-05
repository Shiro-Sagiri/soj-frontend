<script setup lang="ts">
import { UserService } from '@/api'

UserService.getLoginUser()
</script>

<template>
  <div class="test">
    <a-button type="primary">test</a-button>
  </div>
</template>

<style scoped></style>
