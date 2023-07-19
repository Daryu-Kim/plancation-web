import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

//인증정보가 있는지없는지 확인 후 페이지 이동!
const requireAuth = () => (to: any, from: any, next: any) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('현재 로그인된 유저: ' + user.displayName, user.email)
      return next()
    } else {
      // User is signed out
      console.log(`로그아웃됨`)
      next('/loginjoin')
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/about'
    },
    {
      //처음 소개 페이지
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      //로그인이 되어 있을때 (메인화면)
      path: '/home',
      name: 'home',
      component: HomeView,
      // 💡navigation guard - 뷰 라우터 내비게이션 가드
      beforeEnter: requireAuth()
    },
    {
      //로그인이 되어있지 않을 때 ==> 로그인/회원가입
      path: '/loginjoin',
      name: 'loginjoin',
      component: () => import('../views/LoginJoinView.vue')
    },
    {
      //비밀번호 찾기
      path: '/findpw',
      name: 'findpw',
      component: () => import('../views/FindPwView.vue')
    },
    {
      //비밀번호 변경
      path: '/changepw',
      name: 'changepw',
      component: () => import('../views/ChangePwView.vue'),
      beforeEnter: requireAuth()
    },
    {
      //환경설정
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SettingView.vue'),
      beforeEnter: requireAuth()
    },
    {
      //캘린더
      path: '/calendar/:id',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue'),
      beforeEnter: requireAuth()
    },
    {
      //할일
      path: '/calendar/:id/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
      beforeEnter: requireAuth()
    },
    {
      //기록/다이어리
      path: '/calendar/:id/diary',
      name: 'diary',
      component: () => import('../views/DiaryView.vue'),
      beforeEnter: requireAuth()
    },
    {
      //AI
      path: '/calendar/:id/ai',
      name: 'ai',
      component: () => import('../views/AiView.vue'),
      beforeEnter: requireAuth()
    }
  ]
})

export default router
