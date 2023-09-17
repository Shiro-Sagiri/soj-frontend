import type { RouteRecordRaw } from 'vue-router'
import ACCESS_ENUM from '@/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/question/list',
  },
  {
    path: '/question/add',
    name: '创建题目',
    component: () => import('../views/question/AddQuestionView.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/question/update',
    component: () => import('../views/question/AddQuestionView.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true
    }
  },
  {
    path: '/question/manage',
    name: '题目管理',
    component: () => import('../views/question/ManageQuestionView.vue'),
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    path: '/question/list',
    name: '浏览题目',
    component: () => import('../views/test-con.vue'),
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
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
    children: [
      {
        path: 'login',
        component: () => import('../views/user/UserLoginView.vue'),
        meta: {
          access: ACCESS_ENUM.USER
        }
      },
      {
        path: 'register',
        component: () => import('../views/user/UserRegisterView.vue'),
        meta: {
          access: ACCESS_ENUM.USER
        }
      },
      {
        path: 'profile',
        component: () => import('../views/user/UserProfile.vue'),
        redirect: '/user/profile/info',
        meta: {
          access: ACCESS_ENUM.ADMIN
        },
        children: [
          {
            path: 'info',
            component: () => import('../views/user/UserInfo.vue'),
          },
          {
            path: 'changeInfo'
          },
          {
            path: 'myQuestion'
          },
          {
            path: '/user/profile/changePwd'
          }
        ]
      },
    ],
    meta: {
      hideInMenu: true,
    }
  }
]
