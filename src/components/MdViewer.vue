<script setup lang="ts">
import { Viewer } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'

/**
 * 定义组件属性类型
 */
interface Props {
  value: string
}

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]

withDefaults(defineProps<Props>(), {
  value: () => ''
})
</script>

<template>
  <Viewer :value="value" :plugins="plugins" style="min-width: 500px" />
</template>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
