import { useStore } from '@/stores'
import ACCESS_ENUM from '@/access/accessEnum'
import router from '@/router'
import { checkAccess } from '@/access/checkAccess'

router.beforeEach((to, from, next) => {
  const { user } = useStore()
  if (to.fullPath === '/user/login') {
    user.loginUser = {}
    user.token = ''
    localStorage.clear()
  }
  if (to.path.startsWith('/user')) {
    next()
    return
  }
  if (to.meta?.access !== ACCESS_ENUM.NOT_LOGIN) {
    if ((!user.token || !user.loginUser.userRole) && !to.path.startsWith('/user')) {
      next(`/user/login?redirect=${to.fullPath}`) // 重定向到登录页`
      return
    }
  }
  if (checkAccess(user.loginUser, to.meta?.access)) {
    next()
    return
  } else {
    next('/noAuth')
    return
  }
})
