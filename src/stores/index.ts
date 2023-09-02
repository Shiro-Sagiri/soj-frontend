import { useUserStore } from '@/stores/modules/userStore'

export const useStore = () => {
  return {
    user: useUserStore()
  }
}
