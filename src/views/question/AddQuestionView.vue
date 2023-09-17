<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MdEditor from '@/components/MdEditor.vue'
import { JudgeCase, QuestionAddRequest, QuestionControllerService } from '@/api'
import { Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const judgeCase = ref({
  input: '',
  output: ''
})
const visible = ref(false)
const judgeCaseVisible = ref(false)

const defaultForm = {
  title: '',
  tags: [],
  judgeConfig: {
    timeLimit: 1000,
    stackLimit: 1000,
    memoryLimit: 1000
  },
  judgeCase: [],
  answer: '',
  content: ''
}

const form = ref({
  title: '',
  tags: [],
  judgeConfig: {
    timeLimit: 1000,
    stackLimit: 1000,
    memoryLimit: 1000
  },
  judgeCase: [],
  answer: '',
  content: ''
} as QuestionAddRequest)

const route = useRoute()
const updatePage = route.path.includes('update') //路径中有update视为更新页面

if (updatePage && !route.query.id) {
  router.push('/question/add')
}

const getQuestion = async () => {
  const id = route.query.id
  if (!id) {
    return
  } else {
    const res = await QuestionControllerService.getQuestionById(id as any)
    if (res.code === 0) {
      form.value = res.data as any
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any)
      if (!form.value.tags) {
        form.value.tags = []
      } else {
        form.value.tags = JSON.parse(form.value.tags as any)
      }
      if (!form.value.judgeConfig) {
        form.value.judgeConfig = {
          timeLimit: 1000,
          stackLimit: 1000,
          memoryLimit: 1000
        } as any
      } else {
        form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any)
      }
    } else {
      Message.error('加载失败,' + res.message)
    }
  }
}

onMounted(() => {
  getQuestion()
})

const handleSubmit = async () => {
  if (!updatePage) {
    const res = await QuestionControllerService.addQuestion(form.value)
    if (res.code === 0) {
      Message.success(res.message)
    } else {
      Message.error(res.message)
    }
    form.value = defaultForm
    await router.push('/question/list')
  } else {
    const res = await QuestionControllerService.updateQuestion(form.value)
    if (res.code === 0) {
      Message.success(res.message)
    } else {
      Message.error(res.message)
    }
    form.value = defaultForm
    await router.push('/question/manage')
  }
}

const handleOk = () => {
  if (judgeCase.value.input && judgeCase.value.output) {
    form.value.judgeCase.push(judgeCase.value)
    Message.success('添加成功')
    judgeCase.value = { input: '', output: '' }
  } else {
    Message.error('添加失败')
  }
}

const delJudgeCase = (index: JudgeCase) => {
  form.value.judgeCase = form.value.judgeCase.filter((item) => item !== index)
  judgeCaseVisible.value = false
  Message.success('删除成功')
}
</script>

<template>
  <div id="addQuestionView">
    <a-form
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
      label-align="left"
      :auto-label-width="true"
    >
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="form.tags" placeholder="请选择标签" allow-clear />
      </a-form-item>
      <a-form-item label="题目限制:" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制(kb)">
            <a-input-number
              placeholder="Please Enter The Limit of stack"
              mode="button"
              v-model="form.judgeConfig.stackLimit"
              :min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制(ms)">
            <a-input-number
              placeholder="Please Enter The Limit of time"
              mode="button"
              v-model="form.judgeConfig.timeLimit"
              :min="0"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制(kb)">
            <a-input-number
              placeholder="Please Enter The Limit of memory"
              mode="button"
              v-model="form.judgeConfig.memoryLimit"
              :min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item field="judgeCase" tooltip="题目用例" label="题目用例:">
        <a-button
          type="primary"
          size="large"
          shape="round"
          status="success"
          @click="visible = true"
          style="margin-right: 50px"
          >添加题目用例&nbsp;<icon-plus />
        </a-button>
        <a-popover title="题目用例">
          <a-button type="outline" @click="judgeCaseVisible = true"
            >已有用例
          </a-button>
          <a-modal
            v-model:visible="judgeCaseVisible"
            :hide-cancel="true"
            :simple="true"
          >
            <template #title> 已有用例</template>
            <a-list>
              <a-list-item v-for="(item, index) in form.judgeCase" :key="index">
                输入用例: {{ item.input }}, 输出用例:
                {{ item.output }}
                <a-button
                  type="primary"
                  status="danger"
                  size="large"
                  style="margin-left: 120px"
                  @click="delJudgeCase(item)"
                  >删除
                </a-button>
              </a-list-item>
            </a-list>
          </a-modal>
          <template #content>
            <p v-for="(item, index) in form.judgeCase" :key="index">
              {{ index + 1 }}:&nbsp;&nbsp;输入用例: {{ item.input }}, 输出用例:
              {{ item.output }}
            </p>
          </template>
        </a-popover>
        <a-modal
          v-model:visible="visible"
          @ok="handleOk"
          @cancel="visible = false"
          okText="添加"
        >
          <template #title>添加题目用例</template>
          <a-form
            :model="judgeCase"
            label-align="left"
            :auto-label-width="true"
            @submit="handleOk"
          >
            <a-form-item field="input" label="输入用例:">
              <a-input
                placeholder="输入用例"
                allow-clear
                v-model="judgeCase.input"
              />
            </a-form-item>
            <a-form-item field="output" label="输出用例:">
              <a-input
                placeholder="输出用例"
                allow-clear
                v-model="judgeCase.output"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <md-editor
          :value="form.content"
          :handle-change="(v) => (form.content = v)"
          mode="auto"
        ></md-editor>
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <md-editor
          :value="form.answer"
          :handle-change="(v) => (form.answer = v)"
          mode="auto"
        ></md-editor>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          size="large"
          type="primary"
          long
          v-if="!updatePage"
          >创建题目
        </a-button>
        <a-button html-type="submit" size="large" type="primary" long v-else
          >更新题目
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
#addQuestionView {
  width: 1000px;
  display: inline-block;
  margin: 0 auto;
  text-align: left;
  padding-left: 450px;
}
</style>
