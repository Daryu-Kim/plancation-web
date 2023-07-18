<!-- <template lang="">
  <div>
    <vue-flatpickr v-model="date" :config="options"></vue-flatpickr>

  </div>
</template>
<script lang="ts">
import Flatpickr from 'flatpickr';
import VueFlatpickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    VueFlatpickr
  },
  data() {
    return {
      date: '',
      options: {
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'F j, Y',
        locale: {
          firstDayOfWeek: 1
        }
      }
    };
  },
};

</script>
<style lang="">
  
</style> -->
<template>
  <div class="calendar">
    <SideBar></SideBar>
    <HeaderBar></HeaderBar>
  </div>
</template> 
<script lang="ts">
import SideBar from "../components/SideBar.vue";
import HeaderBar from '../components/HeaderBar.vue'

export default {
  components: {
    SideBar,
    HeaderBar,
  }
}
</script>
<style lang="scss">
.calendar {
  display: flex;
}
</style>