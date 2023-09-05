import type { RouteRecordRaw } from 'vue-router'
import ACCESS_ENUM from '@/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test',
  },
  {
    path: '/test',
    name: '浏览题目',
    component: () => import('../views/NoAuth.vue'),
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: '/test2',
    name: '关于我的',
    component: () => import('../views/test-con.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/noAuth',
    name: '无权限',
    component: () => import('../views/NoAuth.vue'),
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: '/user',
    name: '用户',
    children: [
      {
        path: 'login',
        name: '用户登录',
        component: () => import('../views/user/UserLoginView.vue'),
        meta: {
          access: ACCESS_ENUM.USER
        }
      },
      {
        path: 'register',
        name: '用户注册',
        component: () => import('../views/user/UserRegisterView.vue'),
        meta: {
          access: ACCESS_ENUM.USER
        }
      }
    ],
    meta: {
      hideInMenu: true,
    }
  }
]
