<template>
  <div class="about">
    <header>
      <h1>
        <a href="">
          <img src="@/assets/images/logotext.png" alt="헤더로고" />
        </a>
      </h1>

      <nav>
        <ul class="gnbLog fs_9">
          <li>
            <a href="#section2">캘린더/To-do</a>
          </li>
          <li>
            <a href="#section3">AutoSchedule</a>
          </li>
          <li>
            <a href="#section4">기록/다이어리</a>
          </li>
          <li>
            <a href="#section1">설치</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <section class="sectionAbout">
        <div class="sectionBgColor">
          <div class="mainText">
            <p class="fs_21">순간순간이 소중한 당신을 위해,</p>
            <p class="fs_15">시간관리의 길잡이</p>
          </div>
          <img class="mainLogo" src="@/assets/images/logotext.png" alt="메인로고" />
          <img class="mainImg" src="@/assets/images/aboutMainImg.png" alt="소개페이지 메인이미지" />
        </div>
      </section>

      <section id="section1">
        <div class="TextWrap">
          <p class="fs_21">설치</p>
          <p class="fs_12">모바일에서도 플랜케이션을 사용할 수 있어요.</p>
          <p class="fs_12">
            모바일로 Plancation 웹페이지에 접속해 다운로드를 눌러 다양한 환경에서 만나보세요.
          </p>

          <div class="ImgWrap">
            <img src="@/assets/images/pwa.png" alt="pwa다운로드" />
            <img src="@/assets/images/appStore.png" alt="appStore다운로드" />
            <img src="@/assets/images/googlePlay.png" alt="googlePlay다운로드" />
          </div>

          <img class="MockupsImg" src="@/assets/images/aboutDownloadImg.png" />
        </div>
      </section>

      <section id="section2">
        <div class="sectionWrap">
          <div class="aboutTextWrap">
            <h2 class="fs_19">캘린더/ to-do list</h2>
            <p class="fs_13">일정관리의 기본이 되는</p>
            <p class="fs_13">캘린더와 해야 할 일 관리</p>
          </div>

          <div class="aboutImgwrap">
            <img src="@/assets/images/aboutCalenderImg1.png" alt="캘린더 이미지1" />
            <img src="@/assets/images/aboutCalenderImg2.png" alt="캘린더 이미지2" />
          </div>

          <div class="slideDataWrap">
            <p class="fs_11">중요한 일정을 강조하세요.</p>
            <p class="fs_11">원하는 색의 마크업, 이모지로 한눈에 확인 할 수 있어요.</p>

            <div class="slideBtn">
              <button class="fs_8">1</button>
              <button class="fs_8">2</button>
            </div>
          </div>
        </div>
      </section>

      <!-- <section>
        <div class="sectionWrap">
          <div class="aboutTextWrap">
            <h2 class="fs_19">캘린더/ to-do list</h2>
            <p class="fs_13">일정관리의 기본이 되는</p>
            <p class="fs_13">캘린더와 해야 할 일 관리</p>
          </div>

          <div class="aboutImgwrap">
            <img src="@/assets/images/aboutTodoImg1.png" alt="todo 이미지1" />
            <img src="@/assets/images/aboutTodoImg2.png" alt="todo 이미지2" />
          </div>

          <div class="slideDataWrap">
            <div>
              <p class="fs_11">해야 할 일들에 대해 간결하게 관리하세요.</p>
              <p class="fs_11">시간과 알림, 장소, 참여자에 대한 관리도 가능합니다.</p>
            </div>
            <div>
              <button>1</button>
              <button>2</button>
            </div>
          </div>
        </div>
      </section> -->

      <section id="section3">
        <div class="sectionWrap">
          <div class="aboutTextWrap">
            <h2 class="fs_19">Auto schedule</h2>
            <p class="fs_13">짜기 어려운 계획을 대신 해결해주는</p>
            <p class="fs_13">오토스케줄링 서비스</p>
          </div>

          <div class="aboutImgwrap">
            <img src="@/assets/images/aboutAI1.png" alt="todo 이미지1" />
            <img src="@/assets/images/aboutAI2.png" alt="todo 이미지2" />
          </div>

          <div class="slideDataWrap">
            <p class="fs_11">계획하는 날짜와 정보만 입력해주세요.</p>
            <p class="fs_11">AI를 이용해 대신 계획을 짜주고 할 일에 등록도 가능해요.</p>
          </div>
        </div>
      </section>

      <section id="section4">
        <div class="sectionWrap">
          <div class="aboutTextWrap">
            <h2 class="fs_19">다이어리/기록</h2>
            <p class="fs_13">오늘 하루 무슨 일이 있었나요?</p>
          </div>

          <div class="aboutImgwrap">
            <img src="@/assets/images/aboutDiary1.png" alt="todo 이미지1" />
            <img src="@/assets/images/aboutDiary2.png" alt="todo 이미지2" />
          </div>

          <div class="slideDataWrap">
            <p class="fs_11">하루에 대한 기록도 남길 수 있어요.</p>
            <p class="fs_11">하루를 마치며 사진과 함께 간단한 기록을 남겨보세요.</p>
          </div>
        </div>
      </section>
    </main>
    <button class="fs_10">이용하러 가기</button>
  </div>
</template>

<style lang="scss">
@import '../assets/scss/pages/about.scss';
@import '../assets/scss/abstracts/Fontmodule.css';
</style>
<script lang="ts">
// const $style = useCssModule()
// import css from '../assets/scss/pages/about.css'
// import { useCssModule } from 'vue'
</script>
