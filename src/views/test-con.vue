<script setup lang="ts">
import { UserService } from '@/api'
// import MdEditor from '@/components/MdEditor.vue'
import { ref } from 'vue'
import MonacoEditor from '@/components/MonacoEditor.vue'

UserService.getLoginUser()

const value = ref()
const onChange = (v: string) => {
  value.value = v
}
</script>

<template>
  <div class="test">
<!--    <md-editor :value="value" :handle-change="onChange"></md-editor>-->
  </div>
  <monaco-editor :value=value :handle-change='onChange'></monaco-editor>
</template>

<style scoped>
.test {
  text-align: left;
}
</style>
