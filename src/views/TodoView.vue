<template>
  <div class="todo">
    <div class="fixMenu">
      <!-- 사이드바 컴포넌트 (NAV메뉴,프로필)-->
      <SideBar class="fixSideBar" />
      <div class="fixHeaderBar">
        <!-- 헤더바 컴포넌트 (상단 헤더, 로고& 설정)-->
        <HeaderBar class="rightHeader" />
        <!-- 메인 화면 -->
        <div class="mainScreen">
          <div class="overlay" @click="isActivefalse()" :class="{ active: isActive }"></div>
          <CurrentUsers class="currentUsers" @addClick="openReadModal" />
          <div class="todoListWrap">
            <WriteTodo v-if="showWriteModal" />
            <TodoList class="flex" :allTodos="todoList" />
            <TodoList class="flex" />
            <TodoList class="flex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "../components/SideBar.vue"
import HeaderBar from '../components/HeaderBar.vue'
import TodoList from '../components/TodoList.vue'
import WriteTodo from '../components/WriteTodo.vue'
import CurrentUsers from '../components/CurrentUsers.vue'
import { Firestore, collection, getDocs, doc, getDoc, getFirestore } from "firebase/firestore";

export default {
  components: {
    SideBar,
    HeaderBar,
    TodoList,
    CurrentUsers,
    WriteTodo
  },

  emits: ['addClick'],

  created() {
    this.getTodos()
  },

  data() {
    return {
      isActive: false, //오버레이
      todoList: [] as any[], //현재 캘린더의 모든 Todos의 문서
      calendarID: this.$route.params.id, //현재 캘린더 id
      // selectedPost: null, //클릭한 게시물
      // showPostModal: false, //게시글 상세보기 모달
      showWriteModal: false, //게시글 작성 모달
      calendarUser: [] as any[],
      userProfile: [] as any[], // 유저의 프로필 닉네임,사진,체크유무 파악
    }
  },

  methods: {
    openReadModal(item) {
      this.isActive = true
      //item은 todoList에서 현재 클릭한 기록문서
      // this.selectedPost = item
      this.showWriteModal = true;
      // console.log(item)
    },

    //취소눌렀을 때
    isActivefalse() {
      this.selectedPost = null //선택한 기록데이터 초기화
      this.isActive = false //오버레이 가리기
      this.showWriteModal = false //글작성 모달 없애기
      // this.showPostModal = false //상세보기 모달 없애기
    },

    async getCalendars() {
      const db = getFirestore();
      const yourCalendars = doc(db, 'Calendars', `${this.calendarID}`);
      try {
        const docSnap = await getDoc(yourCalendars)
          .then((docSnap) => {
            if (docSnap.exists()) {
              this.calendarUser = docSnap.data().calendarUsers.map((user) => ({
                userUID: user,
              }));
            } else {
              console.log('No such document!');
            }
          })
          .catch((e) => { console.log(e.message) });
      } catch (e) {
        console.log(e.message)
      }
      return;
    },

    //현재캘린더 참여자 uid로 파이어베이스에서 Users 컬렉션을 찾는 함수
    async findUserCollections() {
      const db = getFirestore();
      this.calendarUser.forEach(async (user: any) => {
        // const userUid = userObj.userUID;
        const userDoc = doc(db, "Users", user.userUID);
        try {
          const docSnap = await getDoc(userDoc)
            .then((docSnap) => {
              this.userProfile.push({
                user: docSnap.data(),
                checked: false
              });
            })
            .catch((e) => { console.log(e.message) })
        }
        catch (e) {
          console.log(e.message)
        }
        return console.log(this.userProfile);
      });
    },

    //현재 캘린더의 Todos내에 전체문서 가져오기
    async getTodos() {
      try {
        const db: Firestore = getFirestore();

        // getDocs 함수에 위에 정의한 쿼리를 적용해서 현재캘린더의 Posts의 모든 문서들을 가져온다.
        const yourCalendars = await getDocs(
          collection(db, `Calendars/${this.calendarID}/Todos`)
        ).then((yourCalendars) => {
          yourCalendars.forEach((doc) => {
            // 가져온 모든 문서들을 확인
            this.todoList.push(doc.data()); //배열에 문서 데이터를 푸시
          });
        })
          .catch((err) => { console.log(err.message) })
        return console.log(this.todoList)
      }
      catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/pages/todo.css'
</style>