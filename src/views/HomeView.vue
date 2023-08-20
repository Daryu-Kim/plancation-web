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
            <div class="addCalendar" @click="isActiveTrue()" :class="{ active: isActive }">
              <img class="add_icon" src="@/assets/images/main/icon_addCalendar.svg" alt="캘린더추가아이콘">
              <p>새로운 캘린더 추가</p>
            </div>
          </div>

          <div class="overlay" :style="isActive ? { display: 'block' } : ''"></div>

          <div class="addCalendarModal" :style="isActive ? { display: 'block' } : ''">
            <div class="addCalendarModalContent">
              <input class="fs_12" type="text" placeholder="새로운 캘린더 제목" v-bind:value="calendarTitle"
                v-on:input="setCalendarTitle">
              <div class="addCalendarBtnWrap">
                <button class="fs_10 cancleBtn" @click="isActiveFalse()">취소</button>
                <button class="fs_10 addBtn" @click="__addCalendar()">캘린더 추가</button>
              </div>
            </div>
          </div>

          <div class="notifyTitle">
            <p class="homeTitle fs_12">새로운 알림</p>
            <button class="btn_removeAlert fs_12">
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
import { collection, query, where, getDoc, getDocs, getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    SideBar,
    HeaderBar,
    CalendarList,
    NotifyItem,
  },

  data() {
    return {
      calendarList: [] as any[],
      randomID: '',
      isActive: false,
      calendarTitle: '',
      calendarUsers: [] as any[],
      // userProfile: [] as any[]
    }
  },

  created() {
    //컴포넌트가 생성되자마자 현재 로그인한 사용자의 프로필 정보 가져와 표시
    this.getCalendars();
    // this.findUserCollections();
  },

  methods: {
    //새로운 캘린더 추가 모달 & 오버레이 활성화
    isActiveTrue() {
      this.isActive = true
    },

    //새로운 캘린더 추가 모달 & 오버레이 비활성화
    isActiveFalse() {
      this.isActive = false
      this.calendarTitle = ""
    },

    //새로운 캘린더 제목 받아내기
    setCalendarTitle(e: any) {
      this.calendarTitle = e.target.value;
    },

    //현재 보유 중인 캘린더목록
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
        this.calendarList.push(doc.data()) //배열에 문서 데이터를 푸시
        console.log(this.calendarList)
        this.calendarUsers.push(doc.data().calendarUsers)
        console.log(this.calendarUsers)
      });
    },

    // async findUserCollections() {
    //   const db = getFirestore();
    //   this.calendarUsers.forEach(async (user: any) => {
    //     // const userUid = userObj.userUID;
    //     const userDoc = doc(db, "Users", user.userUID);
    //     try {
    //       await getDoc(userDoc)
    //         .then((docSnap) => {
    //           this.userProfile.push({
    //             user: docSnap.data(),
    //           });

    //         })
    //         .catch((e) => { alert(e.message) })
    //     }
    //     catch (e) {
    //       alert(e.message)
    //     }
    //     return console.log(this.userProfile)
    //   });
    // },


    //UUID라이브러리로 랜덤ID생성
    createUUID() {
      const newUUID = uuidv4()
      this.randomID = newUUID
      return console.log(this.randomID)
    },

    //새로운 캘린더리스트 추가
    async __addCalendar() {
      try {
        this.createUUID()
        const auth = getAuth()
        const user: any = auth.currentUser
        const db = getFirestore()

        //랜덤 ID로 문서생성
        await setDoc(doc(db, `Calendars`, this.randomID), {
          calendarAuthorID: user.uid,
          calendarID: this.randomID,
          calendarTitle: this.calendarTitle,
          calendarUsers: [user.uid, ''],
        }).then(() => {
          this.$router.go(0);
          alert("새로운 캘린더가 추가되었습니다!")
        })
          .catch((e) => { alert(e.message) })
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/abstracts/Fontmodule.css';
@import '../assets/scss/pages/home.css';
</style>