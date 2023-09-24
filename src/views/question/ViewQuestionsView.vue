<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionVO
} from '@/api'
import { Message } from '@arco-design/web-vue'
import MonacoEditor from '@/components/MonacoEditor.vue'
import MdViewer from '@/components/MdViewer.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

const question = ref<QuestionVO>()
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoById(props.id as any)
  if (res.code === 0) {
    question.value = res.data
  } else {
    Message.error('数据获取失败,' + res.message)
  }
}

onMounted(() => {
  loadData()
})

const data = ref<QuestionSubmitAddRequest>({
  questionId: route.params.id as any,
  language: 'java'
})

const submit = async () => {
  if (!data.value.language || !data.value.code || !data.value.questionId) {
    Message.error('编程语言未选择,或代码为空')
    return
  }
  const res = await QuestionSubmitControllerService.questionSubmit(data.value)
  if (res.code === 0) {
    Message.success('提交成功')
    await router.push('/user/profile/myQuestion')
  } else {
    Message.success('提交失败,' + res.message)
  }
}
</script>

<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title='question.title'>
              <a-card>
                <a-descriptions title='判题条件' :column='{xs: 1, md:2, lg: 3}'>
                  <a-descriptions-item label='时间限制'>
                    {{ question.judgeConfig.timeLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label='内存限制'>
                    {{ question.judgeConfig.memoryLimit ?? 0 }}
                  </a-descriptions-item>
                  <a-descriptions-item label='堆栈限制'>
                    {{ question.judgeConfig.stackLimit ?? 0 }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
              <md-viewer :value="question.content" style="min-height: 450px" />
              <template #extra>
                <a-space>
                  <a-tag v-for="(tag, index) of question.tags" :key="index" color="green"
                  >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论</a-tab-pane>
          <a-tab-pane key="answer">
            <template #title>参考答案</template>
            答案
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-space style="margin-bottom: 20px">
          <span style="font-size: 20px">请选择编程语言:</span>
          <a-select
            v-model="data.language"
            style="width: 200px; justify-content: center"
            placeholder="请选择..."
            :trigger-props="{ autoFitPopupMinWidth: true }"
            size="large"
          >
            <template #label="{ data }">
              <span
                ><icon-edit style="padding-right: 10px" />{{
                  data?.label
                }}</span
              >
            </template>
            <a-option>java</a-option>
            <a-option >cpp</a-option>
            <a-option disabled>C</a-option>
            <a-option >go</a-option>
            <a-option disabled>Python</a-option>
          </a-select>
        </a-space>
        <monaco-editor
          style="height: 650px"
          :value="data.code"
          :handle-change="(v) => data.code = v"
          :language='data.language'
        />
      </a-col>
    </a-row>
    <a-button
      long
      type="primary"
      size="large"
      style="margin-top: 10px;"
      @click="submit"
      >提交答案
    </a-button>
  </div>
</template>

<style>
.arco-select-view-single.arco-select-view-size-large .arco-select-view-value {
  justify-content: center;
}
</style>
