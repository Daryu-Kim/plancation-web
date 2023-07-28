<template>
  <div class="writeTodo">
    <div class="todoHeader">
      <p>할 일 추가</p>
      <!-- <img src="../assets/images/main/icon_close.svg" alt="취소 아이콘"> -->
      <button @click="saveToFirestore">등록</button>
    </div>

    <div class="writeBox">
      <ul class="writeItem">
        <li class="title">
          <p>제목</p>
          <input class="fs_10" type=" text" placeholder="어떤 계획이 있으신가요?" v-bind:value="state.postTitle"
            v-on:input="setPostTitle">
        </li>

        <li class="periodWrap">
          <div class="period">
            <p>기간</p>
            <div class="periodBtn">
              <button>하루종일</button>
              <button>구간설정</button>
            </div>
          </div>

          <div class="datePicker">
            <VueDatePicker v-model="sDate" model-type="yyyy-MM-dd" :enable-time-picker="false" />
            <div>~</div>
            <!-- <p v-if="sDate">Selected date: {{ sDate }}</p> -->
            <!-- <VueDatePicker v-model="eDate" range :partial-range="false" :enable-time-picker="false" /> -->
            <VueDatePicker v-model="eDate" model-type="yyyy-MM-dd" :enable-time-picker="false" />
          </div>

          <div class="period">
            <p>시간</p>
            <div class="periodBtn">
              <button>지정없음</button>
              <button>시간설정</button>
            </div>
          </div>

          <div class="datePicker">
            <VueDatePicker v-model="sTime" time-picker model-type="HH:mm:ss" />
            <!-- <p v-if="sTime">Selected date: {{ sTime }}</p> -->
            <div>~</div>
            <VueDatePicker v-model="eTime" time-picker model-type="HH:mm:ss" />
          </div>
        </li>

        <!-- <li>

        </li> -->
        <li class="alert">
          <p>알림</p>
          <!-- <알림의 모달띄울곳> -->
          <div>
            <p>없음</p>
          </div>
        </li>
        <li class="addUser">
          <p class="addUserTitle">참여자 추가</p>

          <label v-for="(user, index) in state.calendarUser" :key="index" :for="'userCheck' + index">
            <div class="userInfo">
              <div class="userImage"
                :style="{ 'background-image': 'url(https://firebasestorage.googleapis.com/v0/b/plancation-74a7a.appspot.com/o/Apps%2Fdefault_user_image.png?alt=media&token=24c09b27-9fd8-4604-8900-3f9c16c14452)' }">
              </div>
              <p>{{ user.nickname }}</p>
            </div>

            <img v-show="!user.checked" src="../assets/images/main/icon_userEmptyBox.svg" alt="체크없는박스">
            <img v-show="user.checked" src="../assets/images/main/icon_userCheckBox.svg" alt="체크박스">
            <input :id="'userCheck' + index" type="checkbox" v-model="user.checked" class="userCheck">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, reactive, onMounted } from 'vue';
import { getAuth } from "firebase/auth";
import { doc, addDoc, getDoc, getFirestore, collection, Timestamp } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const route = useRoute();

// 상태 정의
const sDate = ref();
const eDate = ref();
const sTime = ref();
const eTime = ref();

const state = reactive({
  calendarUser: [] as any[],
  postTitle: '',
  calendarID: route.params.id, // 현재 캘린더 id
});

// const users = ref([
//   { nickname: '강해민', checked: false },
//   { nickname: '여상현', checked: false },
//   { nickname: '김원재', checked: false },
//   { nickname: '백승호', checked: false },
// ]);

// 메서드 정의

//할일 제목받아오기
const setPostTitle = (e: any) => {
  var writeTitle = e.target.value;
  state.postTitle = writeTitle;
  console.log(state.postTitle);
  console.log(state.calendarUser)
};

//현재 캘린더의 참여유저들 알아오기
const getCalendars = async () => {
  const db = getFirestore();
  const yourCalendars = doc(db, 'Calendars', `${state.calendarID}`);
  const docSnap = await getDoc(yourCalendars);

  if (docSnap.exists()) {
    state.calendarUser = docSnap.data().calendarUsers.map((user) => ({
      nickname: user,
      checked: false,
    }));
  } else {
    console.log('No such document!');
  }
};

//date타입으로 변환
const combineDateTime = (date, time) => {
  if (date && time) {
    const formattedDateTime = `${date}T${time}`;
    return new Date(formattedDateTime);
  } else {
    return null;
  }
};

//파이어스토어에 todo등록
const saveToFirestore = async () => {
  // console.log(sDate.value, sTime.value);
  const combinedStartDate = combineDateTime(sDate.value, sTime.value);
  const combinedEndDate = combineDateTime(eDate.value, eTime.value);
  // try {
  //   const auth = getAuth()
  //   const user: any = auth.currentUser
  //   const db = getFirestore();

  //   //랜덤 ID로 문서생성
  //   const docRef: any = await addDoc(collection(db, `Calendars/${state.calendarID}/Todos`,), {

  //   })

  //   //     Todos

  //   // - todoAlerts: number = 할 일 알림 (0.없음 1.당일 2.하루전 3.일주일전)
  //   // - todoAuthorID: string = 할 일 게시자 UID
  //   // - todoCheckUsers: string[] = 할 일 체크한 유저들의 UID
  //   // - todoEndTime: Timestamp = 할 일 종료 시간
  //   // - todoStartTime: Timestamp = 할 일 시작 시간
  //   // - todoTitle: string = 할 일 제목
  //   // - todoUsers: string[] = 할 일 대상 유저들의 UID
  //   // - todoID: string = 할 일 ID

  // } catch (err) {
  //   console.log(err)
  // }
  // const scheduleData = {
  //   startDate: combinedStartDate,
  //   endDate: combinedEndDate,
  // };

  console.log(combinedStartDate, combinedEndDate);
};

// 라이프사이클훅을 핸들링할 때 Composition API를 사용합니다.
onMounted(() => {
  getCalendars();
});

</script>


<!-- <script lang="ts">
// import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
export default {
  data() {
    return {
      calendarUser: [] as any[],
      postTitle: "",
      calendarID: this.$route.params.id, //현재 캘린더 id
    }
  },
  created() {
    //컴포넌트가 생성되자마자 현재 로그인한 사용자의 프로필 정보 가져와 표시
    this.getCalendars();
  },

  methods: {
    //타이틀 값 받아내기
    setPostTitle(e: any) {
      var writeTitle = e.target.value;
      this.postTitle = writeTitle
      console.log(this.postTitle)
    },

    //현재캘린더 참여자 목록 조회
    async getCalendars() {
      const db = getFirestore();
      const yourCalendars = doc(db, "Calendars", this.calendarID);
      const docSnap = await getDoc(yourCalendars);

      if (docSnap.exists()) {
        this.calendarUser = docSnap.data().calendarUsers
        console.log(this.calendarUser)
      } else {
        console.log("No such document!");
      }
    }
  }
}
</script>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';


// const sDate = ref(new Date());
const sDate = ref();
const eDate = ref();
const sTime = ref();
const eTime = ref();

const users = ref([
  // { nickname: '강해민', checked: false },
  // { nickname: '여상현', checked: false },
  // { nickname: '김원재', checked: false },
  // { nickname: '백승호', checked: false },
]);

// 추가된 함수: 선택한 날짜와 시간을 Date 형식으로 합치는 combineDateTime 함수
const combineDateTime = (date, time) => {
  if (date && time) {
    const formattedDateTime = `${date}T${time}`;

    return new Date(formattedDateTime);
  } else {
    return null;
  }
};

// 추가된 함수: 선택한 날짜와 시간을 합치고, 필요한 정보와 함께 Firestore에 저장하는 saveToFirestore 함수
const saveToFirestore = () => {
  console.log(sDate.value, sTime.value)
  const combinedStartDate = combineDateTime(sDate.value, sTime.value);
  const combinedEndDate = combineDateTime(eDate.value, eTime.value);

  // ... 여기에 Firestore에 저장할 추가 데이터를 작성합니다.

  const scheduleData = {
    startDate: combinedStartDate,
    endDate: combinedEndDate,
    // ... 추가 데이터
  };

  // ... 여기에 Firestore에 scheduleData를 저장하는 코드를 작성합니다.
  console.log(combinedStartDate, combinedEndDate)
};


</script> -->

<style lang="scss">
@import '../assets/scss/components/WriteTodo.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>