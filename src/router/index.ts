import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //로그인이 되어 있을때 (메인화면)
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      redirect: 'about'
    },
    {
      //로그인이 되어있지 않을 때 처음 소개 페이지
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      //로그인/회원가입
      path: '/loginjoin',
      component: () => import('../views/LoginJoinView.vue')
    },
    {
      //비밀번호 찾기
      path: '/findpw',
      component: () => import('../views/FindPwView.vue')
    },
    {
      //비밀번호 변경
      path: '/changepw',
      component: () => import('../views/ChangePwView.vue')
    },
    {
      //환경설정
      path: '/setting',
      component: () => import('../views/SettingView.vue')
    },
    {
      //알림
      path: '/notify',
      component: () => import('../views/NotifyView.vue')
    },
    {
      //캘린더
      path: '/calender',
      component: () => import('../views/CalenderView.vue')
    },
    {
      //할일
      path: '/todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      //기록/다이어리
      path: '/diary',
      component: () => import('../views/DiaryView.vue')
    },
    {
      //AI
      path: '/ai',
      component: () => import('../views/AiView.vue')
    }
  ]
})

export default router
