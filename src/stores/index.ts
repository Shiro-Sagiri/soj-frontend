import { useUserStore } from '@/stores/modules/userStore'
import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

const pinia = createPinia().use(persist)

export default pinia

export const useStore = () => {
  return {
    user: useUserStore()
  }
}
