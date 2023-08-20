<template>
  <div class="sidebar">
    <div class="profilePart">
      <!-- <img src="@/assets/images/main/icon_user.svg" alt="유저프로필기본"> -->
      <label for="chooseImage">
        <div :style="{ 'background-image': `url(${photoURL})` }" class="avatar">
          <!-- v-on 속성은 해당 HTML 요소의 이벤트를 뷰 인스턴스의 로직과 연결할 때 사용, input의 값 선택될 때  -->
          <input type="file" id="chooseImage" accept="image/*" v-on:input="setPhotoURL" />
        </div>
      </label>

      <div class="profileName">
        <!-- 💡영어로 쓸때는 v-model로 가능하지만, 한글로 쓰면 한 글자씩 업데이트가 느리다. 이를 보완하기 위해 v-bind,v-on을 쓴다. -->
        <input type="text" v-bind:value="displayName" v-on:input="setDisplayName" class="fs_9" id="modifyName">
        <label for="modifyName">
          <img src="@/assets/images/main/icon_pencil.svg" alt="연필모양아이콘" class="pencilIcon"
            :class="{ active: modifyDisplayname }">
        </label>
        <!-- 유저 닉네임 수정 -->
        <p class="modifyBtn" :class="{ active: modifyDisplayname }" @click="__updateDisplayName()">수정</p>
      </div>
      <p class="userEmail">{{ email }}</p>
    </div>

    <div class="sidebarMenu">
      <!-- 👇현재 라우터의 이름이 home이면 ? 보여줄 것  -->
      <template v-if="$route.name === 'home' || $route.name === 'changepw' || $route.name === 'setting'">
        <ul class="sidebarList">
          <li :class="{ active: $route.path === '/changepw' }" @click="goChangedPw()">
            <img src="@/assets/images/main/icon_key.svg" alt="열쇠아이콘">
            <p>비밀번호 변경</p>
          </li>
          <!-- 로그아웃 -->
          <li @click="__logout()">
            <img src="@/assets/images/main/icon_logout.svg" alt="로그아웃아이콘">
            <p>로그아웃</p>
          </li>
        </ul>
        <div class="sidebarBottom">
          <div class="line"></div>
          <div class="version fs_9">
            <p>버전 정보</p>
            <p>V22.01</p>
          </div>
        </div>
      </template>

      <!-- 👇현재 라우터의 이름이 home이 아니면 ? 그 외의 캘린더, 투두, 기록, ai등에서 보여줄 것  -->
      <template v-else>
        <ul class="sidebarList">
          <li @click="goCalendar()" :class="{ active: $route.name === 'calendar' }">
            <img src="@/assets/images/main/icon_calendar.svg" alt="캘린더아이콘">
            <p>캘린더</p>
          </li>
          <li @click="goTodo()" :class="{ active: $route.name === 'todo' }">
            <img src="@/assets/images/main/icon_todo.svg" alt="할일아이콘">
            <p>할 일</p>
          </li>
          <li @click="goAi()" :class="{ active: $route.name === 'ai' }">
            <img src="@/assets/images/main/icon_ai.svg" alt="AI아이콘">
            <p>AI</p>
          </li>
          <li @click="goDiary()" :class="{ active: $route.name === 'diary' }">
            <img src="@/assets/images/main/icon_diary.svg" alt="기록아이콘">
            <p>기록/다이어리</p>
          </li>
        </ul>
        <div class="bottomCenter">
          <div class="goMain" @click="goHome()">
            <img src="@/assets/images/main/icon_back.svg" alt="뒤로가기아이콘">
            <p>메인으로 이동</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
export default {
  data() {
    return {
      displayName: '', //유저닉네임
      email: '',  //유저이메일
      selectedPhoto: '' as any, //프로필변경: 고른사진
      photoURL: '', // 유저프로필에 저장된 사진 
      modifyDisplayname: false, //유저닉네임 수정되면 클래스 부여
    }
  },
  created() {
    //컴포넌트가 생성되자마자 현재 로그인한 사용자의 프로필 정보 가져와 표시
    this.loadCurrentUserProfile();
  },

  methods: {
    //현재 로그인한 사용자의 프로필 정보를 가져오기
    async loadCurrentUserProfile() {
      const auth = getAuth();
      const user: any = auth.currentUser;
      try {
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
      }
      catch (err) { console.log(err) }
      return
    },

    //파이어베이스 스토리지에 이미지 업로드
    async __uploadImage() {
      try {
        const auth = getAuth()
        const user: any = auth.currentUser
        const storage = getStorage()
        const storageRef = ref(storage, `Users/${user.uid}/profile_image.png`)

        // 'file' comes from the Blob or File API
        const response = await uploadBytes(storageRef, this.selectedPhoto)
        //이미지를 url로 받아와서 data에 담기
        const url = await getDownloadURL(response.ref)
        this.photoURL = url
        this.__updatePhotoURL()
      }
      catch (err) { console.log(err) }
      return console.log('Uploaded a blob or file!');
    },

    //프로필사진 새로 선택 될 때
    setPhotoURL(e: any) {
      this.selectedPhoto = e.target.files[0]
      console.log(this.selectedPhoto.name)

      //선택이 완료되자마자 파이어베이스 스토리지에 사진 업로드
      this.__uploadImage()
    },

    //유저프로필 사진 변경
    async __updatePhotoURL() {
      const auth = getAuth()
      const user: any = auth.currentUser
      await updateProfile(user, {
        photoURL: this.photoURL,
      }).then(() => {
        alert("유저프로필사진 업데이트 완료")
        this.updateUser()
      }).catch((error) => {
        console.log(error)
      });
    },

    //유저닉네임 새로 작성 될 때
    setDisplayName(e: any) {
      var updateName = e.target.value;
      this.displayName = updateName
      // 연필모양아이콘 수정으로 바뀌게
      this.modifyDisplayname = true
    },

    //유저프로필 닉네임 변경
    async __updateDisplayName() {
      const auth = getAuth()
      const user: any = auth.currentUser
      await updateProfile(user, {
        displayName: this.displayName,
      }).then(() => {
        this.modifyDisplayname = false
        this.updateUser()
        alert("유저 네임 업데이트 완료")
        console.log(user)
      }).catch((error) => {
        console.log(error)
      });
    },

    // 파이어스토어에 Users 사진과 닉네임 업데이트
    async updateUser() {
      const auth = getAuth()
      const user: any = auth.currentUser
      const db = getFirestore();
      const thisUser = doc(db, `Users/${user.uid}`);
      await updateDoc(thisUser, {
        userImagePath: this.photoURL,
        userName: this.displayName
      });
      return console.log("지금 변경된 유저정보 : ", this.displayName);
    },

    //로그아웃
    async __logout() {
      try {
        const auth = getAuth()
        await signOut(auth)
        alert("로그아웃 성공")
      } catch (error) {
        console.log(error)
      }
      //로그아웃되면 로그인페이지로 내보내기
      return this.$router.replace('/loginjoin')
    },

    //페이지 이동
    goBack() {
      this.$router.go(-1);
    },
    goFront() {
      ; (this as any).$router.go(+1)
    },
    goCalendar() {
      this.$router.push(`/calendar/${this.$route.params.id}`);
    },
    goTodo() {
      this.$router.push(`/calendar/${this.$route.params.id}/todo`);
    },
    goAi() {
      this.$router.push(`/calendar/${this.$route.params.id}/ai`);
    },
    goDiary() {
      this.$router.push(`/calendar/${this.$route.params.id}/diary`);
    },
    goHome() {
      ; (this as any).$router.push('/home')
    },
    goChangedPw() {
      ; (this as any).$router.push('/changepw')
    },
  }
}
</script>

<style lang="scss">
//믹스인으로 공통 스타일 묶기
@import '../assets/scss/components/SideBar.scss';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>