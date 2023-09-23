<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref, toRaw, watch } from 'vue'

interface Props {
  language: string
  value: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  language: () => 'java',
  value: () => '',
  handleChange: () => {} //设置编辑器的值
})

watch([() => props.language], () => {
  //todo: 动态修改代码编辑器的编程语言
})

const editorRef = ref(null)
const editor = ref(null)

onMounted(() => {
  if (!editorRef.value) {
    return
  }
  editor.value = monaco.editor.create(editorRef.value, {
    value: props.value,
    language: props.language,
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
