//mixin

export default {
  //재사용할 컴포넌트 옵션
  methods: {
    goBack() {
      ;(this as any).$router.go(-1)
    },
    goFront() {
      ;(this as any).$router.go(+1)
    },
    goCalendar() {
      ;(this as any).$router.push('/calendar')
    },
    goTodo() {
      ;(this as any).$router.push('/todo')
    },
    goAi() {
      ;(this as any).$router.push('/ai')
    },
    goDiary() {
      ;(this as any).$router.push('/diary')
    },
    goHome() {
      ;(this as any).$router.push('/home')
    },
    goFindPw() {
      ;(this as any).$router.push('/findpw')
    }
  }
}
