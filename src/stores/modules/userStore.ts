import { defineStore } from 'pinia'
import { ref } from 'vue'
import ACCESS_ENUM from '@/access/accessEnum'

export const useUserStore = defineStore('user', () => {
  const loginUser = ref({
    username: 'shiro',
    userRole: ACCESS_ENUM.ADMIN
  })

  const getUserInfo = () => {
    //TODO get user info from server
  }

  return {
    loginUser,
    getUserInfo
  }
})
