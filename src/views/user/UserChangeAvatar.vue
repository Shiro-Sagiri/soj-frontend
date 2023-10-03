<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from '@/stores'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const file = ref()
const uploadRef = ref(null)
const { user } = useStore()
const imgUrl = ref()
const router = useRouter()

onMounted(() => {
  imgUrl.value = user.loginUser.userAvatar
})

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
    url: URL.createObjectURL(currentFile.file)
  }
  console.log(file.value.url)
}
const onProgress = (currentFile: any) => {
  file.value = currentFile
}

const uploadFile = async (e: Event) => {
  e.stopPropagation()
  await uploadRef.value.submit()
  await user.getUserInfo()
  await router.push('/user/profile/info')
  window.location.reload()
  Message.success('修改头像成功')
}

const customRequest = (option: any): any => {
  const { onProgress, onError, onSuccess, fileItem, name } = option
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent: any
      if (event.total > 0) {
        // 0 ~ 1
        percent = event.loaded / event.total
      }
      onProgress(percent, event)
    }
  }
  xhr.onerror = function error(e) {
    onError(e)
  }
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText)
    }
    onSuccess(xhr.response)
  }

  const formData = new FormData()
  formData.append(name || 'file', fileItem.file)
  xhr.open('post', 'http://localhost:8101/api/user/updateAvatar', false)
  xhr.setRequestHeader("userId",user.loginUser.id as any)
  xhr.send(formData)
  imgUrl.value = JSON.parse(xhr.response).data
}
</script>

<template>
  <div id="userChangePassword">
    <a-card>
      <a-space direction="vertical" :style="{ width: '100%' }">
        <a-upload
          action="http://localhost:8080/api/user/updateAvatar"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
          :auto-upload="false"
          ref="uploadRef"
          :custom-request="customRequest"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                class="arco-upload-list-picture custom-upload-avatar"
                v-if="file && file.url"
                style="height: 500px; width: 500px; margin-bottom: 20px"
              >
                <img :src="file.url" alt="头像不存在" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)'
                  }"
                />
              </div>
              <div
                class="arco-upload-picture-card"
                v-else
                style="height: 500px; width: 500px; margin-bottom: 20px"
              >
                <div class="arco-upload-picture-card-text" v-if="!imgUrl">
                  <IconPlus />
                  <div style="margin-top: 10px; font-weight: 600">Upload</div>
                </div>
                <img
                  :src="imgUrl"
                  alt="头像不存在"
                  v-else
                  style="height: 500px; width: 500px"
                />
              </div>
            </div>
          </template>
        </a-upload>
        <a-button
          type="primary"
          size="large"
          status="success"
          long
          @click="uploadFile"
          >上传头像
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<style scoped></style>
