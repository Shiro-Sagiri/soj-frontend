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
    component: () => import('../views/question/QuestionsView.vue'),
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    path: '/question/view/:id',
    component: () => import('../views/question/ViewQuestionsView.vue'),
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true
    }
  },
  {
    path: '/noAuth',
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
            path: 'changeInfo',
            component: () => import('../views/user/UserChangeInfo.vue')
          },
          {
            path: 'changeAvatar',
            component: () => import('../views/user/UserChangeAvatar.vue')
          },
          {
            path: 'myQuestion',
            component: () => import('../views/user/MyQuestionSubmit.vue')
          },
          {
            path: 'changePwd',
            component: () => import('../views/user/UserChangePassword.vue')
          }
        ]
      },
    ],
    meta: {
      hideInMenu: true,
    }
  }
]
