<template>
  <div class="writeTodo">
    <div class="todoHeader">
      <p>할 일 추가</p>
      <!-- <img src="../assets/images/main/icon_close.svg" alt="취소 아이콘"> -->
      <button @click="__addTodo">등록</button>
    </div>

    <div class="writeBox">
      <ul class="writeItem">
        <li class="title">
          <p>제목</p>
          <input class="fs_10" type=" text" placeholder="어떤 계획이 있으신가요?" v-bind:value="state.todoTitle"
            v-on:input="setTodoTitle">
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

        <li class="alert" @click="setActive()">
          <p>알림</p>
          <!-- <알림의 모달띄울곳> -->
          <div>
            <p class="selectAlert">{{ state.alertText }}</p>
            <AlertModal class="alertModal" :class="{ active: state.isActive }" @updateAlert="updateAlertType" />
          </div>
        </li>
        <li class="addUser">
          <p class="addUserTitle">참여자 추가</p>

          <label v-for="(user, index) in state.userProfile" :key="index" :for="'userCheck' + index">
            <div class="userInfo">
              <div class="userImage" :style="{ 'background-image': `url(${user.user.userImagePath})` }">
              </div>
              <p>{{ user.user.userName }}</p>
            </div>

            <img v-show="!user.checked" src="../assets/images/main/icon_userEmptyBox.svg" alt="체크없는박스">
            <img v-show="user.checked" src="../assets/images/main/icon_userCheckBox.svg" alt="체크박스">
            <input :id="'userCheck' + index" type="checkbox" v-model="user.checked" v-on:change="checkedUser(user)"
              class="userCheck">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup lang="ts">
import AlertModal from '../components/AlertModal.vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, reactive, onMounted } from 'vue';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, addDoc, collection } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const route = useRoute();

// 상태 정의
const sDate = ref();
const eDate = ref();
const sTime = ref();
const eTime = ref();


const state = reactive({
  alertType: [] as any,
  alertText: '없음',
  isActive: false,
  calendarID: route.params.id, // 현재 캘린더 id
  calendarUser: [] as any[], // 현재 캘린더의 참여자
  userProfile: [] as any[], // 유저의 프로필 닉네임,사진,체크유무 파악
  todoTitle: '', // 할일제목
  toDoUsers: [] as any[], //할일에 참여할 유저
});

// 메서드 정의
//현재 캘린더의 참여유저들 알아오기
const getCalendars = async () => {
  const db = getFirestore();
  const yourCalendars = doc(db, 'Calendars', `${state.calendarID}`);
  try {
    const docSnap = await getDoc(yourCalendars)
      .then((docSnap) => {
        if (docSnap.exists()) {
          state.calendarUser = docSnap.data().calendarUsers.map((user) => ({
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
};

//현재캘린더 참여자 uid로 파이어베이스에서 Users 컬렉션을 찾는 함수
const findUserCollections = async () => {
  const db = getFirestore();
  state.calendarUser.forEach(async (user: any) => {
    // const userUid = userObj.userUID;
    const userDoc = doc(db, "Users", user.userUID);
    try {
      const docSnap = await getDoc(userDoc)
        .then((docSnap) => {
          state.userProfile.push({
            user: docSnap.data(),
            checked: false
          });
        })
        .catch((e) => { console.log(e.message) })
    }
    catch (e) {
      console.log(e.message)
    }
    return;
  });
};

const setActive = () => {
  state.isActive = true
}

const setActiveFalse = () => {
  state.isActive = false
}

//알림모달
const updateAlertType = (alertText: any) => {
  state.alertType = alertText;
  state.alertText = alertText.alert;
  console.log(state.alertType)
  setActiveFalse();
};


// 할일 제목받아오기
const setTodoTitle = (e: any) => {
  var writeTitle = e.target.value;
  state.todoTitle = writeTitle;
};

//todo 참여자 목록에 추가
const checkedUser = (user: any) => {
  if (user.checked) {
    state.toDoUsers.push(user.user.userID);
    console.log(user.user.userName + "이 체크되었음")
  } else {
    const index = state.toDoUsers.indexOf(user.user.userID);
    if (index > -1) {
      state.toDoUsers.splice(index, 1);
      console.log(user.user.userName + "이 체크 해제되었음")
    }
  }
  // console.log(state.toDoUsers)
};

//고른 날짜&시간 date타입으로 변환
const combineDateTime = (date, time) => {
  if (date && time) {
    const formattedDateTime = `${date}T${time}`;
    return new Date(formattedDateTime);
  } else {
    return null;
  }
};

//파이어스토어에 todo등록
const __addTodo = async () => {
  //선택한 날짜와 시간 합치기
  console.log(sDate.value, sTime.value);
  const startDate = combineDateTime(sDate.value, sTime.value);
  const endDate = combineDateTime(eDate.value, eTime.value);

  try {
    const auth = getAuth()
    const user: any = auth.currentUser
    const db = getFirestore();

    //랜덤 ID로 문서생성
    const docRef = await addDoc(collection(db, `Calendars/${state.calendarID}/Todos`), {
      todoAlerts: state.alertType.number,
      todoAuthorID: user.uid,
      todoCheckUsers: [],
      todoEndTime: startDate,
      todoStartTime: endDate,
      todoTitle: state.todoTitle,
      todoUsers: state.toDoUsers,
      todoID: "test"
    }).then(() => {
      alert("할 일이 추가되었습니다!")
    })
      .catch((e) => { alert(e.message) })
  } catch (err) {
    console.log(err.message)
  }
};
//   // - todoAlerts: number = 할 일 알림 (0.없음 1.당일 2.하루전 3.일주일전)
//   // - todoAuthorID: string = 할 일 게시자 UID
//   // - todoCheckUsers: string[] = 할 일 체크한 유저들의 UID
//   // - todoEndTime: Timestamp = 할 일 종료 시간
//   // - todoStartTime: Timestamp = 할 일 시작 시간
//   // - todoTitle: string = 할 일 제목
//   // - todoUsers: string[] = 할 일 대상 유저들의 UID
//   // - todoID: string = 할 일 ID

onMounted(async () => {
  await getCalendars();
  await findUserCollections();
});

</script>

<style lang="scss">
@import '../assets/scss/components/WriteTodo.css';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>