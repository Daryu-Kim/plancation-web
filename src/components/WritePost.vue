<template>
  <div class="writePost">
    <input v-bind:value="postTitle" v-on:input="setPostTitle" class="postTitle fs_14" type="text"
      placeholder="기록/다이어리 제목">
    <textarea v-bind:value="postContent" v-on:input="setPostContent" class="fs_14" name="" id="" cols="30" rows="10"
      placeholder="기록/다이어리 텍스트를 입력해주세요."></textarea>
    <input type="file" class="fs_14" accept="image/*" v-on:input="setPhotoURL">
    <button class="fs_14">취소</button>
    <button class="fs_14">기록에 등록</button>
  </div>
</template>

<script lang="ts">
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

export default {
  data() {
    return {
      postTitle: '',
      postContent: '',
      selectedPhoto: '' as any,
      photoURL: ''
      ,
      calendarList: [] as any[]
    }
  },
  methods: {
    //타이틀 값 받아내기
    setPostTitle(e: any) {
      var writeTitle = e.target.value;
      this.postTitle = writeTitle
      console.log(writeTitle)
    },

    //본문 글 값 받아내기
    setPostContent(e: any) {
      var writeContent = e.target.value;
      this.postContent = writeContent
      console.log(writeContent)
    },

    //캘린더- 캘린더 ID -post - postID - diaryImage.png
    //파이어베이스 스토리지에 이미지 업로드
    async __uploadImage() {
      try {
        const auth = getAuth()
        const user: any = auth.currentUser
        const storage = getStorage()
        const storageRef = ref(storage, `Calendars/${user.uid}/${this.selectedPhoto.name}`)

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

    setPhotoURL(e: any) {
      this.selectedPhoto = e.target.files[0]
      console.log(this.selectedPhoto.name)

      //선택이 완료되자마자 파이어베이스 스토리지에 사진 업로드
      this.__uploadImage()
    },
  }
}
</script>

<style lang="scss">
.writePost {
  width: 20rem;
  height: 20rem;
  display: none;

  &.active {
    display: block;
    display: flex;
    flex-direction: column;
  }

  // .postTitle {}
}
</style>
