import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to, from) => {
  if (to.path !== '/question/add' || !from.path.includes('update')) {
    return
  }
  window.location.reload()
})
export default router
