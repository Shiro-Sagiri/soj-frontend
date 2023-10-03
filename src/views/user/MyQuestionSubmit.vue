<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import {
  JudgeConfig,
  JudgeInfo,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
  QuestionSubmitVO
} from '@/api'
import { Message } from '@arco-design/web-vue'

const tableRef = ref(null)
const judgeInfoVisible = ref(false)
const judgeInfo = ref<JudgeInfo>({})
const judgeConfig = ref<JudgeConfig>({})

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
  const res = await QuestionControllerService.getQuestionSubmitPage(
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
  judgeInfoVisible.value = true
  judgeInfo.value = record.judgeInfo
  judgeConfig.value = record.questionVO.judgeConfig
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
          <a-option value="">请选择...</a-option>
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
              ? (
                  (record.questionVO.acceptedNum /
                    record.questionVO.submitNum) *
                  100
                ).toFixed(2)
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
        <a-space>
          <a-button
            type="primary"
            status="success"
            @click="showJudgeInfo(record)"
            size="large"
          >
            判题信息
          </a-button>
        </a-space>
      </template>
    </a-table>
    <a-modal
      v-model:visible="judgeInfoVisible"
      :hide-cancel="true"
      :simple="true"
    >
      <template #title> 判题详细信息</template>
      <a-card>
        <a-descriptions
          size="large"
          bordered
          layout="vertical"
          :column="2"
          align="center"
        >
          <a-descriptions-item label="执行耗时"
            >{{ judgeInfo.time + ' ms' ?? '未执行' }}
          </a-descriptions-item>
          <a-descriptions-item label="限制耗时"
            >{{ judgeConfig.timeLimit + ' ms' }}
          </a-descriptions-item>
          <a-descriptions-item label="占用内存"
            >{{ (judgeInfo.memory / 1000).toFixed(1) + ' KB' ?? '未执行' }}
          </a-descriptions-item>
          <a-descriptions-item label="限制内存"
            >{{ (judgeConfig.memoryLimit / 1000).toFixed(1) + ' KB' }}
          </a-descriptions-item>
          <a-descriptions-item label="判题信息"
            >{{ judgeInfo.message ?? '未执行' }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-modal>
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
