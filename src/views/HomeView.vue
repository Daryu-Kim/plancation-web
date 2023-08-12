<template>
  <div class="home">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 -->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 -->
        <HeaderBar class="rightHeader" />
        <div class="mainScreen">
          <p class="homeTitle fs_12">캘린더 목록</p>
          <div class="CalendarListWrap">
            <!-- 캘린더 리스트 컴포넌트 -->
            <CalendarList :myCalendars="calendarList" />
          </div>
          <div class="notifyTitle">
            <p class="homeTitle fs_12">새로운 알림</p>
            <button class="fs_12">
              알림 모두 지우기
            </button>
          </div>
          <!-- 알림리스트 컴포넌트 -->
          <NotifyItem />
        </div>
      </div>
    </div>
  </div>
</template> 
<script lang="ts">
import HeaderBar from '../components/HeaderBar.vue';
import SideBar from "../components/SideBar.vue";
import CalendarList from "../components/CalendarList.vue";
import NotifyItem from "../components/NotifyItem.vue";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default {
  components: {
    SideBar,
    HeaderBar,
    CalendarList,
    NotifyItem,
  },

  data() {
    return {
      calendarList: [] as any[]
    }
  },

  created() {
    //컴포넌트가 생성되자마자 현재 로그인한 사용자의 프로필 정보 가져와 표시
    this.getCalendars();
  },

  methods: {
    async getCalendars() {
      const db = getFirestore();
      const auth = getAuth();
      const user: any = auth.currentUser;
      // calendarUsers의 배열 안에 유저uid가 들어있는 캘린더의 데이터를 가져오는 쿼리
      const q = query(collection(db, "Calendars"), where("calendarUsers", "array-contains", user.uid));

      // getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // 가져온 모든 문서들을 확인
        this.calendarList.push(doc.data()); //배열에 문서 데이터를 푸시
        console.log(this.calendarList)
      });
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/home.css';
</style>