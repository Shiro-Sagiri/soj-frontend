<script setup lang="ts">
import { Editor, Viewer } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'

/**
 * 定义组件属性类型
 */
interface Props {
  value: string
  handleChange: (v: string) => void
  mode?: string
}

const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]

withDefaults(defineProps<Props>(), {
  value: () => '',
  handleChange: () => {},
  mode: () => 'split'
})
</script>

<template>
  <Editor
    :value="value"
    :plugins="plugins"
    @change="handleChange"
    style="min-width: 500px"
    :mode="mode"
  />
</template>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
