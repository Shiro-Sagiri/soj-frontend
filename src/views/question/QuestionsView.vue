<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest
} from '@/api'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const tableRef = ref(null)

const dataList = ref([])
const total = ref(0)
const searchParams = ref<QuestionQueryRequest>({
  pageSize: 5,
  current: 1,
  title: '',
  tags: []
})

const onPageChange = (num: number) => {
  searchParams.value.current = num
}
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPage(
    searchParams.value
  )
  if (res.code === 0) {
    dataList.value = res.data?.records
    total.value = parseInt(res.data?.total as any)
  } else {
    Message.error('数据获取失败,' + res.message)
  }
}

watch(
  [() => searchParams.value.current, () => searchParams.value.pageSize],
  () => {
    loadData()
  }
)
let debounceTimeout: any
watch([() => searchParams.value.title, () => searchParams.value.tags], () => {
  // 清除之前的定时器
  clearTimeout(debounceTimeout)
  // 设置一个新的定时器，延迟执行loadData函数
  debounceTimeout = setTimeout(() => {
    searchParams.value.current = 1
    loadData()
  }, 500) // 500毫秒的延迟时间，你可以根据需要调整
})

onMounted(() => {
  loadData()
})
const columns = [
  {
    title: '题号',
    dataIndex: 'id'
  },
  {
    title: '题目名称',
    dataIndex: 'title'
  },
  {
    title: '标签',
    slotName: 'tags'
  },
  {
    title: '通过率',
    slotName: 'acceptedRate'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    slotName: 'optional'
  }
]
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/question/view/${question.id}`
  })
}
</script>

<template>
  <div id="questionsView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="margin-left: 50px; width: 900px"
    >
      <a-form-item field="title" label="名称 :">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入标题"
          style="min-width: 300px"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签 :">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入标签"
          style="min-width: 300px; text-align: left"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          @click="
            () => {
              searchParams.current = 1
              loadData()
            }
          "
          >搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-divider />
    <a-table
      ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        showTotal: true,
        showPageSize: true,
        showJumper: true,
        size: 'large',
        total,
        pageSizeOptions: [5, 10, 20]
      }"
      @page-change="onPageChange"
      @page-size-change="(pageSize) => (searchParams.pageSize = pageSize)"
      page-position="bottom"
      :bordered="{ cell: true }"
      class="table"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${record.submitNum ? (
            (record.acceptedNum /
              record.submitNum) *
            100
          ).toFixed(2) : 0}%(${
            record.acceptedNum
          } / ${record.submitNum})`
        }}
      </template>
      <template #optional="{ record }">
        <a-button
          type="primary"
          status="success"
          @click="toQuestionPage(record)"
          size="large"
        >
          做题
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<style>
.arco-table-td-content {
  text-align: center;
}

.arco-table-cell {
  justify-content: center;
}
</style>
