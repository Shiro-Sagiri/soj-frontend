<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
  QuestionSubmitVO
} from '@/api'
import { Message } from '@arco-design/web-vue'

const tableRef = ref(null)

const dataList = ref([])
const total = ref(0)
const searchParams = ref<QuestionSubmitQueryRequest>({
  pageSize: 5,
  current: 1
})

const onPageChange = (num: number) => {
  searchParams.value.current = num
}
const loadData = async () => {
  const res = await QuestionSubmitControllerService.getQuestionSubmitPage(
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
  [
    () => searchParams.value.current,
    () => searchParams.value.pageSize,
  ],
  () => {
    loadData()
  }
)
let debounceTimeout: any
watch(
  [
    () => searchParams.value.title,
    () => searchParams.value.tags,
    () => searchParams.value.language,
    () => searchParams.value.status
  ],
  () => {
    // 清除之前的定时器
    clearTimeout(debounceTimeout)
    // 设置一个新的定时器，延迟执行loadData函数
    debounceTimeout = setTimeout(() => {
      searchParams.value.current = 1
      loadData()
    }, 500) // 500毫秒的延迟时间，你可以根据需要调整
  }
)

onMounted(() => {
  loadData()
})
const columns = [
  {
    title: '题号',
    dataIndex: 'questionId'
  },
  {
    title: '题目名称',
    dataIndex: 'questionVO.title'
  },
  {
    title: '标签',
    slotName: 'tags'
  },
  {
    title: '编程语言',
    dataIndex: 'language'
  },
  {
    title: '判题状态',
    slotName: 'status'
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
    title: '更新时间',
    dataIndex: 'updateTime'
  },
  {
    slotName: 'optional'
  }
]

const showJudgeInfo = (record: QuestionSubmitVO) => {
  //todo: 详细信息待完成...
  Message.info('未开发功能,' + record.judgeInfo)
}
</script>

<template>
  <div id="myQuestionSubmit">
    <a-form :model="searchParams" layout="inline" style="margin-left: 50px">
      <a-form-item field="title" label="名称 :">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入标题"
          style="min-width: 250px"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签 :">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入标签"
          style="min-width: 250px; text-align: left"
        />
      </a-form-item>
      <a-form-item field="language" label="编程语言 :">
        <a-input
          v-model="searchParams.language"
          placeholder="请输入编程语言"
          style="min-width: 200px; text-align: left"
        />
      </a-form-item>
      <a-form-item field="status" label="状态">
        <a-select
          v-model="searchParams.status"
          placeholder="请选择..."
          style="min-width: 200px; text-align: left"
        >
          <a-option value="0">待判题</a-option>
          <a-option value="1">判题中</a-option>
          <a-option value="2">通过</a-option>
          <a-option value="3">未通过</a-option>
        </a-select>
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
          <a-tag
            v-for="(tag, index) of record.questionVO.tags"
            :key="index"
            color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${
            record.questionVO.submitNum
              ? record.questionVO.acceptedNum / record.questionVO.submitNum
              : 0
          }%(${record.questionVO.acceptedNum} / ${record.questionVO.submitNum})`
        }}
      </template>
      <template #status="{ record }">
        <span v-if="record.status === 0"
          ><a-tag color="blue">待判题</a-tag></span
        >
        <span v-else-if="record.status === 1"
          ><a-tag color="blue">判题中</a-tag></span
        >
        <span v-else-if="record.status === 2"
          ><a-tag color="green">通过</a-tag></span
        >
        <span v-else-if="record.status === 3"
          ><a-tag color="red">未通过</a-tag></span
        >
      </template>
      <template #optional="{ record }">
        <a-button
          type="primary"
          status="success"
          @click="showJudgeInfo(record)"
          size="large"
        >
          详细信息
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
