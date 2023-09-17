<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, toRaw } from 'vue'

interface Props {
  value: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  handleChange: () => {} //设置编辑器的值
})

const editorRef = ref(null)
const editor = ref(null)

onMounted(() => {
  if (!editorRef.value) {
    return
  }
  editor.value = monaco.editor.create(editorRef.value, {
    value: props.value,
    language: 'java',
    automaticLayout: true,
    // minimap: {
    //   enabled: true
    // },  //代码地图
    colorDecorators: true, //颜色装饰器
    lineNumbers: 'on',
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    theme: 'vs-dark'
  })

  //监听编辑器值的改变
  editor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(editor.value).getValue())
  })
})
</script>

<template>
  <div
    id="editor"
    ref="editorRef"
    style="min-height: 400px; text-align: left"
  ></div>
</template>

<style scoped></style>
