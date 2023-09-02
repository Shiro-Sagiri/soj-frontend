import type { RouteRecordRaw } from 'vue-router'
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: '浏览题目',
    component: () => import('../views/test-con.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/test2',
    name: '关于我的',
    component: () => import('../views/test-con.vue')
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import('../views/NoAuth.vue'),
    meta: {
      hideInMenu: true
    }
  }
]
