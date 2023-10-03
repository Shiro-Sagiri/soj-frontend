import { defineStore } from 'pinia'
import { ref } from 'vue'
import ACCESS_ENUM from '@/access/accessEnum'
import { UserService, UserVO } from '@/api'

export const useUserStore = defineStore(
  'user',
  () => {
    const loginUser = ref<UserVO>({
      userName: '',
      userRole: '',
      userAvatar: ''
    })

    const getUserInfo = async () => {
      const res = await UserService.getLoginUser()
      if (res.code === 0) {
        loginUser.value = res.data
      } else {
        loginUser.value.userRole = ACCESS_ENUM.NOT_LOGIN
      }
    }

    return {
      loginUser,
      getUserInfo,
    }
  },
  {
    persist: {
      key: 'persist-user'
    }
  }
)
