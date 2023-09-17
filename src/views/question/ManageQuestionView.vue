<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Question, QuestionControllerService } from '@/api'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableRef = ref(null)

const dataList = ref([])
const total = ref(0)
const searchParams = ref({
  pageSize: 10,
  pageNum: 1
})
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionPage(
    searchParams.value
  )
  if (res.code === 0) {
    dataList.value = res.data?.records
    total.value = parseInt(res.data?.total)
  } else {
    Message.error('数据获取失败,' + res.message)
  }
}

onMounted(() => {
  loadData()
})
const del = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestion({
    id: question.id
  })
  if (res.code === 0) {
    Message.success(res.message)
    await loadData()
  } else {
    Message.error('删除失败,' + res.message)
  }
}
const update = async (question: Question) => {
  await router.push({
    path: '/question/update',
    query: {
      id: question.id
    }
  })
}
const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content'
  },
  {
    title: '标签',
    dataIndex: 'tags'
  },
  {
    title: '答案',
    dataIndex: 'answer'
  },
  {
    title: '提交数',
    dataIndex: 'submitNum'
  },
  {
    title: '通过数',
    dataIndex: 'acceptedNum'
  },
  {
    title: '用户id',
    dataIndex: 'userId'
  },
  {
    title: '判题配置',
    dataIndex: 'judgeConfig'
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    slotName: 'optional'
  }
]
</script>

<template>
  <div id="manageQuestionView">
    <a-table
      ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
        showTotal: true
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="update(record)">修改</a-button>
          <a-button status="danger" type="primary" @click="del(record)"
            >删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<style scoped>
#manageQuestionView {
}
</style>
